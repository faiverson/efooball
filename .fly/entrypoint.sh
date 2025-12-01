#!/usr/bin/env sh
# Run user scripts, if they exist
echo "Running entrypoint.sh..."
mkdir -p /var/run/php
echo "Created /var/run/php"
ls -ld /var/run/php
ls -R /var/www/html/.fly
for f in /var/www/html/.fly/scripts/*.sh; do
    # Bail out this loop if any script exits with non-zero status code
    bash "$f" -e
done

if [ $# -gt 0 ]; then
    # If we passed a command, run it as root
    exec "$@"
else
    exec supervisord -c /etc/supervisor/supervisord.conf
fi
