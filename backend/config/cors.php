<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'up'],

    'allowed_methods' => ['GET', 'POST', 'OPTIONS'],

    'allowed_origins' => array_filter(
        array_map('trim', explode(',', (string) env('FRONTEND_URL', 'http://localhost:5173,http://127.0.0.1:5173')))
    ),

    'allowed_origins_patterns' => [
        '#^https://([a-z0-9-]+\.)*expertresearchreadyservices\.com$#',
        '#^https://.*\.workers\.dev$#',
        '#^https://.*\.vercel\.app$#',
    ],

    'allowed_headers' => ['Content-Type', 'Accept', 'Origin', 'X-Requested-With', 'Authorization'],

    'exposed_headers' => ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'Retry-After'],

    'max_age' => 86400,

    'supports_credentials' => false,

];

