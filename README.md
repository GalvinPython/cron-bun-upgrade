# cron-bun-upgrade

I made this because I was too lazy to update Bun on all my 5 billion servers (total count unknown), but it's very simple. Use something like `pm2` to make this script run in the background, and whenever there's a new update, it'll download it within an hour of it being pushed out.

**Note:** no, you cannot use canary with this
