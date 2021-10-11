import { Component, React } from "../../../CustomReact";
export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  onClickPlus() {
    this.setState({ count: this.state.count + 1 });
  }

  onClickMinus() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    const { count } = this.state;

    return (
      <div className="container">
        <span className="count">count: {count}</span>

        <div className="btn-group">
          <button>
            <strong onClick={() => this.onClickMinus()}>-</strong>
          </button>
          <button>
            <strong>RESET</strong>
          </button>
          <button>
            <strong onClick={() => this.onClickPlus()}>+</strong>
          </button>
        </div>
      </div>
    );
  }
}
