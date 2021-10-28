import React, {Component} from "react";
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

//import { render } from '../../server';

class App extends Component {
  /* constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:8000/")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      this.callAPI();
  } */

  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
      
    );
  }
}
/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export default App;
