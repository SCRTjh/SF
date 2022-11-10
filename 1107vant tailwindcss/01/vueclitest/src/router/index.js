import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import My from "../views/My.vue"
import Order from "../views/Order.vue"
import Category from "../views/Category.vue"
import ChooseFood from "../views/ChooseFood.vue"
import FoodDetail from "../views/FoodDetail.vue"
import Register from "../views/Register.vue"
import ShopCartList from "../views/ShopCartList.vue";


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: {
        name: "ChooseFood"
      }
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
      children: [
        {
          path: "ChooseFood",
          name: "ChooseFood",
          component: ChooseFood,
        },
        {
          path: "Order",
          name: "Order",
          component: Order,
        },
        {
          path: "Category",
          name: "Category",
          component: Category
        },
        {
          path: "My",
          name: "My",
          component: My
        }
      ]
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/FoodDetail/:id",
      name: "FoodDetail",
      component: FoodDetail
    },
    {
      path: "/Register",
      name: "Register",
      component: Register
    },
    {
      path: "/ShopCartList",
      name: "ShopCartList",
      component: ShopCartList
    },

  ]
})

export default router