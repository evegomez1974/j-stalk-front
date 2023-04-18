<template>
  <div id="auth">
    <img id="titleLog" src="../static/j-stalk-logo-texte.png">
    <div>
      <formSignUp @message-sent="updateMessage" />
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import '../assets/css/themes.scss'
import  '../assets/css/Login.scss'
import formSignUp from '../components/formSignUp'


export default defineComponent({
  name: 'signup',
  components: { formSignUp },
  data (){
    return {
      message:"erreur",
  }
  },
  methods: {
    updateMessage(newValue, variant = null) {
      console.log(newValue);
      this.message = newValue;
    if (newValue == "oublieMotDePasse") {
      this.isVisibleForm = !this.isVisibleForm
      this.isVisibleForgetWord = !this.isVisibleForgetWord
    }
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
    },
    },

  }



);

</script>


<style>



</style>


