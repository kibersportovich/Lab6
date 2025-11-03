const TodosStruct = (todos, userId, onAddTodo) => ({
    tag: 'div',
    options: { className: 'content' },
    children: [
        {
            tag: 'div',
            options: { className: 'container' },
            children: [
                {
                    tag: 'h2',
                    options: { 
                        className: 'section__title',
                        textContent: 'Список задач' 
                    }
                },
                {
                    tag: 'button',
                    options: {
                        className: 'btn btn--primary',
                        textContent: 'Добавить задачу'
                    },
                    listeners: {
                        click: () => onAddTodo(userId)
                    }
                },
                {
                    tag: 'div',
                    options: { className: 'todos-list' },
                    children: todos.length > 0 ? todos.map(todo => ({
                        tag: 'div',
                        options: { 
                            className: `todo-item ${todo.completed ? 'todo-item--completed' : ''}` 
                        },
                        children: [
                            {
                                tag: 'input',
                                options: {
                                    className: 'todo-item__checkbox',
                                    type: 'checkbox',
                                    checked: todo.completed,
                                    disabled: true
                                }
                            },
                            {
                                tag: 'span',
                                options: { 
                                    className: 'todo-item__title',
                                    textContent: todo.title 
                                }
                            },
                            todo.completed && {
                                tag: 'span',
                                options: { 
                                    className: 'todo-item__completed',
                                    textContent: 'Выполнено' 
                                }
                            }
                        ].filter(Boolean)
                    })) : [{
                        tag: 'p',
                        options: { 
                            className: 'loading',
                            textContent: 'Задачи не найдены' 
                        }
                    }]
                }
            ]
        }
    ]
});

export { TodosStruct };