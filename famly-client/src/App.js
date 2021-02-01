import './App.css';
import ChildrenList from './Components/ChildrenList';
import logo from './famly-logo.png';

function App() {
  return (
    <div className="App">
      <h1>Famly<img className="logo" src={logo} alt="famly-logo"/></h1>
      <h2>Hire me app</h2>
      <ChildrenList/>
    </div>
  );
}

export default App;
