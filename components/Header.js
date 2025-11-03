const HeaderStruct = () => ({
    tag: 'header',
    options: { className: 'header' },
    children: [
        {
            tag: 'div',
            options: { className: 'container' },
            children: [
                {
                    tag: 'div',
                    options: { className: 'header__content' },
                    children: [
                        {
                            tag: 'h1',
                            options: { 
                                className: 'header__title',
                                textContent: '1488production'
                            }
                        },
                        {
                            tag: 'nav',
                            options: { className: 'header__nav' },
                            children: [
                                {
                                    tag: 'a',
                                    options: {
                                        className: 'nav__link',
                                        href: '#users',
                                        textContent: 'Пользователи'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

export { HeaderStruct };