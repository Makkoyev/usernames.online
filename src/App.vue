<template>
  <div id="app">
    <Navigation />
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    <Footer />
  </div>
</template>

<script>
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
export default {
  components: {
    Navigation,
    Footer
  }
};
</script>