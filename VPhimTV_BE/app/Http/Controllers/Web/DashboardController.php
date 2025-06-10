<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\MovieView;
use App\Models\Movie;
use App\Models\MovieFavorite;

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

        // 3. Lượt truy cập (7 ngày gần nhất)
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

        // 4. Người dùng đang truy cập
        $onlineUsersData = DB::table('movie_views')
            ->select('ip_address', 'created_at', 'user_agent')
            ->where('created_at', '>=', now()->subMinutes(15))
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $onlineUsers = [];
        foreach ($onlineUsersData as $index => $record) {
            $onlineUsers[] = [
                'name' => 'User ' . ($index + 1),
                'ip' => $record->ip_address,
                'start' => (new \DateTime($record->created_at))->format('H:i d/m/Y'),
                'close' => now()->addMinutes(15)->format('H:i d/m/Y'),
            ];
        }

        // 5. Dữ liệu lượt xem theo ngày
            $viewsPerDay = DB::table('movie_views')
                ->selectRaw('DATE(created_at) as view_date, COUNT(*) as total_views')
                ->groupByRaw('DATE(created_at)')
                ->orderByDesc('view_date')
                ->get();

        // 6. Phim yêu thích nhiều nhất - join với bảng movies để lấy tên phim
        $topFavoriteMovies = MovieFavorite::select('movie_id', DB::raw('count(*) as total_favorites'))
            ->where('is_active', true)
            ->where('is_deleted', false)
            ->groupBy('movie_id')
            ->orderByDesc('total_favorites')
            ->limit(10)
            ->get();

        // Lấy danh sách movie_id từ trên
        $movieIds = $topFavoriteMovies->pluck('movie_id')->toArray();

        // Lấy danh sách phim theo movie_id
        $movies = Movie::whereIn('id', $movieIds)->get()->keyBy('id');

        // Gắn tên phim vào collection topFavoriteMovies
        $topFavoriteMovies->transform(function ($item) use ($movies) {
            $item->movie_name = $movies[$item->movie_id]->name ?? 'Unknown';
            return $item;
        });
        // 7. Phim được xem nhiều nhất
        $topViewedMovies = DB::table('movie_views')
            ->join('episodes', 'movie_views.episode_id', '=', 'episodes.id')
            ->join('movies', 'episodes.movie_id', '=', 'movies.id')
            ->select('movies.id as movie_id', 'movies.name as movie_name', DB::raw('COUNT(*) as total_views'))
            ->groupBy('movies.id', 'movies.name')
            ->orderByDesc('total_views')
            ->limit(10)
            ->get();
        $totalFavorites = $topFavoriteMovies->sum('total_favorites');
        $totalViews = DB::table('movie_views')->count();

        // 8. Tổng Người Dùng
        $recentUsers = DB::table('users')
            ->select('name', 'email', 'created_at')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        $totalUsers = DB::table('users')->count();

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
            'topFavoriteMovies' => $topFavoriteMovies,
            'totalFavorites' => $totalFavorites,
            'topViewedMovies' => $topViewedMovies,
            'totalViews' => $totalViews,
            'totalUsers' => $totalUsers,
            'recentUsers' => $recentUsers,
        ]);
    }
}