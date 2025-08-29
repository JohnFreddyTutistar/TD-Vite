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

export default {
    initStore,
}