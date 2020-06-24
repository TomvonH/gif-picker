<template>
  <div class="favorite-item">
    <div class="grid-item">
      <div class="column-one">
        <img :src="setSrc" />
      </div>
      <div class="column-two">
        <BaseButton class="btn-remove" @click.native="removeFromFavorites">
          <delete-icon></delete-icon>
        </BaseButton>
      </div>
      <div class="column-three">
        <BaseButton
          @click.native="openGifInModal"
          class="button-overlay"
        >{{ gif.comments.length }} {{setComment}}</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
export default {
  components: {
    BaseButton,
    DeleteIcon
  },
  props: {
    gif: Object,
    isFavorite: Boolean
  },

  computed: {
    setSrc() {
      return `https://media.giphy.com/media/${this.gif.id}/200.gif`;
    },
    setComment() {
      if (this.gif.comments.length === 1) {
        return "Comment"
      }
      return "Comments"
    }
  },

  methods: {
    removeFromFavorites() {
      this.$emit("removeFromFavorites");
    },
    openGifInModal() {
      this.$emit("openGifInModal");
    }
  }
};
</script>


