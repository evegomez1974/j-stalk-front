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
        <b-button size="md" >Favoris <BIconHeart class="pl-1"></BIconHeart></b-button>
      </div>
    </div>
    <div class="grid-container">
      <Card
        class="grid-card"
        v-for="(jobOffer, index) in jobOffers"
        :key="index"
        :jobTitle="jobOffer.jobTitle"
        :company="jobOffer.company"
        :city="jobOffer.city"
        :department="jobOffer.department"
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
        },
        {
          jobTitle: "Developpeur fullstack junior H/F",
          company: "Capgemini",
          city: "Aix en Provence",
          department: "Bouches du Rhônes (13)",
        },
        {
          jobTitle: "Developpeur back junior H/F",
          company: "Soprasteria",
          city: "Aix les milles",
          department: "Bouches du Rhônes (13)",
        },
        {
          jobTitle: "Developpeur cpp junior H/F",
          company: "PellencSAS",
          city: "Pertuis",
          department: "Vaucluse (84)",
        },
        {
          jobTitle: "Developpeur cpp junior H/F",
          company: "PellencSAS",
          city: "Pertuis",
          department: "Vaucluse (84)",
        },
      ],
    };
  }
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
