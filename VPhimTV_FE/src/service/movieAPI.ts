import axios from "axios";

const MOVIE_API = import.meta.env.VITE_MOVIE_API;

export enum MovieType {
    PhimBo = 'phim-bo',
    PhimLe = 'phim-le',
    TVShow = 'tv-show',
    HoatHinh = 'hoat-hinh',
    PhimVietSub = 'phim-vietsub',
    PhimThuyetMinh = 'phim-thuyet-minh',
    PhimLongTieng = 'phim-long-tieng',
}

export async function fetchNewMovies(page = 1, limit = 12) {
    const url = `${MOVIE_API}/danh-sach/phim-moi-cap-nhat-v3?page=${page}&limit=${limit}`;
    try {
        const result = await axios.get(url);
        const items = result.data.items || [];
        return items.slice(0, limit);
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

interface fetchMoviesParams {
    type: MovieType;
    page?: number;
    limit?: number;
    sort_field?: string;
    sort_type?: 'desc' | 'asc';
    sort_lang?: 'vietsub' | 'thuyet-minh' | 'long-tieng';
    category?: string;
    country?: string;
    year?: string;
}

export async function fetchMovies(params: fetchMoviesParams) {
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

export async function fetchSearchMovies(params: SearchMoviesParams) {
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

        return [items, result.data.data.params.pagination.totalPages];
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}
