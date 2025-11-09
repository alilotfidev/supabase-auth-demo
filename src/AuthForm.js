import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // check if user is already loggedin
  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsLoading(true);
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        navigate("/dashboard");
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Check your email for a confirmation link!");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading ? (
          <button type="submit" disabled={isLoading}>
            loading...
          </button>
        ) : (
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        )}
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin ? "Need an account? Sign up" : "Already have one? Log in"}
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
