<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $roles)
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        $auth = Auth::user();
        $user = User::find($auth->id);
        $rolesArray = explode('|', $roles); // phân tách nhiều role theo dấu "|"

        // Kiểm tra user có ít nhất một role trong $rolesArray
        $hasRole = $user->roles()->whereIn('name', $rolesArray)->exists();

        if (!$hasRole) {
            return redirect('/unauthorized')->with('error', 'Bạn không có quyền truy cập.');
        }

        return $next($request);
    }
}
