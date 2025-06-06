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
        Schema::table('movie_histories', function (Blueprint $table) {
            $table->integer('duration_seconds')->default(0)->after('progress_seconds');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('movie_histories', function (Blueprint $table) {
            $table->dropColumn('duration_seconds');
        });
    }
};
