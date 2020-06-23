<template>
  <div class="hero-bar">
    <h2>{{ title }}</h2>
    <div class="search-field">
      <input
        v-model="searchTerm"
        @keyup.enter="getGifs"
        type="text"
        :placeholder="placeholder"
        autofocus
        class="input"
      />
      <BaseButton class="btn-inverted" @click.native="getGifs">{{search}}</BaseButton>
      <BaseButton class="btn-inverted" @click.native="$router.push('favorites')">{{checkFavorites}}</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";
export default {
  components: {
    BaseButton
  },
  props: {
    title: String,
    placeholder: String
  },
  data() {
    return {
      searchTerm: "",
      search: "Search",
      checkFavorites: "Check my favorites"
    };
  },
  methods: {
    getGifs() {
      this.$emit("getGifs", this.searchTerm);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/_variables";

.input {
  background-color: transparent;
  color: $card-bg;
  width: auto;
  margin: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex-grow: 1;
  &:focus {
    border-color: $card-bg;
  }
  &::placeholder {
    color: lighten($card-bg, 20%);
  }
}
.search-field {
  display: flex;
  flex-basis: 50%;

  button:first-of-type {
    border-radius: 0;
    border-left-width: 0px;
  }
  button:last-of-type {
    border-top-left-radius: 0;
    border-left-width: 0px;
    border-bottom-left-radius: 0;
  }
}
</style>
