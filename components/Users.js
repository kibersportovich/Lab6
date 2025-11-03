const UsersStruct = (users, onUserClick, onAddUser, onDeleteUser) => ({
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
                        textContent: 'Пользователи' 
                    }
                },
                {
                    tag: 'button',
                    options: {
                        className: 'btn btn--primary',
                        textContent: 'Добавить пользователя'
                    },
                    listeners: {
                        click: onAddUser
                    }
                },
                {
                    tag: 'div',
                    options: { className: 'users-grid' },
                    children: users.length > 0 ? users.map(user => ({
                        tag: 'div',
                        options: { className: 'user-card' },
                        children: [
                            {
                                tag: 'h3',
                                options: { 
                                    className: 'user-card__name',
                                    textContent: user.name 
                                }
                            },
                            {
                                tag: 'p',
                                options: { 
                                    className: 'user-card__email',
                                    textContent: user.email 
                                }
                            },
                            {
                                tag: 'p',
                                options: { 
                                    className: 'user-card__phone',
                                    textContent: user.phone 
                                }
                            },
                            {
                                tag: 'div',
                                options: { className: 'user-card__actions' },
                                children: [
                                    {
                                        tag: 'button',
                                        options: {
                                            className: 'btn btn--primary btn--small',
                                            textContent: 'Todos'
                                        },
                                        listeners: {
                                            click: () => onUserClick(user.id, 'todos')
                                        }
                                    },
                                    {
                                        tag: 'button',
                                        options: {
                                            className: 'btn btn--posts btn--small',
                                            textContent: 'Посты'
                                        },
                                        listeners: {
                                            click: () => onUserClick(user.id, 'posts')
                                        }
                                    },
                                    user.id > 10 && {
                                        tag: 'button',
                                        options: {
                                            className: 'btn btn--danger btn--small',
                                            textContent: 'Удалить'
                                        },
                                        listeners: {
                                            click: () => onDeleteUser(user.id)
                                        }
                                    }
                                ].filter(Boolean)
                            }
                        ]
                    })) : [{
                        tag: 'p',
                        options: { 
                            className: 'loading',
                            textContent: 'Пользователи не найдены' 
                        }
                    }]
                }
            ]
        }
    ]
});

export { UsersStruct };