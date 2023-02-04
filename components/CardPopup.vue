<template>
  <div>
    <b-button v-b-modal.modal-center>Launch centered modal</b-button>

    <b-modal id="modal-center" centered title="BootstrapVue">

        <h6 class="card-subtitle mb-2 text-muted" >{{FormData.name}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Pertuis, Vaucluse(84)</h6>
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
  name: "CardPopup",
  components: {
    BIconCircleFill,
  },
    data (){
    return {
    FormData: {
      name:'PellencST',
      password: '',
    }
  }
  },
};
</script>
