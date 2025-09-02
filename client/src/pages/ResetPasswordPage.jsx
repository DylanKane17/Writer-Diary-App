import { useAuth } from "../firebase/AuthContext";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const [responseMessage, setResponseMessage] = useState("");
  const { sendPasswordReset } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    sendPasswordReset(email).then((status) => {
      console.log(status);
      setResponseMessage(status);
    });
    console.log("sent!");
  }

  return (
    <main class="flex items-center justify-center h-screen">
      <section class="bg-linear-to-b from-white to-blue-100 border-2 border-gray-300 p-5 rounded-lg flex flex-col gap-2 justify-center items-center shadow-lg hover:shadow-2xl w-4/5 md:w-3/5 lg:w-1/3">
        {responseMessage ? (
          <h1>{responseMessage}</h1>
        ) : (
          <>
            <h1 class="text-2xl">Enter your email</h1>
            <h2 class="text-sm italic text-gray-500">
              You will receive a password reset link
            </h2>
            <form class="flex flex-col gap-1 w-11/12" onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                aria-label="Enter your email"
                class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
              ></input>
              <button class="w-2/3 bg-blue-200 rounded-lg p-2 mt-4 m-auto opacity-90 hover:opacity-100 hover:cursor-pointer">
                Send Link
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
