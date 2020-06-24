<template>
  <div>
    <transition name="sliding">
      <div class="hero" v-if="allGifs.length <= 0">
        <img :src="src" />
      </div>
    </transition>
    <MainSearch @getGifs="getGifs($event)" :title="searchTitle" :placeholder="placeholder" />
    <transition name="fade" mode="out-in">
      <div class="container" v-if="allGifs.length > 0" :key="allGifs[0].id">
        <GiphsList :gifs="allGifs" />
        <Pagination
          :current-page="currentPage"
          :page-count="pageCount"
          @nextPage="pageChangeHandle('next')"
          @previousPage="pageChangeHandle('previous')"
          @loadPage="pageChangeHandle"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import GiphsList from "./GiphsList";
import Pagination from "./Pagination";
import MainSearch from "./MainSearch";

export default {
  name: "SearchBox",
  components: {
    GiphsList,
    Pagination,
    MainSearch
  },
  props: {
    message: String
  },
  computed: {
    allGifs() {
      return this.$store.getters.allGifs;
    },
    allFavorites() {
      return this.$store.getters.allFavorites;
    }
  },

  data() {
    return {
      pageCount: 0,
      currentPage: 1,
      src: "https://media.giphy.com/media/Xy6nEr568Vy9WAofEI/giphy.gif",
      searchTitle: "What are you looking for?",
      placeholder: "Just type anything you want!"
    };
  },
  mounted() {
    this.$store.dispatch("resetGifs");
  },
  methods: {
    async getGifs(newSearchTerm) {
      this.searchTerm = newSearchTerm;
      this.currentPage = 1;
      await this.dispatchGifs({
        searchTerm: this.searchTerm,
        currentPage: this.currentPage
      });
    },
    dispatchGifs({ searchTerm, currentPage }) {
      this.gifs = this.$store.dispatch("fetchGifs", {
        searchTerm: searchTerm,
        currentPage: currentPage
      });
    },

    async pageChangeHandle(value) {
      switch (value) {
        case "next":
          this.currentPage += 1;
          break;
        case "previous":
          this.currentPage -= 1;
          break;
        default:
          this.currentPage = value;
      }
      await this.dispatchGifs({
        searchTerm: this.searchTerm,
        currentPage: this.currentPage
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  transition-delay: 0.2s;
}
.fade-enter {
  opacity: 0;
}

.sliding-leave-active {
  transition: all 0.2s ease-out;
}
.sliding-leave-to {
  height: 0;
}
</style>
