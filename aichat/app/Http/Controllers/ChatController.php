<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        return view('chat.index');
    }

    public function send(Request $request)
    {
        $message = ChatMessage::create([
            'message' => $request->message,
            'user_id' => auth()->id() ?? 1, // Adjust based on your auth setup
        ]);

        return response()->json($message);
    }

    public function getMessages()
    {
        $messages = ChatMessage::latest()->get();
        return response()->json($messages);
    }
}