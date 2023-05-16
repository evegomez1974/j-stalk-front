<template>
  <div id="auth">
    <div class="containerForm">
      <img src="../static/j-stalk-logo-texte.png" width="350"/>
    </div>
    <div v-if="isVisibleForm" class="containerForm">
      <formLogin @message-sent="updateMessage" />
    </div>
    <div v-if="isVisibleForgetWord" class="containerForm">
      <forgetWord
        @message-sent="updateMessage"
        variant="success"
        :child-data="email"
      />
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



