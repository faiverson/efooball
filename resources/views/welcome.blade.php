<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <div className="flex flex-col items-top">
        <header className="flex justify-center pt-4 pb-2 md:pt-8 md:pb-4">
            <livewire:logo />
        </header>
        <div className="flex flex-col md:flex-row md:justify-between p-2 md:p-8">
            <div>Filtros</div>
            {{-- <GameVersionTags versions={versions} onChange={onChangeTag} />
            <Input type="number" color="yellow" variant="outlined" label="Partidos Jugados" value={minGames} onChange={ev => onChangeMinGames(ev)} />
            <Input type="date" color="yellow" variant="outlined" label="Fecha desde" value={from_at ? from_at.toFormat('yyyy-MM-dd') : ''} onChange={ev => handleChange(ev, 'from_at')} />
            <Input type="date" color="yellow" variant="outlined" label="Fecha hasta" value={until_at ? until_at.toFormat('yyyy-MM-dd') : ''} onChange={ev => handleChange(ev, 'until_at')} />
            <Button onClick={send} variant="filled" color="yellow">Filtrar</Button> --}}
            </div>
        </div>
    </div>
    @inertia
    </body>
</html>
