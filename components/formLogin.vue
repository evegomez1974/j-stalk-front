<template>
  <div>
  <b-card
    header="Connexion"
    header-text-variant="white"
    header-tag="header"
    header-bg-variant="dark"
    style="max-width: 30rem;"
  >
    <b-card-text>
      <b-container fluid>
        <b-row class="my-1" v-for="type in types" :key="type">
          <b-col sm="3">
            <label :for="`type-${type}`"> <code>{{ type }}</code></label>
          </b-col>
          <b-col sm="9">
            <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
          </b-col>
        </b-row>
        <b-button variant="success">Valider</b-button>
        <b-button>S'inscrire</b-button>
      </b-container>
    </b-card-text>
  </b-card>
</div>

</template>

<script>
import FormLogin from '../components/formLogin.vue';
export default {
  name: 'Login',
  components: {FormLogin},
  data() {
      return {
        types: [
          'email',
          'password',
        ]
      }
    }
}
</script>


<style>

</style>
