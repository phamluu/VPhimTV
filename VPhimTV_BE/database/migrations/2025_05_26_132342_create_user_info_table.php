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
        if (!Schema::hasTable('user_info')) {
            Schema::create('user_info', function (Blueprint $table) {
                $table->id();
                $table->string('phone')->nullable();
                $table->string('full_name')->nullable();
                $table->string('address')->nullable();
                $table->date('birth_date')->nullable();
                $table->string('avatar')->nullable();
                $table->unsignedBigInteger('user_id')->nullable();
                $table->integer('country_id')->nullable();
                $table->timestamps();

                // Foreign key sau khi đã tạo cột
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_info');
    }
};
