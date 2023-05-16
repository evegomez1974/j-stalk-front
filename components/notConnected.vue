<template>
    <div class="pageDeco">
        <div class="texteDeco">
            <p>Vous n'êtes pas connecté </p>
        </div>
        <div class="btnDeco">
            <button @click="connectUser">Me connecter</button>
        </div>
    </div>
  </template>

  <script>

  export default {
    name: 'notConnected',
    components: {},

    data (){
      return {

    }
    },

    methods: {
        connectUser() {
            this.$router.push('/Login')
        }

    },


  }
  </script>


  <style scoped>
@font-face {
  font-family: "Candara";
  src: local("Candara"), url("../assets/fonts/candara.ttf") format("truetype");
}
.pageDeco {

    text-align: center;
}

.texteDeco {
    text-align: center;
}

.btnDeco {

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
