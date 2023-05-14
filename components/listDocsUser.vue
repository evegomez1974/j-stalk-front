<template>
  <div>
      <div class="cardDocsUser">
        <b-card-group columns>
        <div class="laCard">
          <b-card bg-variant="dark" text-variant="white" title="Lettre">
            {{ userDocs.name }}
            <b-card-text>
            </b-card-text>
            <b-button href="#" variant="primary" @click="voirPDF(userDocs.documentID)">Voir</b-button>
            <b-button href="#" variant="primary" v-b-modal.modal-prevent-closing >Changer</b-button>

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

          </b-card>
        </div>
      </b-card-group>
      </div>

  </div>
</template>

<script>


export default {
  name: 'listDocsUser',
  components: {},
  props: {
      userDocs: Object,
    },
  data (){
    return {
      title: '',
        pdf: '',
        titleState: null,
        pdfState: null,
        file: null,
        submittedTitle: [],
        submittedPdf: [],
        myValueMessage: "ok"

  }
  },
  methods: {
    voirPDF (elementID) {
      this.$emit('message-sent', this.myValueMessage, elementID);
    },

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
        const inputElementID = document.getElementById("docID");
        console.log("id: " + inputElementID)
        console.log("file: " + inputElement)
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
          bodyFormData.append('documentID', inputElement);
            bodyFormData.append('docPDF', pdfBase64);
            fetch('http://127.0.0.1:8080/userDocsModif/' + pdfBase64 + "/" + inputElement, {
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

        // Lecture du fichier
        reader.readAsDataURL(file);



        }
    },


}
</script>


<style scoped>

b-form-input {
  margin-bottom: 10px;
}


</style>
