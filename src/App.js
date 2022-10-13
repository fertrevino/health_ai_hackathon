import logo from "./logo.svg";
import "./App.css";
import { Amplify, API, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "./aws-exports";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

Amplify.configure(awsconfig);

const questions = [
  {
    questionText: "What is your age?",
    helperText: "Number of years",
  },
  {
    questionText: "What is your biological gender?",
    helperText: "E.g. male, female, none",
  },
  {
    questionText: "What is your weight?",
    helperText: "E.g. 180 lb, 80 kg, etc.",
  },
  {
    questionText: "What is your height?",
    helperText: "E.g. 6 ft, 180 cm, etc.",
  },
  {
    questionText: "Do you have any medical preconditions or chronic diseases?",
    helperText:
      'E.g. "Asthma, diabetes and hyperthension", "Parkinson\'s disease", "none", etc.',
  },
  {
    questionText: "Do you have any allergies?",
    helperText: 'E.g. "Polen, peanuts and eggs", "Bee stings", "none", etc.',
  },
  {
    questionText: "Are you under any medication? Please specify",
    helperText:
      'E.g. "Insuline, ventolin and lisnopril", "Omeprazole", "none", etc.',
  },
  {
    questionText:
      "How do you feel today? Please provide a detailed description of your sympthoms and observations with a timeline", // TODO add minimum number of characters
    helperText:
      "E.g. For the past 3 days I have been feeling discomfort at night due to severe coughing and fever. My body temperature reading has been 100.4 F today ...",
  },
];
// function App() {
//   // GET requests
//   const apiName = "comprehendMedical";
//   const path = "/description";
//   const myInit = {
//     headers: {}, // OPTIONAL
//     response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
//     // queryStringParameters: {
//     //   name: "param", // OPTIONAL
//     // },
//   };

//   API.get(apiName, path, myInit)
//     .then((response) => {
//       console.log(`Response from GET: ${JSON.stringify(response)}`);
//     })
//     .catch((error) => {
//       console.log(`Error from response: ${JSON.stringify(error.response)}`);
//     });

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionsEnded, setQuestionsEnded] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const textInput = React.useRef(null);
  useEffect(() => {
    if (questionsEnded) {
      console.log(`Questions ended. Publishing message.. `);
    } else {
      console.log(`Questions not ended. `);
    }
  }, [questionsEnded]);

  const goNextQuestion = (answer) => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuestionsEnded(true);
    }
  };

  console.log(`answers: ${JSON.stringify(answers)}`);
  return (
    <div className="app">
      {questionsEnded ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <hr></hr>
            <div className="question-count">
              {/* <span>Question {currentQuestion + 1}</span>/{questions.length} */}
              <p>Progress</p>
            </div>
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                variant="determinate"
                value={(100 * (currentQuestion + 1)) / questions.length}
              />
            </Box>
            <hr></hr>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {/* {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption.answerText}
              </button>
            ))} */}
            <TextField
              id="standard-basic"
              // label={questions[currentQuestion].label}
              inputRef={textInput}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  // Do code here, prevent some values
                  if (textInput.current.value) {
                    const updatedAnswers = answers.concat([
                      textInput.current.value,
                    ]);
                    setAnswers(updatedAnswers);
                    textInput.current.value = null;
                    goNextQuestion();
                  }
                }
              }}
              placeholder="Type here"
              helperText={questions[currentQuestion].helperText}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default withAuthenticator(App);
