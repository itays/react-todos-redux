import { getTodos, createTodo, updateTodo, destroyTodo } from '../lib/todoServices';
import { showMessage } from './messages';
const initState = {
  todos: [],
  currentTodo: ''
};

const CURRENT_UPDATE = 'CURRENT_UPDATE';
export const TODO_ADD = 'TODO_ADD';
export const TODOS_LOAD = 'TODOS_LOAD';
export const TODO_REPLACE = 'TODO_REPLACE';
export const TODO_REMOVED = 'TODO_REMOVED';

// Action creatos - functions that returns an action object
export const updateCurrent = (val) => ({ type: CURRENT_UPDATE, payload: val});
export const loadTodos = (todos) => ({ type: TODOS_LOAD, payload: todos});
export const addTodo = (todo) => ({type: TODO_ADD, payload: todo});
export const replaceTodo = (todo) => ({type: TODO_REPLACE, payload: todo});
export const removeTodo = (id) => ({type: TODO_REMOVED, payload: id});

export const fetchTodos = () => (dispatch) => {
  dispatch(showMessage('Loading todos'));
  getTodos().then(todos => dispatch(loadTodos(todos)));
}
export const saveTodo = (name) => (dispatch) => {
  dispatch(showMessage('saving todo'))
  createTodo(name).then(res => dispatch(addTodo(res)));
}

export const toggleTodo = (id) => (dispatch, getState) => {
  dispatch(showMessage('Saving a todo'));
  const {todos} = getState().todo;
  const todo = todos.find(t => t.id === id);
  const toggled = {...todo, isComplete: !todo.isComplete};
  updateTodo(toggled).then(res => dispatch(replaceTodo(res)));
}

export const deleteTodo = (id) => (dispatch) => {
  dispatch(showMessage('Removing todo'));
  destroyTodo(id).then(() => dispatch(removeTodo(id)));
}

// Selector function
export const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'active':
      return todos.filter(t => !t.isComplete);
    case 'completed':
      return todos.filter(t => t.isComplete)
    default:
      return todos;
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return {...state, currentTodo: '', todos: state.todos.concat(action.payload)};
  
    case TODOS_LOAD:
      return {...state, todos: action.payload }

    case CURRENT_UPDATE:
     return {...state, currentTodo: action.payload};
    case TODO_REPLACE:
      return {...state, todos: state.todos.map(t => t.id === action.payload.id ? action.payload : t)};
    case TODO_REMOVED:
      return {...state, todos: state.todos.filter(t => t.id !== action.payload)};
    
      default:
      return state;
  }
  
}