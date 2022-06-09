<template>
  <div>
    <div class="columns is-vcentered">
      <div class="column is-4" style="max-height: 100vh">
        <section style="padding: 1rem 1.5re">
          <div class="has-text-centered">
            <router-link to="/">
              <img class="login-logo" src="@/assets/img/logo.png" />
            </router-link>
          </div>

          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-right">
              <input class="input" type="text" v-model="form.username" />
              <span class="icon is-small is-right">
                <i class="fa fa-user"></i>
              </span>
            </div>
            <p class="help is-danger" v-show="!validate.username.isValid">
              {{ validate.username.msg }}
            </p>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-right">
              <input class="input" type="password" v-model="form.password" />
              <span class="icon is-small is-right">
                <i class="fa fa-key"></i>
              </span>
            </div>
            <p class="help is-danger" v-show="!validate.password.isValid">
              {{ validate.password.msg }}
            </p>
          </div>
          <div class="has-text-centered">
            <a
              class="button is-vcentered is-primary login-btn"
              :class="{ 'is-loading': isLoading }"
              v-on:click="login"
              >Login</a
            >
          </div>
          <div class="has-text-centered">
            <router-link to="/register">
              Don't you have an account? Sign up now!
            </router-link>
          </div>
        </section>
      </div>
      <div class="column is-8 tree-bg p-0">
        <div style="position: relative;">
          <div class="black-bg"></div>
          <div class="tree-desc">
            <p>
              &emsp; &emsp; This “Mother Tree” is found in the Bicol National
              Park in the town of Basud, Camarines Norte. It is located within
              the territorial jurisdiction of Barangay Tuaca. It has a distance
              of 18 kilometers from the town proper and at least 21 kilometers
              from the municipality of Daet, the capital town of the province of
              Camarines Norte. The age of the ‘Mother Tree” is more than a
              hundred-year-old. It belongs to the red lauan variety (Shorea
              Negrosensis), with a height of about 44-meter and 17 feet at its
              widest part. On the other hand, the Bicol Natural Park is one of
              the richest rainforests in the Philippines. It is the sanctuary of
              about 190 wildlife species, 18 mammals, 120 birds, 22 amphibians,
              and 30 reptiles, most of which are endemic to the region.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import validateMixin from "@/mixins/validateMixins";

export default {
  name: "Login",
  mixins: [validateMixin],
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      isLoading: false,
      validate: {
        username: { isValid: false, msg: "" },
        password: { isValid: false, msg: "" },
      },
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      const { username, password } = { ...this.form };
      const res = await AuthenticationService.login({
        username: username,
        password: password,
      });
      const data = res.data;
      this.isLoading = false;
      if (data.success == undefined) {
        this.validator(data);
        return;
      }
      const { success, message, token } = { ...data };
      alert(message);
      if (!success) return false;
      AuthenticationService.setAuthToken(token);
      this.$router.push("user");
    },
  },
  mounted() {
    const self = this;
    window.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        self.login();
      }
    });
  },
};
</script>

<style scoped>
.tree-desc {
  position: relative;
  z-index: 2;
  color: white;
  font-size: 20px;
  text-align: justify;
  padding: 10px;
}

.black-bg {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
}
</style>
