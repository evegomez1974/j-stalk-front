<template>
  <div class="pageContainer">
    <!-- <div class="grid2rows">
      <div class="row1">
        <div class="column1"></div>
        <div class="column2">
          <div class="subRow1"></div>
          <div class="subRow2">
            <div class="subItem"></div>
            <div class="subItem"></div>
            <div class="subItem"></div>
            <div class="subItem"></div>
          </div>
        </div>
      </div>
      <div class="row2"></div>
    </div> -->

    <!-- __________________________________ -->

    <div class="grid2rows">
      <div class="row1">
        <div class="column1">
          <div class="profilPicture">
    <img
      :src="base64Image"
      alt="Image"
      img-left
      id="img-user"
      style="max-width: 100%; max-height: 100%; object-fit: contain;"
    />
          </div>
          <div id="ajout_de_photo">
            <div id="separateur_photo">
              <label for="image">
                <img
                  id="add_photo_logo"
                  src="../assets/img/add-camera.png"
                  alt="appareil photo"
                />
              </label>
              <input
                id="image"
                v-on:change="onFileChange"
                type="file"
                class="image"
              />
            </div>
          </div>
        </div>
        <div class="column2">
          <div class="subRow1">
            <h4>{{ userInfo.firstName }} {{ userInfo.name }}</h4>
          </div>
          <div class="subRow2">
            <div class="subItem">
              <b-badge class="badge" variant="light">{{
                userInfo.yearSchool
              }}</b-badge>
            </div>
            <div class="subItem">
              <b-badge class="badge" variant="light">{{
                userInfo.nameSchool
              }}</b-badge>
            </div>
            <div class="subItem">
              <b-badge class="badge" variant="light">{{
                userInfo.jobType
              }}</b-badge>
            </div>
            <div class="subItem">
              <b-badge class="badge" variant="light">{{
                userInfo.contractType
              }}</b-badge>
            </div>
          </div>
        </div>
      </div>
      <div class="row2">
        <b-badge class="badge" variant="light">{{
          userInfo.description
        }}</b-badge>
      </div>
    </div>

    <!-- <div>
      <div class="mt-4">
        <b-card>
          <img
            :src="base64Image"
            alt="Image"
            img-left
            id="img-user"
            width="150"
            height="200"
          />
          <div id="ajout_de_photo">
            <div id="separateur_photo">
              <label for="image">
                <img
                  id="add_photo_logo"
                  src="../assets/img/add-camera.png"
                  alt="appareil photo"
                />
              </label>
              <input
                id="image"
                v-on:change="onFileChange"
                type="file"
                class="image"
              />
            </div>
          </div>

          <h4>{{ userInfo.firstName }} {{ userInfo.name }}</h4>
          <b-card-text class="zoneInfosUser">
            <div class="zoneUser">
              <b-label>{{ userInfo.nameSchool }}</b-label>
            </div>
            <div class="zoneUser">
              <b-label>{{ userInfo.contractType }}</b-label>
            </div>
            <div class="zoneUser">
              <b-label>{{ userInfo.jobType }}</b-label>
            </div>
            <div class="zoneUser">
              <b-label>{{ userInfo.yearSchool }}</b-label>
            </div>
          </b-card-text>
          <div>
            <b-label>{{ userInfo.description }}</b-label>
          </div>
        </b-card>
      </div>
    </div> -->
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
      busy: false,
      processing: false,
      counter: 1,
      interval: null,
      image: document.getElementById("image"),
      base64Image: this.userInfo.pictures,
      base64: "",
    };
  },
  beforeDestroy() {
    this.clearInterval();
  },
  watch: {
    image: function (newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
        this.createBase64Image(newVal);
      } else {
        this.base64 = null;
      }
    },
  },
  methods: {
    createBase64Image: function (FileObject) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
        console.log(this.base64);
        const bodyFormData = new FormData();
        bodyFormData.append("pictures", this.base64);
        fetch("http://127.0.0.1:8080/userPictures", {
          body: bodyFormData,
          method: "post",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("PAC-token")}`,
          },
        })
          .then((res) => {
            // console.log(res);
            if (res.status != 200) {
              this.error = "Une erreur est survenue, veuillez réessayer";
            } else {
              return res.json();
            }
          })
          .then((res) => {
            console.log(res.data);
          });
      };
      reader.readAsDataURL(FileObject);
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    onShown() {
      // Focus the dialog prompt
      this.$refs.dialog.focus();
    },
    onHidden() {
      // In this case, we return focus to the submit button
      // You may need to alter this based on your application requirements
      this.$refs.submit.focus();
    },
    onSubmit() {
      this.processing = false;
      this.busy = true;
    },
    onCancel() {
      this.busy = false;
    },
    onOK() {
      this.counter = 1;
      this.processing = true;
      // Simulate an async request
      this.clearInterval();
      this.interval = setInterval(() => {
        if (this.counter < 20) {
          this.counter = this.counter + 1;
        } else {
          this.clearInterval();
          this.$nextTick(() => {
            this.busy = this.processing = false;
          });
        }
      }, 350);
    },
    onFileChange(e) {
      const files = e.target.files;
      if (files.length > 0) {
        this.image = files[0];
      } else {
        this.image = null;
      }
    },
  },
};
</script>


<style scoped>
.pageContainer {
  height: 100%;
  width: 100%;
}

.grid2rows {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1.5fr 0.5fr;
  grid-gap: 10px;
}

.row1 {
  height: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-gap: 10px;
 /* background: #1321a3;*/
  padding: 10px;
}

.row2 {
 /* background: #1321a3;*/
  padding: 10px;
}

.column1 {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  /*background: #13a354;*/
}

.column2 {
  height: 100%;
  display: grid;
  grid-template-rows: 0.5fr 1.5fr;
  grid-gap: 10px;
 /* background-color: #13a354;*/
}

.subRow1 {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 0px;
/*  background-color: #a3135b;*/
}

.subRow2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  padding: 10px;
 /* background-color: #a3135b;*/
}
.subItem {
  /*  border-top: 10px solid var(--jstalk-color-primary);*/
  border-radius: 4%;
  /* padding: 10px;*/
/*/  background-color: #c42d12;*/
}

.badge {
  font-size: 1em;
  font-weight: 400;
  text-align: left;
  padding-left: 5%;
  padding-bottom: 0;
  height: 100%;
  width: 100%;
  border-top: 10px solid var(--jstalk-color-primary);
}

h4 {
  font-weight: 700;
}

.profilPicture {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px; /* Taille fixe du rectangle */
  height: 200px; /* Taille fixe du rectangle */
  /*background-color: #ccc; /* Couleur de fond du rectangle */
  margin-bottom: 4%;
  border: 2px solid black;
  border-radius: 10px;
}

#ajout_de_photo {
  background: peru;
}

</style>
