import Api from "@/services/Api";

export default {
  register(payload) {
    return Api.post("user", payload);
  },
};
