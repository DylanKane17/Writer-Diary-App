import { useAuth } from "../firebase/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function LoginPage() {
  const baseUrl = "http://127.0.0.1:5000";
  const { userLoggedIn, loading, signIn } = useAuth();

  function handleSubmit(event) {
    console.log("Submitted!");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!userLoggedIn) {
      signIn(email, password);
      return <Navigate to="/" />;
    } else {
      console.log("Already signed in");
    }
  }

  return (
    <main class="flex items-center justify-center h-screen">
      {loading ? (
        <p>loading...</p>
      ) : userLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <section class="bg-linear-to-b from-white to-blue-100 border-2 border-gray-300 p-5 rounded-lg flex flex-col gap-2 justify-center items-center shadow-lg hover:shadow-2xl w-4/5 md:w-3/5 lg:w-1/3">
          <h1 class="text-2xl">Login</h1>
          <form class="flex flex-col gap-1 w-11/12" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              aria-label="Enter your email"
              class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
            ></input>
            <div class="flex justify-between items-center">
              <label>Password</label>
              <Link
                to="/reset_password"
                class="text-md text-blue-500 hover:cursor-pointer hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              aria-label="Enter your password"
              placeholder="Enter your password"
              class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
            ></input>
            <button class="w-2/3 bg-indigo-200 rounded-lg p-2 mt-4 m-auto opacity-90 hover:opacity-100 hover:cursor-pointer">
              Login
            </button>
            <p class="m-auto mt-2">
              Don't Have an Account?{" "}
              <Link
                to="/signup"
                class="text-blue-500 hover:cursor-pointer hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </section>
      )}
    </main>
  );
}
