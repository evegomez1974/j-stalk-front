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
      <!-- <span class="badge badge-primary">Apprentissage</span>
      <span class="badge badge-primary">Professionalisation</span>
      <span class="badge badge-primary">6 mois</span> -->
      <span class="badge badge-secondary">3 mois</span>

      <p class="card-text">
        <BIconCircleFill
          style="color: black"
          font-scale="0.5"
        ></BIconCircleFill>
        Développer le front-end des applications web en mode agile
      </p>
      <p class="card-text">
        <BIconCircleFill style="color: black" font-scale="0.5">
        </BIconCircleFill>
        Optimiser l'expérience utilisateur
      </p>
      <div class="footer-card">
        <p style="font-style: italic; color: black">Il y a 15h</p>
        <b-button id="seeMore"
          v-b-modal="'modal-center-' + this.modalRef"
          >Voir plus</b-button
        >
      </div>
    </div>
    <!-- <b-button v-b-modal.modal-center>Launch centered modal</b-button> -->

    <b-modal 
	  :id="'modal-center-' + this.modalRef" variant="jstalk-primary" centered>
      <template #modal-title> {{ jobTitle }} </template>

      <h6 class="card-subtitle mb-2 text-muted">{{ company }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ city }}, {{ department }}
      </h6>
      <p class="card-text">
        <BIconCircleFill
          style="color: black"
          font-scale="0.5"
        ></BIconCircleFill>
        Développer le front-end des applications web en mode agile
      </p>
      <p class="card-text">
        <BIconCircleFill style="color: black" font-scale="0.5">
        </BIconCircleFill>
        Optimiser l'expérience utilisateur
      </p>
      <!-- <template #modal-footer>
        <button>test</button>
      </template> -->
    </b-modal>
  </div>
</template>

<script>
import "../assets/css/card.scss";
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
    favorite: Boolean,
  },
  data(){
	return {
		modalRef: (Math.random() + 1).toString(36).substring(7)
	}
  },
  methods: {
    changeFavorite() {
      this.$emit("update:favorite", !this.favorite);
    },
  },
};
</script>