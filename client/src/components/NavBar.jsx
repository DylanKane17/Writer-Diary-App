import { useAuth } from "../firebase/AuthContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { loading, currentUser } = useAuth();

  return (
    <header class="bg-indigo-950 py-3 shadow-2xl">
      <nav class="px-5 flex flex-row justify-left items-center gap-8 tracking-wide text-white">
        {loading ? null : currentUser ? (
          <>
            <Link to="/new-project">New Project</Link>
            <Link to="/">Projects</Link>
            <Link to="/settings">Settings</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
