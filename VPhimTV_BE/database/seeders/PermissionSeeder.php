<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission; // Adjust the namespace based on your project structure

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::factory()->create([
            'name' => 'admin',
            'description' => 'Allows full',
        ]);
        Permission::factory()->create([
            'name' => 'view-post',
            'description' => 'Allows viewing posts',
        ]);

        Permission::factory()->create([
            'name' => 'edit-post',
            'description' => 'Allows editing posts',
        ]);

        Permission::factory()->create([
            'name' => 'delete-post',
            'description' => 'Allows deleting posts',
        ]);
    }
}
