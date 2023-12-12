import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import TasksView from '../views/TasksView.vue'
import NewTaskView from '../views/AddTaskView.vue'
import AssignedTaskView from '../views/AssignedTaskView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView
    },
    {
      path: '/new-task',
      name: 'new-task',
      component: NewTaskView
    },
    {
      path: '/assigned-tasks',
      name: 'assigned-tasks',
      component: AssignedTaskView
    }
  ]
})

export default router
