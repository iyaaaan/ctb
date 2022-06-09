import { unpackObject } from "@/utilities/utils";

export default {
  methods: {
    validator(data) {
      for (const key of Object.keys(this.validate)) {
        this.validate[key]["isValid"] = false;
        this.validate[key]["msg"] = "";
      }
      for (const [key, value] of Object.entries(unpackObject(data))) {
        if (key in this.validate) {
          this.validate[key]["isValid"] = value.isValid;
          this.validate[key]["msg"] = value.msg;
        }
      }
    },
  },
};
