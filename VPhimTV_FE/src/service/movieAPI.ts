import axios from "axios";

const MOVIE_API = import.meta.env.VITE_MOVIE_API;

export enum MovieType {
    PhimBo = 'phim-bo',
    PhimLe = 'phim-le',
    TVShows = 'tv-shows',
    HoatHinh = 'hoat-hinh',
    PhimVietSub = 'phim-vietsub',
    PhimThuyetMinh = 'phim-thuyet-minh',
    PhimLongTieng = 'phim-long-tieng',
}

export enum MovieTypeMap {
    'phim-moi' = 'Phim Mới',
    'phim-bo' = 'Phim Bộ',
    'phim-le' = 'Phim Lẻ',
    'tv-shows' = 'TV Shows',
    'hoat-hinh' = 'Hoạt Hình',
    'phim-vietsub' = 'Phim VietSub',
    'phim-thuyet-minh' = 'Phim Thuyết Minh',
    'phim-long-tieng' = 'Phim Lồng Tiếng',
}

export async function fetchNewMovies(page = 1, limit = 12, paging = false) {
    const url = `${MOVIE_API}/danh-sach/phim-moi-cap-nhat-v3?page=${page}&limit=${limit}`;
    try {
        const result = await axios.get(url);
        const items = result.data.items || [];

        if (paging) return {
            items: items.slice(0, limit),
            totalPages: result.data.pagination.totalPages,
        };

        return items.slice(0, limit);
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export enum SortTypeEnum {
    desc = 'desc',
    asc = 'asc',
}

export enum SortLangEnum {
    vietsub = 'vietsub',
    thuyetMinh = 'thuyet-minh',
    longTieng = 'long-tieng',
}

interface fetchMoviesParams {
    type: MovieType;
    page?: number;
    limit?: number;
    sort_field?: string;
    sort_type?: SortTypeEnum;
    sort_lang?: SortLangEnum;
    category?: string;
    country?: string;
    year?: string;
}

export async function fetchMovies(params: fetchMoviesParams, paging = false) {
    const { type, ...rest } = params;
    const searchParams = new URLSearchParams();

    Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });

    const url = `${MOVIE_API}/v1/api/danh-sach/${type}?${searchParams.toString()}`;

    try {
        const result = await axios.get(url);

        const items = result.data.data.items.map((item: any) => ({
            ...item,
            thumb_url: `${result.data.data.APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
            poster_url: `${result.data.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
        }));

        if (paging) {
            return {
                items,
                totalPages: result.data.data.params.pagination.totalPages,
            };
        }

        return items;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export async function fetchMovieInfo(slug: string) {
    const url = `${MOVIE_API}/phim/${slug}`;

    try {
        const result = await axios.get(url);
        return result.data;
    } catch (error) {
        console.error('Error fetching movie info:', error);
        throw error;
    }
}

interface SearchMoviesParams extends Omit<fetchMoviesParams, 'type'> {
    keyword: string;
}

export async function fetchSearchMovies(params: SearchMoviesParams, paging = false) {
    const { ...rest } = params;

    const searchParams = new URLSearchParams();

    Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });

    const url = `${MOVIE_API}/v1/api/tim-kiem?${searchParams.toString()}`;

    console.log('url', url);

    try {
        const result = await axios.get(url);

        const items = result.data.data.items.map((item: any) => ({
            ...item,
            thumb_url: `${result.data.data.APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
            poster_url: `${result.data.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
        }));

        if (paging)
            return {
                items,
                totalPages: result.data.data.params.pagination.totalPages,
            };
        return items;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export async function fetchCategory() {
    const url = `${MOVIE_API}/the-loai`;

    try {
        const result = await axios.get(url);
        return result.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export async function fetchCountry() {
    const url = `${MOVIE_API}/quoc-gia`;

    try {
        const result = await axios.get(url);
        return result.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }

}
