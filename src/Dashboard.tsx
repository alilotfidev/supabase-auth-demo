import { useAuth } from "./context/AuthContext";
import * as authService from "./services/authService";

export default function Dashboard() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.email} 👋</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
