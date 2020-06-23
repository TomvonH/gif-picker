//https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
<template>
  <transition name="expand" @leave="leave">
    <slot />
  </transition>
</template>

<script>
export default {
  name: "TransitionExpand",
  methods: {
    leave(element) {
      const height = getComputedStyle(element).height;

      element.style.height = height;

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = 0;
      });
    }
  }
};
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.2s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>