export default function DisplayEntry(props) {
  return (
    <section
      class="bg-linear-to-b from-white to-indigo-200 bg-white rounded-lg w-90 h-30 p-4 shadow hover:shadow-2xl hover:cursor-pointer border-2 border-gray-300"
      key={props.id}
    >
      <h1 class="text-xl capitalize text-indigo-500">{props.title}</h1>
      <p class="text-sm">
        Progress: <span class="italic text-indigo-500">{props.progress}</span>
      </p>
      <p class="text-sm">
        Date: <span class="italic text-indigo-500">{props.date}</span>
      </p>
      <p class="text-sm line-clamp-1 text-gray-500">{props.notes}</p>
    </section>
  );
}
