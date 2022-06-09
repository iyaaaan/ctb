<template>
  <div>
    <div>
      <nav
        class="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <img src="@/assets/logo.png" style="max-height: 110px" />
          </a>
          <span class="navbar-item title is-4" style="margin-bottom: 0px">
            Central Tree Bank Platform
          </span>
        </div>

        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a
              class="navbar-link is-arrowless is-justify-content-center"
              style="width: 120px;"
            >
              Profile
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item" @click="logout">
                Log out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  name: "NavBarUser",
  data() {
    return {
      toggleHamburger: false,
    };
  },
  methods: {
    toggleHamburgerStatus() {
      this.toggleHamburger = !this.toggleHamburger;
    },
    logout() {
      // Clear all auth details
      AuthenticationService.clearAuthToken();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
