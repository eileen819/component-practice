import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="p-5">
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="modal">
          <li>Day 01. Modal</li>
        </Link>
      </ul>
    </nav>
  );
}
