import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "/",
            component: () => import("../layouts/main.vue"),
            children: [
                {
                    path: "/",
                    name: "/home",
                    component: () => import("../views/Home.vue"),
                },
                {
                    path: "/remain-vagons",
                    name: "/remain-vagons",
                    component: () => import("../views/Metrology/Metrology.vue"),
                },
                {
                    path: "/metrology/create",
                    name: "/metrology/create",
                    component: () => import("../views/Metrology/Create.vue"),
                },
                {
                    path: "/metrology/update/:id",
                    name: "/metrology/update",
                    component: () => import("../views/Metrology/Update.vue"),
                },
                {
                    path: "/remain-vagons",
                    name: "/remain-vagons",
                    component: () => import("../views/RemainVagons.vue"),
                },
                {
                    path: "/user",
                    name: "/user",
                    component: () => import("../views/User.vue"),
                },
                {
                    path: "/region",
                    name: "/region",
                    component: () => import("../views/Region.vue"),
                },
                {
                    path: "/depo",
                    name: "/depo",
                    component: () => import("../views/Depo.vue"),
                },
                {
                    path: "/owner",
                    name: "/owner",
                    component: () => import("../views/Owner.vue"),
                },
                {
                    path: "/vagon-type",
                    name: "/vagon-type",
                    component: () => import("../views/VagonType.vue"),
                },
                {
                    path: "/repair-type",
                    name: "/repair-type",
                    component: () => import("../views/RepairType.vue"),
                },
            ],
        },
        {
            path: "/login",
            name: "/login",
            component: () => import("../views/Login.vue"),
        },
    ],
});

export default router;
