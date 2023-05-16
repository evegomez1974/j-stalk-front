<template>
  <div>
    <div>
      <NavBar />
    </div>

    <div id="app">
      <div class="grid">
        <div class="left-column">
          <div class="row-1">
            <infosUserProfil
              v-for="userInfo in listUserInfos"
              :key="userInfo.id"
              :userInfo="userInfo"
            />
          </div>
          <div class="row-2">
            <div class="grid-column-2">
              <div div class="grid-row-1">
                <div class="btnAddDocs" v-if="isVisibleAddDoc === false">
                  <b-button @click="isVisibleAddDoc = !isVisibleAddDoc"
                    >Ajouter un document</b-button
                  >
                </div>
                <div class="btnAddDocs" v-else>
                  <b-button @click="isVisibleAddDoc = !isVisibleAddDoc"
                    >Fermer</b-button
                  >
                </div>
                <div class="addDocs" v-if="this.isVisibleAddDoc === true">
                  <addDocsVue @message-sent-pdf="updateMessagePdf" />
                </div>
              </div>

              <div class="grid-row-2">
                <listDocsUser
                  class="grid-row-2-item"
                  v-for="userDocs in listUserDocs"
                  :key="userDocs.id"
                  :userDocs="userDocs"
                  @message-sent="updateMessage"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="right-column">
          <contact
            v-for="userInfo in listUserInfos"
            :key="userInfo.id"
            :userInfo="userInfo"
          />
          <div class="container" v-if="userPDF[0]">
            <pdfViewer :pdf="userPDF[0]"> </pdfViewer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pdfViewer from "@/components/PDFViewer";
import NavBar from "../components/navBar";
import infosUserProfil from "../components/infosUserProfil";
import listDocsUser from "../components/listDocsUser";
import addDocsVue from "../components/addDocs";
import contact from "../components/contact";
import "../assets/css/themes.scss";

export default {
  name: "profil",
  components: {
    NavBar,
    infosUserProfil,
    listDocsUser,
    pdfViewer,
    addDocsVue,
    contact,
  },
  data() {
    return {
      listUserInfos: [],
      listUserDocs: [],
      message: "erreur",
      userPDF: [],
      isVisibleAddDoc: false,
      UserlastPDF: "",
    };
  },
  computed: {},

  methods: {
    updateMessagePdf(newValuePDF) {
      console.log(newValuePDF);
      if (newValuePDF == "pdfValide") {
        //this.listUserDocs = []
        console.log(this.listUserDocs);
        this.isVisibleAddDoc = false;
        this.isVisibleBtnAddDoc = true;
        fetch("http://127.0.0.1:8080/userDocs", {
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("PAC-token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.listUserDocs = data;
            // console.log(data)
            // traitement
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },

    updateMessage(newValue, documentID) {
      console.log(newValue);
      console.log(documentID);
      this.message = newValue;
      this.userPDF = [];
      if (newValue == "ok") {
        fetch(`http://127.0.0.1:8080/userPDF/${documentID}`, {
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("PAC-token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.userPDF = data;
            console.log("chargement réussi " + this.userPDF);
            return this.userPDF;
            //   const blobData = new Uint8Array(data);

            // // Créer une URL blob à partir du tableau d'octets
            // const blobUrl = URL.createObjectURL(new Blob([blobData], { type: 'application/pdf' }));
            //   let reader = new FileReader();
            //   //reader.readAsDataURL(blobUrl); // convertit le blob en base64 et appelle onload
            // // Assigner l'URL blob à la propriété documentUrl

            // //L'ajouter au localstorage ?
            // console.log(blobUrl)
            // this.userPDF = blobUrl;
            // traitement
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },
  },

  mounted() {
    fetch("http://127.0.0.1:8080/userInfos", {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("PAC-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.listUserInfos = data;
        // console.log(data)
        // traitement
      })
      .catch((e) => {
        console.error(e);
      }),
      fetch("http://127.0.0.1:8080/userDocs", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("PAC-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.listUserDocs = data;
          // console.log(data)
          // traitement
        })
        .catch((e) => {
          console.error(e);
        });

    fetch("http://127.0.0.1:8080/userLastDocs", {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("PAC-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.userPDF = data;
        //console.log(data)
        // traitement
      })
      .catch((e) => {
        console.error(e);
      });
  },
};
</script>


<style>
@font-face {
  font-family: "Candara";
  src: local("Candara"), url("../assets/fonts/candara.ttf") format("truetype");
}

body {
  background-color: #343a4011;
  font-family: "Candara";
}

.grid {
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));  grid-gap: 2%;
}

.left-column,
.right-column {
  padding: 10px;
}

.row-1 {
  height: 50%;
  padding: 10px;
  border: 1px solid #6c757d;
  border-radius: 10px;
}

.row-2 {
  margin-top: 40px;
  padding: 10px;
}

.grid-column-2 {
  display: grid;
  grid-template-rows: repeat(2, auto); 
  grid-gap: 10px; 
}

.grid-row-1 {
  padding: 10px;
}

.grid-row-2 {
  display: grid;
  grid-template-columns: repeat(2, auto); 
  grid-gap: 10px;
  padding: 10px;
}

.grid-row-2-item {
  justify-self: center;
}

.image {
  display: none;
}

.add-photo {
  margin: 10px;
}

b-form-input {
  margin-bottom: 10px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#webViewer {
  height: 80vh;
  width: 45vw;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.listCards {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 10px;
  grid-auto-rows: minmax(300px, auto);
}

.cardUser {
  height: 350px;
}

.listDocsUser {
  margin-left: 20px;
  grid-column: 1/2;
  grid-row: 2;
}

.infosUserProfil {
  margin-left: 20px;
  grid-column: 1 / 2;
  grid-row: 1;
}
</style>
