<template>
  <div id="auth">
    <img id="titleLog" src="../static/j-stalk-logo-texte.png" />
    <div>
      <FormSignUp />
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import "../assets/css/themes.scss";
import "../assets/css/Login.scss";
import FormSignUp from "../components/formSignUp";

export default defineComponent({
  name: "signup",
  components: { FormSignUp },
  data() {
    return {
      message: "erreur",
    };
  },
});
</script>


<style>
</style>


