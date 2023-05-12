<template>
  <div>
    <div>
      <div class="mt-4">
        <b-card img-src="" img-alt="" img-left class="mb-3" id="img-user" accept=".jpg, .png">{{ userInfo.pictures }}

          <div id="ajout_de_photo">
            <div id="separateur_photo">


                <label for="image">
                  <img id="add_photo_logo"
                  src="../assets/img/add-camera.png"
                  alt="appareil photo">
                </label>
                  <input id="image" v-on:change="onFileChange" type="file" class="image">
                  <button @click="methModifPictures">Envoyer</button>
            </div>
          </div>

          <h4>{{ userInfo.firstName}} {{ userInfo.name }}</h4>
          <b-card-text class="zoneInfosUser">
            <div class="zoneUser">
              <b-label>{{ userInfo.nameSchool }}</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>{{ userInfo.contratType }}</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>{{ userInfo.postType }}</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>{{ userInfo.yearSchool }}</b-label>
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
      busy: false,
        processing: false,
        counter: 1,
        interval: null,
        picture: this.userInfo.pictures,
        image: null,
  }
  },
  beforeDestroy() {
      this.clearInterval()
    },
  methods: {
    clearInterval() {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      },
      onShown() {
        // Focus the dialog prompt
        this.$refs.dialog.focus()
      },
      onHidden() {
        // In this case, we return focus to the submit button
        // You may need to alter this based on your application requirements
        this.$refs.submit.focus()
      },
      onSubmit() {
        this.processing = false
        this.busy = true
      },
      onCancel() {
        this.busy = false
      },
      onOK() {
        this.counter = 1
        this.processing = true
        // Simulate an async request
        this.clearInterval()
        this.interval = setInterval(() => {
          if (this.counter < 20) {
            this.counter = this.counter + 1
          } else {
            this.clearInterval()
            this.$nextTick(() => {
              this.busy = this.processing = false
            })
          }
        }, 350)
      },
      onFileChange(e) {
        const files = e.target.files;
      if (files.length > 0) {
        this.image = files[0];


      // Récupération de l'élément input de type "file"
      const inputElement = document.getElementById("image");

      // Récupération du fichier sélectionné
      const file = inputElement.files[0];

      // Création d'un objet FileReader pour lire le contenu du fichier
      const reader = new FileReader();

      // Fonction appelée lorsque la lecture du fichier est terminée
      reader.onload = () => {
        // Récupération du contenu du fichier sous forme de tableau d'octets
        const fileContent = new Uint8Array(reader.result);

        // Conversion du tableau d'octets en objet BLOB
        const blob = new Blob([fileContent], { type: file.type });

        // Envoi du BLOB à la base de données via une requête AJAX ou fetch


        const bodyFormData = new FormData();
      bodyFormData.set('pictures', blob);
            //Hasher le mot de passe
      fetch('http://127.0.0.1:8080/userPictures/'+ blob, {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
        },

      })
        .then(res => {
          console.log(res);
          if(res.status != 200) {
            this.error = "Une erreur est survenue, veuillez réessayer";
          }
          else {
            return res.data;
          }
        })
        .then(data => {
                // console.log("data:", data);
          localStorage.setItem('PAC-token', data.token);
        })
        //this.image =  this.userInfo.pictures

      };

      // Lecture du contenu du fichier en tant que tableau d'octets
      reader.readAsArrayBuffer(file);




      } else {
        this.image = null;
      }
      // var files = e.target.files || e.dataTransfer.files;
      // if (!files.length)
      //   return;
      // this.createImage(files[0]);
    },
    methModifPictures(){
      if (!this.image) {
        return;
      }
      console.log(this.image)

      const bodyFormData = new FormData();
      bodyFormData.set('pictures', this.image);
            //Hasher le mot de passe
      fetch('http://127.0.0.1:8080/userPictures/'+ this.image, {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
        },

      })
        .then(res => {
          console.log(res);
          if(res.status != 200) {
            this.error = "Une erreur est survenue, veuillez réessayer";
          }
          else {
            return res.json();
          }
        })
        .then(data => {
                // console.log("data:", data);
          localStorage.setItem('PAC-token', data.token);
        })
        //this.image =  this.userInfo.pictures

        }

    },


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
