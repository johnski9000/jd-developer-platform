import React, { useState } from "react";

function Table({ pipelines, extractDateTime }) {
  const [data, setData] = useState("commits");
  console.log(data);

  const map_variable = () => {
    if (data === "commits") {
        return pipelines.commits[0].values
    } else if (data === "pull") {
        return pipelines.pull_requests[0].values
    } else {
        return pipelines.commits[0].values
    }
  }
  async function getRepos() {
    try {
        const response = await fetch("http://localhost:8000/getRepos");
        const repos = await response.json();
        console.log(repos)
      } catch (error) {
        console.log(error)
      }
  }
  async function getEnv() {
    try {
        const response = await fetch("http://localhost:8000/getEnv");
        const repos = await response.json();
        console.log(repos)
      } catch (error) {
        console.log(error)
      }
  }
return (
    <div>
      {pipelines && pipelines.commits && pipelines.commits.length > 0 && (
        <div className="commit_wrapper">
          <select onChange={(e) => setData(e.target.value)}>
            {/* <option></option> */}
            <option value={"commits"}>Commits</option>
            <option value={"pull"}>Pull Request</option>
          </select>
          <button onClick={() => getRepos()}>
          getRepos
          </button>
          <table>
            <thead>
              <tr>
                <th>Author</th>
                <th>Link</th>
                <th>{data === "commits" ? "Message" : "Title"}</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {map_variable().map((item, index) => (
                <tr>
                    
                  <td>
                  {data === "pull" && item.author.display_name ? item.author.display_name: ""}
                    {data === "commits" && item.author.raw ? item.author.raw : ""}
                    </td>
                  <td>
                    <a href={`${item.links.html.href}`}>
                      {item.links.html.href}
                    </a>
                  </td>
                  <td>{data === "commits" ? item.message : item.title}</td>
                  <td>
                    {extractDateTime( data === "commits" ? item.date : item.created_on).date},{" "}
                    {extractDateTime(data === "commits" ? item.date : item.created_on).time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Table;
