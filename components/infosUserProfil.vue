<template>
  <div>
    <div>
      <div class="mt-4">
        <b-card img-src="" img-alt="Image" img-left class="mb-3" id="img-user" accept=".jpg, .png">
          <img :src="base64Image" alt="Image" img-left  id="img-user" width="150" height="200">
          <div id="ajout_de_photo">
            <div id="separateur_photo">
                <label for="image">
                  <img id="add_photo_logo"
                  src="../assets/img/add-camera.png"
                  alt="appareil photo">
                </label>
                  <input id="image" v-on:change="onFileChange" type="file" class="image">

            </div>
          </div>

          <h4>{{ userInfo.firstName}} {{ userInfo.name }}</h4>
          <b-card-text class="zoneInfosUser">
            <div class="zoneUser">
              <b-label>{{ userInfo.nameSchool }}</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>{{ userInfo.contractType }}</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>{{ userInfo.jobType }}</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>{{ userInfo.yearSchool }}</b-label>
            </div>
          </b-card-text>
          <div>
              <b-label>{{ userInfo.description }}</b-label>
          </div>


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
        image: document.getElementById("image"),
        base64Image: this.userInfo.pictures

  }
  },
  beforeDestroy() {
      this.clearInterval()
    },
  watch: {
    image: function (newVal, oldVal) {
      if(newVal) {
        console.log(newVal)
        this.createBase64Image(newVal);
      } else {
        this.base64 = null;
      }
    }
  },
  methods: {
    createBase64Image: function(FileObject) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
        console.log(this.base64)
        const bodyFormData = new FormData();
        bodyFormData.append('pictures', this.base64);
        fetch('http://127.0.0.1:8080/userPictures' , {
          body: bodyFormData,
          method: 'post',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
          },
        })
        .then(res => {
          // console.log(res);
          if(res.status != 200) {
            this.error = "Une erreur est survenue, veuillez réessayer";
          }
          else {
            return res.json();

          }
        })
        .then(res => {
          console.log(res.data);

          })
        };
        reader.readAsDataURL(FileObject);
      },
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
      } else {
        this.image = null
      }

    },

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
