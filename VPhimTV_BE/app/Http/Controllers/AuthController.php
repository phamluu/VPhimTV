<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showRegister()
    {
        return view('auth.register');
    }
    public function register(Request $request)
    {
        // $request->validate([
        //     'name'     => 'required|string|max:255',
        //     'email'    => 'required|string|email|max:255|unique:users',
        //     'password' => 'required|string|min:4|confirmed',
        // ]);
        $request->validate([
            'name'     => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
        ]);
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);
        Auth::login($user);

        return redirect('/dashboard');
    }
    public function showlogin()
    {
        return view('auth.login');
    }
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return back()->withErrors(['message' => 'Email hoặc Mật khẩu sai'])->withInput();
        }

        Auth::login($user);

        // Redirect to the intended URL or fallback to the dashboard
        return redirect()->intended('/dashboard');
    }

    public function logout()
    {
        Auth::logout();

        return redirect('/login');
    }
}
