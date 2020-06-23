<template>
  <div>
    <div class="comment-item">
      <span class="comment">{{ comment }}</span>
      <div style="display: flex;">
        <span class="time">{{time}}</span>
        <BaseButton class="btn-remove" @click.native="removeComment">
          <delete-icon></delete-icon>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import BaseButton from "./BaseButton";
export default {
  components: {
    DeleteIcon,
    BaseButton
  },
  props: {
    comment: String
  },
  computed: {
    time() {
      let d = new Date();
      return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    }
  },
  methods: {
    removeComment() {
      this.$emit("removeComment");
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-remove {
  visibility: hidden;
  display: inline-flex;
  padding: 1px;
  align-self: flex-start;
}
</style>
