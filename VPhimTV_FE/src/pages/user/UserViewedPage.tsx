export default function UserViewedPage() {
  return (
    <div className="rounded-xl bg-base-100 shadow border border-neutral-content/10 p-6 space-y-6 min-h-[460px]">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">Lịch sử xem gần đây</p>

        <button className="btn btn-soft rounded-xl">
          <i className="fa-regular fa-trash-can"></i>
          Xoá tất cả
        </button>
      </div>

      <div className="rounded-xl bg-base-200 shadow border border-neutral-content/10 p-4">
        <div className="flex gap-6">
          <img
            loading="lazy"
            src="https://phimimg.com/upload/vod/20250509-1/7e82c6b133e7e7a751dab9f6b341c4ff.jpg"
            className="w-30"
          />

          <div className="w-full space-y-3">
            <p className="font-bold text-xl">Avatar: The Way of Water</p>

            <div className="flex items-center gap-4 text-base-content/60">
              <p className="rounded-xl bg-base-content/10 p-2">Thời lượng: 3h 10p</p>
              <p className="rounded-xl bg-base-content/10 p-2">Lần cuối xem: 2 tiếng trước</p>
            </div>

            <div className="flex items-center gap-4">
              <progress className="progress"></progress>
              <span>0%</span>
            </div>

            <div className="flex items-center justify-between">
              <button className="btn btn-soft w-32 rounded-xl">
                <i className="fa-regular fa-play"></i>
                Xem tiếp
              </button>

              <button className="btn btn-soft w-32 rounded-xl">
                <i className="fa-regular fa-trash-can"></i>
                Xoá lịch sử
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
