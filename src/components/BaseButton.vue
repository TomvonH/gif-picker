<template>
  <button class="btn">
    <slot>Button</slot>
  </button>
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.btn {
  display: flex;
  font-size: $font-size;
  background-color: transparent;
  font-weight: 700;
  line-height: 1.5;
  color: $primary-color;
  align-items: center;
  user-select: none;
  border: 2px solid $primary-color;
  border-radius: 2px;
  margin: 0;
  &[disabled] {
    border-color: $disabled-bg;
    background: $disabled-bg;
    color: $font-color;
    opacity: 0.5;
    pointer-events: none;
  }
  &:hover {
    background-color: $primary-color;
    color: $card-bg;
    cursor: pointer;
  }
}
.btn-inverted {
  color: $card-bg;
  border-color: $card-bg;
  &:hover {
    color: $card-bg;
    background-color: darken($primary-color, 10%);
  }
}
.btn-remove {
  border-color: $error-color;
  color: $error-color;
  &:hover {
    background-color: $error-color;
    color: $card-bg;
    cursor: pointer;
  }
}
.material-design-icon {
  width: 18px;
  height: 18px;
  margin: auto;
}
.material-design-icon__svg {
  width: 18px;
  height: 18px;
}
</style>
