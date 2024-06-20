const Options = ({ options, click }) => {
  return Object.keys(options).map((item, index) => (
    <button key={index} onClick={() => click(item)}>
      {item}
    </button>
  ));
};

export default Options;
