<template>
  <div>
    <div class="btn-group">
      <button type="button" class="btn btn-outline-secondary" @click="addBold"><i class="fa fa-bold"></i></button>
      <button type="button" class="btn btn-outline-secondary" @click="addItalic"><i class="fa fa-italic"></i></button>
      <button type="button" class="btn btn-outline-secondary" @click="addList"><i class="fa fa-list-ul"></i></button>
    </div>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
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
      savedText: '',
    };
  },
  methods: {
    addBold() {
      this.text += '**Gras**';
    },
    addItalic() {
      this.text += '_Italique_';
    },
    addList() {
      this.text += '\n- Liste à puce';
    },
    saveText() {
      this.savedText = this.text;
    },
  },
  computed: {
    formattedText() {
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const italicRegex = /_([^_]+)_/g;
      const listRegex = /- (.+)/g;

      let formatted = this.savedText;
      formatted = formatted.replace(boldRegex, '<strong>$1</strong>');
      formatted = formatted.replace(italicRegex, '<em>$1</em>');
      formatted = formatted.replace(listRegex, '<li>$1</li>');
      formatted = `<ul>${formatted}</ul>`;

      console.log(this.text), 

      
        console.log(JSON.stringify(this.savedText))

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
.btn-group {
  margin-bottom: 10px;
}
.btn-group .btn {
  border-radius: 0;
}
.btn-group .btn:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.btn-group .btn:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
