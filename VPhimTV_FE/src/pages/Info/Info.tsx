export default function Info() {
    return (
        <div className="container mx-auto space-y-8 max-w-4xl">
            <div className="bg-base-100 rounded relative">
                <div className="breadcrumbs text-sm p-3">
                    <ul>
                        <li className="text-primary space-x-2">
                            <i className="fa-regular fa-house"></i>
                            <a> Xem phim</a>
                        </li>
                        <li className="text-primary">
                            <a>Phim Chiếu Rạp</a>
                        </li>
                        <li className="text-primary">
                            <a>Phim lẻ</a>
                        </li>
                        <li>Mật vụ triệu đô</li>
                    </ul>
                </div>

                <img className=" brightness-75"
                    src="https://phimmoichill.moi/wp-content/uploads/2025/04/mat-vu-phu-ho-15810-poster.webp"
                />

                <div className="absolute bottom-4 left-4 z-10 flex space-x-4">
                    <img
                        src="https://phimmoichill.moi/wp-content/uploads/2025/04/mat-vu-phu-ho-15810-poster.webp"
                        className="w-[250px] object-cover border"
                    />

                    <div className="space-y-3">
                        <p className="text-3xl shadow">Mật vụ phụ hồ</p>
                        <p className="text-2xl font-bold shadow">A Working Man (2025)</p>
                        <div className="flex gap-4">
                            <button className="btn btn-info w-32 font-bold">
                                <i className="fa-brands fa-youtube"></i>
                                Trailer
                            </button>
                            <button className="btn btn-error w-32 font-bold">
                                <i className="fa-regular fa-circle-play"></i>
                                Xem phim
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
