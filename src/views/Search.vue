<template>
  <Movies
    :title="$route.name"
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
    name: "Search",
    data() {
      return {
        movies: [],
        page: 1,
        totalPages: null
      }
    },

    async created() {
      this.setMoviesData(await this.getMovies());
    },

    computed: {
      showNextButton() {
        if (this.page < this.totalPages) return true;
        return false
      },
      showPrevButton() {
        if (this.page > 1) return true;
        return false
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
          'search/movie',
          {
            params: {
              query: this.$route.params.id
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
