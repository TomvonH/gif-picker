<template>
  <div class="img-container">
    <div class="column" v-for="gifs in chunkedGifs" :key="gifs.id">
      <GiphItem
        v-for="gif in gifs"
        :gif="gif"
        :isFavorite="gif.isFavorite"
        :key="gif.id"
        @addToFavorites="addToFavorites(gif)"
        @removeFromFavorites="removeFromFavorites(gif, gif.id)"
      />
    </div>
  </div>
</template>

<script>
import GiphItem from "./GiphItem";
import chunk from "chunk";

export default {
  components: {
    GiphItem
  },
  props: {
    gifs: Array
  },
  computed: {
    chunkedGifs() {
      return chunk(this.gifs, 5);
    }
  },

  methods: {
    addToFavorites(favorite) {
      this.$store.commit("addFavorite", favorite);
    },
    removeFromFavorites(favorite, id) {
      this.$store.commit("removeFavorite", { favorite, id });
    }
  }
};
</script>