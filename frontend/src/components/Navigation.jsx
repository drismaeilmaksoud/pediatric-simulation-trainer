import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🏥 Pediatric Simulator
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cases">Cases</Link></li>
          <li><Link to="/upload">Upload Scenario</Link></li>
          <li><Link to="/progress">My Progress</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
