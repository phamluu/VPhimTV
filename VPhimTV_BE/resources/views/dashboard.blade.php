@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-lg">
    <canvas id="bigDashboardChart1"></canvas>
</div>
<div class="content">
    <div class="row">
        {{-- Phim được yêu thích --}}
        <div class="col-lg-4 col-md-6">
            <div class="card card-chart"
                style="min-height: 400px; max-height:600px; display: flex; flex-direction: column; justify-content: space-between;">
                <div class="card-header">
                    <h5 class="card-category">Tổng lượt yêu thích: {{ number_format($totalFavorites) }}</h5>
                    <h4 class="card-title">Phim được yêu thích</h4>
                    <div class="dropdown">
                        <button type="button"
                            class="btn btn-round btn-outline-default dropdown-toggle btn-simple btn-icon no-caret"
                            data-toggle="dropdown">
                            <i class="now-ui-icons loader_gear"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <a class="dropdown-item text-danger" href="#">Remove Data</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-group mt-3">
                        @foreach ($topFavoriteMovies->take(5) as $movie)
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            {{ $movie->movie_name }}
                            <span class="badge badge-primary badge-pill">{{ $movie->total_favorites }}</span>
                        </li>
                        @endforeach
                    </ul>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
                    </div>
                </div>
            </div>
        </div>

        {{-- Phim được xem nhiều --}}
        <div class="col-lg-4 col-md-6">
            <div class="card card-chart"
                style="min-height: 400px; max-height:600px; display: flex; flex-direction: column; justify-content: space-between;">
                <div class="card-header">
                    <h5 class="card-category">Tổng số lượt xem: {{ number_format($totalViews) }}</h5>
                    <h4 class="card-title">Phim được xem nhiều</h4>
                    <div class="dropdown">
                        <button type="button"
                            class="btn btn-round btn-outline-default dropdown-toggle btn-simple btn-icon no-caret"
                            data-toggle="dropdown">
                            <i class="now-ui-icons loader_gear"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <a class="dropdown-item text-danger" href="#">Remove Data</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-group mt-3">
                        @foreach ($topViewedMovies as $movie)
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            {{ $movie->movie_name }}
                            <span class="badge badge-info badge-pill">{{ $movie->total_views }}</span>
                        </li>
                        @endforeach
                    </ul>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4 col-md-6">
            <div class="card card-chart"
                style="min-height: 400px;max-height:600px;display: flex;flex-direction: column;justify-content: space-between;">
                <div class="card-header">
                    <h5 class="card-category">Tổng người dùng: {{ number_format($totalUsers) }}</h5>
                    <h4 class="card-title">Người dùng gần đây</h4>
                </div>
                <div class="card-body">
                    <ul class="list-group mt-3">
                        @foreach ($recentUsers as $user)
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{{ $user->name }}</strong><br>
                                <small>{{ $user->email }}</small>
                            </div>
                            <span
                                class="text-muted">{{ \Carbon\Carbon::parse($user->created_at)->diffForHumans() }}</span>
                        </li>
                        @endforeach
                    </ul>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="card card-tasks">
                <div class="card-header">
                    <h5 class="card-category">Báo cáo công việc</h5>
                    <h4 class="card-title">Công việc</h4>
                </div>
                <div class="card-body">
                    <div class="table-full-width table-responsive">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td colspan="3" class="text-center text-muted">
                                        <em><i class="now-ui-icons loader_refresh spin"></i> Đang cập nhật...</em>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <hr>
                    <div class="stats">
                        <i class="now-ui-icons loader_refresh spin"></i> Updated 3 minutes ago
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-category">Danh Sách Người Truy Cập</h5>
                    <h4 class="card-title">Tổng Lượt Truy Cập Trong 7 Ngày</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead class="text-primary">
                                <th>Tên</th>
                                <th>Thời Gian Truy Cập</th>
                                <th class="text-right">Đăng Xuất</th>
                            </thead>
                            <tbody>
                                @foreach ($onlineUsers as $user)
                                <tr>
                                    <td>{{ $user['name'] }}</td>
                                    <td>{{ $user['start'] }}</td>
                                    <td class="text-right">{{ $user['close'] }}</td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script>
document.addEventListener('DOMContentLoaded', function() {
    // Lấy dữ liệu từ backend
    const movieView = @json($movieView);

    // Kiểm tra dữ liệu
    console.log("Dữ liệu từ backend:", movieView);

    // Tách labels và data
    const labels = movieView.map(item => item.view_date);
    const data = movieView.map(item => item.total_views);

    console.log("Labels:", labels);
    console.log("Data:", data);

    // Bắt đầu tạo biểu đồ
    var ctx0 = document.getElementById('bigDashboardChart1').getContext('2d');
    var gradientFill = ctx0.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, 'rgba(255, 99, 132, 0.5)');
    gradientFill.addColorStop(1, 'rgba(255, 99, 132, 0)');

    new Chart(ctx0, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tổng lượt xem phim',
                data: data,
                borderColor: '#ff6384',
                backgroundColor: gradientFill,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ff6384',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ff6384'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#fff'
                    }
                },
                title: {
                    display: true,
                    text: 'Tổng Lượt Xem Phim Theo Tháng',
                    color: '#fff',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
});
</script>
@endsection