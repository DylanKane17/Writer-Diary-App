export default function DisplayEntry(props) {
  return (
    <section
      class="bg-linear-to-b from-white to-indigo-300 bg-white rounded-lg w-90 h-25 p-4 shadow hover:shadow-3xl hover:cursor-pointer border-2 border-gray-300"
      key={props.id}
      onClick={() => props.handleClick(props.id)}
    >
      <h1 class="text-xl  text-indigo-500 capitalize italic tracking-wide">
        {props.name}
      </h1>
      <p class="text-sm">
        Progress: <span class="italic text-slate-500">{props.progress}</span>
      </p>
      <p class="text-sm">
        Target: <span class="italic text-indigo-500">{props.target}</span>
      </p>
    </section>
  );
}
