<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'limit' => 'sometimes|integer|min:1|max:200',
            'page' => 'sometimes|integer|min:1',
            'sort_field' => 'sometimes|string',
            'sort_type' => 'sometimes|in:asc,desc',
        ];
    }

    public function paginationParams(): array
    {
        return [
            'limit' => $this->input('limit', 50),
            'page' => $this->input('page', 1),
        ];
    }

    public function sortingParams(): array
    {
        return [
            'sort_field' => $this->input('sort_field', 'updated_at'),
            'sort_type' => strtolower($this->input('sort_type', 'desc')) === 'asc' ? 'asc' : 'desc',
        ];
    }
}
