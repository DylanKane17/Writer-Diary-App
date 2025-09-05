export default function DisplayProject(props) {
  return (
    <section class="border-2 border-gray-300 grid grid-cols-5 bg-linear-to-b from-white to-indigo-200 bg-white rounded-lg w-90 h-25 p-4 shadow hover:shadow-3xl">
      <section class="col-span-4  flex flex-col " key={props.id}>
        <h1
          class="text-xl hover:cursor-pointer hover:underline text-indigo-500 capitalize italic tracking-wide"
          onClick={() => props.handleClick(props.id)}
        >
          {props.name}
        </h1>
        <p class="text-sm">
          Progress: <span class="italic text-slate-500">{props.progress}</span>
        </p>
        <p class="text-sm">
          Target: <span class="italic text-indigo-500">{props.target}</span>
        </p>
      </section>
      <section
        class="h-15 w-full rounded-xl flex justify-center items-center"
        onClick={() => {
          props.handleDelete(props.id);
        }}
      >
        <p>Delete</p>
      </section>
    </section>
  );
}
