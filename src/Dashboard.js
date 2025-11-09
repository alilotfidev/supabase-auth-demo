import { supabase } from "./lib/supabaseClient";
import { useAuth } from "./context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user.email} 👋</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
