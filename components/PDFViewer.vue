<template>
  <div>
    <div id="webViewer" ref="viewer"></div>
  </div>

</template>

<script>
let WebViewer;
if (process.browser) {
  WebViewer = require('@pdftron/webviewer').default;
}

export default {
  props: {
      pdf: Object,
    },

  //props: ['url'],
  // {
  //   url: {
  //     type: String,
  //     required: true
  //   },
  // },
//https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf
  mounted () {
    if (process.browser && WebViewer) {
      WebViewer({
          path: '/webviewer',
          initialDoc: this.pdf.docPDF,

        }, this.$refs.viewer
      ).then(instance => {
        // Code with regards to instance can go here
      });
    }
  },
}
</script>

<style scoped >
#webViewer {
  height: 80vh;
  width: 45vw;
}

</style>
