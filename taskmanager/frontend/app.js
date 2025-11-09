class TaskManager {
    constructor() {
        this.apiBase = 'http://localhost:5000/api';
        this.tasks = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.applyFilters();
    }

    bindEvents() {
        document.getElementById('taskForm').addEventListener('submit', (e) => this.handleCreateTask(e));
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.status;
                this.applyFilters();
            });
        });
    }

    async loadTasks() {
        this.showLoading(true);

        try {
            const response = await fetch(`${this.apiBase}/tasks`, {
                credentials: 'include'
            });

            if (response.ok) {
                this.tasks = await response.json();
                this.renderTasks();
            } else {
                console.error('Failed to load tasks');
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        } finally {
            this.showLoading(false);
        }
    }

    async handleCreateTask(e) {
        e.preventDefault();
        this.showLoading(true);

        const formData = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            priority: document.getElementById('taskPriority').value,
            due_date: document.getElementById('taskDueDate').value || null
        };

        try {
            const response = await fetch(`${this.apiBase}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newTask = await response.json();
                this.tasks.push(newTask);
                this.renderTasks();
                document.getElementById('taskForm').reset();
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to create task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task');
        } finally {
            this.showLoading(false);
        }
    }

    async updateTaskStatus(taskId, newStatus) {
        this.showLoading(true);

        try {
            const task = this.tasks.find(t => t.id === taskId);
            const response = await fetch(`${this.apiBase}/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    ...task,
                    status: newStatus
                })
            });

            if (response.ok) {
                const updatedTask = await response.json();
                const index = this.tasks.findIndex(t => t.id === taskId);
                this.tasks[index] = updatedTask;
                this.renderTasks();
            } else {
                alert('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task');
        } finally {
            this.showLoading(false);
        }
    }

    async deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) return;

        this.showLoading(true);

        try {
            const response = await fetch(`${this.apiBase}/tasks/${taskId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                this.tasks = this.tasks.filter(task => task.id !== taskId);
                this.renderTasks();
            } else {
                alert('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task');
        } finally {
            this.showLoading(false);
        }
    }

    renderTasks() {
        const container = document.getElementById('tasksContainer');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            container.innerHTML = '<div class="no-tasks">No tasks found</div>';
            return;
        }

        container.innerHTML = filteredTasks.map(task => `
            <div class="task-card ${task.priority}-priority">
                <div class="task-header">
                    <div class="task-info">
                        <div class="task-title">${this.escapeHtml(task.title)}</div>
                        ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                    </div>
                    <span class="status-badge status-${task.status}">${task.status.replace('_', ' ')}</span>
                </div>
                
                <div class="task-meta">
                    ${task.due_date ? `<span>Due: ${new Date(task.due_date).toLocaleDateString()}</span>` : ''}
                    <span>Priority: ${task.priority}</span>
                    <span>Created: ${new Date(task.created_at).toLocaleDateString()}</span>
                </div>
                
                <div class="task-actions">
                    ${task.status !== 'todo' ? `<button class="btn btn-secondary" onclick="taskManager.updateTaskStatus(${task.id}, 'todo')">Mark as Todo</button>` : ''}
                    ${task.status !== 'in_progress' ? `<button class="btn btn-warning" onclick="taskManager.updateTaskStatus(${task.id}, 'in_progress')">Mark In Progress</button>` : ''}
                    ${task.status !== 'done' ? `<button class="btn btn-success" onclick="taskManager.updateTaskStatus(${task.id}, 'done')">Mark Done</button>` : ''}
                    <button class="btn btn-danger" onclick="taskManager.deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    getFilteredTasks() {
        if (this.currentFilter === 'all') {
            return this.tasks;
        }
        return this.tasks.filter(task => task.status === this.currentFilter);
    }

    applyFilters() {
        this.renderTasks();
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    showLoading(show) {
        document.getElementById('loading').classList.toggle('hidden', !show);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
    window.taskManager = new TaskManager();
});