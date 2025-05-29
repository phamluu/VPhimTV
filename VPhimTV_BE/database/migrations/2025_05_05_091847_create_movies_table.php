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
        if (!Schema::hasTable('movies')) {
            Schema::create('movies', function (Blueprint $table) {
                $table->id();
                $table->string('name')->nullable();
                $table->string('slug')->unique();
                $table->string('original_name')->nullable();
                $table->text('content')->nullable();
                $table->integer('type_id')->nullable();
                $table->string('status')->nullable();
                $table->string('trailer_url')->nullable();
                $table->string('poster_url')->nullable();
                $table->string('thumb_url')->nullable();
                $table->string('time')->nullable();
                $table->string('episode_current')->nullable();
                $table->string('episode_total')->nullable();
                $table->string('quality')->nullable();
                $table->string('language')->nullable();
                $table->string('year')->nullable();
                $table->integer('country_id')->nullable();
                $table->string('actor')->nullable();
                $table->string('director')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
