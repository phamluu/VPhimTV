<?php

namespace App\Http\Requests;

class CommentRequest extends BaseRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'movie_id' => 'required|integer|exists:movies,id',
            'reply_to' => 'nullable|integer|exists:movie_comments,id',
        ]);
    }

    public function filtersParams(): array
    {
        return [
            'movie_id' => $this->input('movie_id'),
            'reply_to' => $this->input('reply_to'),
        ];
    }
}
