import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div id="nav">
      <Link to="/" className="link">
        Intro Page
      </Link>
      <Link to="/test" className="link">
        Participate
      </Link>
      <Link to="/results" className="link">
        Results
      </Link>
    </div>
  );
}
