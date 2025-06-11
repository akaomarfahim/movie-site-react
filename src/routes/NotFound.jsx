import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFoundScreen() {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn’t exist.</p>
      <Link to="/" className="notfound-link">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFoundScreen;
