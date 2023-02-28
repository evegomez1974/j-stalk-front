<template>
<b-container class="bv-example-row">
  <b-row>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
    <div class="w-100"></div>
    <b-col>Column</b-col>
    <b-col>Column</b-col>
  </b-row>
</b-container>
</template>

<script>

export default {
  name: "name",};
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