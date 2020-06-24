<template>
  <div>
    <div class="hero-bar">
      <div class="hero-container">
        <h2 class="hero-title" v-if="allFavorites.length > 0">{{ title }}</h2>
        <h2 class="hero-title" v-if="allFavorites.length <= 0">{{ titleNoFavorites }}</h2>
        <BaseButton class="btn-inverted" @click.native="goToHome">{{ addMoreFavorites }}</BaseButton>
      </div>
    </div>
    <transition-group name="fade-slide" tag="div" class="favorite-container">
      <FavoriteItem
        v-for="favorite in allFavorites"
        :gif="favorite"
        :key="favorite.id"
        :isFavorite="favorite.isFavorite"
        :comments="favorite.comments"
        @removeFromFavorites="removeFromFavorites(favorite, favorite.id)"
        @openGifInModal="openGifInModal(favorite)"
      />
    </transition-group>

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
export default {
  components: {
    FavoriteItem,
    Modal,
    Comments,
    BaseButton
  },
  data() {
    return {
      isModalVisible: false,
      gif: {},
      title:
        "Welcome to your Favorites! Is there anything else you want to add?",
      titleNoFavorites: "Looks like you dont' have favorites yet.",
      addMoreFavorites: "Add more favorites"
    };
  },
  computed: {
    allFavorites() {
      return this.$store.getters.allFavorites;
    }
  },
  methods: {
    removeFromFavorites(favorite, id) {
      this.$store.commit("removeFavorite", { favorite, id });
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
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-slide-leave-active {
  transition: all 0.15s ease-out;
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
