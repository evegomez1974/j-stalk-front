<template>
  <div id="auth">
    <div class="containerForm">
      <img
        src="../static/j-stalk-logo-texte.png"
        width="350"
      >
    </div>    
    <div class="containerForm">
      <FormSignUp />
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import "../assets/css/themes.scss";
import FormSignUp from "../components/formSignUp";

export default defineComponent({
  name: "Signup",
  components: { FormSignUp },
  data() {
    return {
      message: "erreur",
    };
  },
});
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}

#auth {
  background: linear-gradient(rgba(0, 0, 0, 0.815), rgba(0, 0, 0, 0.815)) !important;
  //background-color: blue !important;
  color: white !important;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.containerForm {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
}
</style>




