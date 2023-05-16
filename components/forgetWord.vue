<template>
  <form @submit.prevent="submitForm">
    <div class="containerLog">
      <div>
        <b-form @submit.stop.prevent>
          <b-form-input
            v-model="NewPassWord1"
            :state="validation"
            id="New1"
            class="classLog"
            type="password"
            style="
              height: 40px;
              width: 30%;
              margin-top: 20px;
              border-radius: 10px;
            "
            placeholder="Nouveau mot de passe"
          ></b-form-input>
          <b-form-invalid-feedback :state="validation">
            Le mot de passe doit être entre 8-25 charactères.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation"> </b-form-valid-feedback>
        </b-form>
      </div>
      <div>
        <b-form @submit.stop.prevent>
          <b-form-input
            v-model="NewPassWord2"
            :state="validation2"
            id="New2"
            class="classLog"
            type="password"
            style="
              height: 40px;
              width: 30%;
              margin-top: 10px;
              border-radius: 10px;
            "            placeholder="Vérifier mot de passe"
          ></b-form-input>
          <b-form-invalid-feedback :state="validation2">
            Mot de passe différent
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation2"> </b-form-valid-feedback>
        </b-form>
      </div>
    </div>
    <div class="btnRouter">
      <div class="btnVal">
        <button class="classBtn" @click="methAnnuler">Annuler</button>
      </div>
      <div class="btnVal">
        <button class="classBtn" @click="putPasswordById">Valider</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "forgetWord",
  components: {},
  props: ["childData"],
  data() {
    return {
      //   FormData: {
      //     email:'test@test.com',
      //     password:"",

      // },
      NewPassWord1: "",
      NewPassWord2: "",
      myValueValideOublieMotDePasse: "oublieValider",
      myValueAnnuleOublieMotDePasse: "oublieAnnuler",
    };
  },
  computed: {
    validation() {
      return this.NewPassWord1.length >= 8 && this.NewPassWord1.length < 25;
    },
    validation2() {
      if (this.NewPassWord1 === "") {
      } else if (this.NewPassWord1 === this.NewPassWord2) {
        return this.NewPassWord1 === this.NewPassWord2;
      }
    },
  },
  methods: {
    async submitForm(variant = null) {
      var input2 = document.getElementById("New2").value;
      this.password = input2;
      // faire un autre fetch qui recup l'id de l'utilsateur via le mail dans l'input
      // envoyer l'id du user avec un $emit
      // et faire le put du mot de passe
      console.log("ici" + this.childData);
      const bodyFormData = new FormData();
      bodyFormData.set("password", this.password);
      bodyFormData.set("email", this.childData);
      fetch(
        "http://127.0.0.1:8080/userNewPassword/" +
          this.password +
          "/" +
          this.childData,
        {
          method: "put",
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then((res) => {
        console.log(res);
        if (res.status != 200) {
          this.error = "Une erreur est survenue, veuillez réessayer";
        } else {
          console.log("Mot de passe modifié");
          variant = "success";
          this.$bvToast.toast("Mot de passe modifié !", {
            title: `Succes`,
            variant: variant,
            solid: true,
          });
          this.$emit("message-sent", this.myValueValideOublieMotDePasse);
          console.log(this.myValueValideOublieMotDePasse);
        }
      });

      // try {
      //   const response = await axios.post('http://localhost:3000', this.formData)
      //   console.log(response.data)
      // } catch (error) {
      //   console.error(error)
      // }
    },
    methAnnuler() {
      this.$emit("message-sent", this.myValueAnnuleOublieMotDePasse);
      console.log(this.myValueAnnuleOublieMotDePasse);
    },
    putPasswordById(variant = null) {
      var input1 = document.getElementById("New1").value;
      console.log(input1);
      var input2 = document.getElementById("New2").value;
      console.log(input2);
      if (input1 == "") {
        variant = "danger";
        this.$bvToast.toast(
          "Mot de passe vide ! Veuillez entrer un nouveau mot de passe.",
          {
            title: `Attention`,
            variant: variant,
            solid: true,
          }
        );
      } else if (input1 !== input2) {
        variant = "warning";
        this.$bvToast.toast(
          "Les deux champs de saisie ne sont pas identique !",
          {
            title: `Attention`,
            variant: variant,
            solid: true,
          }
        );
      }
    },
  },
};
</script>

