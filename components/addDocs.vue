<template>
  <div>
    <div >
      <b-card >
        <div>
          <b-input placeholder="Titre" v-model="title" id="title"></b-input>
        </div>

        <b-form-file
              id="inputFile"
              v-model="file1"
              :state="Boolean(file1)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              accept=".pdf, .PDF"
            ></b-form-file>
            <div class="mt-3">Choisir le pdf : {{ file1 ? file1.name : '' }}</div>

            <b-button @click="AddDoc">Ajouter</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'addDocs',
  components: {},

  data (){
    return {
      file1:"",
      title:"",
      myValueMessage:"pdfValide",
  }
  },

  methods: {
      AddDoc() {
      var selectedFile = document.getElementById("inputFile").files;
      var selectedTitle = document.getElementById("title").value;
        //Check File is not Empty
        if (selectedFile.length > 0) {
            // Select the very first file from list
            var fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Onload of file read the file content
            fileReader.onload = function(fileLoadedEvent) {
          base64 = fileLoadedEvent.target.result;
                // Print data in console
        console.log(base64);

         const bodyFormData = new FormData();
         bodyFormData.append('name', selectedTitle);
        bodyFormData.append('docPDF', base64);
         fetch('http://127.0.0.1:8080/userDocs' , {
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
           .catch(e => {
                // console.error(e);
                // this.verifCo = "erreur"
                this.$router.push('/notConneted')
            })

        };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);

        }
        this.title = ""
        this.file1 = ""
        this.$emit('message-sent-pdf', this.myValueMessage);

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
