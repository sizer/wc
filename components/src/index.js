import { css, LitElement, html } from 'lit-element';

const ToDoItemStyle = css`
  .ToDoItem {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ToDoItem-Text {
    width: 90%;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 1px 1px 1px lightgrey;
    padding: 12px;
    margin-right: 10px;
  }

  .ToDoItem-Delete {
    width: 35px;
    height: 35px;
    cursor: pointer;
    background: #ff7373;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #c70202;
    color: white;
    font-size: 18px;
    margin-right: 5px;
  }

  .ToDoItem-Delete:hover {
    box-shadow: none;
    margin-top: 1px;
    margin-left: 1px;
  }
`;

export class ToDoItem extends LitElement {
  static get properties() {
    return {
      item: { type: String },
      deleteItem: { type: Function },
    };
  }

  static get styles() {
    return [ToDoItemStyle];
  }

  render() {
    return html`
      <div class="ToDoItem">
        <p class="ToDoItem-Text">${this.item}</p>
        <button class="ToDoItem-Delete" @click=${this.deleteItem}>-</button>
      </div>
    `;
  }
}

customElements.define('wc-todo-item', ToDoItem);

const ToDoAppStyle = css`
  .Logo {
    width: 50px;
    position: relative;
    top: 50px;
  }
  .ToDo {
    text-align: center;
    border: 1px solid white;
    width: 80vw;
    height: auto;
    box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.5);
    background: #f6f6f6;
    padding-bottom: 60px;
    margin: 40px auto;
  }
  .ToDo-Header {
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    margin: 70px auto 30px;
  }
  .ToDo-Add {
    color: white;
    font-size: 2em;
    width: 40px;
    height: 40px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #73ff73;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #47a947;
    margin: 20px auto 0;
  }
  .ToDo-Add:hover {
    box-shadow: none;
    margin-left: calc(auto + 1px);
  }
  .ToDo-Container {
    width: 80%;
    margin: 0 auto;
  }
  input {
    width: 60%;
    padding: 10px;
    font-size: 1em;
    margin: 10px auto;
    box-shadow: 1px 3px 20px 0px rgba(0, 0, 0, 0.3)
  }
`;

export class ToDoApp extends LitElement {
  /**
  * Declare the properties that will be
  * available in the binding system
  */
  static get properties() {
    return {
      list: {type: Array},
      todo: {type: String},
    };
  }

  constructor() {
    super();
    this.list = [
      this.todoItem('clean the house'),
      this.todoItem('buy milk')
    ];
    this.todo = '';
  }

  todoItem(todo) {
    return {todo}
  }

  createNewToDoItem() {
    this.list = [
      ...this.list,
      this.todoItem(this.todo)
    ];
    this.todo = '';
  }


  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.createNewToDoItem();
      }
    }
  }

  handleInput(e) {
    this.todo = e.target.value;
  }

  // this is now being emitted back to the parent from the child component
  deleteItem(indexToDelete) {
    this.list = this.list.filter((toDo, index) => index !== indexToDelete);
  }

  static get styles() {
    return [ToDoAppStyle];
  }

  render() {
    return html`
    <div class="ToDo">
      <h1>LitElement</h1>
      <h1 class="ToDo-Header">LitElement To Do</h1>
      <div class="ToDo-Container">
        <div class="ToDo-Content">
          ${this.list.map((item, key) => {
              return html`
                <wc-todo-item
                  item=${item.todo}
                  .deleteItem=${this.deleteItem.bind(this, key)}
                ></wc-todo-item>
              `;
            }
          )}
        </div>
        <div>
          <input
            type="text"
            .value=${this.todo}
            @input=${this.handleInput}
            @keypress=${this.handleKeyPress}
          />
          <button
            class="ToDo-Add"
            @click=${this.createNewToDoItem}
          >+</button>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define('wc-todo-app', ToDoApp);
