<template>
  <div class="details-inner">
    <div class="details-inner__img">
      <img :src="$imageUrl + details?.profile_path" alt="">
    </div>
    <div class="details-inner__content">
      <h1 class="mt-medium">{{ details?.name }}</h1>
      <div class="dflex">
        <h2 class="mt-medium">{{ details?.birthday }}</h2>
        <div class="rating">
          <span class="stars">
            <img
              v-for="n in stars"
              :key="n"
              src="@/assets/img/star-s-fill.svg"
              alt="star-filled"
            >
            <img
              v-for="n in (stars <= 5 ? 5 - stars : 0)"
              :key="n"
              src="@/assets/img/star-s-line.svg"
              alt="star-empty"
            >
          </span>
          <span class="average mt-medium">| {{ details?.popularity }}</span>
        </div>
      </div>
      <div class="details-inner__overview">
        <h6 class="mt-medium">THE BIOGRAPHY</h6>
        {{ details?.biography }}
      </div>
      <a
        class="mt-semibold details-inner__button"
        :href="'https://www.imdb.com/name/' + details?.imdb_id"
        target="_blank"
      >imdb</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PersonsInner",

    computed: {
      stars() {
        return Math.round(this.details.popularity / 6);
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
    font-size: 1.25rem;
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
      margin-bottom: .5rem;
      font-size: 2.5rem;
      font-weight: 500;
      line-height: 1.2;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .dflex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .rating {
    font-weight: 700;
    color: #333;
    display: inline-flex;
    align-items: center;
    margin-left: 5rem;
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
    font-size: 1rem;
  }
  .details-inner__overview {
    margin-top: 1.5rem;
  }
  .details-inner__button {
    display: inline-block;
    margin-top: 50px;
    text-transform: uppercase;
    border-radius: 50px;
    border: 2px solid #0d86d1;
    color: #0d86d1;
    text-decoration: none;
    transition: all .2s;
    padding: 10px 55px;
    &:hover {
      color: #fff;
      background: #0d86d1;
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
    .details-inner__overview {
      font-size: 0.8em;
      h6 {
        font-size: 1em;
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
