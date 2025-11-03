class Api {
    async _get(path) {
        const res = await fetch(path);
        if (!res.ok) throw new Error($`Failed to load ${path}: ${res.status}`);
        return res.json();
    }

    async getUsers() {
        return this._get('./data/users.json');
    }

    async getUserTodos(userId) {
        const all = await this._get('./data/todos.json');
        return all.filter(t => t.userId === userId);
    }

    async getUserPosts(userId) {
        const all = await this._get('./data/posts.json');
        return all.filter(p => p.userId === userId);
    }

    async getPostComments(postId) {
        const all = await this._get('./data/comments.json');
        return all.filter(c => c.postId === postId);
    }
}

export default Api;