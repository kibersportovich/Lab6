class Storage {
    constructor() {
        this.storageKey = 'jsonplaceholder-spa';
    }

    get(key) {
        try {
            const data = localStorage.getItem(`${this.storageKey}-${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    set(key, value) {
        try {
            localStorage.setItem(`${this.storageKey}-${key}`, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(`${this.storageKey}-${key}`);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }

    // Методы для работы с пользователями
    getUsers() {
        return this.get('users') || [];
    }

    addUser(user) {
        const users = this.getUsers();
        const newUser = {
            ...user,
            id: Date.now(), // Генерируем уникальный ID
            isLocal: true
        };
        users.push(newUser);
        this.set('users', users);
        return newUser;
    }

    deleteUser(userId) {
        const users = this.getUsers().filter(user => user.id !== userId);
        this.set('users', users);
        
        // Также удаляем todos пользователя
        this.remove(`todos_${userId}`);
    }

    // Методы для работы с задачами
    getTodos(userId) {
        return this.get(`todos_${userId}`) || [];
    }

    addTodo(userId, todo) {
        const todos = this.getTodos(userId);
        const newTodo = {
            ...todo,
            id: Date.now(),
            userId: userId,
            isLocal: true
        };
        todos.push(newTodo);
        this.set(`todos_${userId}`, todos);
        return newTodo;
    }
}

export default Storage;