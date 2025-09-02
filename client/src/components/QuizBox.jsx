import { useState } from "react";

export default function QuizBox(props) {
  const answerObjects = props.answers.map((answer) => (
    <button>{answer.Text}</button>
  ));

  return (
    <main>
      <div>
        <h1>{props.question}</h1>
        <div>{answerObjects}</div>
      </div>
    </main>
  );
}
