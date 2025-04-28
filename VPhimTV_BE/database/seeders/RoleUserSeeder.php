<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RoleUser;
use App\Models\Role;
use App\Models\User;

class RoleUserSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $roles = Role::all();

        foreach ($users as $user) {
            $roleCount = min($roles->count(), 3);
            $assignedRoles = $roles->random(rand(1, $roleCount));

            foreach ($assignedRoles as $role) {
                RoleUser::firstOrCreate([
                    'role_id' => $role->id,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
