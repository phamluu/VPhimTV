interface LoadingProps {
  className?: string;
  type?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Loading({ className, size, type = 'spinner' }: LoadingProps) {
  const sizeClassMap = {
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
    xl: 'loading-xl',
  };

  const typeClassMap = {
    spinner: 'loading-spinner',
    dots: 'loading-dots',
    ring: 'loading-ring',
    ball: 'loading-ball',
    bars: 'loading-bars',
    infinity: 'loading-infinity',
  };

  return (
    <div className={`w-full ${className}`}>
      <p className="text font-bold text-2xl text-center">Đang tải</p>
      <div className="flex items-center justify-center gap-2">
        <span className={`loading ${size ? sizeClassMap[size] : ''} ${typeClassMap[type]}`}></span>
        <span className={`loading ${size ? sizeClassMap[size] : ''} ${typeClassMap[type]}`}></span>
        <span className={`loading ${size ? sizeClassMap[size] : ''} ${typeClassMap[type]}`}></span>
        <span className={`loading ${size ? sizeClassMap[size] : ''} ${typeClassMap[type]}`}></span>
        <span className={`loading ${size ? sizeClassMap[size] : ''} ${typeClassMap[type]}`}></span>
      </div>
    </div>
  );
}
