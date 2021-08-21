<template>
  <nav class="navbar" :class="{open: showMenu}">
    <div class="navbar__inner">
      <div class="close-btn" @click="$emit('closeMenu')">
        ×
      </div>
      <div class="navbar__image">
        <img src="@/assets/img/nav-image.svg" alt="">
      </div>
      <h5 class="mt-bold">Movies</h5>
      <router-link class="popular mt-semibold" exact to="/">Popular</router-link>
      <router-link class="top mt-semibold" to="/topRated">Top Rated</router-link>
      <router-link class="upcoming mt-semibold" to="/upcoming">Upcoming</router-link>
      <h5 class="mt-bold" :style="{marginTop: '30px'}">Genres</h5>
      <router-link
        class="genres mt-semibold"
        v-for="genre in genres"
        :key="genre.id"
        :to="`/genres/${genre.name},${genre.id}`"
      >
        {{ genre.name }}
      </router-link>
      <router-link class="logo" to="/">
        <img src="@/assets/img/logo.png" alt="">
      </router-link>
      <img src="@/assets/img/tmdb.svg" alt="" class="movie-logo">
    </div>
  </nav>
</template>

<script>
  import axios from '@/axios.js';

  export default {
    name: "BaseNavbar",

    data() {
      return {
        genres: []
      }
    },

    mounted() {
      axios.get('genre/movie/list')
        .then(res => this.genres = res.data.genres)
    },

    props: {
      showMenu: {
        required: false,
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    width: 250px;
    position: relative;
    h5 {
      font-size: 1rem;
      text-transform: uppercase;
      color: #333;
      letter-spacing: -0.5px;
      margin: 0px 0px 1rem 1rem;
    }
    a {
      display: block;
      border: 1px solid transparent;
      font-size: 0.8rem;
      text-transform: capitalize;
      color: #999;
      padding: 0.3rem 2rem;
      text-decoration: none;
      outline: none;
      -webkit-box-align: center;
      position: relative;
      width: 90%;
      margin: 0.1rem 0.5rem;
      &:not(.logo):hover {
        border-width: 1px;
        border-style: solid;
        border-color: #ccc;
        -o-border-image: initial;
        border-image: initial;
        border-radius: 2rem;
        text-decoration: none;
        transition: all 100ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
      }
    }
    .popular::before,
    .top::before,
    .upcoming::before,
    .genres::before {
      position: absolute;
      content: "";
      left: 15px;
      width: 12px;
      top: 50%;
      background-repeat: no-repeat;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      height: 12px;
    }
    .popular::before {
      mask: url('~@/assets/img/heart-solid.svg') no-repeat;
      background-color: #222;
    }
    .top::before {
      mask: url('~@/assets/img/poll-solid.svg') no-repeat;
      background-color: #222;
    }
    .upcoming::before {
      mask: url('~@/assets/img/calendar-alt-regular.svg') no-repeat;
      background-color: #222;
    }
    .genres::before {
      mask: url('~@/assets/img/play-circle-solid.svg') no-repeat;
      background-color: #222;
    }
  }
  .navbar__inner {
    position: fixed;
    padding: 20px;
    width: 250px;
    overflow-y: scroll;
    top: 0;
    margin-top: 40px;
    padding-bottom: 50px;
    height: 100vh;
    border-right: 1px solid #e0e0e0;
    transition: all 0.3s;

    &::-webkit-scrollbar {
      width: 3px;
      background-color: #f5f5f5;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background: transparent;
    }

    &::-webkit-scrollbar-track {
      border-radius: 100px;
      background-color: #f5f5f5;
      background-color: transparent;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: -webkit-gradient(linear, left top, left bottom, from(#b2ebf2), to(#0091ea));
      background: linear-gradient(#b2ebf2, #0091ea);
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
  }
  .navbar__image {
    text-align: center;
    margin-bottom: 50px;
    img {
      width: 60%;
    }
  }
  .router-link-active:not(.logo) {
    border: 1px solid #222 !important;
    border-style: solid;
    color: #222 !important;
    border-color: initial;
    -o-border-image: initial;
    border-image: initial;
    border-radius: 2rem;
    text-decoration: none;
    -webkit-transition: all 100ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
    transition: all 100ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  }
  .logo {
    text-align: center;
    margin: 10px 0 !important;
    width: 85% !important;
    position: relative;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    img {
      width: 100%;
    }
  }
  img.movie-logo {
    position: relative;
    text-align: center;
    margin: 0 auto;
    width: 50%;
  }
  .close-btn {
    display: none;
  }

  @media only screen and (max-width: 1024px) {
    .navbar {
      position: absolute;
      left: -250px;
      z-index: 99999;
      transition: all .3s linear;

      &.open {
        left: 0;
      }
    }
    .navbar__inner {
      background-color: #fff;
      margin-top: 0;
    }
    .close-btn {
      display: block;
      position: absolute;
      font-size: 28px;
      top: 10px;
      right: 20px;
    }
  }
</style>