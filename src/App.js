import React from 'react';
import './App.css';

const ToDo = ({ id, done, text, onChange, onDelete }) => (
  <li className={ done ? 'completed' : ''}>
    <div className="view">
      <input
        id={`todo-${id}`}
        className="toggle"
        type="checkbox"
        checked={done}
        onChange={onChange}
      />
      <label htmlFor={`todo-${id}`}>{text}</label>
      <button className="destroy" onClick={onDelete} />
    </div>
  </li>
);

class ToDoList extends React.Component {
  state = {
    items: [],
    newItemText: ''
  };

  handleChange = (item) => {
    this.setState(({ items }) => {
      const index = items.indexOf(item);
      const newItems = [...items];
      newItems[index] = {
        ...item,
        done: !item.done,
      };

      return {
        items: newItems,
      };
    })
  };

  handleDelete = (item) => {
    this.setState(({items}) => {
      return {
        items: items.filter(current => current !== item),
      };
    })
  };

  addItem = (text) => {
    this.setState(({items}) => {
      const newItem = {
        id: `${+new Date()}`,
        done: false,
        text,
      };

      return {
        items: [...items, newItem],
        newItemText: '',
      };
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.addItem(this.state.newItemText);
  };

  handleNewItemTextChange = (event) => {
    this.setState({
      newItemText: event.target.value,
    });
  };

  clearCompleted = () => {
    this.setState(({ items }) => {
      return {
        items: items.filter(item => !item.done),
      };
    });
  };


  render() {
    const activeItems = this.state.items.filter(item => !item.done);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus=""
              value={this.state.newItemText}
              onChange={this.handleNewItemTextChange}
            />
          </form>
        </header>

        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              { this.state.items.map(item => (
                <ToDo
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  done={item.done}
                  onChange={() => this.handleChange(item)}
                  onDelete={() => this.handleDelete(item)}
                />
              ))}
            </ul>
        </section>

        <footer className="footer">

          <span className="todo-count"><strong>{activeItems.length}</strong> item left</span>
          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <button
            onClick={this.clearCompleted}
            className="clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}




















const App = () => (
  <div className="App">
    <ToDoList />
  </div>
);

export default App;
