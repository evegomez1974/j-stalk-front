<template>
  <div>
    <NavBar />
    <div class="header-container">
      <div class="search-container">
        <b-nav-form>
          <b-form-input
            size="md"
            class="mr-md-2"
            placeholder="Rechercher"
          ></b-form-input>
          <b-button size="md" class="my-2 my-md-0" type="submit"
            >Rechercher</b-button
          >
        </b-nav-form>
      </div>
      <div class="favorite-container">
        <b-button size="md" @click="showOnlyFavorites = !showOnlyFavorites"
          >Favoris
          <b-icon
            v-if="showOnlyFavorites"
            class="pl-1"
            icon="heart-fill"
            variant="light"
            font-scale="1.3"
          ></b-icon>
          <b-icon
            v-else
            class="pl-1"
            icon="heart"
            variant="light"
            font-scale="1.3"
          ></b-icon>
        </b-button>
      </div>
    </div>
    <div class="grid-container">
      <CardJobOffer
        class="grid-CardJobOffer"
        v-for="(jobOffer, index) in filteredJobOffers"
        :key="index"
        :jobTitle="jobOffer.jobTitle"
        :company="jobOffer.company"
        :jobType="jobOffer.jobType"
        :contractType="jobOffer.contractType"
        :contractLength="jobOffer.contractLength"
        :city="jobOffer.city"
        :department="jobOffer.department"
        :description="jobOffer.description"
        :datePost="new Date(jobOffer.datePost).getHours()"
        :favorite="Boolean(jobOffer.favorite)"
        @update:favorite="changeCardFavorite(jobOffer, $event)"
        @update:index="index = $event"
      />
    </div>
  </div>
</template>

<script>
import "../assets/css/themes.scss";

import NavBar from "../components/navBar";
import CardJobOffer from "../components/jobOffers/cardJobOffer";

import { BIconHeart } from "bootstrap-vue";

export default {
  name: "IndexPage",
  components: { NavBar, CardJobOffer, BIconHeart },
  data() {
    return {
      jobOffers : null,
      // jobOffers: [
      //   {
      //     jobTitle: "Developpeur IHM junior H/F",
      //     company: "PellencST",
      //     city: "Pertuis",
      //     department: "Vaucluse (84)",
      //     description:
      //       "Vous intervenez au sein d'un des programmes clé d'un constructeur aéronautique. Ces programmes visent à innover et à revisiter l'expérience utilisateur en opérant la transformation digitale de la société. Vous vous intégrez dans nos équipes qui travaillent en étroite collaboration avec les équipes client. Vous pourrez intervenir sur des projets agiles, en méthode traditionnelle ou en assistance technique",
      //     favorite: true,
      //   },
      //   {
      //     jobTitle: "Developpeur fullstack junior H/F",
      //     company: "Capgemini",
      //     city: "Aix en Provence",
      //     department: "Bouches du Rhônes (13)",
      //     description:
      //       "Vous intervenez au sein d'un des programmes clé d'un constructeur aéronautique. Ces programmes visent à innover et à revisiter l'expérience utilisateur en opérant la transformation digitale de la société. Vous vous intégrez dans nos équipes qui travaillent en étroite collaboration avec les équipes client. Vous pourrez intervenir sur des projets agiles, en méthode traditionnelle ou en assistance technique",
      //     favorite: false,
      //   },
      //   {
      //     jobTitle: "Developpeur back junior H/F",
      //     company: "Soprasteria",
      //     city: "Aix les milles",
      //     department: "Bouches du Rhônes (13)",
      //     description:
      //       "Vous intervenez au sein d'un des programmes clé d'un constructeur aéronautique. Ces programmes visent à innover et à revisiter l'expérience utilisateur en opérant la transformation digitale de la société. Vous vous intégrez dans nos équipes qui travaillent en étroite collaboration avec les équipes client. Vous pourrez intervenir sur des projets agiles, en méthode traditionnelle ou en assistance technique",
      //     favorite: false,
      //   },
      //   {
      //     jobTitle: "Developpeur cpp junior H/F",
      //     company: "PellencSAS",
      //     city: "Pertuis",
      //     department: "Vaucluse (84)",
      //     description:
      //       "Vous intervenez au sein d'un des programmes clé d'un constructeur aéronautique. Ces programmes visent à innover et à revisiter l'expérience utilisateur en opérant la transformation digitale de la société. Vous vous intégrez dans nos équipes qui travaillent en étroite collaboration avec les équipes client. Vous pourrez intervenir sur des projets agiles, en méthode traditionnelle ou en assistance technique",
      //     favorite: true,
      //   },
      //   {
      //     jobTitle: "Developpeur cpp junior H/F",
      //     company: "PellencSAS",
      //     city: "Pertuis",
      //     department: "Vaucluse (84)",
      //     description:
      //       "Vous intervenez au sein d'un des programmes clé d'un constructeur aéronautique. Ces programmes visent à innover et à revisiter l'expérience utilisateur en opérant la transformation digitale de la société. Vous vous intégrez dans nos équipes qui travaillent en étroite collaboration avec les équipes client. Vous pourrez intervenir sur des projets agiles, en méthode traditionnelle ou en assistance technique",
      //     favorite: true,
      //   },
      // ],

      showOnlyFavorites: false,
    };
  },
  computed: {
    filteredJobOffers() {
      if (this.showOnlyFavorites) {
        return this.jobOffers.filter((jobOffer) => jobOffer.favorite);
      } else {
        return this.jobOffers;
      }
    },
  },
  methods: {
    changeCardFavorite(jobOffer, newValue) {
      jobOffer.favorite = newValue;
    },
  },
  mounted() {
  fetch('http://127.0.0.1:8080/jobOffers')
    .then(response => response.json())
    .then(data => {

      const jobOffers = data.jobOffers.data
      //console.log(jobOffers)
      // jobOffers.forEach((jobOffer) => {
      // const department = jobOffer.department;
      // console.log(department);
      // });
      // Mettre à jour la variable data avec les données reçues
      this.jobOffers = jobOffers;
    })
    .catch(error => {
      console.error('Une erreur est survenue :', error);
    });
}
};
</script>

<style lang="scss">
@font-face {
    font-family: "Candara";
    src: local("Candara"), url("../assets/fonts/candara.ttf") format("truetype");
  }

body {
    background-color: #343a4011;
    font-family: "Candara";

}
.header-container {
  display: flex;
  justify-content: space-around;
  //background-color: orange;
  margin-top: 1%;
  margin-bottom: 2%;
}

.search-container {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15%;
  //background-color: red;
}

.favorite-container {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15%;
  //background-color: blue;
}
.grid-container {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, auto);
  grid-gap: 2vh;
}

.grid-CardJobOffer {
  justify-self: center;
}
</style>
