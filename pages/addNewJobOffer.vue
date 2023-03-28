<template>
<div>
    <NavBar />
    <CreateJobOffer />
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

</style>