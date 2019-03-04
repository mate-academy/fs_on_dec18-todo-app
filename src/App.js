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
    items: [
      { text: 'qweqweqwe', done: false, id: 1 },
      { text: 'asfdsdf', done: true, id: 2 },
      { text: 'zxczbcvb', done: false, id: 3 },
    ],
  };

  onChange = (item) => {
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

  onDelete = (item) => {
    this.setState(({items}) => {
      return {
        items: items.filter(current => current !== item),
      };
    })
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus="" />
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
                  onChange={() => this.onChange(item)}
                  onDelete={() => this.onDelete(item)}
                />
              ))}
            </ul>
        </section>

        <footer className="footer">

          <span className="todo-count"><strong>1</strong> item left</span>
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
          <button className="clear-completed">Clear completed</button>
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
