<?php

namespace App\Models;

class QueryParams
{
    public int $limit = 50;
    public int $page = 1;
    public string $sort_field = 'modified.time';
    public string $sort_type = 'desc';
}

