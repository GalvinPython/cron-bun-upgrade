import { exec } from 'child_process';
import os from 'os';
import { promisify } from 'util';

const execAsync = promisify(exec);

const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
const discordWebhookExists = discordWebhook && discordWebhook.length > 0;

async function main() {
    try {
        console.log("Hello via Bun!");

        let { stdout: versionString } = await execAsync('bun -v');
        console.log(`Bun version: ${versionString}`);

        await execAsync('bun upgrade');

        let { stdout: newVersionString } = await execAsync('bun -v');
        if (newVersionString != versionString && discordWebhookExists) {
            const hostname = os.hostname();

            const response = await fetch(discordWebhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    embeds: [{
                        title: "Bun Update Notification",
                        description: `Bun has been updated to ${newVersionString.trim()} on host ${hostname}`,
                        color: 3066993
                    }]
                })
            });

            if (!response.ok) {
                console.error(`Error sending webhook: ${response.statusText}`);
            }
        }

        console.log(`Bun version: ${newVersionString}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error(`Error: ${error}`);
        }
    }
}

main();
setInterval(main, 1000 * 60 * 60); // Run every hour
