<template>
  <div>
    <div>
      <h1>User data</h1>
      {{ this.$store.state.user.data }}
    </div>
    <div>
      <h1>User DB</h1>
      {{ this.$store.state.user.dataDB }}
    </div>
  </div>
</template>
