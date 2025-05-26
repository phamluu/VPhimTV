import { Award, Bell, Calendar, Camera, Clock, Film, Heart, LogOut, Play, Star, Trash2, User } from 'lucide-react';
import { useState } from 'react';

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const userData = {
    name: 'xin chào các bạn',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '15/03/2023',
    watchTime: '156 giờ',
    moviesWatched: 89,
    favoriteGenre: 'Hành động',
    bio: 'Yêu thích phim hành động và khoa học viễn tưởng 🎬',
  };

  const watchedMovies = [
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      progress: 100,
      duration: '3h 12m',
      watchedAt: '2 giờ trước',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=200&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Top Gun: Maverick',
      progress: 75,
      duration: '2h 10m',
      watchedAt: '1 ngày trước',
      image: 'https://images.unsplash.com/photo-1489599732986-0e71235ca0a0?w=200&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'The Batman',
      progress: 45,
      duration: '2h 56m',
      watchedAt: '3 ngày trước',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop'
    }
  ];

  const favoriteMovies = [
    {
      id: 1,
      title: 'Avengers: Endgame',
      rating: 8.4,
      year: 2019,
      image: 'https://images.unsplash.com/photo-1635863138275-d9864d6facd9?w=200&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Inception',
      rating: 8.8,
      year: 2010,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Interstellar',
      rating: 8.6,
      year: 2014,
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=200&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'The Dark Knight',
      rating: 9.0,
      year: 2008,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop'
    }
  ];

  const tabs = [
    { id: 'profile', name: 'Hồ sơ', icon: User },
    { id: 'history', name: 'Lịch sử xem', icon: Clock },
    { id: 'favorites', name: 'Yêu thích', icon: Heart }
  ];

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      alert('Đã đăng xuất thành công!');
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gray-800 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gray-700 p-1 border border-gray-600">
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
              <p className="text-gray-400 text-lg mb-4">{userData.bio}</p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full border border-gray-600">
                  <Calendar className="w-4 h-4" />
                  Tham gia {userData.joinDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Phim đã xem</p>
              <p className="text-3xl font-bold">{userData.moviesWatched}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-2xl">
              <Film className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Thời gian xem</p>
              <p className="text-3xl font-bold">{userData.watchTime}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-2xl">
              <Clock className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Thể loại yêu thích</p>
              <p className="text-2xl font-bold">{userData.favoriteGenre}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-2xl">
              <Award className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Hoạt động gần đây</h2>
          <div className="bg-gray-700 p-2 rounded-lg">
            <Bell className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl border-l-4">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">Hoàn thành xem <span>Avatar: The Way of Water</span></p>
              <p className="text-sm text-gray-400">2 giờ trước</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl border-l-4">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">Đang xem <span>Top Gun: Maverick</span></p>
              <p className="text-sm text-gray-400">1 ngày trước</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl border-l-4">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">Thêm vào yêu thích <span>The Batman</span></p>
              <p className="text-sm text-gray-400">3 ngày trước</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Lịch sử xem gần đây</h3>
          <button className="bg-gray-700 px-4 py-2 rounded-xl hover:bg-gray-600 transition-all duration-300 flex items-center gap-2 border border-gray-600">
            <Trash2 className="w-4 h-4" />
            Xóa tất cả
          </button>
        </div>

        <div className="space-y-4">
          {watchedMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-900 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-700">
              <div className="flex items-center gap-6">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded-xl shadow-md"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">{movie.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="bg-gray-700 px-3 py-1 rounded-full">{movie.duration}</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">{movie.watchedAt}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gray-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${movie.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-400">{movie.progress}%</span>
                  </div>

                  <button className="bg-gray-700 px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Tiếp tục xem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFavoritesTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Phim yêu thích</h3>
          <div className="bg-gray-700 px-4 py-2 rounded-xl font-medium border border-gray-600">
            {favoriteMovies.length} phim
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="group bg-gray-900 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700">
              <div className="relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 left-3 bg-gray-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {movie.rating}
                </div>
                <div className="absolute top-3 right-3">
                  <button className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-all duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-transparent group-hover:bg-gray-900/40 transition-all duration-300 flex items-center justify-center">
                  <button className="bg-gray-800 px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 font-medium border border-gray-600">
                    <Play className="w-4 h-4" />
                    Xem ngay
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold mb-1 line-clamp-2">{movie.title}</h4>
                <p className="text-sm text-gray-400">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'history':
        return renderHistoryTab();
      case 'favorites':
        return renderFavoritesTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <div className="bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-700">
              <div className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gray-700 shadow-lg'
                          : 'text-gray-400 hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="lg:w-80">
            <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hidden lg:block sticky top-8">
              <div className="p-6">
                <div className="text-center mb-8">
                  <img
                    src={userData.avatar}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg border-2 border-gray-600"
                  />
                  <h3 className="font-bold text-lg">{userData.name}</h3>
                  <p className="text-gray-400 text-sm">{userData.bio}</p>
                </div>

                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'bg-gray-700 shadow-lg'
                            : 'text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-700 px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
