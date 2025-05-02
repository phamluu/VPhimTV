import { useState } from 'react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  status: string;
  title: string;
  image: string;
  linkTo?: string;
  className?: string;
  primary?: boolean;
}

export default function MovieCard({
  status,
  title,
  image,
  linkTo,
  className = '',
  primary,
}: MovieCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`shadow relative ${
        primary ? '' : 'max-h-[137px]'
      } ${className} ${primary ? 'col-span-2 row-span-2' : ''} ${
        !isLoaded ? 'skeleton' : ''
      }`}
    >
      <Link to={linkTo || ''}>
        {/* Placeholder Image */}
        {!isLoaded && (
          <div className="skeleton">
            <img
              src="/src/assets/imgs/anh-mau.webp"
              className="opacity-0 w-full h-full"
            />
          </div>
        )}

        {/* Real Image */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Status and Title */}
        {isLoaded && (
          <>
            <p
              className={`absolute top-0 left-0 ${
                primary ? '' : 'text-xs'
              } text-white bg-gradient-to-r from-red-600 to-yellow-400 px-2 py-0.5 rounded-br-md`}
            >
              {status}
            </p>
            <p className="absolute bottom-0 left-0 p-2 bg-base-300/75 w-full text-sm truncate">
              {title}
            </p>
          </>
        )}
      </Link>
    </div>
  );
}
