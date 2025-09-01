import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./uses-cases";

const elementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {
  
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() )
        renderTodos( elementIds.TodoList, todos )
        
    }

    // Cuando la funcion App se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html
        document.querySelector(elementId).append( app )
        displayTodos();
    })()

    // Referencias HTML

    const newDescriptionInput = document.querySelector( elementIds.NewTodoInput );
    const todoListUL = document.querySelector( elementIds.TodoList );
    // const buttonDestroy = document.querySelector( elementIds.Destroy )

    // Listener

    newDescriptionInput.addEventListener('keyup', (e) => {
        if(e.keyCode !== 13) return;
        if(e.target.value.trim().lenth === 0) return

        todoStore.addTodo( e.target.value )
        displayTodos()

        e.target.value = '';
    })

    todoListUL.addEventListener('click', (e) => {
        const element = e.target.closest('[data-id]')
        const getIds = element.getAttribute('data-id')

        todoStore.toggleTodo( getIds )
        displayTodos()
    })

    todoListUL.addEventListener('click', (e) => {
        const isDestroyElement = e.target.className === 'destroy';
        const element = e.target.closest('[data-id]')

        if( !element || !isDestroyElement ) return

        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos()
    })

}