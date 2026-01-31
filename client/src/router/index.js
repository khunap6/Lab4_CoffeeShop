import { createRouter, createWebHistory } from 'vue-router'

// User Components
import UserIndex from '../components/Users/Index.vue'
import UserCreate from '../components/Users/CreateUser.vue'
import UserEdit from '../components/Users/EditUser.vue'
import UserShow from '../components/Users/ShowUser.vue'

//Coffee
import CoffeeIndex from '../components/Coffees/Index.vue'
import CoffeeCreate from '../components/Coffees/CreateCoffee.vue'
import CoffeeEdit from '../components/Coffees/EditCoffee.vue'
import CoffeeShow from '../components/Coffees/ShowCoffee.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user-show',
      component: UserShow
    },
    //coffee
    {
      path: '/coffees',
      name: 'coffees',
      component: CoffeeIndex
    },
    {
      path: '/coffee/create',
      name: 'coffee-create',
      component: CoffeeCreate
    },
    {
      path: '/coffee/edit/:coffeeId',
      name: 'coffee-edit',
      component: CoffeeEdit
    },
    {
      path: '/coffee/:coffeeId',
      name: 'coffee-show',
      component: CoffeeShow
    }
  ]
})

export default router
