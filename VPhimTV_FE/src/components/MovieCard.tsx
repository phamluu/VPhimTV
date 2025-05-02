interface MovieCardProps {
  status: string;
  title: string;
  image: string;
  className?: string;
  primary?: boolean;
  placeholder?: boolean;
}

export default function MovieCard({
  status,
  title,
  image,
  className,
  primary,
  placeholder,
}: MovieCardProps) {
  return (
    <div
      className={`shadow relative ${className} ${
        primary ? 'col-span-2 row-span-2' : ''
      } ${placeholder ? 'skeleton' : ''}`}
    >
      {placeholder ? (
        <img src="/src/assets/imgs/anh-mau.webp" className="opacity-0" />
      ) : (
        <>
          <p
            className={`absolute top-0 left-0 ${
              primary ? '' : 'text-xs'
            } text-white bg-gradient-to-r from-red-600 to-yellow-400 px-2 py-0.5 rounded-br-md`}
          >
            {status}
          </p>

          <img src={image} alt={title} className="w-full h-full object-cover" />
          <p className="absolute bottom-0 left-0 p-2 bg-base-300/75 w-full text-sm truncate">
            {title}
          </p>
        </>
      )}
    </div>
  );
}
