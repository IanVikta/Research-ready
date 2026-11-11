<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'service' => 'Expert Research Ready Services — REST API',
        'version' => 'v1',
        'status' => 'operational',
    ]);
});
