import css from "./Options.module.css";

const Options = ({ options, click, reset }) => {
  const { good, neutral, bad } = options;

  return (
    <div className={css.list}>
      {Object.keys(options).map((item, index) => (
        <button key={index} className={css.button} onClick={() => click(item)}>
          {item}
        </button>
      ))}

      {(good > 0 || neutral > 0 || bad > 0) && (
        <button className={css.button} onClick={reset}>
          {"reset"}
        </button> //рендер кнопки по условию
      )}
    </div>
  );
};

export default Options;
