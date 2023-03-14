<template>
  <div>
    <div>
      <div class="mt-4">
        <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
          <h4>Nom User</h4>
          <b-card-text class="zoneInfosUser">
            <div class="zoneUser">
              <b-label>Ecole</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>Type</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>Alternance/stage</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>Année en cour</b-label>
            </div>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
{/* <div class="avatarProfil">
      <b-avatar square src="https://placekitten.com/300/300" size="9rem"></b-avatar>
    </div>
    <div class="zoneInfosUser">
    </div> */}

export default {
  name: 'infosUserProfil',
  components: {},
  data (){
    return {


  }
  },
  methods: {


  }

}
</script>


<style scoped>

.zoneInfosUser {
  display: grid;
  grid-template-columns: repeat(2, auto);
}

.zoneUser {
  border: 1px solid black;
  margin: 10px;
}

</style>
