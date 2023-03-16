<template>
  <div id="webViewer" ref="viewer" />
</template>

<script>
let WebViewer;
if (process.browser) {
  WebViewer = require('@pdftron/webviewer').default;
}

export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },

  mounted () {
    if (process.browser && WebViewer) {
      WebViewer({
          path: '/webviewer',
          initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',

        }, this.$refs.viewer
      ).then(instance => {
        // Code with regards to instance can go here
      });
    }
  }
}
</script>

<style>

</style>
