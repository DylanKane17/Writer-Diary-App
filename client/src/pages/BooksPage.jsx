import { useAuth } from "../firebase/AuthContext";
import { useState, useEffect } from "react";
import DisplayProject from "../components/DisplayProject";
import { useNavigate, Link } from "react-router-dom";

export default function BooksPage() {
  const [projects, setProjects] = useState([]);
  const { loading, currentUserData, currentUser, deleteUserProject } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = currentUserData().then((data) => {
      setProjects([]);
      console.log("Data", data);
      try {
        for (const [key, value] of Object.entries(data)) {
          const newProject = {
            id: key,
            name: value["name"],
            progress: parseInt(value["progress"]),
            target: parseInt(value["target"]),
          };
          console.log("logged");
          console.log(newProject);
          setProjects((projects) => [...projects, newProject]);
        }
      } catch (e) {
        setProjects(null);
      }
    });
  }, [loading, currentUser]);

  function handleClick(id) {
    console.log("click check: project id: ", id);
    navigate("/entries", {
      state: { project_id: id },
    });
  }

  function handleDelete(id) {
    deleteUserProject(id).then(window.location.reload());
  }

  const projectObjects = projects
    ? projects.map((obj) => (
        <DisplayProject
          name={obj.name}
          progress={obj.progress}
          target={obj.target}
          key={obj.id}
          id={obj.id}
          handleClick={handleClick}
          handleDelete={handleDelete}
        ></DisplayProject>
      ))
    : null;

  return (
    <section class="flex flex-col justify-center mt-6 items-center ">
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <h1 class="text-white text-2xl tracking-widest uppercase">
            Projects
          </h1>
          <section class="flex flex-wrap justify-center items-center gap-4 mx-auto mt-6 tracking-wide">
            {projectObjects ? (
              projectObjects
            ) : (
              <p class="text-gray-500 mt-8 italic">
                No projects yet!{" "}
                <Link
                  to="/new-project"
                  class="hover:underline hover:cursor-pointer text-indigo-300"
                >
                  Add a project to get started!
                </Link>
              </p>
            )}
          </section>
        </>
      )}
    </section>
  );
}
