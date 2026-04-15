import { Link, Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function Layout() {
  return (
    <div className="h-[100dvh] flex flex-col">
      <header className="flex flex-col justify-center w-full h-12 bg-pink-100 px-6">
        <Link to="/">
          <span className="font-bold">💪🏻 Component challenge</span>
        </Link>
      </header>
      <div className="flex flex-1 min-h-0">
        <aside className="bg-blue-300 w-52 shrink-0">
          <Nav />
        </aside>
        <main className="bg-yellow-300 flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
      <footer className="bg-purple-300 h-10 flex items-center justify-center">
        footer
      </footer>
    </div>
  );
}
