import "./App.css";
import { SetupForm } from "./SetupForm";
import { useGlobalContext } from "./context";
import { shuffle } from "./utils";
import { Modal } from "./Modal";

function App() {
  const {
    showSetup,
    loading,
    index,
    questions,
    handleAnswer,
    correctCount,
    nextQuestion,
    showModal
  } = useGlobalContext();

  if (loading) {
    return <div className="loading"></div>
  }

  if (showSetup) {
    return <SetupForm></SetupForm>;
  }

  const { correct_answer, incorrect_answers, question } = questions[index];

  const choices = shuffle([...incorrect_answers, correct_answer]);

  return (
    <main className="main">
    {showModal && <Modal></Modal>}
      <section className="question-container">
        <p className="correct-answers">
          correct answers : {`${correctCount}/${questions.length}`}
        </p>
        <article className="container">
          <h2>{question}</h2>
          <div className="btn-container">
            {choices.map((choice, idx) => {
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    handleAnswer(choice === correct_answer);
                  }}
                  className="answer-btn"
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </article>
        <button onClick={nextQuestion} className="btn next-question">
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
