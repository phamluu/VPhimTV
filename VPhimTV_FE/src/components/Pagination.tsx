export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) {
  const range: (number | string)[] = [];
  const delta = 2;

  if (totalPage <= 7) {
    for (let i = 1; i <= totalPage; i++) range.push(i);
  }

  const showLeft = currentPage <= 4;
  const showRight = currentPage >= totalPage - 3;

  if (showLeft) {
    for (let i = 1; i <= 5; i++) range.push(i);
    range.push('...');
    range.push(totalPage);
  } else if (showRight) {
    range.push(1);
    range.push('...');
    for (let i = totalPage - 4; i <= totalPage; i++) range.push(i);
  } else {
    range.push(1);
    range.push('...');
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      range.push(i);
    }
    range.push('...');
    range.push(totalPage);
  }

  return (
    <div className="w-full join justify-center flex-wrap gap-1">
      {currentPage > 1 && (
        <button
          className="join-item btn btn-soft"
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          ◀
        </button>
      )}

      {range.map((item, idx) =>
        typeof item === 'number' ? (
          <button
            key={idx}
            className={`join-item btn btn-soft ${
              item === currentPage ? 'btn-active' : ''
            }`}
            onClick={() => onPageChange?.(item)}
          >
            {item}
          </button>
        ) : (
          <button key={idx} className="join-item btn btn-soft btn-disabled">
            ...
          </button>
        ),
      )}

      {currentPage < totalPage && (
        <button
          className="join-item btn btn-soft"
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          ▶
        </button>
      )}
    </div>
  );
}
