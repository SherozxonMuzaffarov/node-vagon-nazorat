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
                    redirect: {path: '/remain-vagons'}
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
                    path: "/owner-company",
                    name: "/owner-company",
                    component: () => import("../views/OwnerCompany.vue"),
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
                {
                    path: "/remain-vagons",
                    name: "/remain-vagons",
                    component: () => import("../views/RemainVagons.vue"),
                },
                {
                    path: "/vagon/repairing-vagons",
                    name: "/vagon/repairing-vagons",
                    component: () => import("../views/RepairingVagons.vue"),
                },
                {
                    path: "/vagons/repaired-vagons",
                    name: "/vagons/repaired-vagons",
                    component: () => import("../views/RepairedVagons.vue"),
                }
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
