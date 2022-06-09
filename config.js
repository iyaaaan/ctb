export default () => {
  /**
   * Create a config object based on current process.env values
   * Then remove VUE_APP prefix for typing convenience
   */
  return Object.entries(process.env).reduce(
    (acc, [key, value]) => ({ ...acc, [key.replace("VUE_APP_", "")]: value }),
    {}
  );
};
