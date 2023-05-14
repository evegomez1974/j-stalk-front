<template>
  <div>
    <div>
      <NavBar/>
    </div>

      <div class="listCards">

        <div class="cardUser">
          <div class="infosUserProfil">
            <infosUserProfil v-for="userInfo in listUserInfos" :key="userInfo.id" :userInfo="userInfo"  />
          </div>
        </div>

        <div class="cardUser">
          <div class="container">
            <pdfViewer
              :url="this.userPDF"
            >
            </pdfViewer>

          </div>
        </div>

        <div class="cardUser">
          <div class="listDocsUser">
            <label>Liste des documents</label>
            <b-button v-b-modal.modal-prevent-closing>+</b-button>

            <b-modal
              id="modal-prevent-closing"
              ref="modal"
              title="Submit Your Pdf"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <form ref="form" @submit.stop.prevent="handleSubmit">
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
                  <div class="mt-3">Selectionner un pdf: {{ file ? file.name : '' }}</div>

                </b-form-group>


              </form>
            </b-modal>

            <listDocsUser v-for="userDocs in listUserDocs" :key="userDocs.id" :userDocs="userDocs"  @message-sent="updateMessage"/>
          </div>
        </div>

     </div>
  </div>
</template>

<script>
import pdfViewer from "@/components/PDFViewer"
import NavBar from "../components/navBar";
import infosUserProfil from "../components/infosUserProfil";
import listDocsUser from "../components/listDocsUser";



export default {
    name: "profil",
    components: { NavBar, infosUserProfil, listDocsUser, pdfViewer },
    data() {
    return {
        title: '',
        pdf: '',
        titleState: null,
        pdfState: null,
        file: null,
        submittedTitle: [],
        submittedPdf: [],
        listUserInfos: [ ],
        listUserDocs: [ ],
        message:"erreur",
        userPDF: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf'

    };
  },
  methods: {
      checkFormValidityTitle() {
        const validTitle = this.$refs.form.checkValidity()
        this.titleState = validTitle
        return validTitle
      },
      checkFormValidityPDF() {
        const validPDF = this.$refs.form.checkValidity()
        this.titleState = validPDF
        return validPDF
      },
      resetModal() {
        this.title = ''
        this.pdf = ''
        this.titleState = null
        this.pdfState = null
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidityTitle()) {
          return
        }
        if (!this.checkFormValidityPDF()) {
          return
        }
        // Push the name to submitted names
        this.submittedTitle.push(this.title)
        this.submittedPdf.push(this.pdf)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })

        // Récupération de l'élément input de type "file"
        const inputElement = document.getElementById("pdf-input");

        // Récupération du fichier sélectionné
        const file = inputElement.files[0];

        // Création d'un objet FileReader
        const reader = new FileReader();

        // Fonction de callback appelée lorsque le fichier est lu
        reader.onload = (event) => {
          // Conversion du fichier en base64
          const pdfBase64 = event.target.result.replace(/^data:application\/pdf;base64,/, '');

          // Envoi du PDF sérialisé à un serveur ou stockage en local
          // ...

          const bodyFormData = new FormData();
            bodyFormData.append('name', this.title);
            bodyFormData.append('docPDF', pdfBase64);
            fetch('http://127.0.0.1:8080/userDocs', {
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
                    return res.data();

                }
            })
            .then(res => {
              console.log(res.data);

          })
        };

        // Lecture du fichier
        reader.readAsDataURL(file);



        },

    updateMessage(newValue, documentID) {
      console.log(newValue);
      console.log(documentID);
      this.message = newValue;

        if (newValue == "ok") {

          fetch('http://127.0.0.1:8080/userPDF/' +  documentID , {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
          },
      })
      .then(res => res.json())
      .then(data => {
        // this.userPDF = data;
        console.log(data)
        const blobData = new Uint8Array(data);

      // Créer une URL blob à partir du tableau d'octets
      const blobUrl = URL.createObjectURL(new Blob([blobData], { type: 'application/pdf' }));

      // Assigner l'URL blob à la propriété documentUrl
      this.userPDF = blobUrl;
        // traitement
      })
      // .catch(e => {
      //   console.error(e);
      //   } )
      }
    }
  },

    mounted () {
      fetch('http://127.0.0.1:8080/userInfos'  , {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
          },
      })
      .then(res => res.json())
      .then(data => {
        this.listUserInfos = data;
        console.log(data)
        // traitement
      })
      .catch(e => {
        console.error(e);
      }),


      fetch('http://127.0.0.1:8080/userDocs'  , {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
          },
      })
      .then(res => res.json())
      .then(data => {
        this.listUserDocs = data;
        console.log(data)
        // traitement
      })
      .catch(e => {
        console.error(e);
      })
    }

}
</script>


<style>

b-form-input {
  margin-bottom: 10px;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}

#webViewer{
  height: 100vh;
  width: 50vw;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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

/*
.cvUser {
  margin-top: 20px;
  grid-column: 2 / 2;
  grid-row: 1;

} */

.listDocsUser {
  margin-left: 20px;
  grid-column: 1/2;
  grid-row: 2;


}

.infosUserProfil{
  margin-left: 20px;
  grid-column: 1 / 2;
  grid-row: 1;

}



</style>
