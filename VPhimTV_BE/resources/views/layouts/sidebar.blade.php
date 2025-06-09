<div class="sidebar" data-color="orange">
    <div class="logo">
        <a href="/" class="simple-text logo-mini">
            V
        </a>
        <a href="/" class="simple-text logo-normal">
            Phim TV
        </a>
    </div>
    <div class="sidebar-wrapper" id="sidebar-wrapper">
        <ul class="nav">
            @if (Auth::check() && Auth::user()->hasRole('admin'))
            <li class="{{ request()->is('dashboard') ? 'active' : '' }}">
                <a href="/">
                    <i class="now-ui-icons design_app"></i>
                    <p>Dashboard</p>
                </a>
            </li>
            <li class="{{ request()->routeIs('menu.index') ? 'active' : '' }}">
                <a href="{{ route('menu.index') }}">
                    <i class="now-ui-icons education_atom"></i>
                    <p>Menu</p>
                </a>
            </li>
            <li class="{{ request()->routeIs('country.index') ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('country.index') }}">
                    <i class="now-ui-icons text_caps-small"></i>
                    <p>Quốc gia</p>
                </a>
            </li>
            <li class="{{ request()->routeIs('category.index') ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('category.index') }}">
                    <i class="now-ui-icons text_caps-small"></i>
                    <p>Danh mục phim</p>
                </a>
            </li>
            <li class="{{ request()->routeIs('movietype.index') ? 'active' : '' }}">
                <a href="{{ route('movietype.index') }}">
                    <i class="now-ui-icons location_map-big"></i>
                    <p>Thể loại</p>
                </a>
            </li>

            <li>
            <li class="{{ request()->routeIs('episode.index') ? 'active' : '' }}">
                <a href="{{ route('episode.index') }}">
                    <i class="now-ui-icons location_map-big"></i>
                    <p>Tập phim</p>
                </a>
            </li>
            <li>
            <li class="{{ request()->routeIs('movie.index') ? 'active' : '' }}">
                <a href="{{ route('movie.index') }}">
                    <i class="now-ui-icons design_bullet-list-67"></i>
                    <p>Phim</p>
                </a>
            </li>
            <li class="{{ request()->routeIs('movie_comments.*') ? 'active' : '' }}">
                <a href="{{ route('movie_comments.index') }}">
                    <i class="fa-light fa-comment"></i>
                    <p>Quản lý bình luận</p>
                </a>
            </li>
            <li class="{{ request()->is('admin/user') ? 'active' : '' }}">
                <a href="/user">
                    <i class="now-ui-icons users_single-02"></i>
                    <p>Người dùng</p>
                </a>
            </li>

            <li class="{{ request()->is('upgrade.html') ? 'active' : '' }}">
                <a href="./upgrade.html">
                    <i class="now-ui-icons arrows-1_cloud-download-93"></i>
                    <p>Báo cáo thống kê</p>
                </a>
            </li>
            @endif
        </ul>
    </div>
</div>