<template>
  <div class="card">
    <div class="card-title">
      <h5>Publier une annonce :</h5>
    </div>
    <div class="card-body">
      <b-form
        @submit="onSubmit($event), onSubmitSendData(form)"
        @reset="onReset"
        v-if="show"
      >
        <b-form-group
          id="input-group-company"
          label="Nom de l'entreprise:"
          label-for="input-company"
        >
          <b-form-input
            id="input-company"
            v-model="form.company"
            placeholder="Enter le nom de l'entreprise"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-email"
          label="Adresse mail:"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            placeholder="Entrer un email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-jobTitle"
          label="Nom du poste:"
          label-for="input-jobTitle"
        >
          <b-form-input
            id="input-jobTitle"
            v-model="form.jobTitle"
            placeholder="Enter le nom du poste"
            required
          ></b-form-input>
        </b-form-group>

        <div class="typesContainer">
          <b-form-group
            id="select-group-jobType"
            label="Type d'emploi:"
            label-for="select-jobType"
          >
            <b-form-select
              id="select-jobType"
              v-model="form.jobType"
              :options="jobTypes"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="select-group-contractType"
            label="Type de contrat: (facultatif)"
            label-for="select-contractType"
            v-if="form.jobType === 'Alternance'"
          >
            <b-form-select
              id="select-contractType"
              v-model="form.contractType"
              :options="contractTypes"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="select-group-contractLengthsAlternance"
            class="contractLength"
            label="Durée du contrat: (facultatif)"
            label-for="select-contractLengthsAlternance"
            v-if="form.jobType === 'Alternance'"
          >
            <b-form-select
              id="select-contractLength"
              v-model="form.contractLength"
              :options="contractLengthsAlternance"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="select-group-contractLengthsStage"
            class="contractLength"
            label="Durée du contrat: (facultatif)"
            label-for="select-contractLengthsStage"
            v-if="form.jobType === 'Stage'"
          >
            <b-form-select
              id="select-contractLengthsStage"
              v-model="form.contractLength"
              :options="contractLengthsStage"
            ></b-form-select>
          </b-form-group>
        </div>

        <b-form-group
          id="select-group-city"
          label="Ville:"
          label-for="select-city"
        >
          <b-form-select
            id="select-city"
            v-model="form.city"
            :options="cities"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="select-group-department"
          label="Département:"
          label-for="select-department"
        >
          <b-form-select
            id="select-department"
            v-model="form.department"
            :options="departments"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-salary"
          label="Quel est le salaire pour ce poste ? (facultatif)"
          label-for="input-salary"
        >
          <div class="salaryContainer">
            <b-form-input
              id="input-minSalary"
              class="mr-2"
              v-model="form.salary"
              type="number"
              min="0"
              placeholder="Entrer un salaire"
            ></b-form-input>

            <div id="€">
              <p>€</p>
            </div>

            <b-form-select
              id="select-maxSalary"
              class="ml-2"
              v-model="form.tempSalary"
              type="text"
              :options="tempsSalary"
            ></b-form-select>
          </div>
        </b-form-group>

        <vue-editor
          class="mb-4"
          v-model="form.description"
          :editor-toolbar="customToolbar"
        />

        <!-- <b-form-input v-model="searchQuery" list="my-list-id" @focus="showList = true"></b-form-input>

    <b-list-group id="my-list-id" class="mt-2" v-if="showList">
      <b-list-group-item v-if="!filteredSizes.length">No results found.</b-list-group-item>
      <b-list-group-item v-for="(size, index) in filteredSizes.slice(0, 4)" :key="index">{{ size }}</b-list-group-item>
    </b-list-group> -->

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>

      <b-modal
        id="modal-center"
        centered
        title="Publier une annonce"
        ref="my-modal"
        @hidden="onReset"
        ok-only
        ok-variant="secondary"
      >
        <p class="my-4">Votre annonce a bien été publiée !</p>
      </b-modal>
    </div>
  </div>
</template>

 
<script>
export default {
  name: "CreateJobOffer",
  data() {
    return {
      //   input type search
      //   sizes: ["Aix-en-Provence",
      //     "Avignon",
      //     "Manosque",
      //     "Marseille",
      //     "Martigues",
      //     "Orange",
      //     "Pertuis",
      //     "Vitrolles"],
      //   searchQuery: '',
      //   showList: false,
      form: {
        company: null,
        email: null,
        jobTitle: null,
        jobType: null,
        contractType: null,
        contractLength: null,
        city: null,
        department: null,
        salary: null,
        tempSalary: null,
        description: null,
        favorite: false,
      },
      jobTypes: [
        { text: "Selectionnez un type", value: null },
        "Alternance",
        "Stage",
      ],
      contractTypes: [
        { text: "Selectionnez un type", value: null },
        "Apprentissage",
        "Professionalisation",
      ],
      cities: [
        { text: "Selectionnez une ville", value: null },
        "Aix-en-Provence",
        "Avignon",
        "Manosque",
        "Marseille",
        "Martigues",
        "Orange",
        "Pertuis",
        "Vitrolles",
      ],
      departments: [
        { text: "Selectionnez un département", value: null },
        "Ain",
        "Aisne",
        "Allier",
        "Alpes-de-Haute-Provence",
        "Hautes-Alpes",
        "hautes alpes",
      ],
      contractLengthsAlternance: [
        { text: "Selectionnez une durée", value: null },
        "1 an",
        "2 ans",
        "3ans",
      ],
      contractLengthsStage: [
        { text: "Selectionnez uns durée", value: null },
        "3 mois",
        "6 mois",
        "9 mois",
        "1 an",
      ],
      tempsSalary: [
        { text: "Selectionnez une répétition", value: null },
        "par mois",
        "par an",
      ],
      show: true,
      customToolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
    };
  },
  methods: {
    onSubmitSendData(jobOffer) {
      fetch("http://127.0.0.1:8080/addJobOffers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobOffer),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Une erreur est survenue :", error);
        });
    },

    onSubmit(event) {
      event.preventDefault();
      this.$refs["my-modal"].show();
      //alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.company = null;
      this.form.email = null;
      this.form.jobTitle = null;
      this.form.jobType = null;
      this.form.contractType = null;
      this.form.contractLength = null;
      this.form.city = null;
      this.form.department = null;
      this.form.salary = null;
      this.form.tempSalary = null;
      this.form.description = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  //     computed: {
  //       filteredSizes() {
  //         if (!this.searchQuery) {
  //           return this.sizes;
  //         }

  //         return this.sizes.filter(size => size.toLowerCase().includes(this.searchQuery.toLowerCase()));
  //       }
  //     }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Candara";
  src: local("Candara"),
    url("../../assets/fonts/candara.ttf") format("truetype");
}

body {
  font-family: "Candara";
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  color: var(--jstalk-color-primary);
}

a:hover {
  color: var(--jstalk-color-primary-contrast);
}

.card {
  width: 50%;
  background-color: white;
}

.card-title {
  background: var(--jstalk-color-primary);
  color: var(--jstalk-color-dark);
  flex: 1 1;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

.modal-header {
  background: var(--jstalk-color-primary);
  color: var(--jstalk-color-dark);
  flex: 1 1;
  padding: 1rem;
}

.card-text {
  padding-top: 1rem;
}

.footer-card {
  display: flex;
  justify-content: flex-end;
}

.typesContainer {
  display: flex;
  justify-content: flex-start;
}

#select-group-contractType {
  margin-left: 5%;
}

.contractLength {
  margin-left: 5%;
}

.salaryContainer {
  margin-bottom: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#€ {
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  margin: 0;
}

@media only screen and (max-width: 1000px) {
  .card {
    width: 50%;
  }
}
</style>

 <!-- .list-group {
    max-height: 200px;
    overflow-y: auto;
  } -->