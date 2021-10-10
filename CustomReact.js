function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === "string" ? createTextElement(child) : child)),
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

function _render({ _type, _props }, container) {
  const { type, props } = typeof _type === "function" ? _type() : { type: _type, props: _props };

  const initNode = getInitNode(type);

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

  props.children.forEach((child) => render(child, VDOM));
  container.appendChild(VDOM);
}

function render(component, container) {
  let { type, props } = typeof component === "function" ? component() : component;

  _render({ _type: type, _props: props }, container);
}

export const React = {
  createElement,
};

export const ReactDOM = {
  render,
};
