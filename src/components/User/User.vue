<template>
  <NavBarUser></NavBarUser>
  <div class="columns">
    <SideBar @updateComponent="updateComponent"></SideBar>
    <div class="column">
      <keep-alive>
        <component :is="currentComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import NavBarUser from "@/components/common/NavBarUser";
import SideBar from "../common/SideBar.vue";
import Donation from "@/components/User/Donation";
import About from "@/components/User/About";
import Home from "@/components/User/Home";
import OwnTrees from "@/components/User/OwnTrees";

export default {
  name: "User",
  components: {
    NavBarUser,
    SideBar,
    Donation,
    About,
    Home,
    OwnTrees,
  },
  data() {
    return {
      currentComponent: Home,
      componentList: {
        Donate: Donation,
        About: About,
        Home: Home,
        OwnTrees: OwnTrees,
      },
    };
  },
  methods: {
    updateComponent(data) {
      this.currentComponent = this.componentList[data];
    },
  },
};
</script>
