<template>
  <form @submit.prevent="login">
      <div class="containerLog">
        <h2>S'inscrire</h2>
        <div>
          <input class="inputLog" type="text" v-model="name" placeholder="Nom">
        </div>
        <div>
          <input class="inputLog" type="text" v-model="firstname" placeholder="Prénom">
        </div>
        <div>
          <input class="inputLog" type="number" v-model="phoneNumber" placeholder="Téléphone">
        </div>
        <div>
          <input class="inputLog" type="email" v-model="email" placeholder="Email">
        </div>
        <div>
          <input class="inputLog" type="password" v-model="password" placeholder="Mot de passe">
        </div>
        <div>
          <input class="inputLog" type="img" v-model="pictures" placeholder="Image">
        </div>
        <div class="btnRouter">
          <div class="btnVal">
            <router-link to="/Login"><button type="submit">Annuler</button></router-link>
          </div>
          <div class="btnVal">
            <button type="submit" @click="login">Inscription</button>
          </div>
        </div>
    </div>
  </form>
</template>

<script>


export default {
  name: 'FormSignUp',
  components: {},
  data (){
    return {
      email:'',
      password: '',
      name: '',
      firstname: '',
      pictures: '',
      phoneNumber: '',
  }
  },
  methods: {
    signUp () {
            if (this.password != this.password1) {
                this.error = "Vos mots de passe ne correspondent pas";
                return;
            }
            const bodyFormData = new FormData();
            bodyFormData.append('name', this.name);
            bodyFormData.append('firstname', this.firstname);
            bodyFormData.append('email', this.email);
            bodyFormData.append('phoneNumber', this.phoneNumber);
            bodyFormData.append('password', this.password);
            bodyFormData.append('pictures', this.pictures);
            fetch('http://127.0.0.1:8080/users/signup', {
                body: bodyFormData,
                method: 'post',
            })
            .then(res => {
                // console.log(res);
                if(res.status != 200) {
                    this.error = "Une erreur est survenue, veuillez réessayer";
                }
                else {
                    return res.json();
                }
            })
            .then(data => {
                // console.log("data:", data);
                localStorage.setItem('PAC-token', data.token);
                router.push('/Login');
            })
        }

}
  }

</script>


<style>


div.btnVal {
  width: 17%;
  display: inline-block;
  border-radius: 10px;
  border-color: #4e4a55 ;
  background-color: #b298dc ;
  margin-inline: 20px;
}

</style>
