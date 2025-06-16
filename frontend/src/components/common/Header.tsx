export function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">SAFC Scheduler</h1>
        <nav className="space-x-4">
          <a href="/" className="text-sm font-medium hover:underline">
            Home
          </a>
          <a href="/about" className="text-sm font-medium hover:underline">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
