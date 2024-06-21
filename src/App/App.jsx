import { useEffect, useState } from "react";

import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

const initialState = { //начальный cтейт
  good: 0,
  neutral: 0,
  bad: 0,
};

const getStateFromLocalStorage = () => {
  const state = JSON.parse(localStorage.getItem("feedback"));
  return state === null ? initialState : state; //проверяем локал сторедж

};

const App = () => {
  const [state, setState] = useState(getStateFromLocalStorage); //делаем стейт 

  // функция изменения стейта 
  const updateFeedback = (feedbackType) => {
    setState({ ...state, [feedbackType]: state[feedbackType] + 1 });
  };

  // функция сброса стейта
  const resetState = () => {
    setState(initialState)
  }

  const { good, neutral, bad } = state;

  const totalFeedback = good + neutral + bad;
  const positive = Math.round((good / totalFeedback) * 100);

  //сохраняем в локал сторедж
  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Description />
      <Options options={state} click={updateFeedback} reset={resetState}/>

      {totalFeedback > 0 ? (
        <Feedback
          good={state.good}
          neutral={state.neutral}
          bad={state.bad}
          total={totalFeedback}
          positive={positive}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App;
