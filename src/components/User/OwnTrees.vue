<template>
  <div class="box" style="width: 100%;">
    <div class="field">
      <label class="label">SEARCH</label>
      <div class="control">
        <input class="input" type="text" style="width: 50%" />
      </div>
    </div>

    <GMapMap
      :center="gmapConfig.center"
      :zoom="gmapConfig.zoom"
      :map-type-id="gmapConfig.mapTypeId"
      style="height: calc(100vh - 12rem)"
    >
      <GMapCluster>
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center = m.position"
        />
      </GMapCluster>
    </GMapMap>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      gmapConfig: {
        center: { lat: 0, lng: 0 },
        zoom: 18,
        mapTypeId: "satellite",
      },
      markers: [
        {
          position: { lat: 0, lng: 0 },
        },
      ],
    };
  },
  methods: {
    setCenterPosition(position) {
      this.gmapConfig.center.lat = position.coords.latitude;
      this.gmapConfig.center.lng = position.coords.longitude;
    },
  },
  async created() {
    navigator.geolocation.getCurrentPosition(this.setCenterPosition);
  },
};
</script>
