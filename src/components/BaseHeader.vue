<template>
  <header class="header">
    <button @click="$emit('openMenu')" class="header__btn">
      ☰
    </button>
    <div class="header__search">
      <input
        v-model="query"
        type="text"
        placeholder="Search"
        @keydown.enter="$router.push('/search/' + query)"
      >
      <a role="button" class="search-btn" :href="'/search/' + query">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
      </a>
  </div>
  </header>
</template>

<script>
  export default {
    name: "BaseHeader",

    data() {
      return {
        query: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header__search {
    width: 20%;
    max-width: 300px;
    position: absolute;
    right: 10px;
    top: 20px;
    border-radius: 50px;
    overflow: hidden;
    height: 40px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border: 2px solid #eee;
    font-size: 14px;

    input {
      padding: 10px 20px;
      width: 80%;
      border: none;
      outline: none;
    }

    .search-btn {
      width: 20%;
      background: #fff;
      position: relative;
      border: none;
      outline: none;

      svg {
        position: absolute;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        left: 50%;
        width: 17px;
        fill: #aaa;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;

        &:hover {
          fill: #333;
        }
      }
    }
  }
  .header__btn {
    display: none;
  }

  @media only screen and (max-width: 1024px) {
    .header {
      background: #01579b;
      height: 55px;
      z-index: 9999;
      width: 100%;
      position: absolute;
      top: 0;
    }
    .header__btn {
      color: #fff;
      display: block;
      top: 8px;
      outline: none;
      height: 40px;
      width: 55px;
      border: none;
      background: none;
      font-size: 26px;
      font-weight: 700;
      position: absolute;
      left: 10px;
    }
    .header__search {
      width: 200px;
      top: 13px;
      right: 24px;
      height: 30px;
      input {
        background: transparent;
        color: #fff;
        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
          color: #fff;
        }
      }
      .search-btn {
        background-color: transparent;
        color: #fff;
        svg {
          fill: #fff;
        }
      }
    }
  }
</style>
