import { useEffect, useState } from "react";

import css from "./App.module.css";

import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

const initialState = {
  //начальный cтейт
  good: 0,
  neutral: 0,
  bad: 0,
};

// функция получения данных с локал сторедж
const getStateFromLocalStorage = () => {
  const state = JSON.parse(localStorage.getItem("feedback"));
  return state === null ? initialState : state; //проверяем данные
};

const App = () => {
  const [state, setState] = useState(getStateFromLocalStorage); //делаем стейт

  // функция изменения стейта
  const updateFeedback = (feedbackType) => {
    setState({ ...state, [feedbackType]: state[feedbackType] + 1 });
  };

  // функция сброса стейта
  const resetState = () => {
    setState(initialState);
  };

  const { good, neutral, bad } = state;

  const totalFeedback = good + neutral + bad;
  const positive = Math.round((good / totalFeedback) * 100);

  //сохраняем в локал сторедж
  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(state));
  }, [state]);

  return (
    <section className={css.container}>
      <Description />
      <Options options={state} click={updateFeedback} reset={resetState} />

      {totalFeedback > 0 ? (
        <Feedback
          good={good}
          neutral={neutral}
          bad={bad}
          total={totalFeedback}
          positive={positive}
        />
      ) : (
        <Notification />
      )}
    </section>
  );
};

export default App;
