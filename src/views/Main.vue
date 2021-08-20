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
    name: "Main",
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
        let category = 'popular';

        if (this.$route.name === "Top Rated") {
          category = 'top_rated';
        } else if(this.$route.name === "Upcoming") {
          category = 'upcoming';
        }

        return await axios.get(
          `movie/${category}`,
          {
            params: {
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
