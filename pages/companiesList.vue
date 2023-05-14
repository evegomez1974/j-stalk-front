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
      <CardCompany
        class="grid-Cardcompany"
        v-for="(company, index) in filteredCompanies"
        :key="index"
        :name="company.userName"
        :phoneNumber="company.phoneNumber"
        :email="company.email"
        :address="company.address"
        :city="company.city"
        :department="company.departmentName"
        :description="company.description"
        :favorite="Boolean(company.favorite)"
        @update:favorite="changeCardFavorite(company, $event)"
        @update:index="index = $event"
      />
    </div>
  </div>
</template>

<script>
import "../assets/css/themes.scss";

import NavBar from "../components/navBar";
import CardCompany from "../components/cardCompany";

import { BIconHeart } from "bootstrap-vue";

export default {
  name: "IndexPage",
  components: { NavBar, CardCompany, BIconHeart },
  data() {
    return {
      companies: null,
      showOnlyFavorites: false,
    };
  },
  computed: {
    filteredCompanies() {
      if (this.showOnlyFavorites) {
        return this.companies.filter((company) => company.favorite);
      } else {
        return this.companies;
      }
    },
  },
  mounted() {
    fetch("http://127.0.0.1:8080/listCompanies")
      .then((response) => response.json())
      .then((data) => {
        const companies = data.companies.data;
        // Mettre à jour la variable data avec les données reçues
        this.companies = companies;
      })
      .catch((error) => {
        console.error("Une erreur est survenue :", error);
      });
  },
  methods: {
    changeCardFavorite(company, newValue) {
      company.favorite = newValue;
    },
  },
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

.grid-Cardcompany {
  justify-self: center;
}
</style>
