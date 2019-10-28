<template>
  <div>
    <Navigation />
    <div class="container">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigation from '~/components/layout/Navigation.vue'
import Footer from '~/components/layout/Footer.vue'

export default {
  components: {
    Navigation,
    Footer
  }
}
</script>
