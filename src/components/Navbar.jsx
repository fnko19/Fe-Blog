import Link from "next/link";

const Navbar = () => {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link href="/" className="brand-name">
            SenpaiSays
          </Link>
        </div>
        <div className="navbar-links">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/login" className="nav-link">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
