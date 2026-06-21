export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-500 dark:text-zinc-400 text-sm mt-auto transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Diego Tepichin. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
