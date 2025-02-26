<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @hasSection('title')

            <title>@yield('title') - {{ config('app.name') }}</title>
        @else
            <title>{{ config('app.name') }}</title>
        @endif

        <!-- Favicon -->
		<link rel="shortcut icon" href="{{ url(asset('favicon.ico')) }}">

        <!-- Fonts -->
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css">

        @vite(['resources/sass/app.scss', 'resources/js/app.js'])
        @livewireStyles
        @livewireScripts

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Leaflet assets -->
        <link rel="stylesheet" href="{{ url(asset('leaflet/leaflet.css')) }}">
        <script src="{{ url(asset('leaflet/leaflet.js')) }}"></script>
        
        
        <!-- Leaflet custom style -->
        <style>
            .leaflet-tooltip {
                background: white;
                color: black;
                box-shadow: none;
                border: none;
                padding: 0 5px;
            }
        </style>
    </head>

    <body>
        @yield('body')
        <script src="{{ url(asset('scripts/script.js')) }}"></script>
    </body>
</html>
