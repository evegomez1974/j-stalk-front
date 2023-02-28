<template>
  <div>
    <NavBar />
    <div class="grid-container">
      <Card class="grid-card"
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

import NavBar from "../components/navBar.vue";
import Card from "../components/card.vue";

export default {
  name: "IndexPage",
  components: { NavBar, Card },
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
      ],
    };
  },
};
</script>

<style lang="scss">

.grid-container {
  display: grid;
  width: 100vw;
  grid-template-columns: repeat(2, auto);
  grid-gap: 2vh;
}

.grid-card {
  justify-self: center;
}
</style>
