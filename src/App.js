import { React } from "../CustomReact";

export default function App() {
  const onClickTitle = (e) => {
    console.log("i'm clicked");
  };

  return (
    <div className="hihi" onClick={onClickTitle}>
      안녕
      <h1>Hello World</h1>
    </div>
  );
}
