<template>
  <Card />
<!-- <b-container class="bv-example-row">
  <b-row>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <div class="w-100"></div>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
  </b-row>
</b-container> -->
</template>

<script>
import Card from "../components/card";
import "../assets/css/themes.scss";
import "../assets/css/card.scss";
export default {
  name: "name",
  components: {Card}
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