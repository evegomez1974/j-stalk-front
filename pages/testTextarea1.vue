<template>
  <div>
    <textarea v-model="text" class="form-control"></textarea>
    <button @click="saveText">Enregistrer</button>
    <div v-if="savedText">
      <h2>Texte enregistré :</h2>
      <p v-html="formattedText"></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      savedText: null,
    };
  },
  methods: {
    saveText() {
      this.savedText = this.text;
    },
  },
  computed: {
    formattedText() {
      const boldRegex = /\*([^*]+)\*/g;
      const italicRegex = /_([^_]+)_/g;
      const listRegex = /- (.+)/g;

      let formatted = this.savedText;
      formatted = formatted.replace(boldRegex, '<strong>$1</strong>');
      formatted = formatted.replace(italicRegex, '<em>$1</em>');
      formatted = formatted.replace(listRegex, '<li>$1</li>');
      formatted = `<ul>${formatted}</ul>`;


      console.log(this.text, "text")
    console.log(this.savedText, "savedText")

      return formatted;
    },
  },
};
</script>

<style>
.form-control {
  height: 200px;
  font-size: 16px;
  padding: 10px;
}
.font-weight-bold {
  font-weight: bold;
}
.font-italic {
  font-style: italic;
}
</style>
