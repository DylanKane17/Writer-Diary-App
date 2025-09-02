import { useAuth } from "../firebase/AuthContext";
import { useState, useEffect } from "react";
import DisplayProject from "../components/DisplayProject";
import { useNavigate } from "react-router-dom";

export default function EntriesPage() {
  const [projects, setProjects] = useState([]);
  const { loading, currentUserData, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = currentUserData().then((data) => {
      setProjects([]);
      for (const [key, value] of Object.entries(data)) {
        const newProject = {
          id: key,
          name: value["name"],
          progress: value["progress"],
          target: value["target"],
        };
        console.log("logged");
        console.log(newProject);
        setProjects((prevBooks) => [...projects, newProject]);
      }
      console.log("Projects: ");
      console.log(projects);
    });
  }, [loading, currentUser]);

  function handleClick(id) {
    console.log("click check: project id: ", id);
    navigate("/entries", {
      state: { project_id: id },
    });
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
            {projectObjects}
          </section>
        </>
      )}
    </section>
  );
}
