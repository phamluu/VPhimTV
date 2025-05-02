import { Link } from 'react-router-dom';

import MovieCard from '~/components/MovieCard';

interface MovieContainerProps {
  title?: string;
  className?: string;
  movies: any[];
  isLoading?: boolean;
  placeholderCount?: number;
  primary?: boolean;
}

export default function MovieContainer({
  title,
  className,
  movies,
  isLoading = false,
  placeholderCount,
  primary = true,
}: MovieContainerProps) {
  const placeholders = Array.from({ length: placeholderCount || 12 });

  return (
    <div className={className}>
      {title && (
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-primary">{title}</p>
          <Link className="btn btn-ghost btn-primary" to={'/'}>
            Xem Tất Cả ▶
          </Link>
        </div>
      )}

      <div className="grid grid-cols-5 gap-4">
        {(isLoading ? placeholders : movies).map((movie: any, i) => (
          <MovieCard
            key={isLoading ? i : movie._id}
            status={isLoading ? '' : `${movie.episode_current} | ${movie.lang}`}
            title={isLoading ? '' : movie.name}
            image={isLoading ? '' : movie.thumb_url}
            linkTo={isLoading ? '' : `/info/${movie.slug}`}
            primary={primary && i === 0}
          />
        ))}
      </div>
    </div>
  );
}
