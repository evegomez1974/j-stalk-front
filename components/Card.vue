<template>
  <div class="card">
    <h5 class="card-title">{{ FormData.jobTitle }}</h5>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">{{ FormData.company }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ FormData.city }}, {{ FormData.department }}
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
      <a v-b-modal.modal-center href="#" class="card-link">Voir plus</a>
    </div>
    <!-- <b-button v-b-modal.modal-center>Launch centered modal</b-button> -->

    <b-modal id="modal-center" centered >
      <template #modal-title> {{FormData.jobTitle}} </template>

      <h6 class="card-subtitle mb-2 text-muted">{{ FormData.company }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ FormData.city }}, {{ FormData.department }}
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
import { BIconCircleFill } from "bootstrap-vue";
export default {
  name: "Card",
  components: {
    BIconCircleFill,
  },
  data() {
    return {
      FormData: {
        jobTitle: "Developpeur cpp junior H/F",
        company: "PellencST",
        city: "Pertuis",
        department: "Vaucluse (84)",
      },
    };
  },
};
</script>
