<?php

namespace App\Models;

use App\Models\QueryParams;

class MovieQueryParams extends QueryParams
{
    public ?string $type_list;
    public ?string $sort_lang;
    public ?string $category;
    public ?string $country;
    public ?int $year;
}
