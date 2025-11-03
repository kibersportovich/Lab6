const PostsStruct = (posts, onPostClick) => ({
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
                        textContent: 'Посты пользователя' 
                    }
                },
                {
                    tag: 'div',
                    options: { className: 'posts-grid' },
                    children: posts.length > 0 ? posts.map(post => ({
                        tag: 'div',
                        options: { className: 'post-card' },
                        children: [
                            {
                                tag: 'h3',
                                options: { 
                                    className: 'post-card__title',
                                    textContent: post.title 
                                }
                            },
                            {
                                tag: 'p',
                                options: { 
                                    className: 'post-card__body',
                                    textContent: post.body 
                                }
                            },
                            {
                                tag: 'button',
                                options: {
                                    className: 'btn btn--primary',
                                    textContent: 'Комментарии'
                                },
                                listeners: {
                                    click: () => onPostClick(post.id)
                                }
                            }
                        ]
                    })) : [{
                        tag: 'p',
                        options: { 
                            className: 'loading',
                            textContent: 'Посты не найдены' 
                        }
                    }]
                }
            ]
        }
    ]
});

export { PostsStruct };