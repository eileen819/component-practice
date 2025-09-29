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
        <Link to="dropDown">
          <li>Day 02. DropDown</li>
        </Link>
        <Link to="search-filter">
          <li>Day 03. Search Filter</li>
        </Link>
      </ul>
    </nav>
  );
}
