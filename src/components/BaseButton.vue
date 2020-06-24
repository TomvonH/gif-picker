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
  font-family: inherit;
  font-weight: 700;
  line-height: 1.5;
  color: $primary-color;
  align-items: center;
  justify-content: center;
  user-select: none;
  white-space: nowrap;
  border: 2px solid $primary-color;
  border-radius: 2px;
  margin: 0;
  &[disabled] {
    border-color: $disabled-bg;
    background: $disabled-bg;
    color: darken($font-color, 20%);
    pointer-events: none;
  }
  &:hover {
    background-color: $primary-color;
    color: $card-bg;
    cursor: pointer;
  }

  &.is-active {
    background-color: $primary-color;
    color: $card-bg;
    pointer-events: none;
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
.btn-link {
  background-color: transparent;
  border: 0;
  font-size: $font-size;
  border-bottom: 1px dashed $primary-color;
  border-radius: 0px;
  color: $primary-color;
  padding: 5px 0px;
  font-weight: 300px;
  &:hover {
    background-color: transparent;
    color: darken($primary-color, 10%);
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
