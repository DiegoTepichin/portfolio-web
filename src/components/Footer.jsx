export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        borderTop: '1px solid rgba(250, 247, 242, 0.06)',
        background: 'rgba(28, 25, 23, 0.4)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ash">&copy; {new Date().getFullYear()} Diego Tepichin</p>
        <p className="text-xs text-ash/60" style={{ fontFamily: 'var(--font-mono)' }}>
          React · Vite · Tailwind
        </p>
      </div>
    </footer>
  );
}
