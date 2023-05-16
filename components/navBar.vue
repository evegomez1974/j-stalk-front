<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#"
        ><img
          src="../assets/img/j-stalk-logo.png"
          height="60vh"
          alt="J-Stalk logo"
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/" v-if="isVisibleEntrepise">Annonces entreprises</b-nav-item>
          <b-nav-item href="/addNewJobOffer" v-if="isVisibleAnnonce">Créer une annonce</b-nav-item>
          <b-nav-item href="/studentsList" v-if="isVisibleEtudiant">Liste des élèves</b-nav-item>
          <b-nav-item href="/companiesList" v-if="isVisibleCompanie">Listes des entreprises</b-nav-item>
          <b-nav-item href="/profil">Profil</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
          <b-navbar-nav>
            <div id="ajout_de_photo">
                <div id="separateur_photo">
                <img id="add_photo_logo" @click="decoUser"
                    src="../assets/img/deconnexion.png"
                alt="appareil photo">
                </div>
            </div>
          </b-navbar-nav>

          <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

          <!--<b-nav-item-dropdown right> -->
          <!--Using 'button-content' slot -->
          <!--<template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data (){
    return {
      token:'',
      isVisibleEntrepise:true,
      isVisibleAnnonce:true,
      isVisibleEtudiant:true,
      isVisibleCompanie:true,
      typeUser:""

  }
  },
  mounted () {
    fetch('http://127.0.0.1:8080/userType'  , {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
                },
            })
            .then(res => res.json())
            .then(data => {
                this.typeUser = data;
                console.log(this.typeUser[0].status)

            // faire le traitement des type d'users
            if(this.typeUser[0].status === "student") {
                this.isVisibleAnnonce = !this.isVisibleAnnonce
            }
            if(this.typeUser[0].status === "school") {
                this.isVisibleAddImage = !this.isVisibleAddImage
            }
            if(this.typeUser[0].status === "company") {
                this.isVisibleAddImage = !this.isVisibleAddImage
            }
            if(this.typeUser[0].status === "teacher") {
                this.isVisibleAnnonce = !this.isVisibleAnnonce
            }

            })
            .catch(e => {
                console.error(e);
            })

  },

  methods: {
    decoUser() {
        this.token = localStorage.getItem('PAC-token')
        this.token= "";
        localStorage.setItem('PAC-token', this.token)
        this.$router.push('/Login')
    }
  }
};


</script>

<style lang="scss">
@font-face {
  font-family: "Candara";
  src: local("Candara"), url("../assets/fonts/candara.ttf") format("truetype");
}

body {
  //background: var(--jstalk-color-background);
  font-family: "Candara";
}

.b-navbar {
  background-color: black;
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
  width: 4vh;
  height: auto;
  margin-left: 15px;
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
