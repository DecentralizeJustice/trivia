<template>
  <div>
    <v-card-title class="headline justify-center">
    Pre-Show
    </v-card-title>
    <v-divider/>
    <v-row no-gutters justify='center' align='center' class="my-2">
      <v-col cols='9' style='text-align: center'>
        <v-img
        class=""
          :src="currentSlide"
        ></v-img>
      </v-col>
    </v-row>
    <audio1 v-bind:audioMuted='audioMuted'/>
    <v-row no-gutters align-content='center' class="text-center" align="center"
      justify="space-around" >
      <v-col
        cols="4"
        align-content='center'
        align='center'
      >
      <div>
        <v-alert
          prominent
          color="#2A3B4D"
          icon="mdi-av-timer"
        >
        <v-row no-gutters align-content='center' justify='space-around' class="">
          <!-- <v-col
            cols="12"
          >
            <div class="mt-2 text-h5">
              Show Starts In:
            </div>
          </v-col> -->
          <v-col
            cols="5"
          >
            <div class="mt-2 text-h5" >
              {{tillShowTimeMinutes}} <br> <p class="ma-0 pa-0 text-subtitle-1">Minutes</p>
            </div>
          </v-col>
          <v-col
            cols="3"
          >
            <div class="mt-2 text-h5" >
              {{tillShowTimeSeconds}} <br> <p class="ma-0 pa-0 text-subtitle-1">Seconds</p>
            </div>
          </v-col>
          </v-row>
            </v-alert>
          </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import audio1 from '@/components/gameShow/preGameMusic.vue'
export default {
  name: 'pregame',
  props: ['genInfo', 'currentTime', 'audioMuted'],
  components: {
    audio1
  },
  data: () => ({
    slides:
    ['https://res.cloudinary.com/dylevfpbl/image/upload/v1611440241/gameshow/pregame/slide1.jpg',
      'https://res.cloudinary.com/dylevfpbl/image/upload/v1611440242/gameshow/pregame/slide2.jpg'
    ]
  }),
  computed: {
    currentSlide: function () {
      if (parseInt(this.tillShowTimeMinutes) < 1) {
        return this.slides[1]
      }
      return this.slides[0]
    },
    tillShowTimeMinutes: function () {
      const distance = this.startTime - this.currentTime
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      return minutes
    },
    tillShowTimeSeconds: function () {
      const distance = this.startTime - this.currentTime
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      return seconds
    },
    startTime: function () {
      return parseInt(this.genInfo.startEpochTime) * 1000
    }
  },
  methods: {
  },
  watch: {
  },
  async mounted () {
  },
  async created () {
  }
}
</script>
