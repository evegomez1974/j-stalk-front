<template>
  <div class="card">
    <div class="card-title">
      <h5>Publier une annonce :</h5>
    </div>
    <div class="card-body">
      <b-form
        v-if="show"
        @submit="onSubmit($event), onSubmitSendData(form)"
        @reset="onReset"
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
          />
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
          />
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
          />
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
            />
          </b-form-group>

          <b-form-group
            v-if="form.jobType === 'Alternance'"
            id="select-group-contractType"
            label="Type de contrat: (facultatif)"
            label-for="select-contractType"
          >
            <b-form-select
              id="select-contractType"
              v-model="form.contractType"
              :options="contractTypes"
            />
          </b-form-group>

          <b-form-group
            v-if="form.jobType === 'Alternance'"
            id="select-group-contractLengthsAlternance"
            class="contractLength"
            label="Durée du contrat: (facultatif)"
            label-for="select-contractLengthsAlternance"
          >
            <b-form-select
              id="select-contractLength"
              v-model="form.contractLength"
              :options="contractLengthsAlternance"
            />
          </b-form-group>

          <b-form-group
            v-if="form.jobType === 'Stage'"
            id="select-group-contractLengthsStage"
            class="contractLength"
            label="Durée du contrat: (facultatif)"
            label-for="select-contractLengthsStage"
          >
            <b-form-select
              id="select-contractLengthsStage"
              v-model="form.contractLength"
              :options="contractLengthsStage"
            />
          </b-form-group>
        </div>

        <!-- <b-form-group
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
        </b-form-group> -->

        <b-form-group
          id="input-group-city"
          label="Ville:"
          label-for="input-city"
        >
          <b-form-input
            id="input-city"
            v-model="form.city"
            placeholder="Entrer une ville"
            required
          />
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
          />
        </b-form-group>

        <b-form-group
          id="input-group-salary"
          label="Quel est le salaire pour ce poste ? (facultatif)"
          label-for="input-salary"
        >
          <div class="salaryContainer">
            <b-form-input
              id="input-minSalary"
              v-model="form.salary"
              class="mr-2"
              type="number"
              min="0"
              placeholder="Entrer un salaire"
            />

            <div id="€">
              <p>€</p>
            </div>

            <b-form-select
              id="select-maxSalary"
              v-model="form.tempSalary"
              class="ml-2"
              type="text"
              :options="tempsSalary"
            />
          </div>
        </b-form-group>

        <vue-editor
          v-model="form.description"
          class="mb-4"
          :editor-toolbar="customToolbar"
        />

        <!-- <b-form-input v-model="searchQuery" list="my-list-id" @focus="showList = true"></b-form-input>

    <b-list-group id="my-list-id" class="mt-2" v-if="showList">
      <b-list-group-item v-if="!filteredSizes.length">No results found.</b-list-group-item>
      <b-list-group-item v-for="(size, index) in filteredSizes.slice(0, 4)" :key="index">{{ size }}</b-list-group-item>
    </b-list-group> -->

        <b-button
          type="submit"
          variant="primary"
        >
          Submit
        </b-button>
        <b-button
          type="reset"
          variant="danger"
        >
          Reset
        </b-button>
      </b-form>

      <b-modal
        id="modal-center"
        ref="my-modal"
        centered
        title="Publier une annonce"
        ok-only
        ok-variant="secondary"
        @hidden="onReset"
      >
        <p class="my-4">
          Votre annonce a bien été publiée !
        </p>
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
      // cities: [
      //   { text: "Selectionnez une ville", value: null },
      //   "Aix-en-Provence",
      //   "Avignon",
      //   "Manosque",
      //   "Marseille",
      //   "Martigues",
      //   "Orange",
      //   "Pertuis",
      //   "Vitrolles",
      // ],
      departments: [{ text: "Selectionnez un département", value: null }],
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
  mounted() {
      fetch('http://127.0.0.1:8080/listDepartments'  , {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`
          },
      })
      .then((response) => response.json())
      .then((data) => {
        const departments = data;
        this.departments = this.departments.concat(
          departments.map((department) => department.name)
        );
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
    onSubmitSendData(jobOffer) {
      console.log(jobOffer)

      fetch("http://127.0.0.1:8080/addJobOffers", {
        method: "PUT",
        headers: {
             'Authorization': `Bearer ${localStorage.getItem('PAC-token')}`,
             'Content-Type': 'application/json'
           },
        body: JSON.stringify(jobOffer),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
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

form {
  display: block !important;
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
