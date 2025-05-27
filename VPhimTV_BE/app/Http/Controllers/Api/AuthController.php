<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function check()
    {
        return Auth::check()
            ? response()->json(Auth::user())
            : response()->json(['message' => 'Chưa đăng nhập'], 401);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required'
        ], [
            'email.required' => 'Email không được để trống',
            'email.email' => 'Email không hợp lệ',
            'password.required' => 'Mật khẩu không được để trống',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json([
                'message' => 'Tài khoản không tồn tại',
                'errors' => [
                    'email' => ['Email không tồn tại trong hệ thống']
                ]
            ], 401);
        }

        if (! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Sai mật khẩu',
                'errors' => [
                    'password' => ['Mật khẩu không đúng']
                ]
            ], 401);
        }

        Auth::login($user);

        return response()->json(['message' => 'Đăng nhập thành công', 'user' => $user]);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required',
        ], [
            'name.required' => 'Tên không được để trống',
            'email.required' => 'Email không được để trống',
            'email.email' => 'Email không hợp lệ',
            'email.unique' => 'Email đã tồn tại',
            'password.required' => 'Mật khẩu không được để trống',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi đăng ký',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        return response()->json(['message' => 'Đăng ký thành công', 'user' => $user]);
    }


    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }
}
