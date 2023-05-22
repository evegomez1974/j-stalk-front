<template>
  <div>
    <NavBar />
    <div class="header-container">
      <div class="search-container">
        <b-nav-form>
          <b-form-input
            size="md"
            class="mr-md-2"
            placeholder="Rechercher"
          ></b-form-input>
          <b-button size="md" class="my-2 my-md-0" type="submit"
            >Rechercher</b-button
          >
        </b-nav-form>
      </div>
      <div class="favorite-container">
        <b-button size="md" @click="showOnlyFavorites = !showOnlyFavorites"
          >Favoris
          <b-icon
            v-if="showOnlyFavorites"
            class="pl-1"
            icon="heart-fill"
            variant="light"
            font-scale="1.3"
          ></b-icon>
          <b-icon
            v-else
            class="pl-1"
            icon="heart"
            variant="light"
            font-scale="1.3"
          ></b-icon>
        </b-button>
      </div>
    </div>
    <div class="grid-container">
      <CardStudent
        class="grid-Cardstudent"
        v-for="(student, index) in filteredStudents"
        :key="index"
        :name="student.name"
        :firstName="student.firstName"
        :nameSchool="student.nameSchool"
        :city="student.city"
        :yearSchool="student.yearSchool"
        :typeDegree="student.typeDegree"
        :jobType="student.jobType"
        :contractType="student.contractType"
        :contractLength="student.contractLength"
        :description="student.description"
        :favorite="student.favorite"
        @update:favorite="changeCardFavorite(student, $event)"
        @update:index="index = $event"
      />
    </div>
  </div>
</template>

<script>
import "../assets/css/themes.scss";

import NavBar from "../components/navBar";
import CardStudent from "../components/cardStudent";

import { BIconHeart } from "bootstrap-vue";

export default {
  name: "IndexPage",
  components: { NavBar, CardStudent, BIconHeart },
  data() {
    return {
      students: null,
      showOnlyFavorites: false,
    };
  },
  computed: {
    filteredStudents() {
      if (this.showOnlyFavorites) {
        return this.students.filter((student) => student.favorite);
      } else {
        return this.students;
      }
    },
  },


  mounted() {
    fetch('http://127.0.0.1:8080/liststudents'  , {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
          },
      })
      .then((response) => response.json())
      .then((data) => {
        const students = data.students.data;
        // Mettre à jour la variable data avec les données reçues
        this.students = students;
      })
      .catch(error => {
      console.error('Une erreur est survenue :', error);
    })
      .catch(e => {
        // console.error(e);
        // this.verifCo = "erreur"
        this.$router.push('/notConneted')
      })
  },
  methods: {
    changeCardFavorite(student, newValue) {
      student.favorite = newValue;
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Candara";
  src: local("Candara"), url("../assets/fonts/candara.ttf") format("truetype");
}

body {
  background-color: #343a4011;
  font-family: "Candara";
}
.header-container {
  display: flex;
  justify-content: space-around;
  //background-color: orange;
  margin-top: 1%;
  margin-bottom: 2%;
}

.search-container {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15%;
  //background-color: red;
}

.favorite-container {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15%;
  //background-color: blue;
}
.grid-container {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, auto);
  grid-gap: 2vh;
}

.grid-Cardstudent {
  justify-self: center;
}
</style>
