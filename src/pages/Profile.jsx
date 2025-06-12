import { FaUserCircle, FaHeart, FaFilm, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" className="profile-avatar" />
          ) : (
            <FaUserCircle className="profile-avatar-icon" />
          )}
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <p>{user.bio}</p>
        </div>

        <div className="profile-section">
          <h3>
            <FaHeart className="icon" /> Favorite Movies
          </h3>
          <ul>
            {user.favoriteGenres.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>

        <div className="profile-section">
          <h3>
            <FaFilm className="icon" /> Watchlist
          </h3>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="" style={{ color: "#FFFFFF" }} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
