function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        switch (typeof child) {
          case "string":
          case "number":
            return createTextElement(child);

          case "function":
            const result = child();
            return typeof result === "function" ? createElement(result) : createTextElement(result);

          default:
            return child;
        }
      }),
    },
  };
}

function createTextElement(text) {
  return createElement("TEXT", { nodeValue: text });
}

function getInitNode(type) {
  if (type === "TEXT") {
    return document.createTextNode("");
  } else {
    try {
      return document.createElement(type);
    } catch {
      return document.createDocumentFragment();
    }
  }
}

function _render({ type, props }, container) {
  let { type: _type, props: _props } = { type, props };

  if (typeof type === "function") {
    const Component = new type();
    const renderElement = Component.render();

    _type = renderElement.type;
    _props = renderElement.props;
  }

  const initNode = getInitNode(type);

  //debugger;
  const VDOM = Object.entries(props).reduce((totalNode, [key, value]) => {
    if (key !== "children") {
      switch (key) {
        case "className":
          totalNode.setAttribute("class", value);
          break;

        case "onClick":
          totalNode["onclick"] = value;
          break;

        default:
          totalNode[key] = value;
          break;
      }
    }

    return totalNode;
  }, initNode);

  _props.children.forEach((child) => _render(child, VDOM));
  container.appendChild(VDOM);
}

// TODO: 상태변경 시 DOM tree 업데이트 (리렌더링)
const VDOM_TREE = {};

function render(component, container) {
  if (!component instanceof Object) {
    console.error("component should be class which extends Component");
    return;
  }

  const Component = new component();
  const { type, props } = Component.render();

  VDOM_TREE.type = type;
  VDOM_TREE.props = props;
  console.log(VDOM_TREE);
  _render({ type, props }, container);
}

export class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {}
}

export const React = {
  createElement,
};

export const ReactDOM = {
  render,
};
