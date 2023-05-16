<template>
    <div>
        <div>
        <button @click="lettreIntervenant">Demander une lettre à un intervenant</button>
        <button @click="AfficheContact">Contact</button></div>
      <div>
        <div class="mt-4" v-if="isVisible">
          <b-card>
            <b-card-text class="zoneInfosUser">
              <div class="zoneUser">
                <b-label>{{ userInfo.email }}</b-label>
              </div>
              <div  class="zoneUser">
                <b-label>{{ userInfo.phoneNumber }}</b-label>
              </div>
            </b-card-text>


          </b-card>
        </div>
      </div>
    </div>
  </template>

  <script>

  export default {
    name: 'infosUserProfil',
    components: {},
    props: {
        userInfo: Object,

      },
    data (){
      return {
        isVisible:false,

    }
  },
  methods: {
    AfficheContact() {
        this.isVisible = !this.isVisible
    },
    lettreIntervenant() {
        alert("La demande de lettre à l'intervenant est bien envoyé")
    }
 }  ,
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


  .image {
    display: none;
  }

  .add-photo {
    margin: 10px;
  }

  .contain-photo {
    border: 1px solid blue;
    border-radius: 80px;
    height: 60px;
    width: 90px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3px;
  }


  #separateur_photo {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .separateur {
    width: 25%;
    height: 2px;
    background: blue;
  }

  #add_photo_logo {
    width: 8vh;
    height: auto;
  }

  #add_photo_container {
    width: 14vh;
    height: auto;
    padding: 1vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.4vh solid blue;
    border-radius: 11vh;
  }

  #ajout_de_photo {
    width: 90%;
    margin: 0 5%;
    height: min-content;
    display: flex;
    flex-direction: column;
  }



  </style>
