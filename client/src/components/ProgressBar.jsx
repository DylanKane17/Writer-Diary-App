import { useState, useEffect } from "react";

export default function ProgressBar({ target, progress }) {
  const percent =
    target && progress ? (Number(progress) / Number(target)) * 100 : 0;
  return (
    <section class="mt-6 w-4/5">
      <div class="w-full h-4 rounded-xl bg-gray-500">
        <div
          class="h-full rounded-xl bg-white transition duration-50 ease-in-out"
          style={{ width: `${percent > 100 ? 100 : percent}%` }}
        ></div>
      </div>
      <div class="text-white bold">{percent}%</div>
    </section>
  );
}
