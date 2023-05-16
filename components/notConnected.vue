<template>
    <div id="auth">
      <div class="containerForm">
        <img src="../static/j-stalk-logo-texte.png" width="350"/>
      </div>

      <div class="pageDeco">
            <div class="texteDeco">
                <h2>Vous n'êtes pas connecté</h2>
            </div>
            <div class="btnRouter">
          <div class="btnVal">
            <router-link to="/Login"><button type="submit">Se connecter</button></router-link>
          </div>
          <div class="btnVal">
            <router-link to="/SignUp"><button type="submit">Inscription</button></router-link>
          </div>
        </div>
        </div>
    </div>
  </template>


  <script>
  import { defineComponent } from "vue";
  import "../assets/css/themes.scss";
  import formLogin from "../components/formLogin";
  import forgetWord from "../components/forgetWord";

  export default defineComponent({
    name: "login",
    components: { formLogin, forgetWord },
    data() {
      return {
        isVisibleForm: true,
        isVisibleForgetWord: false,
        message: "erreur",
        myValueValideOublieMotDePasse: "Mot de passe modifié !",
        emailExist: false,
        email: "",
      };
    },
    methods: {
        connectUser() {
            this.$router.push('/Login')
        },
      updateMessage(newValue, email, variant = null) {
        console.log(newValue);
        console.log("l'email : " + email);
        this.message = newValue;

        if (newValue == "oublieAnnuler") {
          this.isVisibleForm = true;
          this.isVisibleForgetWord = false;
        }
        if (newValue == "oublieValider") {
          variant = "success";
          this.isVisibleForm = true;
          this.isVisibleForgetWord = false;
          this.$bvToast.toast("Le mot de passe est bien modifié !", {
            title: ` ${variant || "default"}`,
            variant: variant,
            solid: true,
          });
        }

        const bodyFormData = new FormData();
        bodyFormData.append("email", email);
        fetch("http://127.0.0.1:8080/userEmail/" + email, {
          body: bodyFormData,
          method: "post",
        }).then((res) => {
          // console.log(res);
          if (res.status != 200) {
            console.log(res.status);
            this.error = "Une erreur est survenue, veuillez réessayer";
            this.emailExist = false;
            if (newValue == "oublieMotDePasse" && this.emailExist === false) {
              alert("L'email renseigné n'existe pas, veuillez créer un compte");
            }
          } else {
            this.emailExist = true;
            if (newValue == "oublieMotDePasse" && this.emailExist === true) {
              this.isVisibleForm = !this.isVisibleForm;
              this.isVisibleForgetWord = !this.isVisibleForgetWord;
              this.email = email;
            }
          }
        });
      },
    },
  });
  </script>

  <style lang="scss">

div.btnVal {
  width: 17%;
  display: inline-block;
  border-radius: 10px;
  border-color: #4e4a55 ;
  background-color: #b298dc ;
  margin-inline: 20px;
}


  html {
    height: 100%;
  }

  #auth {
    background: linear-gradient(rgba(0, 0, 0, 0.815), rgba(0, 0, 0, 0.815)) !important;
    //background-color: blue !important;
    color: white !important;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*align-items: center;*/
  }

  .containerForm {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 30px;
  }

  /*.IMG {
    width: 20%;
  }*/

  /*.inputLog {
   // margin: auto;
    height: 40px;
    width: 100%;
    border-radius: 10px;
    margin-top: 20px;
    display: flex;
  }*/

  /*.labelOublie {
    color: var(--jstalk-color-dark);
   // text-align: right !important;
    //float: right;
    font-style: italic;
   // width: 100%;
  }

  .labelOublie:hover {
    color: var(--jstalk-color-secondary);
    text-align: right !important;
    float: right;
    font-style: italic;
  }*/

  /*.btnRouter {
    margin: 0 5%;
    text-align: center;
    margin-top: 30px;
  }*/
  /*
  button {
    display: inline-block;
    border-color: transparent;
    background-color: transparent;
  }*/

  /*.EnterBtn {
    margin-top: 50px;
    background-color: hsla(160, 100%, 37%, 1);
    border: 1px solid hsla(160, 100%, 37%, 1);
    border-radius: 10px;
    height: 40px;
    width: 10%;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
  }

  .EnterBtn:hover {
    background-color: rgb(0, 59, 40);
  }*/
  </style>


