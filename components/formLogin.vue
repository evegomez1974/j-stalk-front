<template>
  <form @submit.prevent="submitForm">
  <div class="containerLog">
    <div>
      <input class="inputLog" type="email" v-model="FormData.email" placeholder="Email">
    </div>
    <div>
      <input class="inputLog" type="password" v-model="FormData.password" placeholder="Mot de passe">
    </div>
    <div class="lien">
      <router-link to="/"><label class="labelOublie">Mot de passe oublié ?</label></router-link>
    </div>
    <div class="btnRouter">
      <div class="btnVal">
        <router-link to="/"><button type="submit">Se connecter</button></router-link>
      </div>
      <div class="btnVal">
        <router-link to="/"><button type="submit">Inscription</button></router-link>
      </div>
    </div>
 </div>
</form>
</template>

<script>


export default {
  name: 'FormLogin',
  components: {},
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

}
</script>


<style>
.lien {
  margin: auto;
  height: 40px;
  width: 25%;
  float: right;
}

div.btnVal {
  width: 17%;
  display: inline-block;
  border-radius: 10px;
  border-color: #4e4a55 ;
  background-color: #b298dc ;
  margin-inline: 20px;
}

</style>
