<template>
  <div>
    <div>
      <NavBar/>
    </div>
      <div class="listCards">
        <div class="infosUserProfil">
          <infosUserProfil />
        </div>
        <div class="cvUser">
          <cvUser />
        </div>

        <div class="listDocsUser">
          <label>Liste des documents</label>
          <listDocsUser />
        </div>
     </div>
  </div>
</template>

<script>

import NavBar from "../components/navBar";
import infosUserProfil from "../components/infosUserProfil";
import cvUser from "../components/cvUser";
import listDocsUser from "../components/listDocsUser";



export default {
    name: "profil",
    components: { NavBar, infosUserProfil, cvUser, listDocsUser },
    data() {
    return {

    };
  },

}
</script>


<style scoped>

.listCards {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}


.cvUser {
  margin-top: 20px;
  grid-column: 2 / 2;
  grid-row: 1;

}

.listDocsUser {
  margin-left: 20px;
  grid-column: 1;
  grid-row: 2;

}

.infosUserProfil{
  margin-left: 20px;
  grid-column: 1 / 2;
  grid-row: 1;
}

</style>
