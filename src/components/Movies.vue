<template>
  <div class="movies">
    <div class="movies__title">
      <h4>{{ title }}</h4>
      <h6>Movies</h6>
    </div>
    <div class="movies__items">
      <div
        class="movies__item"
        v-for="movie in movies"
        :key="movie.id"
      >
        <router-link :to="`/details/${movie.id},${movie.title}`">
          <div>
            <img :src="$imageUrl + movie.poster_path" alt="">
            <p>{{ movie.title }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="movies__buttons">
      <button
        class="prev-btn"
        v-if="showPrevButton"
        @click="$emit('prevPage')"
      >Prev</button>
      <button
        class="next-btn"
        v-if="showNextButton"
        @click="$emit('nextPage')"
      >Next</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Movies",

    props: {
      title: {
        required: true,
        type: String
      },
      movies: {
        required: true,
        type: Array
      },
      showNextButton: {
        required: true,
        type: Boolean
      },
      showPrevButton: {
        required: true,
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
  .movies__title {
    width: 75%;
    h4 {
      font-weight: 300;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    h6 {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }
  .movies__items {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 80px;
    margin-right: -15px;
    margin-left: -15px;
  }
  .movies__item {
    display: flex;
    width: 20%;
    padding: 20px;
    a {
      margin: 20px 0;
      text-decoration: none;
      div {
        position: relative;
        margin-bottom: 10px;
        height: 350px;
        transition: all 0.3s;
        &:hover {
          transform: scale(1.06);
          p {
            background: #333;
            color: #fff;
          }
        }
      }
      img {
        position: relative;
        border-radius: 10px;
        width: 100%;
        object-fit: cover;
        height: 100%;
      }
      p {
        color: #333;
        border-radius: 10px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        margin: -20px 0 10px 0;
        text-align: center;
        font-size: 14px;
        padding: 30px 0 10px 0;
      }
    }
  }
  .movies__buttons {
    position: relative;
    padding-bottom: 100px;
    button {
      outline: none;
      cursor: pointer;
      font-size: 16px;
      background: linear-gradient(-45deg, #01579b, #6200ea);
      padding: 10px 50px;
      border-radius: 40px;
      color: #fff;
      border: none;
      box-shadow: 0 4px 8px #bbb;
      transition: all 0.3s;
      &:hover {
        transform: translateY(-10px);
      }
    }
  }
  .prev-btn {
    position: absolute;
    left: 0;
    top: 0;
  }
  .next-btn {
    position: absolute;
    right: 0;
    top: 0;
  }

  @media only screen and (max-width: 1024px) {
    .movies__item {
      width: 25%;
      a {
        div {
          height: 300px;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .movies__item {
      width: calc(100% / 3);
    }
  }
  @media only screen and (max-width: 500px) {
    .movies__item {
      width: 50%;
      a {
        div {
          height: 200px;
        }
      }
    }
  }
</style>
