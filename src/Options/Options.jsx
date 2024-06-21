const Options = ({ options, click, reset }) => {
  const { good, neutral, bad } = options;

  return (
    <>
      {Object.keys(options).map((item, index) => (
        <button key={index} onClick={() => click(item)}>
          {item}
        </button>
      ))}

      {(good > 0 || neutral > 0 || bad > 0) && (
        <button onClick={() => reset()}>{"reset"}</button>
      )}
    </>
  );
};

export default Options;
