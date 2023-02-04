<template>
  <div class="test">
      <Card />
      <!-- <CardPopup /> -->
  </div>
</template>

<script>
import "../assets/css/card.scss";
import "../assets/css/cardPopup.scss";
import "../assets/css/themes.scss";
import Card from "../components/Card.vue";
// import CardPopup from "../components/CardPopup.vue";

export default {
  name: "name",
  components: { Card /*, CardPopup*/ },
};
</script>

<style lang="scss">
.test {
  display: flex;
  justify-content: space-evenly;
}

@media only screen and (max-width: 1000px) {
  .test {
    height: 100vh;
    flex-direction: column;
    align-items: center;
  }
}
</style>