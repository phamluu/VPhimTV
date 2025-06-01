export default function UserProfilePage() {
  return (
    <>
      {/* Hero section */}
      <div className="rounded-xl bg-base-100 shadow flex border border-neutral-content/10">
        <div className="avatar m-6">
          <div className="w-32 rounded-full border-6 border-neutral-content/10">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
          <span
            className={`absolute bottom-0 right-0 bg-base-300 p-2 w-10 h-10 flex items-center justify-center rounded-full`}
          >
            <i className="fa-regular fa-camera"></i>
          </span>
        </div>

        <div className="m-6 space-y-4">
          <p className="text-3xl font-bold">Nguyễn Văn A</p>
          <p>Yêu thích phim hành động và khoa học viễn tưởng</p>
          <span className="rounded-xl bg-base-content/10 p-3">
            <i className="fa-regular fa-calendar-week"></i>
            <span className="ms-3">Tham gia 01/01/2023</span>
          </span>
        </div>
      </div>

      {/* Statics section */}
      <div className="flex gap-6">
        {/* Movie watched */}
        <div className="flex flex-1/3 rounded-xl bg-base-100 shadow p-6 border border-neutral-content/10 items-center justify-between">
          <div>
            <p className="text-base-content/60">Phim đã xem</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="text-4xl bg-base-content/10 p-3 rounded-2xl">
            <i className="fa-regular fa-film"></i>
          </div>
        </div>

        {/* Hours watched */}
        <div className="flex flex-1/3 rounded-xl bg-base-100 shadow p-6 border border-neutral-content/10 items-center justify-between">
          <div>
            <p className="text-base-content/60">Thời gian xem</p>
            <p className="text-3xl font-bold">0 giờ</p>
          </div>
          <div className="text-4xl bg-base-content/10 p-3 rounded-2xl">
            <i className="fa-regular fa-clock"></i>
          </div>
        </div>

        {/* Favorite category */}
        <div className="flex flex-1/3 rounded-xl bg-base-100 shadow p-6 border border-neutral-content/10 items-center justify-between">
          <div>
            <p className="text-base-content/60">Thể loại yêu thích</p>
            <p className="text-3xl font-bold">Hành động</p>
          </div>
          <div className="text-4xl bg-base-content/10 p-3 rounded-2xl">
            <i className="fa-regular fa-award-simple"></i>
          </div>
        </div>
      </div>

      {/* Recent section */}
      <div className="rounded-xl bg-base-100 shadow border border-neutral-content/10 p-6">
        <p className="text-2xl font-bold">Hoạt động gần đây</p>

        <div className="space-y-6 mt-6">
          <div className="flex items-center gap-4 p-4 bg-base-content/10 rounded-xl border-l-4 border-success">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">
                Hoàn thành xem <span>Avatar: The Way of Water</span>
              </p>
              <p className="text-sm text-base-content/60">2 giờ trước</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-base-content/10 rounded-xl border-l-4 border-info">
            <div className="w-3 h-3 bg-info rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">
                Đang xem <span>Avatar: The Way of Water</span>
              </p>
              <p className="text-sm text-base-content/60">2 giờ trước</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-base-content/10 rounded-xl border-l-4 border-primary">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">
                Thêm vào yêu thích <span>Avatar: The Way of Water</span>
              </p>
              <p className="text-sm text-base-content/60">2 giờ trước</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
