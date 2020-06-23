<template>
  <div class="hero-bar" v-bind:class="{ 'pb-lg': allGifs.length <= 0 }">
    <h2 class="hero-title" v-bind:class="{ 'hero-title-lg': allGifs.length <= 0 }">{{ title }}</h2>
    <div class="search-field" v-bind:class="{ 'search-field-lg': allGifs.length <= 0 }">
      <input
        v-model="searchTerm"
        @keyup.enter="getGifs"
        type="text"
        :placeholder="placeholder"
        autofocus
        class="input"
      />
      <BaseButton class="btn-inverted" @click.native="getGifs">{{search}}</BaseButton>
      <h2 class="search-field-inline">or</h2>
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
  computed: {
    allGifs() {
      return this.$store.getters.allGifs;
    }
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
  transition: all 0.2s ease-in;

  button:first-of-type {
    border-left-width: 0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  button:last-of-type {
    margin-left: 10px;
  }
}
.hero-bar,
.hero-title {
  transition: all 0.2s ease-in;
}
.hero-title-lg {
  padding-bottom: 24px;
  transform: translateZ(0) scale(1.5, 1.5);
  backface-visibility: hidden;
}
.pb-lg {
  padding-bottom: 100px;
}

.search-field-lg {
  transform: translateZ(0) scale(1.5, 1.5);
  backface-visibility: hidden;
}

.search-field-inline {
  flex-basis: 0;
  margin: auto;
  margin-left: 10px;
  color: $card-bg;
}
</style>
