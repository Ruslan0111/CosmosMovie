<template>
  <Movies
    :title="title"
    :movies="movies"
    :showNextButton="showNextButton"
    :showPrevButton="showPrevButton"
    @prevPage="prevPage"
    @nextPage="nextPage"
  />
</template>

<script>
  import axios from '@/axios';

  import Movies from '@/components/Movies';

  export default {
    name: "Genres",
    data() {
      return {
        movies: [],
        page: 1,
        totalPages: null
      }
    },

    async created() {
      if (this.$route.params.genre?.split(',').length <= 1) {
        this.$router.push('/');
      } else {
      this.setMoviesData(await this.getMovies());
      }
    },

    computed: {
      showNextButton() {
        if (this.page < this.totalPages) return true;
        return false
      },
      showPrevButton() {
        if (this.page > 1) return true;
        return false
      },
      title() {
        return this.$route.params.genre?.split(',')[0];
      },
      genreId() {
        return this.$route.params.genre?.split(',')[1];
      }
    },

    watch: {
      async $route() {
        this.setMoviesData(await this.getMovies());
      }
    },

    methods: {
      async getMovies() {
        return await axios.get(
          `discover/movie`,
          {
            params: {
              with_genres: this.genreId,
              page: this.page
            }
          }
        );
      },

      setMoviesData(res) {
        this.movies = res.data.results;
        this.page = res.data.page;
        this.totalPages = res.data.total_pages;
      },

      async prevPage() {
        this.page--;
        this.setMoviesData(await this.getMovies());
      },

      async nextPage() {
        this.page++;
        this.setMoviesData(await this.getMovies());
      }
    },

    components: {
      Movies
    }
  }
</script>
