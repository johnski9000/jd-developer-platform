import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Platform from "./pages/Platform";
import Website from "./pages/Website";

function App() {
  const [pipelines, setPipelines] = useState([]);


  async function fetchRepoData(text) {

    const requestOptions = {
      method: 'POST', // Change the HTTP method as needed
      headers: {
        'Content-Type': 'application/json', // Adjust the content type as per your API requirements
      },
      body: JSON.stringify({repo: text}), // Convert the body data to JSON string
    };
    try {
      const response = await fetch("http://localhost:8000/getPipelineData", requestOptions);
      const bitbucket_environments = await response.json();
      console.log(bitbucket_environments)
      setPipelines(bitbucket_environments);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (window.location.pathname === "/launch_app_platform") {
      fetchRepoData("core-launch-platform");
    } else if (window.location.pathname === "/launch_app_website") {
      fetchRepoData("core-launch-app-website");
    } 

  }, []); // Add 'updateUrl' to the dependency array

  return (
    <div className="App">
      <div className="app_wrapper">
        <div className="app_inner_wrapper">
          <Menu />
          <div className="dashboard_wrapper">
            <h1>{window.location.pathname === "/launch_app_platform" && "Launch App Platform"}
            {window.location.pathname === '/launch_app_website' && "Launch App Website"}
            </h1>
            {window.location.pathname === "/launch_app_platform" && <Platform pipelines={pipelines}/>}
            {window.location.pathname === "/launch_app_website" && <Website pipelines={pipelines}/>}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
