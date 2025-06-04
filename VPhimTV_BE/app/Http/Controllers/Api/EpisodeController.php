<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DriveService;

class EpisodeController extends Controller
{
    protected $driveService;

    public function __construct(DriveService $driveService)
    {
        $this->driveService = $driveService;
    }

    public function test(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'Không có file được gửi lên'], 400);
        }

        $file = $request->file('file');
        $filePath = $file->getPathname();
        $fileName = $file->getClientOriginalName();
        $mimeType = $file->getMimeType();

        $result = $this->driveService->uploadFile($filePath, $fileName, $mimeType);

        return $result;
    }
}
