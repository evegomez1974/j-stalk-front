<template>
  <div id="auth">
    <form @submit.prevent="submitForm">
      <img id="titleLog" src="../static/j-stalk-logo-texte.png">
      <div class="containerLog">
        <div>
            <input class="inputLog" type="text" v-model="FormData.email" placeholder="Email">
        </div>
        <div>
            <input class="inputLog" type="password" v-model="FormData.password" placeholder="Mot de passe">
        </div>
        <div class="lien">
          <router-link to="/"><label class="labelOublie">Mot de passe oublié ?</label></router-link>
        </div>
        <div class="btnRouter">
        <div class="btnVal">
          <router-link to="/"><button type="submit">Valider</button></router-link>
        </div>
        <div class="btnVal">
          <router-link to="/"><button type="submit">Inscription</button></router-link>
        </div>
      </div>

      </div>

    </form>
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import themes from '../assets/css/themes.scss'
import main from '../assets/css/main.scss'
import Login from '../assets/css/Login.scss'

export default defineComponent({
  name: 'login',
  components: { themes, main, Login },
  data (){
    return {
    FormData: {
      email:'',
      password: '',
    }
  }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000', this.formData)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }}



});

</script>


<style>



</style>


