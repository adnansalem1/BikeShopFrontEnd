<script setup lang="ts">

</script>

<template>
  <h1>Home</h1>
</template>

<style scoped>

</style>
<script>
export default {
  name: "VHeading",
  render: function(createElement) {
    return createElement(
        "h" + this.level, // tag name
        {
          class: `vHeading vHeading--h${this.level}`
        },
        this.text // array of children
    );
  },
  props: {
    level: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss">
$tag-sizes: (
    "h1": 45px,
    "h2": 30px,
    "h3": 25px,
    "h4": 18px,
    "h5": 16px,
    "h6": 14px
);

.vHeading {
  $root: &;
  font-weight: 700;

  @each $tag, $size in $tag-sizes {
    &--#{$tag} {
      font-size: $size;
    }
  }
}
</style>