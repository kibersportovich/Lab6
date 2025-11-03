class Router {
    constructor() {
        this.routes = {
            'users': this.showUsers.bind(this),
            'users#todos': this.showTodos.bind(this),
            'users#posts': this.showPosts.bind(this),
            'users#posts#comments': this.showComments.bind(this)
        };
        
        this.currentRoute = 'users';
        this.params = {};
        
        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.handleHashChange.bind(this));
        this.handleHashChange();
    }

    handleHashChange() {
        const hash = window.location.hash.slice(1) || 'users';
        const [route, queryString] = hash.split('?');
        
        this.currentRoute = route;
        this.params = this.parseQueryString(queryString);
        
        if (this.routes[this.currentRoute]) {
            this.routes[this.currentRoute]();
        } else {
            this.navigate('users');
        }
    }

    parseQueryString(queryString) {
        const params = {};
        if (queryString) {
            queryString.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value);
            });
        }
        return params;
    }

    buildQueryString(params) {
        return Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
    }

    navigate(route, params = {}) {
        let url = `#${route}`;
        if (Object.keys(params).length > 0) {
            url += `?${this.buildQueryString(params)}`;
        }
        window.location.hash = url;
    }

    showUsers() {
        // Будет вызвано из main App
    }

    showTodos() {
        // Будет вызвано из main App
    }

    showPosts() {
        // Будет вызвано из main App
    }

    showComments() {
        // Будет вызвано из main App
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    getParams() {
        return this.params;
    }
}

export default Router;