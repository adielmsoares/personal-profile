import { useReveal } from '../../hooks/useReveal';

/** Revelação discreta ao rolar (fade + translateY). Conteúdo visível sem JS e com movimento reduzido. */
export function Reveal({ as: Tag = 'div', delay = 0, style, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} data-reveal="" style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style} {...rest}>
      {children}
    </Tag>
  );
}
