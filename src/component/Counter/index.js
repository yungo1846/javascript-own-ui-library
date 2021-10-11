import { React } from "../../../CustomReact";

export default function Counter() {
  const onClickPlus = () => {
    console.log("plus");
  };

  const onClickMinus = () => {
    console.log("minus");
  };

  const getCount = (count) => {
    return count;
  };

  return (
    <div className="container">
      <span className="count">count: {false ? getCount(7777) : 0}</span>

      <div className="btn-group">
        <button>
          <strong onClick={onClickMinus}>-</strong>
        </button>
        <button>
          <strong>RESET</strong>
        </button>
        <button>
          <strong onClick={onClickPlus}>+</strong>
        </button>
      </div>
    </div>
  );
}
