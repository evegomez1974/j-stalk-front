<template>
  <div class="cardDocsUser">
    <b-card-group>
      <b-card bg-variant="dark" text-variant="white">
        <b-card-header>
          <b-card-title>{{ userDocs.name }}</b-card-title>
        </b-card-header>

        <b-card-text>
          <b-button
            href="#"
            class="btn-popup"
            variant="secondary"
            @click="voirPDF(userDocs.documentID)"
            >Voir</b-button
          >

          <b-button
            v-if="isVisibleSupp"
            href="#"
            class="btn-popup"
            variant="secondary"
            @click="suppDoc(userDocs.documentID)"
            >Supprimer</b-button
          >

          <!-- <b-button href="#" variant="primary" @click="afficheInfoDoc(userDocs.name, userDocs.docPDF)" id="seeMore" v-b-modal="'modal-center-' + this.modalRef" >Changer</b-button> -->
        </b-card-text>

        <b-modal
          :id="'modal-center-' + this.modalRef"
          ref="modal"
          variant="jstalk-primary"
          centered
          title="Changer le pdf"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form
            ref="form"
            @submit.stop.prevent="handleSubmit(userDocs.documentID)"
          >
            <b-form-group
              label="Titre"
              label-for="title-input"
              invalid-feedback="Title is required"
              :state="titleState"
            >
              <b-form-input
                id="title-input"
                v-model="title"
                :state="titleState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Document Pdf"
              label-for="pdf-input"
              invalid-feedback="Pdf is required"
              :state="pdfState"
            >
              <b-form-file
                id="pdf-input"
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choisissez un document ou drop ici"
                drop-placeholder="Drop document ici..."
                accept=".pdf, .PDF"
              ></b-form-file>
              <div class="mt-3">
                Selectionner un pdf: {{ file ? file.name : "" }}
              </div>
            </b-form-group>
          </form>
        </b-modal>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "listDocsUser",
  components: {},
  props: {
    userDocs: Object,
  },
  data() {
    return {
      title: "",
      pdf: "",
      titleState: null,
      pdfState: null,
      file: "",
      submittedTitle: [],
      submittedPdf: [],
      myValueMessage: "ok",
      modalRef: (Math.random() + 1).toString(36).substring(7),
      base64: "",
      isVisibleSupp: true,
    };
  },
  computed: {
    renvoiInfos() {
      this.afficheInfoDoc();
      return this.name, this.docPDF;
    },
    afficheNewDoc(documentID) {
      voirPDF(documentID);
      console.log("ici" + documentID);
      this.$emit("message-sent", this.myValueMessage, documentID);
    },
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
          this.isVisibleSupp = !this.isVisibleSupp;
        }
        if (this.typeUser[0].status === "company") {
          this.isVisibleSupp = !this.isVisibleSupp;
        }
        if (this.typeUser[0].status === "teacher") {
          this.isVisibleSupp = !this.isVisibleSupp;
        }
      })
      .catch((e) => {
        console.error(e);
      });
  },

  methods: {
    suppDoc(documentID) {
      fetch(`http://127.0.0.1:8080/userDocsDelete/${documentID}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("PAC-token")}`,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status != 200) {
            this.error = "Une erreur est survenue, veuillez réessayer";
          } else {
            return res.status;
          }
        })
        .catch((e) => {
          // console.error(e);
          // this.verifCo = "erreur"
          this.$router.push("/notConneted");
        });
    },
    afficheInfoDoc(name, docPDF) {
      console.log(name);
      this.title = name;
      this.file = docPDF;
    },
    voirPDF(documentID) {
      this.$emit("message-sent", this.myValueMessage, documentID);
    },

    checkFormValidityTitle() {
      const validTitle = this.$refs.form.checkValidity();
      this.titleState = validTitle;
      return validTitle;
    },
    checkFormValidityPDF() {
      const validPDF = this.$refs.form.checkValidity();
      this.titleState = validPDF;
      return validPDF;
    },
    resetModal() {
      this.title = "";
      this.pdf = "";
      this.titleState = null;
      this.pdfState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit(this.userDocs.documentID);
    },
    handleSubmit(documentID) {
      // Exit when the form isn't valid
      if (!this.checkFormValidityTitle()) {
        return;
      }
      if (!this.checkFormValidityPDF()) {
        return;
      }
      // Push the name to submitted names
      this.submittedTitle.push(this.title);
      this.submittedPdf.push(this.pdf);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });

      var selectedFile = document.getElementById("pdf-input").files;
      var selectedTitle = this.title;
      console.log(documentID);
      //document.getElementById("title").value;
      //Check File is not Empty
      if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function (fileLoadedEvent) {
          base64 = fileLoadedEvent.target.result;
          // Print data in console
          console.log(base64);

          const bodyFormData = new FormData();
          bodyFormData.append("name", selectedTitle);
          bodyFormData.append("docPDF", base64);
          bodyFormData.append("docPDF", documentID);
          fetch("http://127.0.0.1:8080/userDocsModif", {
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
                return res.status();
              }
            })
            .catch((e) => {
              // console.error(e);
              // this.verifCo = "erreur"
              this.$router.push("/notConneted");
            });
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
      }
    },
  },
};
</script>


<style scoped>
.cardDocsUser {
  width: 80%;
}

.card {
  background-color: white !important;
  padding: 0 !important;
  width: 100% !important;
  justify-content: center;
}

.card-header {
  padding: 0;
  background: transparent;
  color: var(--jstalk-color-primary);
}

.card-title {
  height: 100%;
  width: 100%;
}

.card-text {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.btn-popup {
  width: 40% !important;
}
</style>
