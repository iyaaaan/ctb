<template>
  <div class="columns is-vcentered">
    <div class="column is-4 sidebar">
      <section class="section">
        <div class="has-text-centered">
          <router-link to="/">
            <img class="login-logo" src="@/assets/img/logo.png" />
          </router-link>
        </div>

        <div>
          <button
            class="button is-fullwidth login-btn"
            :class="{ 'is-primary': selectedRegisterForm == 'individual' }"
            v-on:click="setRegisterForm('individual')"
          >
            INDIVIDUAL
          </button>
          <button
            class="button is-fullwidth login-btn"
            :class="{ 'is-primary': selectedRegisterForm == 'organization' }"
            v-on:click="setRegisterForm('organization')"
          >
            ORGANIZATION
          </button>
        </div>
        <div class="has-text-centered">
          <router-link to="/login">
            Already have an account? Log in now!
          </router-link>
        </div>
      </section>
    </div>
    <sidebar-individual
      v-if="selectedRegisterForm == 'individual'"
    ></sidebar-individual>
    <sidebar-organization
      v-if="selectedRegisterForm == 'organization'"
    ></sidebar-organization>
  </div>
</template>

<script>
import "@/assets/css/register.css";
import SidebarIndividual from "./SidebarIndividual.vue";
import SidebarOrganization from "./SidebarOrganization.vue";

export default {
  name: "Sidebar",
  components: {
    SidebarIndividual,
    SidebarOrganization,
  },
  data() {
    return {
      selectedRegisterForm: "individual",
    };
  },
  methods: {
    setRegisterForm(form) {
      window.scrollTo(0, 0);
      this.selectedRegisterForm = form;
    },
  },
};
</script>
