import { useEffect, useRef } from 'react';

// A trailing dot that swells into a label over elements carrying data-cursor.
// The native cursor stays visible; this is decoration for fine pointers only.
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !matchMedia('(hover: hover) and (pointer: fine)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...target };
    let frame = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const settled = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const move = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      el.dataset.ready = 'true';
      const label = event.target.closest?.('[data-cursor]')?.dataset.cursor ?? '';
      if (el.dataset.label !== label) {
        el.dataset.label = label;
        el.firstChild.textContent = label;
      }
      frame ||= requestAnimationFrame(tick);
    };
    const hide = () => {
      delete el.dataset.ready;
    };

    addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    return () => {
      removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span />
    </div>
  );
}
