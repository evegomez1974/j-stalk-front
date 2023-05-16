<template>
<div>
    <NavBar />
    <div class="createJobOfferConteneur">
    <CreateJobOffer />
    </div>
</div>
</template>

<script>
import "../assets/css/themes.scss";

import NavBar from "../components/navBar";
import CreateJobOffer from "../components/jobOffers/createJobOffer";

export default {
    name: "addNewJobOffer",
    components: { NavBar, CreateJobOffer },


}
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

.createJobOfferConteneur {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
}
</style>
