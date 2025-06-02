<?php

namespace App\Http\Requests;

class MovieRequest extends BaseRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'type_list' => 'sometimes|string',
            'sort_lang' => 'sometimes|string',
            'category' => 'sometimes|string',
            'country' => 'sometimes|string',
            'year' => 'sometimes|integer|min:1900|max:' . date('Y'),
            'keyword' => 'sometimes|string|max:255',
        ]);
    }

    public function filtersParams(): array
    {
        return [
            'type_list' => $this->input('type_list'),
            'sort_lang' => $this->input('sort_lang'),
            'category' => $this->input('category'),
            'country' => $this->input('country'),
            'year' => $this->input('year'),
            'keyword' => $this->input('keyword'),
        ];
    }
}
