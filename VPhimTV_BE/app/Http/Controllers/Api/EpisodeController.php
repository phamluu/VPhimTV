<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DriveService;
use App\Services\DropboxService;

class EpisodeController extends Controller
{
    protected $driveService;
    protected $dropbox;

    public function __construct(DriveService $driveService, DropboxService $dropbox)
    {
        $this->driveService = $driveService;
        $this->dropbox = $dropbox;
    }

    public function test(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'Không có file được gửi lên'], 400);
        }

        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $localPath = $file->getRealPath();

        try {
            $res = $this->dropbox->upload("/video/" . $fileName, $localPath);

            if (isset($res['error'])) {
                return response()->json(['message' => 'Upload thất bại', 'error' => $res['error']], 500);
            }

            $sharedUrl = $this->dropbox->createSharedLink($res['path_lower']);
            $streamUrl = $sharedUrl ? preg_replace('/(\?|&)dl=0/', '$1raw=1', $sharedUrl) : null;

            return response()->json(['message' => 'Upload thành công', 'data' => [
                'file_name' => $fileName,
                'link_mp4' => $streamUrl,
            ]], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi upload', 'error' => $e->getMessage()], 500);
        }
    }
}
