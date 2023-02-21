<template>
  <div id="auth">
    <img id="titleLog" src="../static/j-stalk-logo-texte.png">
    <formLogin />
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import '../assets/css/themes.scss'
import  '../assets/css/main.scss'
import  '../assets/css/Login.scss'
import formLogin from '../components/formLogin.vue'

export default defineComponent({
  name: 'login',
  components: { formLogin },
  data (){
    return {
  }
  },
  methods: {

    }}



);

</script>


<style>



</style>


