<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Country;

class CountryController extends Controller
{
    public function getList(Request $request)
    {
        $sortField = $request->input('sort_field', 'updated_at');
        $sortType = $request->input('sort_type', 'desc');

        $countries = Country::query();
        $countries->orderBy($sortField, $sortType);

        return $countries->get();
    }
}
