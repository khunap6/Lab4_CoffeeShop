import { createRouter, createWebHistory } from 'vue-router'

// Import Components
import MenuCreate from '../components/Menus/CreateMenu.vue'
import MenuEdit from '../components/Menus/EditMenu.vue'
import MenusShow from '../components/Menus/ShowMenu.vue'
import MenuIndex from '../components/Menus/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/menus',
      name: 'menus',
      component: MenuIndex
    },
    {
      path: '/menu/create',
      name: 'menus-create',
      component: MenuCreate
    },
    {
      path: '/menu/edit',
      name: 'menu-edit',
      component: MenuEdit
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenusShow
    }
  ]
})

export default router
