<template>
  <div class="column is-8 form">
    <div class="section">
      <span class="is-size-5 mb-2 is-block">
        By registering, you allow Central Tree Bank to store, process and use
        the information you provided herein. Click
        <span
          class="has-text-weight-bold privacy-policy"
          @click="showPolicy = !showPolicy"
          >here</span
        >
        for the Privacy Policy.
      </span>
      <div class="is-grouped">
        <label for="" class="title is-4">Organization Information</label>
        <div class="field">
          <label class="label">Organization</label>
          <div class="control">
            <input class="input" type="text" v-model="form.compname" />
          </div>
          <p class="help is-danger" v-show="!validate.compname.isValid">
            {{ validate.compname.msg }}
          </p>
        </div>
        <div class="field">
          <div class="columns">
            <div class="column is-three-quarters">
              <label class="label">Address</label>
              <div class="control">
                <input class="input" type="text" v-model="form.address" />
              </div>
              <p class="help is-danger" v-show="!validate.address.isValid">
                {{ validate.address.msg }}
              </p>
            </div>
            <div class="column">
              <label class="label">ZIP Code</label>
              <div class="control">
                <input class="input" type="text" v-model="form.zip_code" />
              </div>
              <p class="help is-danger" v-show="!validate.zip_code.isValid">
                {{ validate.zip_code.msg }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div class="is-grouped">
        <label for="" class="title is-4">Contact Information</label>
        <div class="field">
          <label class="label">Mobile Number</label>
          <div class="control">
            <div class="columns">
              <div class="column is-2">
                <input class="input" type="text" placeholder="+63" disabled />
              </div>
              <div class="column">
                <input
                  class="input"
                  type="text"
                  placeholder="9123456789"
                  v-model="form.contact_number"
                />
              </div>
            </div>
            <p class="help is-danger" v-show="!validate.contact_number.isValid">
              {{ validate.contact_number.msg }}
            </p>
          </div>
        </div>
        <div class="field">
          <label class="label">Contact Person</label>
          <div class="control">
            <input class="input" type="text" v-model="form.contact_person" />
          </div>
          <p class="help is-danger" v-show="!validate.contact_person.isValid">
            {{ validate.contact_person.msg }}
          </p>
        </div>
        <div class="field">
          <label class="label">Position</label>
          <div class="control">
            <input class="input" type="text" v-model="form.contact_position" />
          </div>
          <p class="help is-danger" v-show="!validate.contact_position.isValid">
            {{ validate.contact_position.msg }}
          </p>
        </div>
      </div>

      <br />

      <div class="is-grouped">
        <label for="" class="title is-4">Login Information</label>
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input class="input" type="text" v-model="form.username" />
          </div>
          <p class="help is-danger" v-show="!validate.username.isValid">
            {{ validate.username.msg }}
          </p>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" v-model="form.password" />
          </div>
          <p class="help is-danger" v-show="!validate.password.isValid">
            {{ validate.password.msg }}
          </p>
        </div>
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              v-model="form.confirm_password"
            />
          </div>
          <p class="help is-danger" v-show="!validate.confirm_password.isValid">
            {{ validate.confirm_password.msg }}
          </p>
        </div>
      </div>

      <div :class="{ 'mt-10': previewImage }">
        <figure class="image">
          <img :src="previewImage" />
        </figure>
      </div>

      <br />

      <div class="file is-boxed is-fullwidth">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="moa"
            @change="onFileUpload"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fa fa-upload"></i>
            </span>
            <span class="file-label" style="text-align: center">
              Upload MOA (screenshot or photo)
            </span>
          </span>
          <p class="help is-danger" v-show="!validate.moa.isValid">
            {{ validate.moa.msg }}
          </p>
        </label>
      </div>

      <div class="field">
        <div class="control">
          <button
            class="button is-primary login-btn is-fullwidth"
            @click="register"
          >
            Register
          </button>
        </div>
      </div>
    </div>

    <privacy-policy
      v-show="showPolicy"
      @close="showPolicy = !showPolicy"
      @policyAgreement="handleAgreement"
    ></privacy-policy>
  </div>
</template>

<script>
import "@/assets/css/register.css";
import PrivacyPolicy from "@/components/common/PrivacyPolicy";
import OrganizationService from "@/services/OrganizationService";
import fileMixin from "@/mixins/fileMixins";
import validateMixin from "@/mixins/validateMixins";

export default {
  name: "SidebarOrganization",
  components: { PrivacyPolicy },
  mixins: [fileMixin, validateMixin],
  data() {
    return {
      form: {
        compname: "",
        address: "",
        zip_code: "",
        contact_person: "",
        contact_number: "",
        contact_position: "",
        username: "",
        password: "",
        moa: "",
        confirm_password: "",
      },
      moa: "",
      previewImage: "",
      showPolicy: false,
      isPolicyAgreed: false,
      validate: {
        compname: { isValid: false, msg: "" },
        address: { isValid: false, msg: "" },
        zip_code: { isValid: false, msg: "" },
        contact_number: { isValid: false, msg: "" },
        contact_person: { isValid: false, msg: "" },
        contact_position: { isValid: false, msg: "" },
        username: { isValid: false, msg: "" },
        password: { isValid: false, msg: "" },
        confirm_password: { isValid: false, msg: "" },
        moa: { isValid: false, msg: "" },
      },
    };
  },
  methods: {
    async register() {
      // Check if policy is accepted
      if (!this.isPolicyAgreed) {
        alert("Policy agreement is required.");
        return;
      }
      const res = await OrganizationService.register(this.form);
      const data = res.data;
      if (data.success == undefined) {
        this.validator(data);
        return;
      }
      alert(data.message);
      if (!data.success) return false;
      this.$router.push("/login");
    },
    /**
     * Handle file upload of moa
     * Show preview image
     */
    onFileUpload(e) {
      this.handleFile(e, (file) => {
        const res = file.target.result;
        this.form.moa = res;
        this.previewImage = res;
      });
    },
    /**
     * Handle agreement for privacy policy
     */
    handleAgreement(condition) {
      this.isPolicyAgreed = condition;
      this.showPolicy = !this.showPolicy;
    },
  },
};
</script>

<style scoped>
.mt-10 {
  margin-top: 20px;
}

.privacy-policy {
  text-decoration: underline;
  cursor: pointer;
}
</style>
