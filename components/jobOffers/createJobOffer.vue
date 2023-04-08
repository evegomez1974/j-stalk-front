<template>
  <div class="card">
    <div class="card-title">
      <h5>Publier une annonce :</h5>
    </div>
    <div class="card-body">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Nom de l'entreprise:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.company"
            placeholder="Enter nom de l'entreprise"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Adresse email:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            placeholder="Entrer email"
            required
          ></b-form-input>
        </b-form-group>

        <div id="TypesContainer">
          <b-form-group
            id="input-group-3"
            label="Type d'emploi:"
            label-for="input-3"
          >
            <b-form-select
              id="input-3"
              v-model="form.jobType"
              :options="jobTypes"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="contractType"
            label="Type de contrat: (facultatif)"
            label-for="input-7"
            v-if="form.jobType === 'Alternance'"
          >
            <b-form-select
              id="input-7"
              v-model="form.contractType"
              :options="contractTypes"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="contractLength"
			class="contractLength"
            label="Durée du contrat: (facultatif)"
            label-for="input-7"
            v-if="form.jobType === 'Alternance'"
          >
            <b-form-select
              id="input-7"
              v-model="form.contractLength"
              :options="contractLengthsAlternance"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="contractLength"
			class="contractLength"
            label="Durée du contrat:"
            label-for="input-7"
            v-if="form.jobType === 'Stage'"
          >
            <b-form-select
              id="input-7"
              v-model="form.contractLength"
              :options="contractLengthsStage"
            ></b-form-select>
          </b-form-group>
        </div>

        <b-form-group id="input-group-4" label="Ville:" label-for="input-4">
          <b-form-select
            id="input-4"
            v-model="form.city"
            :options="cities"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Département:"
          label-for="input-6"
        >
          <b-form-select
            id="input-6"
            v-model="form.department"
            :options="departments"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Quel est le salaire pour ce poste ? (facultatif)"
          label-for="input-7"
        >
          <div id="SalaryContainer">
            <b-form-input
              id="minSalary"
              class="mr-2"
              v-model="form.salary"
              type="number"
              min="0"
              placeholder="Entrer salaire"
            ></b-form-input>

            <div id="€">
              <p>€</p>
            </div>

            <b-form-select
              id="input-7"
              class="ml-2"
              v-model="form.tempSalary"
              type="text"
              :options="tempsSalary"
              required
            ></b-form-select>
          </div>
        </b-form-group>

        <!-- <b-form-input v-model="searchQuery" list="my-list-id" @focus="showList = true"></b-form-input>

    <b-list-group id="my-list-id" class="mt-2" v-if="showList">
      <b-list-group-item v-if="!filteredSizes.length">No results found.</b-list-group-item>
      <b-list-group-item v-for="(size, index) in filteredSizes.slice(0, 4)" :key="index">{{ size }}</b-list-group-item>
    </b-list-group> -->

        <vue-editor v-model="form.content" :editor-toolbar="customToolbar" />

        <b-form-group id="input-group-5" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            v-model="form.checked"
            id="checkboxes-5"
            :aria-describedby="ariaDescribedby"
          >
            <b-form-checkbox value="me">Check me out</b-form-checkbox>
            <b-form-checkbox value="that">Check that out</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
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
        company: "",
        email: "",
        jobType: null,
        contractType: null,
		contractLength: "",
		city: "",
		department: "",
        salary: 0,
        checked: [],
        content: "",
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
      contractLengthsAlternance: ["1 an", "2 ans", "3ans"],
      contractLengthsStage: ["3 mois", "6 mois", "9 mois", "1 an"],
      tempsSalary: ["par mois", "par an"],
      show: true,
      customToolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      // this.form.savedText = this.content;
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.company = "";
      this.form.email = "";
      this.form.jobType = null;
      this.form.contractType = null;
	  this.form.contractLength = "",
	  this.form.city = "",
	  this.form.department = "",
	  this.form.salary = null,
      this.form.checked = [];
      this.form.content = "";
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

#TypesContainer {
  display: flex;
  justify-content: flex-start;
}

#contractType {
  margin-left: 5%;
}

.contractLength {
  margin-left: 5%;
}

#SalaryContainer {
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