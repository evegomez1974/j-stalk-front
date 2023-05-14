<template>
  <form>
    <div class="containerLog">
      <h2>S'inscrire</h2>
      <div class="selected">
        <select name="userStatus" v-model="formUser.userStatus" required>
          <option disabled value="" selected>Please select one</option>
          <option value="Etudiant">Etudiant</option>
          <option value="Entreprise">Entreprise</option>
          <option value="Ecole">Ecole</option>
          <option value="Intervenant">Intervenant</option>
        </select>
      </div>
      <div class="formUser">
        <div>
          <input
            class="inputLog"
            type="text"
            v-model="formUser.name"
            placeholder="Nom"
            required
          />
        </div>
        <div>
          <input
            class="inputLog"
            type="text"
            v-model="formUser.firstname"
            placeholder="Prénom"
          />
        </div>
        <div>
          <input
            class="inputLog"
            type="number"
            v-model="formUser.phoneNumber"
            placeholder="Numero de téléphone"
            required
          />
        </div>
        <div>
          <input
            class="inputLog"
            type="email"
            v-model="formUser.email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            class="inputLog"
            type="password"
            v-model="formUser.password"
            placeholder="Mot de passe"
            required
          />
        </div>

        <div class="btnRouter">
          <div class="btnVal">
            <router-link to="/Login"
              ><button type="submit">Annuler</button></router-link
            >
          </div>
          <div class="btnVal">
            <button type="submit">Inscription</button>
          </div>
        </div>
      </div>
      <div v-if="formUser.userStatus === 'Etudiant'" class="formStudent">
        <div>
          <select name="jobType" v-model="formStudent.jobType" required>
            <option disabled value="" selected>Please select one</option>
            <option value="Alternance">Alternance</option>
            <option value="Stage">Stage</option>
          </select>
        </div>
        <div>
          <select v-if="formStudent.jobType === 'Alternance'" name="jobType" v-model="formStudent.contractType" required>
            <option disabled value="" selected>Please select one</option>
            <option value="Alternance">Apprentissage</option>
            <option value="Stage">Professionalisation</option>
          </select>
        </div>
        <div>
          <select v-if="formStudent.jobType === 'Alternance'" name="jobType" v-model="formStudent.contractLength" required>
            <option disabled value="" selected>Please select one</option>
            <option value="1 an">1 an</option>
            <option value="2 ans">2 ans</option>
            <option value="3 ans">3 ans</option>
          </select>
          <select v-if="formStudent.jobType === 'Stage'" name="jobType" v-model="formStudent.contractLength" required>
            <option disabled value="" selected>Please select one</option>
            <option value="3 mois">3 mois</option>
            <option value="6 mois">6 mois</option>
            <option value="9 mois">9 mois</option>
            <option value="1 an">1 an</option>
          </select>
        </div>
        <div>
          <select name="jobType" v-model="formStudent.yearSchool" required>
            <option disabled value="" selected>Please select one</option>
            <option value="1ère année">1ère année</option>
            <option value="2ème année">2ème année</option>
            <option value="3ème année">3ème année</option>
          </select>
          <select name="jobType" v-model="formStudent.typeDegree" required>
            <option disabled value="" selected>Please select one</option>
            <option value="License">License</option>
            <option value="License professionnelle">License professionnelle</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="Master professionnel">Master professionnel</option>
            <option value="BTS">BTS</option>
            <option value="DUT">DUT</option>
            <option value="IUT">IUT</option>
            <option value="CAP">CAP</option>
            <option value="BEP">BEP</option>
          </select>
        </div>
        <div>
          <input
            class="inputLog"
            type="text"
            v-model="formStudent.nameSchool"
            placeholder="Nom de l'école"
            required
          />
        </div>
        <div>
          <textarea
            name="message"
            v-model="formStudent.description"
            rows="4"
            cols="40"
            maxLength="200"
            placeholder="Saisissez votre message ici"
          ></textarea>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormSignUp",
  components: {},
  data() {
    return {
      formUser: {
        email: null,
        password: null,
        name: null,
        firstname: null,
        phoneNumber: null,
        pictures: null,
        userStatus: "",
      },
      formStudent: {
        jobType: "",
        contractType: "",
        contractLength: "",
        yearSchool: "",
        typeDegree: "",
        nameSchool: null,
        description: null,
      },
      // selectedItem: null,
      // isVisibleEtudiant: false,
      // isVisibleEcole: true,
      // isVisibleIntervenant: false,
    };
  },
  //   methods: {
  //     signUp () {
  //             if (this.password != this.password1) {
  //                 this.error = "Vos mots de passe ne correspondent pas";
  //                 return;
  //             }
  //             const bodyFormData = new FormData();
  //             bodyFormData.append('name', this.name);
  //             bodyFormData.append('firstname', this.firstname);
  //             bodyFormData.append('email', this.email);
  //             bodyFormData.append('phoneNumber', this.phoneNumber);
  //             bodyFormData.append('password', this.password);
  //             bodyFormData.append('pictures', this.pictures);
  //             fetch('http://127.0.0.1:8080/users/signup', {
  //                 body: bodyFormData,
  //                 method: 'post',
  //             })
  //             .then(res => {
  //                 // console.log(res);
  //                 if(res.status != 200) {
  //                     this.error = "Une erreur est survenue, veuillez réessayer";
  //                 }
  //                 else {
  //                     return res.json();
  //                 }
  //             })
  //             .then(data => {
  //                 // console.log("data:", data);
  //                 localStorage.setItem('PAC-token', data.token);
  //                 router.push('/Login');
  //             })
  //         },
  //         onSelectChange() {
  //       // Mettre à jour la propriété selectedItem ici
  //           console.log("selectedItem:", this.selectedItem);
  //           if (this.selectedItem === "etudiant") {
  //             this.isVisibleEtudiant = !this.isVisibleEtudiant;
  //             this.isVisibleIntervenant = !this.isVisibleIntervenant;
  //           }
  //           if (this.selectedItem === "ecole") {
  //             this.isVisibleEcole = !this.isVisibleEcole;
  //           }
  //           if (this.selectedItem === "entreprise") {
  //             this.isVisibleEcole = !this.isVisibleEcole;
  //           }
  //           if (this.selectedItem === "intervenant") {
  //             this.isVisibleIntervenant = !this.isVisibleIntervenant;
  //           }
  //     }

  //   }
};
</script>


<style scoped>
select {
  border-radius: 5px;
  padding: 5px;
}

div.btnVal {
  width: 17%;
  display: inline-block;
  border-radius: 10px;
  border-color: #4e4a55;
  background-color: #b298dc;
  margin-inline: 20px;
}
</style>
