import { useAuth } from "../firebase/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const baseUrl = "http://127.0.0.1:5000";
  const { createUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    console.log("Submitted!");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");
    if (password === password2) {
      createUser(email, password);
      useNavigate("/");
    } else {
      setErrorMessage("Passwords do not match!");
    }
  }

  return (
    <main class="flex items-center justify-center h-screen">
      <section class="border-2 border-gray-300 bg-linear-to-b from-white to-blue-100 p-5 rounded-lg flex flex-col gap-2 justify-center items-center shadow-lg hover:shadow-2xl w-4/5 md:w-3/5 lg:w-1/3">
        <h1 class="text-xl">Create an Account</h1>
        <form class="flex flex-col gap-1 w-11/12" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            aria-label="Enter your email"
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="password"
            aria-label="Enter your password"
            placeholder="Enter your password"
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
          ></input>
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            aria-label="Enter your password"
            placeholder="Enter your password"
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
          ></input>
          <button class="w-2/3 bg-indigo-200 rounded-lg p-2 mt-4 m-auto opacity-90 hover:opacity-100 hover:cursor-pointer">
            Sign Up
          </button>
        </form>
        {errorMessage && <p class="text-rose-400">{errorMessage}</p>}
      </section>
    </main>
  );
}
