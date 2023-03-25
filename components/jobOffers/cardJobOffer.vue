<template>
  <div class="card">
    <div class="card-title">
      <h5>{{ jobTitle }}</h5>
      <button id="favButton" @click="changeFavorite">
        <b-icon
          v-if="this.favorite"
          icon="heart-fill"
          variant="light"
          font-scale="1.5"
        ></b-icon>
        <b-icon v-else icon="heart" variant="light" font-scale="1.5"></b-icon>
      </button>
    </div>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">{{ company }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ city }}, {{ department }}
      </h6>
      <span class="badge badge-secondary">Stage</span>
      <span class="badge badge-secondary">Alternance</span>
      <!-- <span class="badge badge-secondary">Apprentissage</span>
      <span class="badge badge-secondary">Professionalisation</span>
      <span class="badge badge-secondary">6 mois</span> -->
      <span class="badge badge-secondary">3 mois</span>

      <p class="card-text"> {{ truncatedDescription }} </p>
      <div class="footer-card">
        <p style="font-style: italic; color: black">Il y a 15h</p>
        <b-button id="seeMore" v-b-modal="'modal-center-' + this.modalRef"
          >Voir plus</b-button
        >
      </div>
    </div>

    <b-modal
      :id="'modal-center-' + this.modalRef"
      variant="jstalk-primary"
      centered
    >
      <template #modal-title> {{ jobTitle }} </template>

      <h6 class="card-subtitle mb-2 text-muted">{{ company }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ city }}, {{ department }}
      </h6>
      <span class="badge badge-secondary">Stage</span>
      <span class="badge badge-secondary">Alternance</span>
      <!-- <span class="badge badge-primary">Apprentissage</span>
      <span class="badge badge-primary">Professionalisation</span>
      <span class="badge badge-primary">6 mois</span> -->
      <span class="badge badge-secondary">3 mois</span>

      <p class="card-text">
        Vous intervenez au sein d'un des programmes clé d'un constructeur aéronautique. Ces programmes visent à innover et à revisiter l'expérience utilisateur en opérant la transformation digitale de la société.
Vous vous intégrez dans nos équipes qui travaillent en étroite collaboration avec les équipes client. Vous pourrez intervenir sur des projets agiles, en méthode traditionnelle ou en assistance technique
      </p>
	    <b-button>Postuler</b-button>

    </b-modal>
  </div>
</template>

<script>
import { BIconCircleFill, BIconHeart } from "bootstrap-vue";

export default {
  name: "Card",
  components: {
    BIconCircleFill,
    BIconHeart,
  },
  props: {
    index: Number,
    jobTitle: String,
    company: String,
    city: String,
    department: String,
	description: String,
    favorite: Boolean,
  },
  data() {
    return {
      modalRef: (Math.random() + 1).toString(36).substring(7),
      textareaContent: "",
      jsonContent: {},
    };
  },
  methods: {
    changeFavorite() {
      this.$emit("update:favorite", !this.favorite);
    },
  },
  computed: {
	truncatedDescription() {
		const maxLength = 280;
		if (this.description.length <= maxLength) {
			return this.text;
		} else {
			return this.description.substring(0, maxLength) + '...';
		}
	}
  }
};
</script>

<style lang="scss" scoped>
@font-face {
    font-family: "Candara";
    src: local("Candara"), url("../../assets/fonts/candara.ttf") format("truetype");
  }

body {
    font-family: "Candara";
}
a {
    color: var(--jstalk-color-primary)  
}

a:hover {
    color: var(--jstalk-color-primary-contrast); 
}

.card {
    width: 80%;
}

.card-title {
    background: var(--jstalk-color-primary) ;
    color: var(--jstalk-color-dark);
    flex: 1 1;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}

.modal-header{
    background: var(--jstalk-color-primary) ;
    color: var(--jstalk-color-dark);
    flex: 1 1;
    padding: 1rem;
}

#favButton {
    border-color: transparent;
    background-color: transparent;
}

// #seeMore {
//     color: var(--jstalk-color-primary);
//     border-color: transparent;
// }

// #seeMore {
//     color: white;
//     background: #6c757d;
//     border-radius: 5px;
//     border-color: transparent;
// }
.card-text {
    padding-top: 1rem;
}

@media only screen and (max-width: 1000px) {
 
    .card{
        width: 80%
    }

}

.footer-card {
    display: flex;
    justify-content: space-between;
}
</style>