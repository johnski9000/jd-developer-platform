import React, { useState } from 'react'
import logo from "../Images/jdlogo.png"

function Menu() {
    const [setOpen, setMenuOpen] = useState(false);
    const menu_links = [
        {
            text: "Launch app platform",
            link: "/launch_app_platform"
        },
        {
            text: "Core - Launch App Website",
            link: "/launch_app_website"
        }
    ]

  return (
    <div
    //  className="menu_wrapper"
    className={setOpen === false ? "menu_wrapper" : "menu_wrapper open"}
    >
       <div className="menu_button_container">
       {/* <img src={logo} alt="logo" width={100}/> */}
          <button
          className={setOpen === false ? "hamburger" : "hamburger is-active"}
          onClick={() => setMenuOpen(!setOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
       </div>
        <ul>
  {
                menu_links.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} key={index}>
              <h4>{item.text}</h4>
            </a>
                    </li>
                    
                ))
            }
        </ul>
          
          </div>
  )
}

export default Menu