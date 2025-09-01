import { Todo } from "../todos/models/todo.model"

const Filter = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
    ],
    filter: Filter.All,
}

const initStore = () => {
    console.log(state)
  console.log('init store 🍏')
}


const loadStore = () => {
    throw new Error('no implementado');
}

///// Funcionalidades básicas del TODO ///////////

const getTodos = ( filter = Filter.All ) => {
    switch( filter ){
        case Filter.All:
            return [...state.todos]

        case Filter.Completed:
            return state.todos.filter( todo => todo.done )

        case Filter.Pending:
            return state.todos.filter( todo => !todo.done )

        default: 
            throw new Error(`Option ${filter} is not valid`)
    }
}

/**
 * 
 * @param {string} description 
 */
const addTodo = ( description ) => {
    if( !description) throw new Error('description is required');

    state.todos.push( new Todo(description))
}

/**
 * 
 * @param {String} todoId todoIdentifier
 */
const toggleTodo = ( todoId ) => {

    state.todos = state.todos.map( todo => {
        if(todo.id === todoId){
            todo.done = !todo.done
        }
        return todo;
    });

}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId)
}

const deleteCompleted = () => {
    state.todos = state.filter(todo => todo.done )
}

const setFilter = ( newFilter = Filter.All ) => {
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}