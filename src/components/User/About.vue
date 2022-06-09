<template>
  <div>
    <div class="box">
      <span class="label is-size-3 has-text-centered">ABOUT</span>
      <span class="label is-size-4 has-text-centered">TOTAL TREES PLANTED</span>
      <p class="has-text-centered is-size-1">{{ total.display }}</p>
      <div class="columns is-flex is-centered">
        <div
          class="column is-flex is-flex-direction-column is-align-items-center"
        >
          <div>
            <img
              src="@/assets/img/about_fruit_bearing.png"
              alt=""
              style="max-height: 250px;"
            />
          </div>
          <p class="has-text-centered is-size-5">Fruit-Bearing</p>
          <p class="has-text-centered is-size-1">{{ fruit_bearing.display }}</p>
        </div>
        <div
          class="column is-flex is-flex-direction-column is-align-items-center"
        >
          <div>
            <img
              src="@/assets/img/about_non_bearing.png"
              alt=""
              style="max-height: 250px;"
            />
          </div>
          <div>
            <p class="has-text-centered is-size-5">Non-Bearing</p>
            <p class="has-text-centered is-size-1">
              {{ non_bearing.display }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <span class="label is-size-3 has-text-centered"
          >The Central Tree Bank Advocacy</span
        >
        <p class="has-text-justified p-5">
          &emsp; &emsp; The <b>Central Tree Bank</b> is an expansion of the
          “environmental bank advocacy” of the owner’s Green Philippines
          Initiative is set to be inaugurated this month of July 2021. It was
          conceptualized to help monitor the planting of trees particularly to
          document the implementation of the National Greening Program and
          compliance with the Legacy Act and the NSTP provision which requires
          students to plant a mandated number of trees.
          <br />
          <br />
          &emsp; &emsp; The Pipit App is the tool for Central Tree Banking which
          serves as the “ATM Card and Passbook” for tree banking. The concept of
          tree planting is likened to “banking” – when you deposit, in this case
          planting a tree, your money grows in the bank, by using the Pipit App,
          it ensures that trees grow and mature. In the bank, you earn interest
          while in Tree Banking you the trees you planted earn green credits –
          by offsetting carbon in the atmosphere.
          <br />
          <br />
          &emsp; &emsp; The “tree banking system” allows Pipit App users not
          just to plant a tree but to grow them. Schools or even companies can
          monitor the compliance of students and employees not only with the
          legal and statutory requirements but also their responsibility as
          citizens to help reduce carbon footprints.
          <br />
          <br />
          <b>
            &emsp; &emsp; Tree planting helps offset carbon footprint, combat
            climate change and give back to a planet that gives so much.
          </b>
          <br />
          <br />
          &emsp; &emsp; The Expanded Tree Banking project opens accounts and
          membership to external parties and the community, those who commit to
          reducing carbon dioxide in the air which causes adverse climate
          change.
          <br />
          <br />
          &emsp; &emsp; The <b>Central Tree Bank</b> has two methods of banking.
          One is the “SeedBanking” which is focused on keeping and growing baby
          trees for tree-banking”. This is actually about the establishment of
          as many “nurseries” for the propagation of trees intended for
          planting.
          <br />
          <br />
          &emsp; &emsp; It aims to encourage schools to have their respective
          “SeedBank Branches” to support the provision of baby trees to our
          “TreeSavers Club” members. The second method is the creation of
          TreeBank Vault where geotagged data, videos, and pictures are stored -
          a database is established in a digital vault. The TreeBank also uses a
          system that monitors the condition of the trees and schedules
          monitoring (cleaning, nurturing, and replanting).
          <br />
          <br />
          &emsp; &emsp; <b>Central Tree Bank</b> is designed not only to create
          compliance with Republic Act No. 10176, otherwise known as the Arbor
          Day Act of 2012, which provides that “All able-bodied citizens of the
          Philippines, who are at least twelve (12) years of age, shall be
          required to plant one (1) tree every year. “ but also as an act of
          support to Executive Order No. 193, series of 2015 entitled “Expanding
          the Coverage of the National Greening Program” (ENGP). To encourage
          and widen the support-base of this project and attract the awareness
          of the youth, a blog type The Tree Stories contest will be soon
          launched.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import TreeService from "@/services/TreeService";

export default {
  name: "About",
  data() {
    return {
      non_bearing: {
        display: 0,
        internal: 0,
        interval: false,
      },
      fruit_bearing: {
        display: 0,
        internal: 0,
        interval: false,
      },
      total: {
        display: 0,
        internal: 0,
        interval: false,
      },
    };
  },
  async mounted() {
    try {
      const res = await TreeService.getTreeCounts();
      const data = res.data;
      if (!data.success) return false;

      const { total, non_bearing, fruit_bearing } = {
        ...data.payload.count[0],
      };
      this.non_bearing.internal = non_bearing;
      this.fruit_bearing.internal = fruit_bearing;
      this.total.internal = total;
    } catch (err) {
      console.log(err);
    }
  },
  watch: {
    "non_bearing.internal"() {
      this.animateCount(this.non_bearing);
    },
    "fruit_bearing.internal"() {
      this.animateCount(this.fruit_bearing);
    },
    "total.internal"() {
      this.animateCount(this.total);
    },
  },
  methods: {
    // Animate number count for display
    animateCount(countInfo) {
      clearInterval(countInfo.interval);
      if (countInfo.internal == countInfo.display) return;
      countInfo.interval = window.setInterval(() => {
        if (countInfo.display != countInfo.internal) {
          let change = (countInfo.internal - countInfo.display) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          countInfo.display = countInfo.display + change;
        }
      }, 30);
    },
  },
};
</script>
