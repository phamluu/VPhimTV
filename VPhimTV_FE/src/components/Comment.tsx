export default function Comment() {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600 select-none">
        <span className="text-white text-xl font-bold">U</span>
      </div>
      <div className="flex-1">
        <div className="bg-base-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Lê Thanh An</span>
            <span className="text-sm text-base-content/70">23/10/2004</span>
          </div>
          <p className="mb-2 whitespace-pre-line">Phim rất hay, rất đáng xem</p>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-sm hover:bg-gray-500 rounded-2xl">Phản hồi</button>
          </div>
        </div>
      </div>
    </div>
  );
}
