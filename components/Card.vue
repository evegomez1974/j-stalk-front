<template>
  <div class="card">
    <h5 class="card-title">{{ jobTitle }}</h5>
    <div class="card-body">
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
      <div class="footer-card">
        <p style="font-style: italic">Il y a 15h</p>
        <a v-b-modal.modal-center href="#" class="card-link">Voir plus</a>
      </div>
    </div>
    <!-- <b-button v-b-modal.modal-center>Launch centered modal</b-button> -->

    <b-modal id="modal-center" centered>
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
    </b-modal>
  </div>
</template>

<script>
import "../assets/css/card.scss"
import { BIconCircleFill } from "bootstrap-vue";
export default {
  name: "Card",
  components: {
    BIconCircleFill,
  },
  props: {
        jobTitle: String,
        company: String,
        city: String,
        department: String,

  }
};
</script>