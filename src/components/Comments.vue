<template>
  <div class="comment-section">
    <div class="input-container">
      <input
        ref="input"
        class="input"
        v-model="message"
        @keyup.enter="addComment"
        placeholder="Write a comment"
        autofocus
      />
      <BaseButton @click.native="addComment" :disabled="message.length <= 0">
        <send-icon></send-icon>
        {{post}}
      </BaseButton>
    </div>
    <div class="comment-list">
      <transition-group name="slide-fade" tag="div">
        <div v-for="(comment, id) in comments" :key="comment.id">
          <CommentItem :comment="comment.message" @removeComment="removeComment(id)" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
import BaseButton from "./BaseButton";
import SendIcon from "vue-material-design-icons/Send.vue";
export default {
  components: {
    CommentItem,
    SendIcon,
    BaseButton
  },
  props: {
    comments: Array
  },
  data() {
    return {
      message: "",
      post: "Post comment"
    };
  },
  methods: {
    addComment() {
      if (this.message.length > 0) {
        this.comments.push({
          id: Math.random(),
          message: this.message
        });
      }
      this.message = "";
      this.$refs["input"].focus();
    },
    removeComment(id) {
      this.comments.splice(id, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
.btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  white-space: nowrap;
}

input:focus {
  & + .btn {
    border-color: $primary-color;
  }
}

.slide-fade-enter-active {
  transition: all 0.15s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.15s ease-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
