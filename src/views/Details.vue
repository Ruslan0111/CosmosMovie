<template>
  <div>
    <DetailsInner
      :details="details"
      :casts="casts.slice(0, 20)"
      :imdb="imdb"
      :youtube="youtube"
    />
  </div>
  <Movies
    title="Similar"
    :movies="similarMovies"
    :showNextButton="showNextButton"
    :showPrevButton="showPrevButton"
    @prevPage="prevPage"
    @nextPage="nextPage"
    class="similar"
  />
</template>

<script>
  import axios from '@/axios';

  import Movies from '@/components/Movies';
  import DetailsInner from '@/components/MoviesInner';

  export default {
    name: "Details",
    data() {
      return {
        details: {},
        casts: [],
        imdb: '',
        youtube: '',
        similarMovies: [],
        page: 1,
        movieId: '',
        title: '',
        totalPages: null
      }
    },

    async created() {
      this.getAllData();
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
    },

    watch: {
      $route() {
        this.getAllData();
      }
    },

    methods: {
      getMovieId() {
        return this.$route.params.id?.split(',')[0];
      },
      getMovieTitle() {
        return this.$route.params.id?.split(',')[1];
      },

      async getDetails() {
        return await axios.get(`movie/${this.movieId},${this.title}`);
      },

      async getExternalData(id) {
        return await axios.get(`movie/${this.movieId}/${id}`);
      },

      async getAllData() {
        this.movieId = this.getMovieId();
        this.title = this.getMovieTitle();

        this.details = (await this.getDetails()).data;

        this.casts = (await this.getExternalData('casts')).data.cast;
        
        this.imdb = (await this.getExternalData('external_ids')).data?.imdb_id;
        this.youtube = (await this.getExternalData('videos')).data?.results?.[0]?.key;
        
        this.setMoviesData(await this.getMovies());
      },

      async getMovies() {
        return await axios.get(
          `/movie/${this.movieId}/similar`,
          {
            params: {
              page: this.page
            }
          }
        );
      },

      setMoviesData(res) {
        this.similarMovies = res.data.results;
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
      Movies,
      DetailsInner
    }
  }
</script>

<style lang="scss" scoped>
  .similar {
    margin-top: 30px;
  }
</style>
