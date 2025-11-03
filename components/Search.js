const SearchStruct = (onSearch) => ({
    tag: 'div',
    options: { className: 'search' },
    children: [
        {
            tag: 'div',
            options: { className: 'container' },
            children: [
                {
                    tag: 'input',
                    options: {
                        className: 'search__input',
                        type: 'text',
                        placeholder: 'Поиск...',
                        id: 'searchInput'
                    },
                    listeners: {
                        input: onSearch
                    }
                }
            ]
        }
    ]
});

export { SearchStruct };