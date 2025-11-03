import Component from './components/Generator.js';
import { HeaderStruct } from './components/Header.js';
import { BreadcrumbsStruct } from './components/Breadcrumbs.js';
import { SearchStruct } from './components/Search.js';
import { UsersStruct } from './components/Users.js';
import { TodosStruct } from './components/Todos.js';
import { PostsStruct } from './components/Posts.js';
import { CommentsStruct } from './components/Comments.js';

import Router from './utils/Router.js';
import Storage from './utils/Storage.js';
import Api from './utils/Api.js';

class App {
    constructor() {
        this.router = new Router();
        this.storage = new Storage();
        this.api = new Api();
        
        this.currentData = {
            users: [],
            todos: [],
            posts: [],
            comments: []
        };
        
        this.searchQuery = '';
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const app = document.getElementById('app');
        app.innerHTML = '';

        this.renderHeader(app);
        this.renderBreadcrumbs(app);
        this.renderSearch(app);
        this.renderContent(app);
    }

    renderHeader(parent) {
        const Header = new Component(HeaderStruct());
        Header.render(parent);
    }

    renderBreadcrumbs(parent) {
        const breadcrumbsItems = this.getBreadcrumbs();
        const Breadcrumbs = new Component(BreadcrumbsStruct(breadcrumbsItems));
        Breadcrumbs.render(parent);
    }

    renderSearch(parent) {
        const debouncedSearch = this.debounce(this.handleSearch.bind(this), 300);
        const Search = new Component(SearchStruct(debouncedSearch));
        Search.render(parent);
    }

    renderContent(parent) {
        const contentContainer = document.createElement('div');
        contentContainer.id = 'content-container';
        parent.appendChild(contentContainer);

        this.loadContent();
    }

    async loadContent() {
        const contentContainer = document.getElementById('content-container');
        if (!contentContainer) return;

        this.showLoading(contentContainer);

        try {
            const route = this.router.getCurrentRoute();
            const params = this.router.getParams();

            switch (route) {
                case 'users':
                    await this.loadUsers();
                    break;
                case 'users#todos':
                    if (params.userId) {
                        await this.loadTodos(parseInt(params.userId));
                    }
                    break;
                case 'users#posts':
                    if (params.userId) {
                        await this.loadPosts(parseInt(params.userId));
                    }
                    break;
                case 'users#posts#comments':
                    if (params.postId) {
                        await this.loadComments(parseInt(params.postId));
                    }
                    break;
            }
        } catch (error) {
            this.showError(contentContainer, 'Ошибка загрузки данных');
        }
    }

    async loadUsers() {
        const contentContainer = document.getElementById('content-container');
        const apiUsers = await this.api.getUsers();
        const localUsers = this.storage.getUsers();
        this.currentData.users = [...apiUsers, ...localUsers];
        
        const filteredUsers = this.filterUsers(this.currentData.users);
        this.renderUsersContent(contentContainer, filteredUsers);
    }

    async loadTodos(userId) {
        const contentContainer = document.getElementById('content-container');
        const apiTodos = await this.api.getUserTodos(userId);
        const localTodos = this.storage.getTodos(userId);
        this.currentData.todos = [...apiTodos, ...localTodos];
        
        const filteredTodos = this.filterTodos(this.currentData.todos);
        this.renderTodosContent(contentContainer, filteredTodos, userId);
    }

    async loadPosts(userId) {
        const contentContainer = document.getElementById('content-container');
        this.currentData.posts = await this.api.getUserPosts(userId);
        
        const filteredPosts = this.filterPosts(this.currentData.posts);
        this.renderPostsContent(contentContainer, filteredPosts);
    }

    async loadComments(postId) {
        const contentContainer = document.getElementById('content-container');
        this.currentData.comments = await this.api.getPostComments(postId);
        
        const filteredComments = this.filterComments(this.currentData.comments);
        this.renderCommentsContent(contentContainer, filteredComments);
    }

    // Фильтрация данных для поиска
    filterUsers(users) {
        if (!this.searchQuery) return users;
        return users.filter(user =>
            user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    filterTodos(todos) {
        if (!this.searchQuery) return todos;
        return todos.filter(todo =>
            todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    filterPosts(posts) {
        if (!this.searchQuery) return posts;
        return posts.filter(post =>
            post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    filterComments(comments) {
        if (!this.searchQuery) return comments;
        return comments.filter(comment =>
            comment.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            comment.body.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    // Рендеринг контента
    renderUsersContent(container, users) {
        container.innerHTML = '';
        const Users = new Component(UsersStruct(
            users,
            this.handleUserClick.bind(this),
            this.handleAddUser.bind(this),
            this.handleDeleteUser.bind(this)
        ));
        Users.render(container);
    }

    renderTodosContent(container, todos, userId) {
        container.innerHTML = '';
        const Todos = new Component(TodosStruct(
            todos,
            userId,
            this.handleAddTodo.bind(this)
        ));
        Todos.render(container);
    }

    renderPostsContent(container, posts) {
        container.innerHTML = '';
        const Posts = new Component(PostsStruct(
            posts,
            this.handlePostClick.bind(this)
        ));
        Posts.render(container);
    }

    renderCommentsContent(container, comments) {
        container.innerHTML = '';
        const Comments = new Component(CommentsStruct(comments));
        Comments.render(container);
    }

    // Обработчики событий
    handleSearch(event) {
        this.searchQuery = event.target.value;
        this.loadContent();
    }

    handleUserClick(userId, type) {
        if (type === 'todos') {
            this.router.navigate('users#todos', { userId });
        } else if (type === 'posts') {
            this.router.navigate('users#posts', { userId });
        }
    }

    handlePostClick(postId) {
        this.router.navigate('users#posts#comments', { postId });
    }

    handleAddUser() {
        const name = prompt('Введите имя пользователя:');
        const email = prompt('Введите email:');
        const phone = prompt('Введите телефон:');
        
        if (name && email) {
            const newUser = this.storage.addUser({ name, email, phone });
            this.loadContent();
        }
    }

    handleDeleteUser(userId) {
        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            this.storage.deleteUser(userId);
            this.loadContent();
        }
    }

    handleAddTodo(userId) {
        const title = prompt('Введите название задачи:');
        if (title) {
            const newTodo = this.storage.addTodo(userId, {
                title,
                completed: false
            });
            this.loadContent();
        }
    }

    // Вспомогательные методы
    getBreadcrumbs() {
        const route = this.router.getCurrentRoute();
        const params = this.router.getParams();
        
        const breadcrumbs = [
            { name: 'Пользователи', path: '#users' }
        ];

        if (route === 'users#todos' && params.userId) {
            breadcrumbs.push({ name: 'Задачи', path: `#users#todos?userId=${params.userId}` });
        } else if (route === 'users#posts' && params.userId) {
            breadcrumbs.push({ name: 'Посты', path: `#users#posts?userId=${params.userId}` });
        } else if (route === 'users#posts#comments' && params.postId) {
            breadcrumbs.push({ name: 'Посты', path: `#users#posts?userId=${params.userId}` });
            breadcrumbs.push({ name: 'Комментарии', path: `#users#posts#comments?postId=${params.postId}` });
        }

        return breadcrumbs;
    }

    showLoading(container) {
        container.innerHTML = `
            <div class="loading">
                <div class="loading__spinner"></div>
                <p>Загрузка...</p>
            </div>
        `;
    }

    showError(container, message) {
        container.innerHTML = `
            <div class="content">
                <div class="container">
                    <div class="loading">
                        <p>${message}</p>
                    </div>
                </div>
            </div>
        `;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    setupEventListeners() {
        window.addEventListener('hashchange', () => {
            this.searchQuery = '';
            document.getElementById('searchInput').value = '';
            this.render();
        });
    }
}

// Инициализация приложения
new App();