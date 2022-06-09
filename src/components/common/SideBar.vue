<template>
  <div class="column is-one-fifth is-primary box m-0">
    <aside class="menu">
      <p class="menu-label is-size-6">
        General
      </p>
      <ul class="menu-list">
        <li><a @click="switchComponent(0)">Home</a></li>
        <li><a @click="switchComponent(1)">Notification</a></li>
        <li><a @click="switchComponent(2)">Own Trees</a></li>
        <li><a @click="switchComponent(3)">Achievements</a></li>
        <li><a @click="switchComponent(4)">How to Plant</a></li>
        <li><a @click="switchComponent(5)">About</a></li>
        <li><a @click="switchComponent(6)">Donate</a></li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      selectComponent: {
        0: "Home",
        1: "Notification",
        2: "OwnTrees",
        3: "Achievements",
        4: "How to Rant",
        5: "About",
        6: "Donate",
      },
    };
  },
  methods: {
    switchComponent(index) {
      this.$emit("updateComponent", this.selectComponent[index]);
    },
  },
};
</script>
