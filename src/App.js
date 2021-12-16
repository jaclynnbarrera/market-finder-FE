// import logo from "./logo.svg";
import "./App.css";
import LeftNav from "./LeftNav";
import TopBar from './TopBar'
import Main from './Main'
import RightBar from "./RightBar";

function App() {
  return (
    <div className="parent">
      <LeftNav/>
      <TopBar/>
      <Main/>
      <RightBar/>
    </div>
  );
}

export default App;