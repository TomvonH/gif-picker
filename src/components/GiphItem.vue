<template>
  <div class="img-item">
    <img :src="setSrc" />
    <button @click.prevent="addToFavorites" v-if="!isFavorite">
      <heart-outline-icon></heart-outline-icon>
    </button>
    <button @click.prevent="removeFromFavorites" v-if="isFavorite" class="is-active">
      <heart-icon></heart-icon>
    </button>
    <transition name="slide">
      <span v-if="isFavorite" class="img-state">{{saved}}</span>
    </transition>
  </div>
</template>

<script>
import HeartIcon from "vue-material-design-icons/Heart.vue";
import HeartOutlineIcon from "vue-material-design-icons/HeartOutline.vue";

export default {
  components: {
    HeartIcon,
    HeartOutlineIcon
  },
  data() {
    return {
      saved: "Saved"
    };
  },
  computed: {
    setSrc() {
      return `https://media.giphy.com/media/${this.gif.id}/200w.gif`;
    }
  },
  props: {
    gif: Object,
    isFavorite: Boolean
  },
  methods: {
    addToFavorites() {
      this.$emit("addToFavorites");
    },
    removeFromFavorites() {
      this.$emit("removeFromFavorites");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.material-design-icon__svg {
  width: 20px;
  height: 20px;
}
button {
  position: absolute;
  top: 5px;
  right: 5px;
  font-weight: 700;
  border-radius: 2px;
  color: #303030;
  background: $primary-color;
  display: none;
  justify-content: center;
  text-align: center;
  border: 0;
  width: 24px;
  height: 24px;
  &.is-active {
    display: flex;
  }
  &:hover {
    cursor: pointer;
  }
}

.slide-enter-active {
  animation: bounce-in 0.3s;
}
.slide-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    background-color: $primary-color;
  }
  50% {
    transform: scale(1.5);
  }
  80% {
    background-color: $primary-color;
  }
  100% {
    transform: scale(1);
    background-color: rgba($primary-color, 0.7);
  }
}
</style>
