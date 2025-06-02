<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('movie_views');
        Schema::dropIfExists('movie_views_details');

        Schema::create('movie_views', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('episode_id')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_views');
    }
};
