import todoStore, { Filter } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPending } from "./uses-cases";

const elementIds = {
    PendingCountLabel: '#pending-count',
    TodoFilters: '.filtro',
    ClearCompleted: '.clear-completed',
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
        updatePendingCount()
        
    }

    const updatePendingCount = () => {
        renderPending( elementIds.PendingCountLabel )
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
    const clearCompleted = document.querySelector( elementIds.ClearCompleted );
    const filtersLI = document.querySelectorAll( elementIds.TodoFilters );
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

    clearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted()
        displayTodos()
    })

    filtersLI.forEach(element => 
        element.addEventListener('click', (element) => {
            filtersLI.forEach( el => {
                el.classList.remove('selected')
            } )
            element.target.classList.add('selected')

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter( Filter.All )
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filter.Pending )
                    break;
                case 'Completados':
                    todoStore.setFilter( Filter.Completed )
                    break;

            }

            displayTodos()
        })
    )

}