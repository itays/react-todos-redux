import { getTodos, createTodo } from '../lib/todoServices';
const initState = {
  todos: [],
  currentTodo: ''
};

const CURRENT_UPDATE = 'CURRENT_UPDATE';
const TODO_ADD = 'TODO_ADD';
const TODOS_LOAD = 'TODOS_LOAD';

// Action creatos - functions that returns an action object
export const updateCurrent = (val) => ({ type: CURRENT_UPDATE, payload: val});
export const loadTodos = (todos) => ({ type: TODOS_LOAD, payload: todos});
export const addTodo = (todo) => ({type: TODO_ADD, payload: todo});

export const fetchTodos = () => (dispatch) => getTodos().then(todos => dispatch(loadTodos(todos)));
export const saveTodo = (name) => (dispatch) => createTodo(name).then(res => dispatch(addTodo(res)));

export default (state = initState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return {...state, currentTodo: '', todos: state.todos.concat(action.payload)};
  
    case TODOS_LOAD:
      return {...state, todos: action.payload }

    case CURRENT_UPDATE:
     return {...state, currentTodo: action.payload};
    default:
      return state;
  }
  
}