import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="container mx-auto space-y-8">
            <div className="space-y-3">
                <p className="text-2xl font-bold text-primary">Phim đề cử</p>

                <Splide
                    options={{
                        perPage: 5,
                        gap: '1rem',
                        pagination: false,
                        arrows: true,
                        autoplay: true,
                        interval: 6000,
                        type: 'loop',
                        breakpoints: {
                            1024: { perPage: 3 },
                            640: { perPage: 2 },
                        },
                    }}>

                    {Array.from({ length: 10 }).map((_, i) => (
                        <SplideSlide key={i}>
                            <div className="shadow relative">
                                <p className="absolute top-0 left-0 text-xs text-white bg-gradient-to-r from-red-600 to-yellow-400 px-2 py-0.5 rounded">
                                    Full | Vietsub + Lồng Tiếng
                                </p>

                                <img
                                    src="https://oamarense.com/wp-content/uploads/2025/04/404-chay-ngay-di-15356-poster.webp"
                                    alt="Poster phim"
                                    className="w-full"
                                />
                                <p className="absolute bottom-0 left-0 p-2 bg-base-300/75 w-full">
                                    404 - Chạy ngay đi - {i}
                                </p>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>

            <div className="space-y-3">
                <div className='flex justify-between items-center'>
                    <p className="text-2xl font-bold text-primary">Phim Mới Cập Nhật</p>
                    <Link className='btn btn-ghost btn-primary' to={'/'}>Xem Tất Cả ▶</Link>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className={`relative shadow ${i === 0 ? 'col-span-2 row-span-2' : ''
                                }`}
                        >
                            <p className={`absolute top-0 left-0 ${i !== 0 ? 'text-xs' : ""} text-white bg-gradient-to-r from-red-600 to-yellow-400 px-2 py-0.5 rounded`}>
                                Tập {i + 1} | Vietsub Full HD
                            </p>

                            <img
                                src={'/src/assets/imgs/anh-mau.webp'}
                                alt="Poster phim"
                                className="w-full h-full object-cover"
                            />

                            <p className="absolute bottom-0 left-0 p-2 bg-black/60 text-white w-full text-sm truncate">
                                Phim số {i + 1}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <div className='flex justify-between items-center'>
                    <p className="text-2xl font-bold text-primary">Phim Chiếu Rạp</p>
                    <Link className='btn btn-ghost btn-primary' to={'/'}>Xem Tất Cả ▶</Link>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className={`relative shadow ${i === 0 ? 'col-span-2 row-span-2' : ''
                                }`}
                        >
                            <p className={`absolute top-0 left-0 ${i !== 0 ? 'text-xs' : ""} text-white bg-gradient-to-r from-red-600 to-yellow-400 px-2 py-0.5 rounded`}>
                                Tập {i + 1} | Vietsub Full HD
                            </p>

                            <img
                                src="https://oamarense.com/wp-content/uploads/2025/04/hoa-than-16046-poster.webp"
                                alt="Poster phim"
                                className="w-full h-full object-cover"
                            />

                            <p className="absolute bottom-0 left-0 p-2 bg-black/60 text-white w-full text-sm truncate">
                                Phim số {i + 1}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <div className='flex justify-between items-center'>
                    <p className="text-2xl font-bold text-primary">Phim Hàn Quốc Mới</p>
                    <Link className='btn btn-ghost btn-primary' to={'/'}>Xem Tất Cả ▶</Link>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className={`relative shadow ${i === 0 ? 'col-span-2 row-span-2' : ''
                                }`}
                        >
                            <p className={`absolute top-0 left-0 ${i !== 0 ? 'text-xs' : ""} text-white bg-gradient-to-r from-red-600 to-yellow-400 px-2 py-0.5 rounded`}>
                                Tập {i + 1} | Vietsub Full HD
                            </p>

                            <img
                                src="https://oamarense.com/wp-content/uploads/2024/11/quy-co-seon-ju-phuc-thu-9628-poster.webp"
                                alt="Poster phim"
                                className="w-full h-full object-cover"
                            />

                            <p className="absolute bottom-0 left-0 p-2 bg-black/60 text-white w-full text-sm truncate">
                                Phim số {i + 1}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
