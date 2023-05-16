<template>
  <div>
    <div class="buttons">
      <b-button @click="lettreIntervenant"
        >Demander une lettre à un intervenant</b-button
      >
      <b-button @click="AfficheContact">Contact</b-button>
    </div>
    <div>
      <div class="mt-4" v-if="isVisible">
        <div class="zoneInfosUser">
          <div class="zoneUser">
              <b-badge class="badge" variant="light">{{
                userInfo.email
              }}</b-badge>
         
          </div>
          <div class="zoneUser">
       
              <b-badge class="badge" variant="light">{{
                userInfo.phoneNumber
              }}</b-badge>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
export default {
  name: "infosUserProfil",
  components: {},
  props: {
    userInfo: Object,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    AfficheContact() {
      this.isVisible = !this.isVisible;
    },
    lettreIntervenant() {
      alert("La demande de lettre à l'intervenant est bien envoyé");
    },
  },
};
</script>


  <style scoped>
.buttons {
  margin-bottom: 20px;
}

.zoneInfosUser {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10%;
  margin-bottom: 40px;
}

.zoneUser {
  width: 60%;
  justify-self: center;
}

.badge {
  font-size: 1em;
  font-weight: 400;
  text-align: left;
  padding-left: 5%;
  padding-bottom: 0;
  height: 150%;
  width: 100%;
  border-top: 10px solid var(--jstalk-color-primary);
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
