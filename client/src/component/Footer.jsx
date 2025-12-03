import React from "react";

function Footer({ todos, onClearCompleted, filter, onFilterChange }) {
  const itemsLeft = todos.filter(t => !t.is_completed).length;

  return (
    <>
      <div className="todo-list-footer">
        <p className="items-left">{itemsLeft} items left</p>
        <div className="filter-options desktop-only">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active-filter' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active-filter' : ''}`}
            onClick={() => onFilterChange('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active-filter' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </button>
        </div>

        <button className="clear-completed-btn" onClick={onClearCompleted}>
          Clear Completed
        </button>
      </div>
      <div className="filter-options mobile-only">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>
    </>
  );
}

export default Footer;
