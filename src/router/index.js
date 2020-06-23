import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Favorites from "../views/Favorites.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Pick the Gifs you like',
    }
  },

  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
    meta: {
      title: 'My Favorite Gifs',
    }
  }
];



const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Your Website Title';
  next();
});

export default router;
