import { useAuth } from "./context/AuthContext";
import * as authService from "./services/authService";

export default function Dashboard() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
  };

  return (
    <div className="dashboard h-screen overflow-hidden flex flex-col gap-8 justify-center items-center">
      <h1 className="text-4xl font-medium">Welcome, {user?.email} 👋</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 rounded-full text-white font-semibold px-4 py-1"
      >
        Logout
      </button>
    </div>
  );
}
