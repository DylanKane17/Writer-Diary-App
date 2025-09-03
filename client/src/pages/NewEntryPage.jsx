import { useAuth } from "../firebase/AuthContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NewEntryPage() {
  const { addEntry } = useAuth();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const project_id = location.state?.project_id;

  useEffect(() => console.log("New Entries Page: Project: ", project_id), []);

  function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log("Submitted!");
      const formData = new FormData(event.currentTarget);
      const entry = formData.get("entry");
      const notes = formData.get("notes");
      const date = formData.get("date");
      const progress = formData.get("progress");

      event.target.reset();
      addEntry(entry, notes, date, progress, project_id);
      setMessage("Entry added!");
    } catch (e) {
      setMessage("There was an error in adding your entry: ", e.message);
    }
  }

  return (
    <main class="flex items-center justify-center min-h-screen min-w-screen">
      <section class="bg-linear-to-b from-white to-blue-100 flex-col bg-white p-4 border-2 border-gray-300 w-5/6 mt-6 mb-6 h-auto rounded-lg">
        <h1 class="text-3xl mt-2">New Entry</h1>
        <form class="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label class="mt-5">Entry Title</label>
          <input
            type="text"
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
            name="entry"
            placeholder="Enter entry title here"
            aria-label="Enter entry title here"
          ></input>
          <label>Date of Entry</label>
          <input
            type="date"
            name="date"
            placeholder="Enter character/author/person..."
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
          ></input>
          <label>How many words did you write?</label>
          <input
            type="number"
            name="progress"
            placeholder="Enter number of words here here"
            aria-label="Enter number of words here here"
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
          ></input>
          <label>Additional Notes</label>
          <textarea
            name="notes"
            cols="50"
            rows="4"
            placeholder="E.g. what you did well, what you want to do next time..."
            aria-label="Enter additional notes here"
            class="border-2 border-gray-300 rounded-lg py-1 placeholder:italic pl-2"
          ></textarea>
          <button class="w-2/3 bg-indigo-200 rounded-lg p-2 m-auto opacity-90 hover:opacity-100 hover:cursor-pointer">
            Submit
          </button>
        </form>
        <section class="flex justify-center items-center mt-2">
          {" "}
          {message && <p class="text-slate-800 italic text-sm">{message}</p>}
        </section>
      </section>
    </main>
  );
}
