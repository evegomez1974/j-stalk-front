<template>
  <div id="auth">
    <img id="titleLog" src="../static/j-stalk-logo-texte.png">
    <div v-if="isVisibleForm">
      <formLogin @message-sent="updateMessage" />
    </div>
    <div v-if="isVisibleForgetWord">
      <forgetWord @message-sent="updateMessage" variant="success" :child-data="email"/>
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import '../assets/css/themes.scss'
import formLogin from '../components/formLogin'
import forgetWord from '../components/forgetWord'

export default defineComponent({
  name: 'login',
  components: { formLogin, forgetWord },
  data (){
    return {
      isVisibleForm: true,
      isVisibleForgetWord: false,
      message:"erreur",
      myValueValideOublieMotDePasse: "Mot de passe modifié !",
      emailExist: false,
      email: ""
  }
  },
  methods: {
    updateMessage(newValue, email , variant = null) {
      console.log(newValue);
      console.log("l'email : " + email);
      this.message = newValue;

      if (newValue == "oublieAnnuler") {
          this.isVisibleForm = true
          this.isVisibleForgetWord = false
        }
        if (newValue == "oublieValider") {
          variant ='success'
          this.isVisibleForm = true
          this.isVisibleForgetWord = false
          this.$bvToast.toast('Le mot de passe est bien modifié !', {
              title: ` ${variant || 'default'}`,
              variant: variant,
              solid: true
            })
        }

      const bodyFormData = new FormData();
      bodyFormData.append('email', email);
      fetch('http://127.0.0.1:8080/userEmail/' + email, {
        body: bodyFormData,
        method: 'post',
      })
      .then(res => {
      // console.log(res);
      if(res.status != 200) {
        console.log(res.status);
        this.error = "Une erreur est survenue, veuillez réessayer";
        this.emailExist= false;
        if (newValue == "oublieMotDePasse" && this.emailExist === false) {
        alert("L'email renseigné n'existe pas, veuillez créer un compte")
        }
      }
      else {
        this.emailExist = true;
        if (newValue == "oublieMotDePasse" && this.emailExist === true) {
          this.isVisibleForm = !this.isVisibleForm
          this.isVisibleForgetWord = !this.isVisibleForgetWord
          this.email = email
        }

      }
      })



        },
        },

  }



);

</script>


<style>
body{
  background: linear-gradient(rgba(0, 0, 0, 0.815), rgba(0, 0, 0, 0.815));
  height: 100vh;
  width:100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#auth{
  background-color: transparent !important;
  color: white !important;
}


#titleLog {
  display: block;
  width: 30%;
  margin: auto;
  margin-bottom: 30px;
}

.containerLog {
  margin: 0 5%;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.inputLog {
  margin: auto;
  height: 40px;
  width: 25%;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;

}



.labelOublie {
  color: var(--jstalk-color-dark) ;
  text-align: right !important;
  float: right;
  font-style: italic;
}

.labelOublie:hover {
  color: var(--jstalk-color-secondary) ;
  text-align: right !important;
  float: right;
  font-style: italic;
}

.btnRouter {
  margin: 0 5%;
  text-align: center;
  margin-top: 30px;


}


button {
  display: inline-block;
  border-color: transparent ;
  background-color: transparent ;
}

.EnterBtn {
  margin-top: 50px;
  background-color: hsla(160, 100%, 37%, 1);
    border: 1px solid hsla(160, 100%, 37%, 1) ;
    border-radius: 10px;
    height: 40px;
    width: 10%;
    cursor: pointer;
    transition: background-color 0.3s;
    color:white;
}

.EnterBtn:hover {
  background-color: rgb(0, 59, 40) ;

}


</style>


