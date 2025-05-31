<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserInfo;

class UserController extends Controller
{
    public function getDetail($id)
    {
        $userId = $id;

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'Thiếu tham số id',
            ], 400);
        }

        $user = User::query()
            ->leftJoin('user_info', 'users.id', '=', 'user_info.user_id')
            ->select([
                'users.id',
                'user_info.avatar',
                'user_info.full_name',
                'users.created_at',
            ])
            ->where('users.id', $userId)
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Người dùng không tồn tại',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        if(!User::where('id', $id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Người dùng không tồn tại',
            ], 404);
        }

        $validate = $request->validate([
            'full_name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $userInfo = UserInfo::updateOrCreate(
            ['user_id' => $id],
            [
                'full_name' => $validate['full_name'],
                'avatar' => $request->file('avatar') ? $request->file('avatar')->store('avatars', 'public') : null,
            ]
        );

        return response()->json([
            'message' => 'Cập nhật thông tin người dùng thành công',
            'data' => $userInfo,
        ], 200);
    }
}
