<template>
  <form>
    <div class="containerLog">
      <h2>S'inscrire</h2>
      <div>
        <select
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
          name="userStatus"
          v-model="formUser.userStatus"
          required
        >
          <option disabled value="" selected>Please select one</option>
          <option value="student">Etudiant</option>
          <option value="company">Entreprise</option>
          <option value="school">Ecole</option>
          <option value="teacher">Intervenant</option>
        </select>
      </div>
      <div class="container">
        <div class="formUser">
          <div>
            <input
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              type="text"
              v-model="formUser.name"
              placeholder="Nom"
              required
            />
          </div>
          <div>
            <input
              v-if="formUser.userStatus !== 'company'"
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              type="text"
              v-model="formUser.firstName"
              placeholder="Prénom"
            />
          </div>
          <div>
            <input
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              type="number"
              v-model="formUser.phoneNumber"
              placeholder="Numero de téléphone"
              required
            />
          </div>
          <div>
            <input
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              type="email"
              v-model="formUser.email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              type="password"
              v-model="formUser.password"
              placeholder="Mot de passe"
              required
            />
          </div>
        </div>
        <div v-if="formUser.userStatus === 'student'" class="formStudent">
          <div>
            <select
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              name="jobType"
              v-model="formStudent.jobType"
              required
            >
              <option disabled value="" selected>Please select one</option>
              <option value="Alternance">Alternance</option>
              <option value="Stage">Stage</option>
            </select>
          </div>
          <div>
            <select
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              v-if="formStudent.jobType === 'Alternance'"
              name="jobType"
              v-model="formStudent.contractType"
            >
              <option disabled value="" selected>Please select one</option>
              <option value="Apprentissage">Apprentissage</option>
              <option value="Professionalisation">Professionalisation</option>
            </select>
          </div>
          <div>
            <select
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              v-if="formStudent.jobType === 'Alternance'"
              name="jobType"
              v-model="formStudent.contractLength"
            >
              <option disabled value="" selected>Please select one</option>
              <option value="1 an">1 an</option>
              <option value="2 ans">2 ans</option>
              <option value="3 ans">3 ans</option>
            </select>
            <select
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              v-if="formStudent.jobType === 'Stage'"
              name="jobType"
              v-model="formStudent.contractLength"
              required
            >
              <option disabled value="" selected>Please select one</option>
              <option value="3 mois">3 mois</option>
              <option value="6 mois">6 mois</option>
              <option value="9 mois">9 mois</option>
              <option value="1 an">1 an</option>
            </select>
          </div>
          <div>
            <select
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              name="jobType"
              v-model="formStudent.yearSchool"
              required
            >
              <option disabled value="" selected>Please select one</option>
              <option value="1ère année">1ère année</option>
              <option value="2ème année">2ème année</option>
              <option value="3ème année">3ème année</option>
            </select>
            <select
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
              name="jobType"
              v-model="formStudent.typeDegree"
              required
            >
              <option disabled value="" selected>Please select one</option>
              <option value="License">License</option>
              <option value="License professionnelle">
                License professionnelle
              </option>
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
              :class="{
                classLog: this.formUser.userStatus === '',
                classIns: this.formUser.userStatus !== '',
              }"
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
        <div v-if="formUser.userStatus === 'company'" class="formCompany">
          <div>
            <div>
              <input
                class="classIns"
                type="text"
                v-model="formCompany.address"
                placeholder="Adresse"
                required
              />
            </div>
            <div>
              <input
                class="classIns"
                type="text"
                v-model="formCompany.city"
                placeholder="Ville"
                required
              />
            </div>
            <select
              class="classIns"
              name="department"
              v-model="formCompany.department"
              required
            >
              <option disabled value="" selected>
                Please select one department
              </option>
              <option
                v-for="(department, index) in departments"
                :key="index"
                :value="department.id"
              >
                {{ department.name }}
              </option>
            </select>
          </div>

          <div>
            <textarea
              name="message"
              v-model="formCompany.description"
              rows="4"
              cols="40"
              maxLength="200"
              placeholder="Saisissez votre message ici"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="btnRouter">
      <div class="btnVal">
        <router-link to="/"
          ><button class="classBtn" type="submit">Annuler</button></router-link
        >
      </div>
      <div class="btnVal">
        <button
          class="classBtn"
          type="submit"
          @click="onSubmitSenclassLogata(formUser, formStudent)"
        >
          Inscription
        </button>
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
        firstName: null,
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
        favorite: false,
      },
      formCompany: {
        address: null,
        city: null,
        department: "",
        description: null,
        favorite: false,
      },
      departments: null,
    };
  },
  methods: {
    onSubmitSenclassLogata(formUser, formStudent) {
      let requestConfig = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (formUser.userStatus === "student") {
        requestConfig.body = JSON.stringify({ ...formUser, ...formStudent });
      } else if (formUser.userStatus === "company") {
        requestConfig.body = JSON.stringify({
          ...formUser,
          ...this.formCompany,
        });
      }

      console.log("request body", requestConfig.body);

      fetch("http://127.0.0.1:8080/users/signup", requestConfig)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Une erreur est survenue :", error);
        });
    },
  },
  mounted() {
    fetch("http://127.0.0.1:8080/listDepartmentsSignUp")
      .then((response) => response.json())
      .then((data) => {
        const departments = data.departments.data;
        return (this.departments = departments);
      })
      .catch((error) => {
        console.error("Une erreur est survenue :", error);
      });
  },
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.formUser {
  width: 100%;
}

.formStudent {
  width: 100%;
}

.formCompany {
  width: 100%;
}

.classIns {
  height: 40px;
  width: 90%;
  margin-top: 20px;
  border-radius: 10px;
}

textarea {
  width: 90%;
  margin-top: 20px;
  border-radius: 10px;
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


</style>
