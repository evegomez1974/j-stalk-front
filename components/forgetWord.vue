<template>
  <form @submit.prevent="submitForm">
      <div class="containerLog">
        <div>
          <b-form  @submit.stop.prevent>
            <b-form-input v-model="NewPassWord1" :state="validation" id="New1"  class="inputLog" type="password" placeholder="Nouveau mot de passe"></b-form-input>
            <b-form-invalid-feedback :state="validation">
              Le mot de passe doit être entre 8-25 charactères.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              C'est bon !
            </b-form-valid-feedback>
          </b-form>
        </div>
        <div>
          <b-form  @submit.stop.prevent>
            <b-form-input v-model="NewPassWord2" :state="validation2" id="New2" class="inputLog" type="password" placeholder="Vérifier mot de passe"></b-form-input>
            <b-form-invalid-feedback :state="validation2">
              Mot de passe différent
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation2">
              C'est bon !
            </b-form-valid-feedback>
          </b-form>
        </div>
        <div class="btnRouter">
          <div class="btnVal">
            <button @click="methAnnuler">Annuler</button>
          </div>
          <div class="btnVal">
            <button @click="methVal" >Valider</button>
          </div>
        </div>
    </div>
  </form>
</template>

<script>


export default {
  name: 'forgetWord',
  components: {},
  data (){
    return {
    FormData: {
      email:'',
      password: '',
    },
    NewPassWord1: '',
    NewPassWord2: '',
    myValueValideOublieMotDePasse: "oublieValider",
    myValueAnnuleOublieMotDePasse: "oublieAnnuler",
  }
  },
  computed: {
      validation() {
        return this.NewPassWord1.length > 8 && this.NewPassWord1.length < 25
      },
      validation2() {
        return this.NewPassWord1 === this.NewPassWord2
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
    },
    methAnnuler() {
      this.$emit('message-sent', this.myValueAnnuleOublieMotDePasse);
      console.log(this.myValueAnnuleOublieMotDePasse);
    },
    methVal(variant = null) {
      var input1 = document.getElementById("New1").value;
      console.log(input1)
      var input2 = document.getElementById("New2").value;
      console.log(input2)
      if (input1 == "") {
        variant="danger"
        this.$bvToast.toast('Mot de passe vide ! Veuillez entrer un nouveau mot de passe.' , {
          title: `Attention`,
          variant: variant,
          solid: true
        })
      }else if (input1 !== input2){
        variant="warning"
        this.$bvToast.toast('Les deux champs de saisie ne sont pas identique !', {
          title: `Attention`,
          variant: variant,
          solid: true
        })
      }else {
        this.$emit('message-sent', this.myValueValideOublieMotDePasse);
        console.log(this.myValueValideOublieMotDePasse);
      }

    },

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
