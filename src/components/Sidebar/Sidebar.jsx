import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = React.useState(false);

  const toggleExtend = () => {
    setExtended(!extended);
  };

  const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

  const loadPrompt = async (prompt) =>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className="sidebar">
      {/* Sidebar Top section */}
      <div className="top">
        <img
          onClick={toggleExtend}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />{" "}
        {/* Menu Button - Toggling Purpose*/}
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {/* Sidebar Recent Histroy Section */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Sidebar - Bottom Section */}
      <div className="bottom">
        {/*  Help Button */}
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        {/* Activity Button */}
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        {/* Settings Button */}
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
