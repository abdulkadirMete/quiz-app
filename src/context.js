import React, { useState, useContext } from "react";

const categoryHash = { sports: 21, history: 23, politics: 24 };

const END_POINT = "https://opentdb.com/api.php";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    diffuculty: "easy",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const fetchQuestions = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if (data.response_code === 1) {
        setError(true);
      } else if (data.response_code === 0) {
        setQuestions(data.results);
        setShowSetup(false);
        setError(false)
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAnswer = (value) => {
    if (value) {
      setCorrectCount((oldValue) => oldValue + 1);
    }
    nextQuestion();
  };

  const handleSubmit = (e) => {
    fetchQuestions(
      `${END_POINT}?amount=${quiz.amount}&difficulty=${
        quiz.diffuculty
      }&category=${categoryHash[quiz.category]}&type=multiple`
    );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleRestart = () => {
    setShowSetup(true)
    setShowModal(false)
    setCorrectCount(0)
  }

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex((oldIndex) => oldIndex + 1);
    } else {
      setIndex(0)
      setShowModal(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        quiz,
        setQuiz,
        questions,
        error,
        loading,
        handleSubmit,
        handleChange,
        showSetup,
        index,
        correctCount,
        handleAnswer,
        nextQuestion,
        showModal,
        handleRestart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
