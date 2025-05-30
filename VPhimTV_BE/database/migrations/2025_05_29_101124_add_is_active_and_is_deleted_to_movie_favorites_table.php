<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('movie_favorites', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('status');
            $table->boolean('is_deleted')->default(false)->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('movie_favorites', function (Blueprint $table) {
            $table->dropColumn(['is_active', 'is_deleted']);
        });
    }
};
