<template>
    <div>
        <div>
            <navBarDeco />
        </div>
        <div class="notConnected">
            <notConnected />
        </div>
    </div>
  </template>

  <script>
    import notConnected from "../components/notConnected";
    import navBarDeco from '../components/navBarDeco';



  export default {
      name: "profil",
      components: { navBarDeco, notConnected },
      data() {
      return {



      };
    },
    computed: {

    },


    methods: {

    },


  }
  </script>


  <style lang="<style lang="scss" scoped>

  .notConnected {
    background-color: rgb(176, 176, 176);
    background-position: center;
  }

  .image {
    display: none;
  }

  .add-photo {
    margin: 10px;
  }

  .contain-photo {
    border: 1px solid blue;
    border-radius: 80px;
    height: 60px;
    width: 90px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3px;
  }



  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }



  </style>
