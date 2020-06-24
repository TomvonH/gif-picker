<template>
  <div>
    <div class="hero-bar">
      <div class="hero-container">
        <h2 class="hero-title" v-if="allFavorites.length > 0">{{ title }}</h2>
        <h2 class="hero-title" v-if="allFavorites.length <= 0">{{ titleNoFavorites }}</h2>
        <BaseButton class="btn-inverted" @click.native="goToHome">{{ addMoreFavorites }}</BaseButton>
      </div>
    </div>
    <div class="container">
        <img v-if="allFavorites.length <= 0" :src="noResult" style="padding-top: 40px"/>
      <transition-group name="fade" tag="div" class="favorite-container">
        <FavoriteItem
          v-for="favorite in showNumberOfFavorites"
          :gif="favorite"
          :key="favorite.id"
          :isFavorite="favorite.isFavorite"
          :comments="favorite.comments"
          @removeFromFavorites="removeFromFavorites(favorite, favorite.id)"
          @openGifInModal="openGifInModal(favorite)"
        />
      </transition-group>
      <Pagination
        v-if="allFavorites.length > 0"
        :current-page="currentPage"
        :page-count="pageCount"
        @nextPage="pageChangeHandle('next')"
        @previousPage="pageChangeHandle('previous')"
        @loadPage="pageChangeHandle"
      />
    </div>
    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>{{ gif.title }}</template>
      <template v-slot:body>
        <img :src="`https://media.giphy.com/media/${gif.id}/giphy.gif`" />
        <Comments :comments="gif.comments" />
      </template>
    </Modal>
  </div>
</template>

<script>
import router from "@/router";

import FavoriteItem from "./FavoriteItem";
import Comments from "./Comments";
import Modal from "./Modal";
import BaseButton from "./BaseButton";
import Pagination from "./Pagination";
export default {
  components: {
    FavoriteItem,
    Modal,
    Comments,
    BaseButton,
    Pagination
  },
  data() {
    return {
      noResult: "https://media.giphy.com/media/11R5KYi6ZdP8Z2/giphy.gif",
      isModalVisible: false,
      gif: {},
      title:
        "Welcome to your Favorites! Is there anything else you want to add?",
      titleNoFavorites: "Looks like you don't have any favorites yet.",
      addMoreFavorites: "Add more favorites",
      currentPage: 1,
      pageCount: 0,
      nrOfItems: 12
    };
  },
  mounted() {
    this.pageCount = Math.ceil(this.allFavorites.length / this.nrOfItems);
  },
  computed: {
    allFavorites() {
      return this.$store.getters.allFavorites;
    },
    showNumberOfFavorites() {
      return this.allFavorites.slice(
        (this.currentPage - 1) * this.nrOfItems,
        this.currentPage * this.nrOfItems
      );
    }
  },
  methods: {
    removeFromFavorites(favorite, id) {
      this.$store.commit("removeFavorite", { favorite, id });
      this.pageCount = Math.ceil(this.allFavorites.length / this.nrOfItems);
      if (this.showNumberOfFavorites.length <= 0) {
        this.currentPage -= 1;
      }
    },
    openGifInModal(favorite) {
      this.gif = favorite;
      this.showModal();
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    goToHome() {
      router.push("/");
    },
    pageChangeHandle(value) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-leave-active {
  transition: all 0.15s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.15s ease-out;
  transition-delay: 0.15s;
}
.fade-leave-to,
.fade-enter {
  opacity: 0;
}
</style>
