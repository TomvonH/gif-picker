<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <h3>
          <slot name="header"></slot>
        </h3>
        <button type="button" class="btn-close" @click="close">X</button>
      </header>
      <section class="modal-body">
        <slot name="body"></slot>
      </section>
      <footer class="modal-footer">
        <BaseButton class="btn-link" type="button" @click.native="close">Close</BaseButton>
      </footer>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";
export default {
  name: "modal",
  components: {
    BaseButton
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.modal {
  width: 800px;
  background: $card-bg;
  box-shadow: 2px 2px 20px 1px black;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid $card-border-color;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid $card-border-color;
  justify-content: flex-start;
}

.modal-body {
  position: relative;
  padding: 20px 10px;

  img {
    max-height: 350px;
  }
}
.btn-close {
  color: $primary-color;
  background-color: transparent;
  font-size: 20px;
  border: 0;
  &:hover {
    cursor: pointer;
  }
}
h3 {
  margin: 0;
}
</style>
