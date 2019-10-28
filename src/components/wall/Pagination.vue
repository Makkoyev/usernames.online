<template>
  <div>
    <button @click="prevPage">Prev</button>
    <button @click="nextPage">Next</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['paginationOptions'],
  methods: {
    nextPage() {
      let totalPosts = this.paginationOptions.totalPosts;
      let maxPage = 8;
      let ceilVar = Math.ceil(totalPosts / maxPage);
      if (this.paginationOptions.currentPage < ceilVar) {
        this.paginationOptions.currentPost += 8;
        this.paginationOptions.maxPost += 8;
        this.paginationOptions.currentPage += 1;
      }
    },
    prevPage() {
      if (this.paginationOptions.currentPage > 1) {
        this.paginationOptions.currentPost -= 8;
        this.paginationOptions.maxPost -= 8;
        this.paginationOptions.currentPage -= 1;
      }
    }
  }
};
</script>

<style>
</style>