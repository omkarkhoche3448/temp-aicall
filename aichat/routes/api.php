<?php
use App\Http\Controllers\ChatController;

Route::post('/chat/send', [ChatController::class, 'sendMessage']);
Route::get('/chat/messages', [ChatController::class, 'getMessages']);