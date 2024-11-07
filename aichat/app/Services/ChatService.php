<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ChatService
{
    private $apiUrl = 'https://api.vultrinference.com/v1/chat/completions';
    private $apiKey = '47QNM43RTTG3D52ZECKSIJDLUY5L242XJCGQ';

    public function getChatResponse($messages)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => $this->apiKey
        ])->post($this->apiUrl, [
            'model' => 'llama2-13b-chat-Q5_K_M',
            'messages' => $messages,
            'max_tokens' => 256,
            'temperature' => 0.7,
            'top_k' => 40,
            'top_p' => 0.9
        ]);

        if ($response->successful()) {
            return $response->json()['choices'][0]['message']['content'];
        }

        throw new \Exception('Failed to get chat response');
    }
}