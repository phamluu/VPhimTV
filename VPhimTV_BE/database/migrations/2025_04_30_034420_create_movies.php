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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            // $table->string('_id')->unique();
            // $table->string('name');
            // $table->string('slug')->unique();
            // $table->string('original_name');
            // $table->string('content');
            // $table->string('type');
            // $table->string('status');
            // $table->string('poster_url');
            // $table->string('thumb_url');
            // $table->boolean('is_copyright');
            // $table->boolean('sub_docquyen');
            // $table->boolean('chieurap');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
