<?php

use App\Http\Controllers\Api\V1\ContactController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/contact', [ContactController::class, 'store'])
        ->middleware('throttle:contact-submissions')
        ->name('api.v1.contact.store');
});

