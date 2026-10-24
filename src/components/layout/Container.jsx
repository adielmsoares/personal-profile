import { cn } from '../../utils/cn';

export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('mx-auto px-5 sm:px-8 lg:px-10 w-full max-w-7xl', className)} {...rest}>
      {children}
    </Tag>
  );
}
