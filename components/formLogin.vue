<template>
  <form @submit.prevent="login">
    <div class="containerLog">
      <h2>Connexion</h2>

      <div>
        <input
          v-model="email"
          class="classLog"
          type="email"
          placeholder="Email"
        >
      </div>
      <div>
        <input
          v-model="password"
          class="classLog"
          type="password"
          placeholder="Mot de passe"
        >
      </div>

      <div class="forgetMDP">
        <button
          id="lienMDP"
          @click="methVal($event)"
        >
          Mot de passe oublié ?
        </button>
      </div>
    </div>
    <div class="btnRouter">
      <div class="btnVal">
        <router-link to="/SignUp">
          <button
            class="classBtn"
            type="submit"
          >
            Inscription
          </button>
        </router-link>
      </div>
      <div class="btnVal">
        <button
          class="classBtn"
          type="button"
          @click="login"
        >
          Se connecter
        </button>
      </div>
    </div>
  </form>
</template>

<script>
//import { AsyncLocalStorage } from 'async_hooks';

import router from "../.nuxt/router";

export default {
  name: "FormLogin",
  components: {},
  data() {
    return {
      email: "",
      password: "",

      myValueOublieMotDePasse: "oublieMotDePasse",
    };
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
    methVal(event) {
      event.preventDefault();
      if (this.email === "") {
        alert("Veuillez renseigner votre email pour changer le mot de passe.");
      } else {
        this.$emit("message-sent", this.myValueOublieMotDePasse, this.email);
      }
    },
    login(event) {
      event.stopPropagation();
      if (this.email === "") {
        alert("Veuillez renseigner votre email pour vous connecter.");
      } else if (this.password === "") {
        alert("Veuillez renseigner votre mot de passe pour vous connecter.");
      } else {
        // faire un verif si exist puis aller faire le token du mail verifié
        fetch("http://127.0.0.1:8080/users/login", {
          headers: {
            Authorization: "Basic " + btoa(`${this.email}:${this.password}`),
          },
          method: "get",
        })
          .then((res) => {
            if (res.status != "200") {
              this.error = "Une erreur est survenue, veuillez réessayer";
            } else if (res.json === "Incorrect") {
              this.error = "Une erreur est survenue, veuillez réessayer";
            } else {
              return res.json();
              // res.json()
            }
          })
          .then((data) => {
            localStorage.setItem("PAC-token", data.token);
            this.$router.push("/");

            // fetch('http://127.0.0.1:8080/userType'  , {
            //     method: 'get',
            //     headers: {
            //         'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
            //     },
            // })
            // .then(res => res.json())
            // .then(data => {
            //     this.typeUser = data;
            //     console.log(this.typeUser[0].status)

            // // faire le traitement des type d'users
            // if(this.typeUser[0].status === "student") {
            //     this.$router.push("/");
            // }
            // if(this.typeUser[0].status === "school") {
            //     this.$router.push("/studentsList");
            // }
            // if(this.typeUser[0].status === "company") {
            //     this.$router.push("/studentsList");
            // }
            // if(this.typeUser[0].status === "teacher") {
            //     this.$router.push("/studentsList");
            // }

            // })
            // .catch(e => {
            //     console.error(e);
            // })
            //router.push('/cards');
          });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
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
