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

.pageDeco {
    text-align: center;
}

.btnRouter {
  margin-top: 20px;
  width: 40%;
  display: flex;
  justify-content: space-evenly;
}

.btnVal {
  width: 30%;
  border-radius: 10px;
  border-color: #4e4a55;
  background-color: #b298dc;
}

// div.btnVal {
//   width: 17%;
//   display: inline-block;
//   border-radius: 10px;
//   border-color: #4e4a55 ;
//   background-color: #b298dc ;
//   margin-inline: 20px;
// }


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


  </style>


