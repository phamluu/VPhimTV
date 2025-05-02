const movieInfoCache = new Map<string, any>();

export function setMovieCache(slug: string, data: any) {
    movieInfoCache.set(slug, data);
}

export function getMovieCache(slug: string) {
    return movieInfoCache.get(slug);
}
