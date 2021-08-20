<template>
  <div class="details-inner">
    <div class="details-inner__img">
      <img :src="$imageUrl + details?.poster_path" alt="">
    </div>
    <div class="details-inner__content">
      <h1>{{ details?.original_title }}</h1>
      <h2>{{ details?.tagline }}</h2>
      <div class="dflex">
        <div class="rating">
          <span class="stars">
            <img
              v-for="n in stars"
              :key="n"
              src="@/assets/img/star-s-fill.svg"
              alt="star-filled"
            >
            <img
              v-for="n in (5 - stars)"
              :key="n"
              src="@/assets/img/star-s-line.svg"
              alt="star-empty"
            >
          </span>
          <span class="average">{{ details?.vote_average }}</span>
        </div>
        <div class="small-info">
          <span style="text-transform: uppercase;">{{getLanguage(details?.original_language)}}</span>
           / {{details?.runtime}} MIN. / {{getMovieYear(details?.release_date)}}
        </div>
      </div>
      <div class="details-inner__genres">
        <h6>The genres</h6>
        <ul>
          <li
            v-for="genre in details?.genres"
            :key="genre.id"
          >
            <router-link :to="`/genres/${genre.name},${genre.id}`">
              <img src="@/assets/img/play-circle-solid.svg" alt="">
              {{ genre.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="details-inner__overview">
        <h6>OVERVIEW</h6>
        {{ details?.overview }}
      </div>
      <div class="details-inner__cast">
        <h6>the cast</h6>
        <router-link
          v-for="cast in casts"
          :key="cast.id"
          to="/"
        >
          {{ cast.original_name }},
        </router-link>
      </div>
      <div class="details-inner__buttons">
        <a
          :href="'https://www.imdb.com/title/' + imdb"
          target="_blank"
        >imdb</a>
        <a
          :href="'https://www.youtube.com/watch?v=' + youtube"
          target="_blank"
        >trailer</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailsInner",

    computed: {
      stars() {
        return Math.round(this.details.vote_average / 2);
      }
    },

    methods: {
      getLanguage(lang = 'en') {
        const languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
        return languageNames.of(lang);
      },
      getMovieYear(date) {
        return new Date(date).getFullYear();
      }
    },

    props: {
      details: {
        required: true,
        type: Object
      },
      casts: {
        required: true,
        type: Array
      },
      imdb: {
        required: false,
        type: String,
        default: ''
      },
      youtube: {
        required: false,
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  h6 {
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1rem;
  }
  .details-inner {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
  }
  .details-inner__img,
  .details-inner__content {
    padding: 0 15px;
  }
  .details-inner__img {
    flex: 0 1 calc(100% / 3);

    img {
      width: 100%;
      border-radius: 10px;
      box-shadow: 0 8px 15px #999;
    }
  }
  .details-inner__content {
    flex: 0 1 calc(100% / 3 * 2);

    h1 {
      font-size: 3rem;
      font-weight: 400;
      line-height: 1.2;
      color: #263238;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    h2 {
      text-transform: uppercase;
      line-height: 1.5;
      color: #37474f;
      font-size: 1rem;
      font-weight: 700;
    }
  }
  .dflex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .rating {
    font-weight: 700;
    color: #333;
    margin: 1.5rem 0;
    display: inline-flex;
    align-items: center;
  }
  .stars {
    display: inline-flex;
    margin-right: 10px;
    img {
      display: block;
    }
  }
  .average {
    padding-top: 2px;
  }
  .small-info {
    display: inline-block;
    color: #0d86d1;
    font-weight: 700;
    margin: 1.5rem 0;
  }
  .details-inner__genres {
    margin: 50px 0px;
    h6 {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    ul {
      list-style: none;
    }

    li {
      display: inline-block;
      margin-right: 5%;
    }

    a {
      transition: all 0.2s;
      font-size: 0.8rem;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      color: #222;
      font-weight: 700;
      display: flex;
      align-items: center;
      &:hover {
        color: #0d86d1;
      }
    }

    img {
      margin-right: 5px;
      width: 15px;
      display: block;
      margin-top: -3px;
    }
  }
  .details-inner__cast {
    margin: 50px 0;
    a {
      color: #007bff;
      text-decoration: none;
      background-color: transparent;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .details-inner__buttons {
    display: flex;
    justify-content: space-between;
    a {
      margin: 10px;
      text-transform: uppercase;
      border: 2px solid #6200ea;
      padding: 10px 35px;
      color: #333;
      font-weight: 500;
      text-decoration: none;
      border-radius: 40px;
      transition: all 0.3s;
      box-shadow: 2px 3px 10px #cccccc;
      &:hover {
        transform: translateY(-10px);
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    h6 {
      font-size: 0.8em;
    }
    .details-inner__content {
      h1 {
        font-size: 1.8rem;
      }
      h2 {
        font-size: 0.9rem;
      }
    }
    .rating {
      font-size: 0.9em;
      margin: 15px 0;
    }
    .small-info {
      margin-bottom: 0;
      font-size: 0.9em;
    }
    .details-inner__overview {
      font-size: 0.8em;
      h6 {
        font-size: 1em;
      }
    }
    .details-inner__buttons a {
      padding: 5px 25px;
      font-size: .7em;
    }
    .details-inner__genres {
      margin: 25px 0;
    }
    .details-inner__cast {
      margin: 15px 0;
      a {
        font-size: 0.8em;
      }
    }
  }
  @media only screen and (max-width: 568px) {
    .details-inner__img {
      flex: 0 1 100%;
    }
    .details-inner__content {
      flex: 0 1 100%;
      h1 {
        margin-top: 30px;
      }
      h2 {
        font-size: 0.9rem;
      }
    }
  }
</style>
