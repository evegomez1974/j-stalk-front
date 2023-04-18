<template>
  <form @submit.prevent="login">
      <div class="containerLog">
        <h2>Connexion</h2>
        <div>
          <input class="inputLog" type="email" v-model="email" placeholder="Email">
        </div>
        <div>
          <input class="inputLog" type="password" v-model="password" placeholder="Mot de passe">
        </div>
        <div class="lien">
          <button @click="methVal"><label class="labelOublie">Mot de passe oublié ?</label></button>
        </div>
        <div class="btnRouter">
          <div class="btnVal">
            <button type="submit" @click="login">Se connecter</button>
          </div>
          <div class="btnVal">
            <router-link to="/SignUp"><button type="submit">Inscription</button></router-link>
          </div>
        </div>
    </div>
  </form>
</template>

<script>
//import { AsyncLocalStorage } from 'async_hooks';



export default {
  name: 'FormLogin',
  components: {},
  data (){
    return {
      email:'',
      password: '',

    myValueOublieMotDePasse: "oublieMotDePasse"
  }
  },
  methods: {
    // async submitForm() {
    //   try {
    //     const response = await axios.post('http://localhost:3000', this.formData)
    //     console.log(response.data)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    methVal() {
      this.$emit('message-sent', this.myValueOublieMotDePasse);
    },
    login() {
      if (this.email==="") {
        alert("Veuillez renseigner votre email pour vous connecter.")

      }
      if (this.password==="") {
        alert("Veuillez renseigner votre email pour vous connecter.")

      }
      fetch('http://127.0.0.1:8080/users/login', {
        headers: {
          'Authorization': 'Basic ' + btoa(`${this.email}:${this.password}`),

        },
        method: 'get',
      })
      .then(res => {
        if (res.status != "200") {
          this.error = "Une erreur est survenue, veuillez réessayer";
        }
        else {
          return res.json()
        }
      })
      .then(data => {
        localStorage.setItem('PAC-token', data.token);
        console.log(data.token)
        router.push('/cards');
      })
    }

}
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
