<template>
  <div>
    <div class="box" style="width: 50%">
      <span class="label is-size-4">DONATE</span>

      <div class="field">
        <div class="columns">
          <div class="column is-4">
            <span class="has-text-weight-bold">
              INSTRUCTION:
            </span>
          </div>
          <div class="column">
            <p>You can send your donation via:</p>
            <p>GCASH: 09997024326</p>
            <p>PAYPAL: 09XXXXXXXXX or</p>
            <p>or through COLLEGE CASHIER</p>
          </div>
        </div>
      </div>

      <div class="field">
        Save your transaction (through screenshot or any tool to capture). Once
        transacted, please fill all the fields below:
      </div>

      <div class="field">
        <label class="label">Donation Center</label>
        <div class="select is-primary">
          <select v-model="form.payment_center">
            <option>GCASH</option>
            <option>SMART PADALA</option>
            <option>PAYPAL</option>
            <option>PAYMAYA</option>
            <option>WESTERN UNION</option>
            <option>COLLEGE CASHIER</option>
          </select>
        </div>
        <p class="help is-danger" v-show="!validate.payment_center.isValid">
          {{ validate.payment_center.msg }}
        </p>
      </div>

      <div class="field">
        <label class="label">Amount Donated</label>
        <div class="control">
          <input class="input" type="text" v-model="form.amount" />
        </div>
        <p class="help is-danger" v-show="!validate.amount.isValid">
          {{ validate.amount.msg }}
        </p>
      </div>

      <div class="field">
        <label class="label">Billing/ Reference No.</label>
        <div class="control">
          <input class="input" type="text" v-model="form.reference_no" />
        </div>
        <p class="help is-danger" v-show="!validate.reference_no.isValid">
          {{ validate.reference_no.msg }}
        </p>
      </div>

      <div :class="{ 'm-5': previewImage }">
        <figure class="image">
          <img :src="previewImage" />
        </figure>
      </div>

      <div class="field">
        <div class="file is-boxed is-fullwidth">
          <label class="file-label">
            <input class="file-input" type="file" @change="onFileUpload" />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fa fa-upload"></i>
              </span>
              <span class="file-label" style="text-align: center">
                Upload Proof of Donation (screenshot or photo)
              </span>
            </span>
          </label>
        </div>
        <p class="help is-danger" v-show="!validate.proof_donation.isValid">
          {{ validate.proof_donation.msg }}
        </p>
      </div>

      <div class="field">
        <button
          class="button is-primary"
          :class="{ 'is-loading': isLoading }"
          @click="donate"
        >
          Donate
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DonationService from "@/services/DonationService";
import validateMixin from "@/mixins/validateMixins";
import fileMixin from "@/mixins/fileMixins";

export default {
  name: "Donation",
  mixins: [validateMixin, fileMixin],
  data() {
    return {
      form: {
        payment_center: "GCASH",
        proof_donation: "",
        reference_no: "",
        amount: 0,
      },
      previewImage: "",
      isLoading: false,
      validate: {
        payment_center: { isValid: false, msg: "" },
        proof_donation: { isValid: false, msg: "" },
        reference_no: { isValid: false, msg: "" },
        amount: { isValid: false, msg: "" },
      },
    };
  },
  methods: {
    /**
     * Handle file upload of donation
     * Show preview image
     */
    onFileUpload(e) {
      this.handleFile(e, (file) => {
        const res = file.target.result;
        this.form.proof_donation = res;
        this.previewImage = res;
      });
    },
    /**
     * Process donation
     */
    async donate() {
      this.isLoading = true;
      const res = await DonationService.donate(this.form);
      const data = res.data;
      this.isLoading = false;
      if (data.success == undefined) {
        this.validator(data);
        return;
      }
      alert(data.message);
      this.$router.go(0);
    },
  },
};
</script>
