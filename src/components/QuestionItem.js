import React from "react";

function QuestionItem({ question, onDeleteQuestion, onQuestionChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleAnswer = (e) => {
    onQuestionChange(id, parseInt(e.target.value))
  }

  const handleDelete = () => {
    onDeleteQuestion(id)
  }  
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswer}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
