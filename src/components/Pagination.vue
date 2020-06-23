<template>
  <div class="pagination">
    <BaseButton :disabled="isPreviousButtonDisabled" @click.native="previousPage">{{previous}}</BaseButton>
    <BaseButton :disabled="isNextButtonDisabled" @click.native="nextPage">{{next}}</BaseButton>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
export default {
  components: {
    BaseButton
  },
  data() {
    return {
      next: "Next",
      previous: "Previous"
    };
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1;
    },
    isNextButtonDisabled() {
      return this.currentPage === this.pageCount;
    }
  },
  methods: {
    nextPage() {
      this.$emit("nextPage");
    },
    previousPage() {
      this.$emit("previousPage");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";

.pagination {
  border-top: $card-border-color solid 1px;
  background-color: $card-bg;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-radius: 2px;
  margin-bottom: 40px;
  flex-basis: 100%;
}
</style>
