<template>
  <div>
    <div class="buttons">
      <b-button @click="lettreIntervenant">
        Demander une lettre à un intervenant
      </b-button>
      <b-button @click="AfficheContact">
        Contact
      </b-button>
    </div>
    <div>
      <div
        v-if="isVisible"
        class="mt-4"
      >
        <div class="zoneInfosUser">
          <div class="zoneUser">
            <p
              class="subContact"
              variant="light"
            >
              {{
                userInfo.email
              }}
            </p>
          </div>
          <div class="zoneUser">
            <p
              class="subContact"
              variant="light"
            >
              {{
                userInfo.phoneNumber
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
export default {
  name: "InfosUserProfil",
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

.subContact {
  word-wrap: break-word;
  padding: 2%;
  display: block !important;
  font-size: 1em;
  font-weight: 400;
  text-align: left;
  height: auto;
  width: 100%;
  border-top: 15px solid var(--jstalk-color-primary);
  background: white;
  border-radius: 10px;
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
