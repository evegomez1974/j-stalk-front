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
        <b-button
          size="md"
          @click="showOnlyFavorites = !showOnlyFavorites"
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
        
          <!-- <BIconHeart :v-if:this.showOnlyFavorites class="pl-1"></BIconHeart>
		  <BIconHeartFill class="pl-1"></BIconHeartfill> -->
        </b-button>
      </div>
    </div>
    <div class="grid-container">
      <Card
        class="grid-card"
        v-for="(jobOffer, index) in filteredJobOffers"
        :key="index"
        :jobTitle="jobOffer.jobTitle"
        :company="jobOffer.company"
        :city="jobOffer.city"
        :department="jobOffer.department"
        :favorite="jobOffer.favorite"
        @update:favorite="changeCardFavorite(jobOffer, $event)"
        @update:index="index = $event"
      />
    </div>
  </div>
</template>

<script>
import "../assets/css/themes.scss";

import NavBar from "../components/navBar";
import Card from "../components/card";

import { BIconHeart } from "bootstrap-vue";

export default {
  name: "IndexPage",
  components: { NavBar, Card, BIconHeart },
  data() {
    return {
      jobOffers: [
        {
          jobTitle: "Developpeur IHM junior H/F",
          company: "PellencST",
          city: "Pertuis",
          department: "Vaucluse (84)",
          favorite: true,
        },
        {
          jobTitle: "Developpeur fullstack junior H/F",
          company: "Capgemini",
          city: "Aix en Provence",
          department: "Bouches du Rhônes (13)",
          favorite: false,
        },
        {
          jobTitle: "Developpeur back junior H/F",
          company: "Soprasteria",
          city: "Aix les milles",
          department: "Bouches du Rhônes (13)",
          favorite: false,
        },
        {
          jobTitle: "Developpeur cpp junior H/F",
          company: "PellencSAS",
          city: "Pertuis",
          department: "Vaucluse (84)",
          favorite: true,
        },
        {
          jobTitle: "Developpeur cpp junior H/F",
          company: "PellencSAS",
          city: "Pertuis",
          department: "Vaucluse (84)",
          favorite: true,
        },
      ],

      showOnlyFavorites: false,
    };
  },
  computed: {
	filteredJobOffers() {
		if(this.showOnlyFavorites) {
			return this.jobOffers.filter((jobOffer) => jobOffer.favorite)
		}else {
			return this.jobOffers;
		}
	}
  },
  methods: {
    changeCardFavorite(jobOffer, newValue) {
      jobOffer.favorite = newValue;
    },
  },
};
</script>

<style lang="scss">
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

.grid-card {
  justify-self: center;
}
</style>
