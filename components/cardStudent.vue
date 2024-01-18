<template>
  <div class="card">
    <div class="card-title">
      <b-img
        id="circleImg"
        width="95px"
        height="95px"
        src="https://picsum.photos/250/250/?image=58"
        rounded="circle"
        alt="Circle image"
      />
      <h4>{{ firstName }} {{ name }}</h4>
      <button
        id="favButton"
        @click="changeFavorite"
      >
        <b-icon
          v-if="favorite"
          icon="heart-fill"
          variant="light"
          font-scale="1.5"
        />
        <b-icon
          v-else
          icon="heart"
          variant="light"
          font-scale="1.5"
        />
      </button>
    </div>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">
        {{ yearSchool }} {{ typeDegree }}
      </h6>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ nameSchool }}
      </h6>
      <!-- <h6 class="card-subtitle mb-2 text-muted">{{ nameSchool }} ({{ city }})</h6> -->
      <b-badge
        variant="secondary"
        class="badge-secondary"
      >
        {{ jobType }}
      </b-badge>
      <b-badge
        v-if="jobType === 'Alternance'"
        variant="secondary"
        class="badge-secondary"
      >
        {{ contractType }}
      </b-badge>
      <b-badge
        variant="secondary"
        class="badge-secondary"
      >
        {{ contractLength }}
      </b-badge>

      <p class="card-text">
        {{ truncatedDescription }}
      </p>
    </div>
    <div class="footer-card">
      <b-button id="seeMore">
        Voir profil
      </b-button>
    </div>
  </div>
</template>

<script>
import { BIconCircleFill, BIconHeart } from "bootstrap-vue";

export default {
  name: "Card",
  components: {
    BIconCircleFill,
    BIconHeart,
  },
  props: {
    index: Number,
    name: String,
    firstName: String,
    nameSchool: String,
    city: String,
    yearSchool: String,
    typeDegree: String,
    jobType : String,
    contractType : String,
    contractLength : String,
    description: String,
    favorite: Boolean,
  },
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: "#777",
        width: 95,
        height: 95,
        class: "m1",
      },
    };
  },
  computed: {
    truncatedDescription() {
      const maxLength = 280;
      if (this.description.length <= maxLength) {
        return this.description;
      } else {
        return this.description.substring(0, maxLength) + "...";
      }
    },
  },
  methods: {
    changeFavorite() {
      this.$emit("update:favorite", !this.favorite);
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: var(--jstalk-color-primary);
}

a:hover {
  color: var(--jstalk-color-primary-contrast);
}

.card {
  width: 80%;
  background-color: white !important;
}

.card-title {
  background: var(--jstalk-color-primary);
  color: var(--jstalk-color-dark);
  flex: 1 1;
  padding: 0.7em;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.card-body {
	padding-top: 0px;
}

.card-subtitle {
	padding-left: 100px;
}

/*.modal-header {
  background: var(--jstalk-color-primary);
  color: var(--jstalk-color-dark);
  flex: 1 1;
  padding: 1rem;
}*/

#favButton {
  border-color: transparent;
  background-color: transparent;
}

.card-text {
  padding-top: 1rem;
}

.badge-secondary {
	margin-top: 5px;
  font-weight: 500;
}

h4 {
	padding-left: 110px;
	padding-top: 5px;
}

#circleImg {
	position: absolute;
	top: 15px;
	left: 15px
}

.footer-card {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
  margin-right: 1em;

}

@media only screen and (max-width: 1000px) {
  .card {
    width: 80%;
  }
}
</style>

<style lang="scss">
.modal-header {
  background: var(--jstalk-color-primary);
  color: var(--jstalk-color-dark);
  flex: 1 1;
  padding: 1rem;
}
</style>
