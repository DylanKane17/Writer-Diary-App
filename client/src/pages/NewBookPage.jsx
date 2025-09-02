import { useAuth } from "../firebase/AuthContext";
import { useEffect } from "react";

export default function NewProjectPage() {
  const { addProject } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted!");
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const progress = formData.get("progress");
    const target = formData.get("target");

    addProject(name, progress, target);
  }

  return (
    <main class="flex items-center justify-center min-h-screen min-w-screen">
      <section class="bg-linear-to-b from-white to-blue-100 flex-col bg-white p-4 border-2 border-gray-300 w-5/6 mt-6 mb-6 h-auto rounded-lg">
        <h1 class="text-3xl mt-2">New Project</h1>
        <form class="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label class="mt-5">Project Name</label>
          <input
            type="text"
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
            name="name"
            placeholder="Enter project name here"
            aria-label="Enter project name here"
          ></input>
          <label>How many words have you written so far?</label>
          <input
            type="number"
            min="0"
            name="progress"
            placeholder="Enter current word count here"
            aria-label="Enter current word count here"
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
          ></input>
          <label>What is your target word count?</label>
          <input
            type="number"
            min="0"
            name="target"
            placeholder="Enter target word count here"
            aria-label="Enter target word count here"
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
          ></input>
          <button class="w-2/3 bg-indigo-200 rounded-lg p-2 m-auto opacity-90 hover:opacity-100 hover:cursor-pointer">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
