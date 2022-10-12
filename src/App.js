import logo from "./logo.svg";
import "./App.css";
import { Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  // GET requests
  const apiName = "comprehendMedical";
  const path = "/description";
  const myInit = {
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    // queryStringParameters: {
    //   name: "param", // OPTIONAL
    // },
  };

  API.get(apiName, path, myInit)
    .then((response) => {
      console.log(`Response from GET: ${JSON.stringify(response)}`);
    })
    .catch((error) => {
      console.log(`Error from response: ${JSON.stringify(error.response)}`);
    });

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
}

export default App;
