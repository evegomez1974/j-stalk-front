<template>
  <form @submit.prevent="login">
      <div class="containerLog">
        <h2>S'inscrire</h2>
        <div class="selected">
          <div>Selected: {{ selectedItem }}</div>

          <select name="choice" v-model="selectedItem" @change="onSelectChange()">
            <option disabled value="">Please select one</option>
            <option value="ecole" selected>Ecole</option>
            <option value="entreprise">Entreprise</option>
            <option value="etudiant">Etudiant</option>
            <option value="intervenant">Intervenant</option>
          </select>
        </div>
        <div>
          <input class="inputLog" type="text" v-model="name" placeholder="Nom">
        </div>
        <div>
          <input class="inputLog" type="text" v-model="firstname" placeholder="Prénom" v-if="isVisibleEcole">
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
          <div v-if="isVisibleIntervenant">
            <input class="inputLog" type="text" v-model="nomEcole" placeholder="Ecole">
          </div>
          <div>
            <select name="choice" v-model="contratType" v-if="isVisibleEtudiant">
              <option value="Stage">Stage</option>
              <option value="apprentissage" selected>Apprentissage</option>
              <option value="professionnalisation">Professionnalisation</option>
            </select>
          </div>
          <div>
            <select name="choice" v-model="postType" placeholder="Type de post" v-if="isVisibleEtudiant">
              <option value="dev">Developpeur</option>
              <option value="market" selected>Marketing</option>
              <option value="data">DATA IA</option>
            </select>
          </div>
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
      selectedItem: '',
      isVisibleEtudiant: false,
      isVisibleEcole: true,
      isVisibleIntervenant: false,
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
        },
        onSelectChange() {
      // Mettre à jour la propriété selectedItem ici
          console.log("selectedItem:", this.selectedItem);
          if (this.selectedItem === "etudiant") {
            this.isVisibleEtudiant = !this.isVisibleEtudiant;
            this.isVisibleIntervenant = !this.isVisibleIntervenant;
          }
          if (this.selectedItem === "ecole") {
            this.isVisibleEcole = !this.isVisibleEcole;
          }
          if (this.selectedItem === "entreprise") {
            this.isVisibleEcole = !this.isVisibleEcole;
          }
          if (this.selectedItem === "intervenant") {
            this.isVisibleIntervenant = !this.isVisibleIntervenant;
          }
    }

  }
}

</script>


<style scoped>

select{
  border-radius: 5px;
  padding: 5px;
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
