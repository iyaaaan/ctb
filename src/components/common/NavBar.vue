<template>
  <div>
    <div id="navbar-container">
      <nav
        class="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <img src="@/assets/logo.png" style="max-height: 115px" />
          </a>
          <span class="navbar-item title is-4" style="margin-bottom: 0px">
            Central Tree Bank Platformx
          </span>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navigation-bar"
            v-on:click="toggleHamburgerStatus"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navigation-bar"
          class="navbar-menu"
          :class="['navbar-menu', { 'is-active': toggleHamburger }]"
        >
          <div class="navbar-start"></div>

          <div class="navbar-end">
            <div class="navbar-item">
              <a class="navbar-item" href="">News</a>
              <a class="navbar-item" href="">Forum</a>
              <a class="navbar-item" href="">Contact us</a>
              <div class="buttons">
                <router-link to="/login" class="button is-primary is-orange"
                  ><strong>Log In</strong></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      toggleHamburger: false,
    };
  },
  methods: {
    toggleHamburgerStatus() {
      this.toggleHamburger = !this.toggleHamburger;
    },
  },
};
</script>

<style scoped>
.navbar-burger {
  height: auto;
  width: 5rem;
}
</style>
