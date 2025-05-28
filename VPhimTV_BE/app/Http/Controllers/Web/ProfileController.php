<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Services\UserService;

class ProfileController extends Controller
{
    protected $service;
    public function __construct()
    {
        $this->service = new UserService();
    }
    public function show()
    {
        $user = $this->service->getProfile();
        $country = Country::find($user->country_id);
        return view('profile.show', compact('user', 'country'));
    }
    public function edit()
    {
        $user = $this->service->getProfile();
        $countries = Country::all();
        return view('profile.edit', compact('user', 'countries'));
    }
    public function update(Request $request)
    {
        $validated = $request->validate([
            'phone'       => 'nullable|string|max:20',
            'full_name'   => 'required|string|max:255',
            'address'     => 'nullable|string|max:255',
            'birth_date'  => 'nullable|date',
            'country_id'  => 'nullable|exists:countries,id',
        ]);
        $rs = $this->service->update_profile($request);
        if ($rs == true) {
            return redirect()->route('profile.show')->with('success', 'User updated successfully.');
        }
        return redirect()->back()->with('error', 'Cập nhật không thành công')->withInput();
    }
}
