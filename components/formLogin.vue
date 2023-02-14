<template>
  <div>
    <div class="backgroundLogin">
    <img class="img-fond" src="../static/Fond1.jpg" fluid-grow alt="Responsive image"/>
    <div>
      <img class="img-logo" src="../static/j-stalk-logo2.png" fluid alt="Responsive image"/>
    </div>
    <div class="zoneForm">
      <b-form @submit.stop.prevent>
        <label for="text-password">Password</label>
        <b-form-input type="password" id="text-password" aria-describedby="password-help-block"></b-form-input>
        <b-form-text id="password-help-block">
          Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji.
        </b-form-text>
   </b-form>
    </div>
    </div>


  </div>


</template>

<script>
// <img class="img-logo" src="../static/j-stalk-logo2.png" fluid alt="Responsive image"/>S
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
