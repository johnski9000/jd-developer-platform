import React, { useEffect, useState } from 'react'
import "../App.css";
import Table from '../components/Table';
import check from "../Images/checkmark.png";
import timer from "../Images/wall-clock.png"

function Platform({pipelines}) {

  
  const handleButtonClick = (link) => {
    window.location.href = link;
  };
  function extractDateTime(targetDate) {
    const date = targetDate.substring(0, 10);
    const time = targetDate.substring(11, 19);
    
    return {
      date,
      time
    };
  }
  return (
    <div className='wrapper'>
        <div className="pipeline_wrapper">

{pipelines && pipelines.builds && pipelines.builds.length > 0 ? (
  pipelines.builds.map((item, index) => (
    <div className="pipeline_child" key={index} onClick={() => handleButtonClick(item.target.commit.links.html.href)}>
      <div
        className={
          item.state.result.type === "pipeline_state_completed_successful"
            ? "pipeline_name_success"
            : "pipeline_name_error"
        }
      >
        <div className="pipeline_status_image">
          <img
            src={
              item.state.result.type === "pipeline_state_completed_successful"
                ? check
                : "./cancel.png"
            }
            alt="item.state.result.type"
          />
        </div>
        {item.target.selector.pattern.substr(
          item.target.selector.pattern.indexOf(" ") + 1
        )}
        <div className="build_time">
          <img src={timer} alt="build time"/>
          {Math.floor(item.build_seconds_used / 60)} minutes
        </div>
      </div>
      <div className="pipeline_info">
        <div>#{item.build_number}</div>
        <div>Author - {item.creator.nickname}</div>
        <div>Last deployed - {extractDateTime(item.completed_on).date}, {extractDateTime(item.completed_on).time}</div>
      </div>
    </div>
  ))
) : (
  <div className="loader"></div>
)}

</div>
<Table pipelines={pipelines} extractDateTime={extractDateTime}/>

    </div>
  )
}

export default Platform



