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

function render(component, container) {
  const { type, props } = typeof component === "function" ? component() : component;
  const VDOM = Object.entries(props).reduce(
    (totalNode, [key, value]) => {
      if (key !== "children") {
        totalNode[key] = value;
      }

      return totalNode;
    },
    type === "TEXT" ? document.createTextNode("") : document.createElement(type)
  );

  props.children.forEach((child) => render(child, VDOM));
  container.appendChild(VDOM);
}

export const React = {
  createElement,
};

export const ReactDOM = {
  render,
};
