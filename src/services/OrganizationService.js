import Api from "@/services/Api";

export default {
  getCompanies() {
    return Api.get("organization");
  },
  register(payload) {
    return Api.post("organization", payload);
  },
};
