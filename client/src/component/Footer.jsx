import React from "react";

function Footer() {
  return (
    <>
      <div className="todo-list-footer">
        <p className="items-left">5 items left</p>
        <div className="filter-options desktop-only">
          <button className="filter-btn active-filter">All</button>
          <button className="filter-btn">Active</button>
          <button className="filter-btn">Completed</button>
        </div>

        <button className="clear-completed-btn">Clear Completed</button>
      </div>
      <div className="filter-options mobile-only">
        <button className="filter-btn active-filter">All</button>
        <button className="filter-btn">Active</button>
        <button className="filter-btn">Completed</button>
      </div>
    </>
  );
}

export default Footer;
