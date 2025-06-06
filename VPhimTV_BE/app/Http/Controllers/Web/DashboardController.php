<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\MovieView;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // 1. Lượt xem phim (Line Chart)
        $viewsData = DB::table('movie_views')
            ->select(DB::raw('MONTH(created_at) as month, COUNT(*) as total_views'))
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $viewsLabels = [];
        $viewsDataPoints = [];

        for ($i = 1; $i <= 12; $i++) {
            $viewsLabels[] = date('M', mktime(0, 0, 0, $i, 1));
            $monthData = $viewsData->firstWhere('month', $i);
            $viewsDataPoints[] = $monthData ? $monthData->total_views : 0;
        }

        // 2. Phim được cập nhật (Line Chart)
        // Đếm số episode_id khác nhau theo tháng (giả lập số lượng tập phim được cập nhật)
        $moviesData = DB::table('movie_views')
            ->select(DB::raw('MONTH(created_at) as month, COUNT(DISTINCT episode_id) as total_episodes'))
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $moviesLabels = [];
        $moviesDataPoints = [];

        for ($i = 1; $i <= 12; $i++) {
            $moviesLabels[] = date('M', mktime(0, 0, 0, $i, 1));
            $monthData = $moviesData->firstWhere('month', $i);
            $moviesDataPoints[] = $monthData ? $monthData->total_episodes : 0;
        }

        // 3. Lượt truy cập (Bar Chart - Last 7 days)
        $visitsData = DB::table('movie_views')
            ->select(DB::raw('DATE(created_at) as date, COUNT(*) as total_visits'))
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $visitsLabels = [];
        $visitsDataPoints = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $visitsLabels[] = now()->subDays($i)->format('d M');
            $dateData = $visitsData->firstWhere('date', $date);
            $visitsDataPoints[] = $dateData ? $dateData->total_visits : 0;
        }

        // 4. Đang truy cập (Table)
        // Lấy các bản ghi gần đây (giả lập người dùng đang truy cập)
        $onlineUsersData = DB::table('movie_views')
            ->select('ip_address', 'created_at', 'user_agent')
            ->where('created_at', '>=', now()->subMinutes(15)) // Giả định "đang truy cập" là trong 15 phút gần nhất
            ->orderBy('created_at', 'desc')
            ->take(5) // Giới hạn 5 người dùng
            ->get();

        $onlineUsers = [];
        foreach ($onlineUsersData as $index => $record) {
            $onlineUsers[] = [
                'name' => 'User ' . ($index + 1), // Giả lập tên người dùng
                'ip' => $record->ip_address,
                'start' => (new \DateTime($record->created_at))->format('H:i d/m/Y'),
                'close' => now()->addMinutes(15)->format('H:i d/m/Y'), // Giả lập thời gian phiên hết hạn
            ];
        }

        $viewsPerDay = DB::table('movie_views')
    ->selectRaw('DATE(created_at) as view_date, COUNT(*) as total_views')
    ->groupByRaw('DATE(created_at)')
    ->orderByDesc('view_date')
    ->get();

        return view('dashboard', [
            'user' => $user,
            'viewsLabels' => $viewsLabels,
            'viewsData' => $viewsDataPoints,
            'moviesLabels' => $moviesLabels,
            'moviesData' => $moviesDataPoints,
            'visitsLabels' => $visitsLabels,
            'visitsData' => $visitsDataPoints,
            'onlineUsers' => $onlineUsers,
            'movieView' => $viewsPerDay,
        ]);
    }
}