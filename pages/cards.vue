<template>
  <div class="test">
      <Card />
  </div>
</template>

<script>
import "../assets/css/themes.scss";
import Card from "../components/card.vue";

export default {
  name: "name",
  components: { Card },
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