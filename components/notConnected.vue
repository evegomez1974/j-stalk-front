<template>
  <div id="auth">
    <div class="containerForm">
      <img
        src="../static/j-stalk-logo-texte.png"
        width="350"
      >
    </div>
    <form @submit.prevent="login">
      <div class="containerLog">
        <h2>Vous n'êtes pas connecté</h2>
      </div>
      <div class="btnRouter">
        <div class="btnVal">
          <router-link to="/SignUp">
            <button
              class="classBtn"
              type="submit"
            >
              Inscription
            </button>
          </router-link>
        </div>
        <div class="btnVal">
          <router-link to="/">
            <button
              type="submit"
              class="classBtn"
            >
              Se connecter
            </button>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>


  <script>
  import { defineComponent } from "vue";
  import "../assets/css/themes.scss";
  import formLogin from "../components/formLogin";
  import forgetWord from "../components/forgetWord";

  export default defineComponent({
    name: "Login",
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
            this.$router.push('/')
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

  <style lang="scss" scoped>

.pageDeco {
    text-align: center;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.containerLog {
  width: 60%;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.classLog {
  height: 40px;
  width: 30%;
  margin-top: 20px;
  border-radius: 10px;
}

.forgetMDP {
  height: 40px;
  text-align: right !important;
  float: right;
}

#lienMDP {
  margin-top: 10px;
  padding-right: 35%;
  background-color: transparent;
  border-color: transparent;
  font-style: italic;
  color: white;
}

#lienMDP:hover {
  color: var(--jstalk-color-secondary) !important;
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

.classBtn {
  width: 100%;
  background-color: transparent;
  border-color: transparent;
}


  html {
    height: 100%;
  }

  #auth {
    background: linear-gradient(#343a40 , rgba(68, 67, 67, 0.815)) !important;
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
