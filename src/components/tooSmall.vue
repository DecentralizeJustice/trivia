<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title class="justify-center text-h5" style="background-color:grey;">
      Sorry 😥
    </v-card-title>
    <v-divider/>

    <v-card-text class="text--primary">
      <div>Your Device Is Too Small for the Trivia Show. Please try on a larger device.</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        href="https://guidingwallet.app/triviaInfo"
      >
        What is this?
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'tooSmall',
  components: {
  },
  data: () => ({
  }),
  computed: {
    type: function () {
      if (this.genGameInfo.crypto === 'Bitcoin (BTC)') {
        return 'btcAddress'
      }
      // should not be hit
      return 'btcAddress'
    }
  },
  methods: {
  },
  async beforeMount () {
  }
}
</script>
