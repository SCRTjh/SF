import { createRouter, createWebHashHistory } from "vue-router"

import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
import ChooseFood from "../views/ChooseFood.vue";
import Order from "../views/Order.vue";
import My from "../views/My.vue";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: {
                name: "Home"
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

    ]
})


export default router;