<template>
  <div class="card">
    <div class="card-title">
      <h4>{{ name }}</h4>
      <button id="favButton" @click="changeFavorite">
        <b-icon
          v-if="this.favorite"
          icon="heart-fill"
          variant="light"
          font-scale="1.5"
        ></b-icon>
        <b-icon v-else icon="heart" variant="light" font-scale="1.5"></b-icon>
      </button>
    </div>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">
        {{ city }}, {{ department }}
      </h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ formaterNumeroTelephone }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ email }}</h6>

      <p class="card-text">{{ truncatedDescription }}</p>
    </div>
    <div class="footer-card">
      <b-button id="seeMore">Voir profil</b-button>
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
    phoneNumber: String,
    email: String,
    city: String,
    department: String,
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
  methods: {
    changeFavorite() {
      this.$emit("update:favorite", !this.favorite);
    },
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

        formaterNumeroTelephone() {


      return this.phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');

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
  padding: 1em;
  display: flex;
  justify-content: space-between;
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