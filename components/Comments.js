const CommentsStruct = (comments) => ({
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
                        textContent: 'Комментарии к посту' 
                    }
                },
                {
                    tag: 'div',
                    options: { className: 'comments-list' },
                    children: comments.length > 0 ? comments.map(comment => ({
                        tag: 'div',
                        options: { className: 'comment-item' },
                        children: [
                            {
                                tag: 'h4',
                                options: { 
                                    className: 'comment-item__name',
                                    textContent: comment.name 
                                }
                            },
                            {
                                tag: 'p',
                                options: { 
                                    className: 'comment-item__email',
                                    textContent: comment.email 
                                }
                            },
                            {
                                tag: 'p',
                                options: { 
                                    className: 'comment-item__body',
                                    textContent: comment.body 
                                }
                            }
                        ]
                    })) : [{
                        tag: 'p',
                        options: { 
                            className: 'loading',
                            textContent: 'Комментарии не найдены' 
                        }
                    }]
                }
            ]
        }
    ]
});

export { CommentsStruct };