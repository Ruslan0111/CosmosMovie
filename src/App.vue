<template>
  <main class="container">
    <BaseNavbar :showMenu="showMenu" @closeMenu="showMenu = false" />
    <BaseHeader @openMenu="showMenu = true" />
    <div class="main">
      <router-view/>
    </div>
  </main>
</template>

<script>
  import BaseNavbar from '@/components/BaseNavbar';
  import BaseHeader from '@/components/BaseHeader';

  export default {
    name: "App",

    data() {
      return {
        showMenu: false
      }
    },

    components: {
      BaseNavbar,
      BaseHeader
    }
  }
</script>

<style>
  .container {
    display: flex;
  }
  .main {
    width: 100%;
    padding: 70px;
  }

  @media only screen and (max-width: 1024px) {
    .main {
      margin-top: 50px;
      padding: 30px 20px;
    }
  }
</style>
