<template>
  <div>
    <v-card-title class="headline justify-center">
     🎉 Welcome 🎉
    </v-card-title>
    <v-divider/>
    <vid
    class='pa-5'
    v-bind:audioMuted='audioMuted'
    v-bind:audioFiles='audioFiles'
    v-bind:encrypted='encrypted'
    v-bind:mediaInfo='specificMediaInfo'
    v-bind:password='password'
    v-if='password'/>
    <v-row no-gutters align-content='center' justify='center' class="mt-4">
      <v-col cols='6' class="mb-5">
      <div class="mb-3 text-h6">Human Verfication In:</div>
      <v-progress-linear
        color="light-blue"
        height="10"
        :value="value"
        striped
      ></v-progress-linear>
    </v-col>
    </v-row>
  </div>
</template>

<script>
import vid from '@/components/gameShow/encryptedVideoPlayer.vue'
import { get } from '@/assets/util/axios.js'
export default {
  name: 'intro',
  props: ['genInfo', 'currentTime', 'audioMuted', 'mediaInfo', 'encrypted',
    'old', 'pastGameInfo'],
  components: {
    vid
  },
  data: () => ({
    passwordInfo: {}
  }),
  computed: {
    specificMediaInfo: function () {
      return this.mediaInfo.intro
    },
    audioFiles: function () {
      const intro = this.mediaInfo.intro
      return { audio: intro.audio, imgFiles: intro.img }
    },
    startTime: function () {
      return parseInt(this.genInfo.startEpochTime) * 1000
    },
    introLength: function () {
      return parseInt(this.genInfo.intro.length) * 1000
    },
    endTime: function () {
      return this.startTime + this.introLength
    },
    value: function () {
      const topFract = this.currentTime - this.startTime
      const bottomFract = this.endTime - this.startTime
      const value = (topFract / bottomFract) * 100
      return value
    },
    password: function () {
      if (this.passwordInfo.intro === undefined) {
        return false
      }
      if (this.passwordInfo.intro.password !== undefined) {
        return this.passwordInfo.intro.password
      }
      return false
    }
  },
  methods: {
    getPassword: async function () {
      function sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      if (!this.old) {
        const url = this.genInfo.getApi
        const result = await get(url)
        const waitTime = parseFloat(this.genInfo.waitTime) * 1000
        const info = result.data.info
        const correctInfoReady = info !== undefined && info.intro !== undefined && info.intro.password !== undefined
        if (!correctInfoReady) {
          console.log(correctInfoReady)
          console.log(info)
          console.log(info.intro)
          console.log(info.intro.password)
          console.log('waiting')
          await sleep(waitTime)
          this.getPassword()
        }
        this.passwordInfo = result.data.info
      } else {
        this.passwordInfo = this.pastGameInfo
      }
    }
  },
  watch: {
  },
  async mounted () {
  },
  async created () {
    await this.getPassword()
  }
}
</script>
