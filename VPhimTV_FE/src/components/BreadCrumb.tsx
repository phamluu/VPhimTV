import { JSX } from 'react';
import { Link } from 'react-router-dom';

interface BreadCrumbItemProps {
  label: string;
  href?: string;
  className?: string;
  iconElement?: JSX.Element;
}

interface BreadCrumbProps {
  items: BreadCrumbItemProps[];
  className?: string;
}

export default function BreadCrumb({ items, className }: BreadCrumbProps) {
  return (
    <div className={`breadcrumbs ${className}`}>
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            className={`${item.className} ${item.href ? 'text-primary' : ''}`}
          >
            {item.iconElement && item.iconElement}
            {item.href ? <Link to={item.href}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
