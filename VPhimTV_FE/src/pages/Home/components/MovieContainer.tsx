import { Link } from 'react-router-dom';

import MovieCard from '~/components/MovieCard';
import { gridClassMap } from '~/utils/classMap';

interface MovieContainerProps {
  title?: string;
  linkTo?: string;
  className?: string;
  movies: any[];
  placeholderCount?: number;
  primary?: boolean;
  grid?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  imageType?: 'thumb' | 'poster';
}

export default function MovieContainer({
  title,
  linkTo = '/',
  className,
  movies,
  placeholderCount,
  primary = true,
  grid = 5,
  imageType = 'thumb',
}: MovieContainerProps) {
  const placeholders = Array.from({ length: placeholderCount || 12 });
  const isLoading = movies.length === 0;

  return (
    <div className={className}>
      {title && (
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-primary">{title}</p>
          <Link className="btn btn-ghost btn-primary" to={linkTo}>
            Xem Tất Cả ▶
          </Link>
        </div>
      )}

      <div className={`grid ${gridClassMap[grid]} gap-4`}>
        {(isLoading ? placeholders : movies).map((movie: any, i) => (
          <MovieCard
            key={isLoading ? i : movie._id}
            className={`${primary && i === 0 ? 'col-span-2 row-span-2' : ''} ${
              imageType === 'thumb'
                ? primary && i === 0
                  ? 'max-h-[290px]'
                  : 'max-h-[137px]'
                : ''
            }`}
            status={
              isLoading ? '' : `${movie.episode_current} | ${movie.language}`
            }
            title={isLoading ? '' : movie.name}
            image={
              isLoading
                ? ''
                : imageType === 'thumb'
                ? movie?.thumb_url
                : movie?.poster_url
            }
            linkTo={isLoading ? '' : `/info/${movie.slug}`}
            primary={primary && i === 0}
          />
        ))}
      </div>
    </div>
  );
}
