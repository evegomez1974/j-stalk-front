<template>
  <div>
    <div>
      <NavBar/>
    </div>

      <div class="listCards">

        <div class="cardUser">
          <div class="infosUserProfil" >
            <infosUserProfil v-for="userInfo in listUserInfos" :key="userInfo.id" :userInfo="userInfo"/>
          </div>
        </div>

        <div class="cardUser">
          <div class="contact">
            <contact v-for="userInfo in listUserInfos" :key="userInfo.id" :userInfo="userInfo"/>
          </div>
        </div>

        <div class="cardUser">
          <div class="container" v-if="userPDF[0]">
            <pdfViewer  :pdf="userPDF[0]"
            >
            </pdfViewer>
          </div>
        </div>

        <div class="cardUser">
          <div class="btnAddDocs" v-if="isVisibleBtnAddDoc">
            <button @click="btnAddDoc">+</button>
          </div>
        </div>

        <div class="cardUser">
          <div class="addDocs" v-if="isVisibleAddDoc">
            <addDocsVue  @message-sent-pdf="updateMessagePdf"/>
          </div>
        </div>

        <div class="cardUser">
          <div class="listDocsUser">
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
import addDocsVue from "../components/addDocs";
import contact from "../components/contact";
import router from '../.nuxt/router'

export default {
    name: "profil",
    components: { NavBar, infosUserProfil, listDocsUser, pdfViewer, addDocsVue, contact },
    data() {

    return {

        listUserInfos: [ ],
        listUserDocs: [ ],
        message:"erreur",
        userPDF: [],
        isVisibleAddDoc: false,
        isVisibleBtnAddDoc: true,
        UserlastPDF: "",
        token:"",
        typeUser: [],


    };
  },
  methods: {
    btnAddDoc() {
      this.isVisibleAddDoc = true
        this.isVisibleBtnAddDoc = false
    },
    updateMessagePdf(newValuePDF) {
      console.log(newValuePDF);
      if (newValuePDF == "pdfValide") {
        //this.listUserDocs = []
        console.log(this.listUserDocs)
        this.isVisibleAddDoc = false
        this.isVisibleBtnAddDoc = true
        fetch('http://127.0.0.1:8080/userDocs'  , {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
          },
      })
      .then(res => res.json())
      .then(data => {
        this.listUserDocs = data;
        // console.log(data)
        // traitement
      })

      .catch(e => {
        // console.error(e);
        // this.verifCo = "erreur"
        this.$router.push('/notConneted')
      })

      }
    },

    updateMessage(newValue, documentID) {
      console.log(newValue);
      console.log(documentID);
      this.message = newValue;
      this.userPDF = []
        if (newValue == "ok") {
          fetch(`http://127.0.0.1:8080/userPDF/${documentID}` , {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
          },
      })
      .then(res => res.json())
      .then(data => {
        this.userPDF = data;
        console.log("chargement réussi " + this.userPDF)
        return this.userPDF

      })
       .catch(e => {
        //  console.error(e);
        //  this.verifCo = "erreur"
        this.$router.push('/notConneted')
         } )
      }

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

                }
                if(this.typeUser[0].status === "school") {
                    this.isVisibleBtnAddDoc = !this.isVisibleBtnAddDoc
                }
                if(this.typeUser[0].status === "company") {
                    this.isVisibleBtnAddDoc = !this.isVisibleBtnAddDoc
                }
                if(this.typeUser[0].status === "teacher") {
                    this.isVisibleBtnAddDoc = !this.isVisibleBtnAddDoc
                }
            })
            .catch(e => {
                console.error(e);
            })

      fetch('http://127.0.0.1:8080/userInfos'  , {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
          },
      })
      .then(res => res.json())
      .then(data => {
        this.listUserInfos = data;
        // console.log(data)
        // traitement
      })
      .catch(e => {
        // console.error(e);
        // this.verifCo = "erreur"
        this.$router.push('/notConneted')
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
        // console.log(data)
        // traitement
      })
      .catch(e => {
        // console.error(e);
        // this.verifCo = "erreur"
        this.$router.push('/notConneted')
      })

       fetch('http://127.0.0.1:8080/userLastDocs'  , {
           method: 'get',
           headers: {
             'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
           },
       })
       .then(res => res.json())
       .then(data => {
         this.userPDF = data;
         //console.log(data)
         // traitement
       })
       .catch(e => {
        //  console.error(e);
        //  this.verifCo = "erreur"
         this.$router.push('/notConneted')
       })



    }

}
</script>


<style>

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
