#!/bin/sh
# Builds the site and uploads public/ to the server with rsync over ssh.
# Credentials come from .env: DEPLOY_HOST, DEPLOY_USER, DEPLOY_PASS, DEPLOY_PATH.
# Extra arguments go to rsync, e.g. `npm run deploy -- --dry-run`.
set -eu
cd "$(dirname "$0")/.."

env_get() {
    grep -m1 "^$1=" .env | cut -d= -f2- | sed -E "s/^'(.*)'\$/\1/; s/^\"(.*)\"\$/\1/"
}

host=$(env_get DEPLOY_HOST)
user=$(env_get DEPLOY_USER)
path=$(env_get DEPLOY_PATH)
SSHPASS=$(env_get DEPLOY_PASS)
export SSHPASS

npx hexo clean
npx hexo generate

# .htaccess and cgi-bin are managed on the server, keep them
sshpass -e rsync -rltzv --delete \
    --exclude .htaccess --exclude cgi-bin \
    -e "ssh -o ConnectTimeout=15" \
    "$@" \
    public/ "$user@$host:${path%/}/"
