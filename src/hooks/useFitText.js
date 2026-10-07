import { useLayoutEffect, useRef } from 'react';

// Exposes, as --fit, the font-size at which an element's text spans its parent's width exactly.
// CSS decides how to use it (and may clamp it), so measuring stays stable either way.
export function useFitText(deps = []) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return undefined;

    const fit = () => {
      const size = parseFloat(getComputedStyle(el).fontSize);
      const width = el.getBoundingClientRect().width;
      if (width > 0) el.style.setProperty('--fit', `${(size * box.clientWidth) / width}px`);
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
