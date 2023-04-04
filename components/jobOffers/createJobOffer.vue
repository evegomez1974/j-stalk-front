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
          description="Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre."
        >
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            placeholder="Entrer email"
            required
          ></b-form-input>
        </b-form-group>

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
          id="input-group-4"
          label="Type de contrat:"
          label-for="input-4"
        >
          <b-form-select
            id="input-4"
            v-model="form.contractType"
            :options="contractTypes"
            required
          ></b-form-select>
        </b-form-group>

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
      form: {
        company: "",
        email: "",
        jobType: null,
        contractType: null,
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
        "Alternance",
        "Stage",
      ],
      departments: [
        { text: "Selectionnez un département", value: null },
        "Ain", "Aisne","Allier","Alpes-de-Haute-Provence","Hautes-Alpes", "hautes alpes" ],
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
      this.form.checked = [];
      this.form.content = "";
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

@media only screen and (max-width: 1000px) {
  .card {
    width: 80%;
  }
}
</style>