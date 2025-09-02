import { useAuth } from "../firebase/AuthContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { signUserOut, deleteCurrentUser, currentUser } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  function handleDelete() {
    setDeleting(!deleting);
  }

  return (
    <section class="flex items-center justify-center h-screen">
      <section class="border-2 border-gray-300 bg-linear-to-b from-white to-blue-100 pt-5 rounded-lg flex flex-col justify-center items-center shadow-lg hover:shadow-2xl w-5/6 md:w-3/5 lg:w-1/3">
        <section class="flex px-5 flex-col border-b-3 border-gray-300 py-5 w-full">
          <p class="text-lg">Email</p>
          <p class="text-md">{currentUser ? currentUser.email : ""}</p>
          <Link
            to="/reset_password"
            class="text-blue-400 hover:cursor-pointer hover:underline"
          >
            Reset Password
          </Link>
        </section>
        <section class="flex py-5 w-full  border-b-3 border-gray-300 justify-center gap-20">
          <button
            class="text-blue-400 hover:cursor-pointer hover:underline"
            onClick={() => {
              signUserOut();
              navigate("/login");
            }}
          >
            Log Out
          </button>
          <button
            class="text-rose-400 hover:cursor-pointer hover:underline"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </section>
        {deleting && (
          <section class="flex flex-col py-5 w-full  border-b-3 border-gray-300 justify-center">
            <p class="px-5 flex py-5 w-full justify-center gap-20">
              Are you sure you want to delete your account? This action cannot
              be undone
            </p>
            <section class="flex py-5 w-full justify-center gap-20">
              <button
                class="text-blue-400 hover:cursor-pointer hover:underline"
                onClick={handleDelete}
              >
                Cancel
              </button>
              <button
                class="text-rose-400 hover:cursor-pointer hover:underline"
                onClick={() => {
                  try {
                    deleteCurrentUser();
                  } catch (e) {
                    if (e.code === "auth/requires-recent-login") {
                      setErrorMessage(
                        "Error: Requires recent login. Sign in again to delete"
                      );
                    } else {
                      setErrorMessage("Error in deleting account:", e.message);
                    }
                  }
                }}
              >
                Yes, delete
              </button>
            </section>
          </section>
        )}
        {errorMessage && <p class="text-rose-400">{errorMessage}</p>}
      </section>
    </section>
  );
}
