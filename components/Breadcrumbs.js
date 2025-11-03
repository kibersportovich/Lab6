const BreadcrumbsStruct = (items) => ({
    tag: 'nav',
    options: { className: 'breadcrumbs' },
    children: [
        {
            tag: 'div',
            options: { className: 'container' },
            children: [
                {
                    tag: 'ul',
                    options: { className: 'breadcrumbs__list' },
                    children: items.map((item, index) => ({
                        tag: 'li',
                        options: { className: 'breadcrumbs__item' },
                        children: [
                            index < items.length - 1 ? {
                                tag: 'a',
                                options: {
                                    className: 'breadcrumbs__link',
                                    href: item.path,
                                    textContent: item.name
                                }
                            } : {
                                tag: 'span',
                                options: {
                                    className: 'breadcrumbs__current',
                                    textContent: item.name
                                }
                            },
                            index < items.length - 1 && {
                                tag: 'span',
                                options: {
                                    className: 'breadcrumbs__separator',
                                    textContent: '›'
                                }
                            }
                        ].filter(Boolean)
                    }))
                }
            ]
        }
    ]
});

export { BreadcrumbsStruct };