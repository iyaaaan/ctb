import Api from "@/services/Api";

export default {
  donate(payload) {
    return Api.post("donation", payload);
  },
};
