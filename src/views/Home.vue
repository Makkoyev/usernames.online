<template>
  <div class="container">This is home</div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      rendering: {
        items: [
          { title: "Make Friends", class: "item-1" },
          { title: "Conversations", class: "item-2" },
          { title: "Group Chat", class: "item-3" },
          { title: "Wall", class: "item-4" }
        ]
      }
    };
  }
};
</script>
