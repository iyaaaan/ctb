export default {
  methods: {
    /**
     * Handle file to url
     *
     * @param {*} event
     */
    handleFile(event, callback) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        callback(e);
      };
    },
  },
};
