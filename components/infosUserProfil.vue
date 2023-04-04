<template>
  <div>
    <div>
      <div class="mt-4">
        <b-card img-src="" img-alt="" img-left class="mb-3" id="img-user">
          <h4>Nom User</h4>
          <b-card-text class="zoneInfosUser">
            <div class="zoneUser">
              <b-label>Ecole</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>Type</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>Alternance/stage</b-label>
            </div>
            <div  class="zoneUser">
              <b-label>Année en cour</b-label>
            </div>
          </b-card-text>

          <b-form-group label="Image" label-for="form-image" label-cols-lg="2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="image-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-file id="form-image" :disabled="busy" accept=".jpg, .png"></b-form-file>
            </b-input-group>
          </b-form-group>

          <div class="d-flex justify-content-center">
            <b-button ref="submit" type="submit" :disabled="busy">Submit</b-button>
          </div>

          <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
            <template #overlay>
              <div v-if="processing" class="text-center p-4 bg-primary text-light rounded">
                <b-icon icon="cloud-upload" font-scale="4"></b-icon>
                <div class="mb-3">Processing...</div>
                <b-progress
                  min="1"
                  max="20"
                  :value="counter"
                  variant="success"
                  height="3px"
                  class="mx-n4 rounded-0"
                ></b-progress>
              </div>
              <div
                v-else
                ref="dialog"
                tabindex="-1"
                role="dialog"
                aria-modal="false"
                aria-labelledby="form-confirm-label"
                class="text-center p-3"
              >
                <p><strong id="form-confirm-label">Are you sure?</strong></p>
                <div class="d-flex">
                  <b-button variant="outline-danger" class="mr-3" @click="onCancel">
                    Cancel
                  </b-button>
                  <b-button variant="outline-success" @click="onOK">OK</b-button>
                </div>
              </div>
            </template>
          </b-overlay>

        </b-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'infosUserProfil',
  components: {},
  data (){
    return {
      busy: false,
        processing: false,
        counter: 1,
        interval: null

  }
  },
  beforeDestroy() {
      this.clearInterval()
    },
  methods: {
    clearInterval() {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      },
      onShown() {
        // Focus the dialog prompt
        this.$refs.dialog.focus()
      },
      onHidden() {
        // In this case, we return focus to the submit button
        // You may need to alter this based on your application requirements
        this.$refs.submit.focus()
      },
      onSubmit() {
        this.processing = false
        this.busy = true
      },
      onCancel() {
        this.busy = false
      },
      onOK() {
        this.counter = 1
        this.processing = true
        // Simulate an async request
        this.clearInterval()
        this.interval = setInterval(() => {
          if (this.counter < 20) {
            this.counter = this.counter + 1
          } else {
            this.clearInterval()
            this.$nextTick(() => {
              this.busy = this.processing = false
            })
          }
        }, 350)
      }

  },
  mounted() {

  }

}
</script>


<style scoped>

.zoneInfosUser {
  display: grid;
  grid-template-columns: repeat(2, auto);
}

.zoneUser {
  border: 1px solid black;
  margin: 10px;
}

</style>
