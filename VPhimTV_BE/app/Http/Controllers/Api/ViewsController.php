<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MovieView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ViewsController extends Controller
{
    public function create(Request $request)
    {
        $user = Auth::user();
        $userId = $user ? $user->id : null;
        $ip = $request->ip();

        $request->validate([
            'episode_id' => 'required|exists:episodes,id',
        ]);

        $alreadyViewed = MovieView::where('episode_id', $request->episode_id)
            ->where(function ($query) use ($userId, $ip) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('ip_address', $ip);
                }
            })
            ->where('created_at', '>=', now()->subMinutes(5))
            ->exists();

        if ($alreadyViewed) {
            return response()->json(['message' => 'Already viewed recently'], 200);
        }

        $view = MovieView::create([
            'user_id' => $userId,
            'episode_id' => $request->episode_id,
            'ip_address' => $ip,
            'user_agent' => $request->header('User-Agent'),
        ]);

        return response()->json($view, 201);
    }
}
