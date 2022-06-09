<template>
  <div>
    <div class="box" style="height: calc(100vh - 10rem)">
      <div class="is-flex">
        <div class="card m-4">
          <div class="card-content card-size">
            <div
              class="content is-flex is-flex-direction-column is-justify-content-space-between"
              style="height: 100%"
            >
              <p class="is-size-3">Planted Trees</p>
              <p class="is-align-self-flex-end" style="font-size: 100px;">
                {{ display.userTreeCount }}
              </p>
            </div>
          </div>
        </div>

        <div class="card m-4">
          <div class="card-content card-size">
            <div class="content">
              <p class="is-size-3">Stories</p>
            </div>
          </div>
        </div>

        <div class="card m-4">
          <div class="card-content card-size">
            <div class="content">
              <p class="is-size-3">Videos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeService from "@/services/TreeService";

export default {
  name: "Home",
  data() {
    return {
      display: {
        userTreeCount: 0,
      },
    };
  },
  async mounted() {
    try {
      const res = await TreeService.getUserTreeCounts();
      const data = res.data;

      if (!data.success) return false;
      const [payload] = data.payload;
      this.display.userTreeCount = payload.user_trees_count;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
.card-size {
  min-width: 350px;
  max-height: 250px;
}
</style>
