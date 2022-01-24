import React from 'react';
import { useGlobalContext } from './context';

export const Modal = () => {

    const {questions,correctCount,handleRestart}=useGlobalContext()
    const percent = (correctCount/questions.length*100).toFixed(0)

  return <section className='modal'>
      <div className="modal-container">
      <h2>congrats!</h2>
      <p>You answered of %{percent} questions correctly</p>
      <button onClick={handleRestart} className="btn close-btn">play again</button>
      </div>
  </section>;
};
