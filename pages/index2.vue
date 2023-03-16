<template>
  <div class="container">
    <div>
      <pdfViewer
        :url="'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf'"
      >
      </pdfViewer>

    </div>
  </div>
</template>

<script>
import pdfViewer from "@/components/PDFViewer"
export default {
  components: {
    pdfViewer
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#webViewer{
  height: 100vh;
  width: 100vw;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
