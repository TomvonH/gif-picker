<template>
  <div class="pagination">
    <BaseButton :disabled="isPreviousButtonDisabled" @click.native="previousPage">{{previous}}</BaseButton>
    <div v-if="showNumbers" class="pagination-number-container">
    <BaseButton 
      v-bind:class="{'is-active' : value === currentPage}"
      v-for="(value, index) in pageCount"
      :key="index"
      @click.native="onLoadPage(value)"
    >{{value}}</BaseButton>
    </div>

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
    showNumbers: {
      default: true,
      type: Boolean
    },
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
    },
    onLoadPage(value) {
      console.log(value);
      this.$emit("loadPage", value);
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
  justify-content: center;
  border-radius: 2px;
  margin-bottom: 40px;
  flex-basis: 100%;
}
.pagination-number-container {
  display: flex;
}

.btn {
  margin: 0 10px;
  min-width: 34px;
}
</style>
