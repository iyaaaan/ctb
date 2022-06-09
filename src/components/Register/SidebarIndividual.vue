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
      <label class="title is-4">Personal Information</label>
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" v-model="form.fname" />
        </div>
        <p class="help is-danger" v-show="!validate.fname.isValid">
          {{ validate.fname.msg }}
        </p>
      </div>

      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" v-model="form.lname" />
        </div>
        <p class="help is-danger" v-show="!validate.lname.isValid">
          {{ validate.lname.msg }}
        </p>
      </div>

      <div class="field">
        <label class="label">Middle Name</label>
        <div class="control">
          <input class="input" type="text" v-model="form.mname" />
        </div>
        <p class="help is-danger" v-show="!validate.mname.isValid">
          {{ validate.mname.msg }}
        </p>
      </div>

      <div class="field">
        <label class="label">Sex</label>
        <div class="control">
          <label class="radio">
            <input type="radio" name="sex" value="Male" v-model="form.sex" />
            Male
          </label>
          <label class="radio">
            <input type="radio" name="sex" value="Female" v-model="form.sex" />
            Female
          </label>
        </div>
        <p class="help is-danger" v-show="!validate.sex.isValid">
          {{ validate.sex.msg }}
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

      <div class="field">
        <label class="label">Birthdate</label>
        <div class="control">
          <datepicker class="input" v-model="bday"></datepicker>
        </div>
        <p class="help is-danger" v-show="!validate.bday.isValid">
          {{ validate.bday.msg }}
        </p>
      </div>

      <div class="field">
        <label class="label">Mobile Number</label>
        <div class="control">
          <div class="columns">
            <div class="column is-3">
              <input class="input" type="text" placeholder="+63" disabled />
              <p class="help is-danger" v-show="!validate.number.isValid">
                {{ validate.number.msg }}
              </p>
            </div>
            <div class="column">
              <input
                class="input"
                type="number"
                placeholder="9123456789"
                v-model="form.number"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Occupation</label>
        <div class="select is-primary">
          <select v-model="form.occupation">
            <option>Select option</option>
            <option>Student</option>
            <option>Professional</option>
            <option>Others</option>
          </select>
        </div>
        <p class="help is-danger" v-show="!validate.occupation.isValid">
          {{ validate.occupation.msg }}
        </p>
      </div>

      <div class="field">
        <label class="label">Organization</label>
        <div class="select is-primary">
          <select @change="onOrgChange" v-model="organization">
            <option
              v-for="org in orgList"
              v-bind:value="org.compid"
              :key="org.compid"
              >{{ org.compname }}</option
            >
          </select>
        </div>
        <p class="help is-danger" v-show="!validate.organization.isValid">
          {{ validate.organization.msg }}
        </p>
      </div>

      <div class="is-grouped box" v-show="organization == 'others'">
        <label class="label">User Organization</label>
        <div class="control">
          <label class="label">Name</label>
          <div class="control">
            <input type="text" class="input" v-model="userOrg" />
          </div>
          <p class="help is-danger" v-show="!validate.organization.isValid">
            {{ validate.organization.msg }}
          </p>
        </div>
        <div class="columns">
          <div class="column is-three-quarters">
            <label class="label">Address</label>
            <div class="control">
              <input type="text" class="input" v-model="form.comp_address" />
            </div>
            <p class="help is-danger" v-show="!validate.comp_address.isValid">
              {{ validate.comp_address.msg }}
            </p>
          </div>
          <div class="column">
            <label class="label">ZIP code</label>
            <div class="control">
              <input type="text" class="input" v-model="form.comp_zip_code" />
            </div>
            <p class="help is-danger" v-show="!validate.comp_zip_code.isValid">
              {{ validate.comp_zip_code.msg }}
            </p>
          </div>
        </div>
        <p class="help is-danger is-italic">
          * Please write the complete organization name and address. Do not use
          abbreviation.
        </p>
      </div>

      <div class="field" v-show="showDepartment">
        <label class="label">Department</label>
        <div class="select is-primary">
          <select v-model="department">
            <option
              v-for="(item, index) in deptList"
              v-bind:value="item"
              :key="index"
              >{{ item }}</option
            >
          </select>
        </div>
        <p class="help is-danger" v-show="!validate.department.isValid">
          {{ validate.department.msg }}
        </p>
      </div>

      <div class="is-grouped mt-4">
        <label class="title">Login Information</label>
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
              v-model="form.confirmPassword"
            />
          </div>
          <p class="help is-danger" v-show="!validate.confirmPassword.isValid">
            {{ validate.confirmPassword.msg }}
          </p>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button
            class="button is-primary login-btn is-fullwidth"
            v-on:click="register"
            :class="{ 'is-loading': isLoading }"
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
import Datepicker from "vue3-datepicker";
import PrivacyPolicy from "@/components/common/PrivacyPolicy";
import OrganizationService from "@/services/OrganizationService";
import UserService from "@/services/UserService";
import { toDate } from "@/utilities/utils";
import validateMixin from "@/mixins/validateMixins";

export default {
  name: "SidebarIndividual",
  components: {
    Datepicker,
    PrivacyPolicy,
  },
  mixins: [validateMixin],
  data() {
    return {
      form: {
        fname: "",
        lname: "",
        mname: "",
        sex: "",
        address: "",
        zip_code: "",
        bday: "",
        number: "",
        occupation: "Select option",
        organization: "",
        compid: 0,
        username: "",
        password: "",
        confirmPassword: "",
        comp_address: "",
        comp_zip_code: "",
      },
      orgList: [],
      deptList: [],
      showDepartment: false,
      showPolicy: false,
      department: "",
      organization: "default",
      userOrg: "",
      bday: new Date(),
      isLoading: false,
      isPolicyAgreed: false,
      validate: {
        fname: { isValid: false, msg: "" },
        lname: { isValid: false, msg: "" },
        mname: { isValid: false, msg: "" },
        address: { isValid: false, msg: "" },
        zip_code: { isValid: false, msg: "" },
        bday: { isValid: false, msg: "" },
        sex: { isValid: false, msg: "" },
        number: { isValid: false, msg: "" },
        occupation: { isValid: false, msg: "" },
        organization: { isValid: false, msg: "" },
        department: { isValid: false, msg: "" },
        username: { isValid: false, msg: "" },
        password: { isValid: false, msg: "" },
        confirmPassword: { isValid: false, msg: "" },
        comp_address: { isValid: false, msg: "" },
        comp_zip_code: { isValid: false, msg: "" },
      },
    };
  },
  async created() {
    const res = await OrganizationService.getCompanies();
    if (!res.data) return false;
    const orgList = Array.from(res.data.payload);
    // Add default option
    orgList.unshift({
      compid: "default",
      compname: "Select option",
    });
    // Add others option
    orgList.push({
      compid: "others",
      compname: "Others",
    });
    this.orgList = orgList;
  },
  methods: {
    /**
     * Create user
     */
    async register() {
      // Check if policy is accepted
      if (!this.isPolicyAgreed) {
        alert("Policy agreement is required.");
        return;
      }
      this.isLoading = true;
      this.prepareFormData();
      const res = await UserService.register(this.form);
      const data = res.data;
      this.isLoading = false;
      if (data.success == undefined) {
        this.validator(data);
        return;
      }
      alert(data.message);
      if (!data.success) return false;
      this.$router.push("/login");
    },
    /**
     * Prepare form data
     */
    prepareFormData() {
      const orgId = this.organization;
      const org = this.findOrg(orgId);
      /**
       * Prepare data when organization
       * selected is "others", if not,
       * clean up unused variables
       * for registration
       */
      if (orgId == "others") {
        this.form.compid = "others";
        this.form.organization = this.userOrg;
      } else {
        this.form.compid = String(orgId);
        this.form.organization = org.compname;
        this.form.comp_address = "";
        this.form.comp_zip_code = "";
      }
      this.form.bday = toDate(this.bday);
      if (this.showDepartment) {
        this.form.organization += `-${this.department}`;
      }
    },
    /**
     * Find organization from orgList
     */
    findOrg(id) {
      return this.orgList.find((org) => org.compid == id);
    },
    /**
     * Display department on org change
     */
    onOrgChange() {
      const org = this.findOrg(this.organization);
      if (org && org.compdept) {
        const departments = JSON.stringify(org.compdept);
        this.showDepartment = true;
        this.deptList = JSON.parse(departments);
        this.deptList.unshift("Select option");
        this.department = "Select option";
        return;
      }
      this.showDepartment = false;
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
/* Remove up and down button on input fields with number type */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.privacy-policy {
  text-decoration: underline;
  cursor: pointer;
}
</style>
