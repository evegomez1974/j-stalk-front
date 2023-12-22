<template>
  <div class="pageContainer">
    <div class="grid2rows">
      <div class="row1">
        <div class="column1">
          <div class="profilPicture">
            <img
              id="img-user"
              :src="base64Image"
              alt="Image"
              img-left
              style="max-width: 100%; max-height: 100%; object-fit: contain"
            >
          </div>
          <div
            v-if="isVisibleAddImage"
            id="ajout_de_photo"
          >
            <label for="image">
              <img
                id="add_photo_logo"
                src="../assets/img/add-camera.png"
                alt="appareil photo"
              >
            </label>
            <input
              id="image"
              type="file"
              class="image"
              @change="onFileChange"
            >
          </div>
        </div>
        <div class="column2">
          <div class="subRow1">
            <h4>{{ userInfo.firstName }} {{ userInfo.name }}</h4>
          </div>
          <div class="subRow2">
            <div>
              <p
                class="subItem"
                variant="light"
              >
                {{
                  userInfo.yearSchool
                }} {{
                  userInfo.typeDegree
                }}
              </p>
            </div>
            <div>
              <p
                class="subItem"
                variant="light"
              >
                {{
                  userInfo.nameSchool
                }}
              </p>
            </div>
            <div>
              <b-badge
                class="subItem"
                variant="light"
              >
                {{
                  userInfo.jobType
                }}
              </b-badge>
            </div>
            <div>
              <p
                class="subItem"
                variant="light"
              >
                {{
                  userInfo.contractType
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row2">
        <p
          class="subItem"
          variant="light"
        >
          {{
            userInfo.description
          }}
        </p>
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
      busy: false,
      processing: false,
      counter: 1,
      interval: null,
      image: document.getElementById("image"),
      base64Image: this.userInfo.pictures,
      base64: "",
      isVisibleAddImage: true,
      typeUser: [],
    };
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
  beforeUnmount() {
    this.clearInterval();
  },
  mounted() {
    fetch("http://127.0.0.1:8080/userType", {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("PAC-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.typeUser = data;
        console.log(this.typeUser[0].status);

        // faire le traitement des type d'users
        if (this.typeUser[0].status === "student") {
        }
        if (this.typeUser[0].status === "school") {
          this.isVisibleAddImage = !this.isVisibleAddImage;
        }
        if (this.typeUser[0].status === "company") {
          this.isVisibleAddImage = !this.isVisibleAddImage;
        }
        if (this.typeUser[0].status === "teacher") {
          this.isVisibleAddImage = !this.isVisibleAddImage;
        }
      })
      .catch((e) => {
        console.error(e);
      });
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
          })
          .catch((e) => {
            // console.error(e);
            // this.verifCo = "erreur"
            this.$router.push("/notConneted");
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
  max-width: 100%;
}

.grid2rows {
  height: 100%;
  max-width: 100%;
  display: grid;
  grid-template-rows: 1.5fr 0.5fr;
  grid-gap: 10px;
}

.row1 {
  height: 45%;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  grid-gap: 10px;
  padding: 10px;
}

.row2 {
  padding: 10px;
  width: 60%;
}

.column1 {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid #6c757d;
  border-radius: 10px;
}

.column2 {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 0.5fr 1.5fr;
  grid-gap: 10px;
}

.subRow1 {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 0px;
}

.subRow2 {
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  padding: 10px;
}

.subItem {
  word-wrap: break-word;
  padding: 2%;
  display: block;
  font-size: 1em;
  font-weight: 400;
  text-align: left;
  height: auto;
  border-top: 15px solid var(--jstalk-color-primary);
  background: white;
  border-radius: 10px;
}

h4 {
  font-weight: 700;
}

.profilPicture {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin-bottom: 4%;
  border-radius: 10px;
}

#ajout_de_photo {
  text-align-last: center;
}
</style>
