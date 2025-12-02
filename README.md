<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Deployment

To deploy the application, simply run:

```bash
fly deploy
```

This command will:

1. Build the Docker image.
2. Run migrations (`php artisan migrate --force`).
3. Run seeders (`php artisan db:seed --force`).

### Database Dump

The application includes a full database dump located at `database/snapshots/full_dump.sql`.

- **On Deployment**: The `DatabaseSeeder` checks for this file. If it exists, it loads the dump using `psql`. If it doesn't exist, it runs the standard seeders.
- **Updating the Dump**: To update the dump, run `php artisan db:snapshot-seeds` locally and commit the changes to `database/snapshots/full_dump.sql`.
- **Deleting the Dump**: If you want to stop using the dump and revert to standard seeders, simply delete the file `database/snapshots/full_dump.sql` from the repository and commit the deletion.

## About Martes de PES

- The last thing is done was the Team Stats and

- Next Step is to check:

- Random: do the random and send to telegram

- Libertadores and Sudamericana sections

- Strikes

- Team VS Teams stats

- Add filter stats by tournament

## FAQ

What to do with new games?

- Make sure RESET_DATABASE=false and run the db:seed --class=GameSeeder

What to do with a new version of the game?

- Team Stats: click on a team should show the game list
- Dropdowns should accept search
  torneo 3 me esta dando el titulo a mi en vez de juan en resources/js/Hooks/useTournamentPositions.js
  y es porque es el torneo de las dos semis
