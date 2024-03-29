import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      children: [
        {
          path: '/employee',
          name: 'Employee',
          component: () => import('../views/Employee/Employee.vue')
        },
        {
          path: '/product',
          name: 'Product',
          component: () => import('../views/Product/Product.vue')
        },
        {
          path: '/product-type',
          name: 'ProductType',
          component: () => import('../views/Product/ProductType.vue')
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('../views/Order/Order.vue')
        },
        {
          path: '/contact',
          name: 'Contact',
          component: () => import('../views/Contact/Contact.vue')
        },
        {
          path: '/region',
          name: 'Region',
          component: () => import('../views/Region/Region.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/Login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error',
      component: () => import('../views/Error/Error.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name != 'Login' && !localStorage.getItem('token')) {
    next('/login')
  } else if (to.name == 'Login' && localStorage.getItem('token')) {
    next('/')
  } else {
    next()
  }
})

export default router
