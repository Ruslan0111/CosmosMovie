<template>
  <div>
    <PersonsInner
      :details="details"
    />
  </div>
  <Movies
    title="ALSO PLAYED IN"
    :movies="similarMovies"
    :showNextButton="false"
    :showPrevButton="false"
    class="similar"
  />
</template>

<script>
  import axios from '@/axios';

  import Movies from '@/components/Movies';
  import PersonsInner from '@/components/PersonsInner';

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
        personId: '',
        totalPages: null
      }
    },

    async created() {
      this.getAllData();
    },

    watch: {
      $route() {
        this.getAllData();
      }
    },

    methods: {
      getMovieId() {
        return this.$route.params.id;
      },

      async getDetails() {
        return await axios.get(`person/${this.personId}`);
      },

      async getAllData() {
        this.personId = this.getMovieId();

        this.details = (await this.getDetails()).data;
        
        this.setMoviesData(await this.getMovies());
      },

      async getMovies() {
        return await axios.get(
          `/person/${this.personId}/movie_credits`,
          {
            params: {
              page: this.page
            }
          }
        );
      },

      setMoviesData(res) {
        this.similarMovies = res.data.cast;
        this.page = res.data.page;
        this.totalPages = res.data.total_pages;
      }
    },

    components: {
      Movies,
      PersonsInner
    }
  }
</script>

<style lang="scss" scoped>
  .similar {
    margin-top: 30px;
  }
</style>
