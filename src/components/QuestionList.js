import React, {useState, useEffect} from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() =>{
    fetch("http://localhost:4000/questions")      //GET questions from the server
      .then((resp) => resp.json())
      .then((questionsList) => setQuestions(questionsList))
  }, [])

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {      //DELETE
      method: "DELETE",
      headers: {"Content-Type":"application/json"}
    })        
    .then((resp) => resp.json())
    .then(() => {
      const newQuestions = questions.filter((question) => question.id !== id)
      setQuestions(newQuestions)
    })
  }

  const handleQuestionAnswer = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application.json"},
      body: JSON.stringify({correctIndex})
    })
    .then((resp) => resp.json())
    .then((newQuestion) => {
      const newQuestions = questions.map((question) => {
        if (question.id === newQuestion.id){
          return newQuestion
        }
        else {
          return question
        }
      })
      setQuestions(newQuestions)
    })
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} onQuestionChange={handleQuestionAnswer}/>
        ))}
        
      </ul>
    </section>
  );
}

export default QuestionList;
