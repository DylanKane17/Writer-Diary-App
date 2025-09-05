import { useAuth } from "../firebase/AuthContext";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import DisplayEntry from "../components/DisplayEntry";
import ProgressBar from "../components/ProgressBar";

export default function EntriesPage() {
  const [entries, setEntries] = useState([]);
  const { loading, currentUserData, currentUser } = useAuth();
  const [progress, setProgress] = useState();
  const [target, setTarget] = useState();
  const location = useLocation();
  const project_id = location.state?.project_id;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Entries Page: Project: ", project_id);
    const userData = currentUserData().then((data) => {
      setEntries([]);
      console.log("Data: ", data);
      console.log("Data id: ", parseInt(data[project_id].progress));
      setProgress(Number(data[project_id].progress));
      setTarget(Number(data[project_id].target));
      try {
        for (const [key, value] of Object.entries(
          data[project_id]["entries"]
        )) {
          const newEntry = {
            id: key,
            title: value["title"],
            notes: value["notes"],
            progress: value["progress"],
            date: value["date_added"],
          };
          console.log("logged");
          console.log(newEntry);
          setEntries((prevEntries) => [...prevEntries, newEntry]);
        }
      } catch (e) {
        setEntries(null);
      }
    });
  }, [loading, currentUser]);

  useEffect(() => {
    console.log("updated progress:", progress);
    console.log("updated target:", target);
  }, [progress, target]);

  const entryObjects = entries
    ? entries.map((obj) => (
        <DisplayEntry
          title={obj.title}
          notes={obj.notes}
          date={obj.date}
          progress={obj.progress}
          key={obj.id}
        ></DisplayEntry>
      ))
    : null;

  return (
    <section class="flex flex-col justify-center mt-6 items-center ">
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <h1 class="text-white text-2xl tracking-widest uppercase">Entries</h1>
          <ProgressBar progress={progress} target={target} />
          <section class="flex flex-wrap justify-center items-center gap-4 mx-auto mt-8 tracking-wide">
            {entryObjects ? (
              entryObjects
            ) : (
              <p class="text-gray-500 mb-4 italic">
                No entries yet!{" "}
                <Link
                  to="/new-entry"
                  class="hover:underline hover:cursor-pointer text-indigo-300"
                >
                  Add an entry to get started!
                </Link>
              </p>
            )}
          </section>
          <button
            onClick={() =>
              !loading
                ? navigate("/new-entry", {
                    state: { project_id: project_id },
                  })
                : pass
            }
            class="bg-indigo-200 rounded-lg p-2 mt-5 opacity-90 hover:opacity-100 hover:cursor-pointer"
          >
            Add Entry
          </button>
        </>
      )}
    </section>
  );
}
