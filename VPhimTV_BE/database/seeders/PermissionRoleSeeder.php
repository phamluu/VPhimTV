<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PermissionRole;
use App\Models\Role;
use App\Models\Permission;

class PermissionRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = Permission::all();
        $roles = Role::all();

        foreach ($roles as $role) {
            $permissionCount = min($permissions->count(), 6);
            $randomPermissions = $permissions->random(rand(1, $permissionCount));

            foreach ($randomPermissions as $permission) {
                PermissionRole::firstOrCreate([
                    'permission_id' => $permission->id,
                    'role_id' => $role->id,
                ]);
            }
        }
    }
}
