<template>
  <div>
    <vue-editor v-model="content" :editor-toolbar="customToolbar"/>
    <button @click="saveText">Enregistrer</button>
    <div v-if="savedText">
      <h2>Texte enregistré :</h2>
      <p v-html="formattedText"></p>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },

  data() {
    return {
      content: "",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "bullet" }]
      ],
      savedText: null,
    };
  },

  methods: {
    saveText() {
      this.savedText = this.content;
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


    //   console.log(this.text, "text")
    // console.log(this.savedText, "savedText")
    // console.log(formatted, "formatted")

      return formatted;
    },
  },
};
</script>