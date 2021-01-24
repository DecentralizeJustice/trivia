<template>
  <audio ref="player1223" hidden autoplay
    :src="processedUrl" type="audio/mp3" @error='audioError' :muted='audioMuted'>
  </audio>
</template>

<script>
export default {
  components: {
  },
  props: ['audioMuted'],
  data () {
    return {
      player: '',
      processedUrl: ''
    }
  },
  methods: {
    async setup () {
      this.processedUrl = 'https://res.cloudinary.com/dylevfpbl/video/upload/v1611459011/gameshow/shortQuestionMusic.mp3'
    },
    audioError (e) {
      console.log(e.srcElement.error)
    }
  },
  computed: {
  },
  watch: {
    audioMuted: function () {
      this.player.muted = this.audioMuted
    }
  },
  async mounted () {
    this.player = this.$refs.player1223
    this.player.muted = this.audioMuted
    await this.setup()
  }
}
</script>
