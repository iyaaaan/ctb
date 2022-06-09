import Api from "@/services/Api";

export default {
  treeSearchBasedOnCoords() {
    return Api.get("/tree");
  },
  getTreeCounts() {
    return Api.get("tree/count");
  },
  getUserTreeCounts(payload) {
    return Api.get("tree/count/user", payload);
  },
};
