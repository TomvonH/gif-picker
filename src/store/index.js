import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'

import { getAllGifs } from "@/api/giphy.api";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,

  // Of course not the best place to store your favorites or other sensitive data.
  reducer: state => ({
    favorites: state.favorites,
  })
})

export default new Vuex.Store({
  state: {
    favorites: [],
    allGifs: []
  },
  getters: {
    allGifs: state => {
      return state.allGifs;
    },
    allFavorites: state => {
      return state.favorites;
    }
  },
  mutations: {
    addFavorite: (state, favorite) => {
      favorite["comments"] = [];
      favorite["isFavorite"] = true;
      state.favorites.push(favorite);
      console.log("add Fav: ", state.favorites)
    },
    removeFavorite: (state, payload) => {
      let i = state.favorites.map(item => item.id).indexOf(payload.id)

      payload.favorite["isFavorite"] = false;
      state.favorites.splice(i, 1)
    },
    setGifs: (state, gifs) => {
      gifs.forEach(gif => {
        gif["comments"] = [];
        gif["isFavorite"] = false;
        state.favorites.forEach(favorite => {
          if (gif.id === favorite.id) {
            gif["isFavorite"] = true;
          }
        });
      });
      state.allGifs = gifs;
    },
    resetGifs: (state) => {
      state.allGifs = []
      console.log("ALL_GIFS: ", state.allGifs)
    }


  },
  actions: {
    resetGifs: (context) => {
      context.commit("resetGifs");
    },
    fetchGifs: async (context, payload) => {
      const visibleItemsPerPageCount = 25;
      let offset = (payload.currentPage - 1) * visibleItemsPerPageCount;

      try {
        const response = await getAllGifs(
          payload.searchTerm,
          visibleItemsPerPageCount,
          offset
        );
        let gifs = response.data.data;
        context.commit("setGifs", gifs);
      } catch (error) {
        // handle the error here
      }
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin]

});
