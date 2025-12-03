#!/usr/bin/env bash

echo "Running migrations..."
php /var/www/html/artisan migrate:fresh --force
echo "Running seeders..."
php /var/www/html/artisan db:seed --force
