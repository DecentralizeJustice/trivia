<template>
  <div style="width:100%;" class="my-7">
    <v-row no-gutters align-content='center' justify='center'>
    <home
    v-if='!dialog'
    v-bind:userIdInfo='gameInfo'
    v-bind:dev='dev'
    @readyToStart='readyToStart()'
    @showRules='showRulesFunc()'
    v-on:updateAddress='updateAddress'
    v-on:updateUserIDInfo='updateUserIDInfo'
    v-bind:genInfo='genGameInfo'
    v-bind:privateId='privateId'
    v-bind:type='type'
    />
      </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity='1'
      overlay-color='#2A3B4D'
      width="80%"
      style="dialog"
    >

    <!-- <question
    v-bind:type='type'
    v-bind:userIdInfo='gameInfo'
    v-if='dialog && showGame'
    v-bind:questions='questions'
    v-bind:encrypted='true'
    v-bind:mediaInfo='mediaInfo'
    v-bind:dev='dev'
    v-bind:privateId='privateId'
    v-bind:genInfo='genGameInfo'
    v-on:exit="exitGame"
    style='overflow:hidden;'/> -->

    <rules v-if='dialog && showRules'
    v-on:exit='exitRules'/>

    </v-dialog>
  </div>
</template>

<script>
import home from '@/components/gameShow/home.vue'
// import question from '@/components/gameShow/question.vue'
import gameInfo from '@/assets/gameShow/gameInfo.js'
import rules from '@/components/gameShow/rules.vue'
import { secretbox, randomBytes } from 'tweetnacl'
import {
  encodeBase64
} from 'tweetnacl-util'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'triviaShow',
  components: {
    home,
    // question,
    rules
  },
  data: () => ({
    dev: false,
    showGame: false,
    questions: {},
    mediaInfo: {},
    dialog: false,
    showRules: false
  }),
  computed: {
    ...mapState('gameInfo', [
      'gameInfo', 'privateId'
    ]),
    genGameInfo: function () {
      return gameInfo.default
    },
    type: function () {
      if (this.genGameInfo.crypto === 'Bitcoin (BTC)') {
        return 'btcAddress'
      }
      // should not be hit
      return 'btcAddress'
    }
  },
  methods: {
    ...mapActions('gameInfo',
      ['updateInfo', 'updatePrivateId']
    ),
    setQuestions: async function () {
      const info = await import('../assets/gameShow/output/encryptedQuestions.json')
      this.questions = info.questions
    },
    setMediaInfo: async function () {
      // const mediaInfoJson = await import('../assets/gameShow/output/mediaInfo.json')
      // const mediaInfo = mediaInfoJson.default
      // await this.encryptedSetHv(mediaInfo)
      // await this.encryptedSetIntro(mediaInfo, 'intro')
      // await this.encryptedSetIntro(mediaInfo, 'outro')
      // await this.encryptedQuestions(mediaInfo, parseInt(this.genGameInfo.numberOfQuestions))
    },
    encryptedSetHv: async function (mediaInfo) {
      // this.mediaInfo.hv = {}
      // const audio = await import('../assets/gameShow/output/hvMediaAudio.json')
      // this.mediaInfo.hv.audio = audio.default
      // const imgArray = []
      // for (var i = 0; i < mediaInfo.hv.img.length; i++) {
      //   const img = await import(`../assets/gameShow/output/hvMediaImg${i}.json`)
      //   imgArray.push(img.default)
      // }
      // this.mediaInfo.hv.imgs = imgArray
      // this.mediaInfo.hv.slideTiming = mediaInfo.hv.slideTiming
    },
    encryptedSetIntro: async function (mediaInfo, type) {
      // this.mediaInfo[type] = {}
      // const audio = await import(`../assets/gameShow/output/${type}Audio.json`)
      // this.mediaInfo[type].audio = audio.default
      // const imgArray = []
      // for (var i = 0; i < mediaInfo[type].img.length; i++) {
      //   const img = await import(`../assets/gameShow/output/${type}Img${i}.json`)
      //   imgArray.push(img.default)
      // }
      // this.mediaInfo[type].img = imgArray
      // this.mediaInfo[type].slideTiming = mediaInfo[type].slideTiming
    },
    encryptedQuestions: async function (info, numberOfQuestions) {
      // for (var i = 1; i < numberOfQuestions + 1; i++) {
      //   const audio = await import(`../assets/gameShow/output/questionMediaAudio${i}.json`)
      //   const imgArray = []
      //   for (var y = 0; y < info[i].img.length; y++) {
      //     const img = await import(`../assets/gameShow/output/questionMediaImg${i}-${y}.json`)
      //     imgArray.push(img.default)
      //   }
      //   this.mediaInfo[i] = {}
      //   this.mediaInfo[i].audio = audio.default
      //   this.mediaInfo[i].imgs = imgArray
      //   this.mediaInfo[i].slideTiming = info[i].slideTiming
      // }
    },
    exitGame: function () {
      this.dialog = false
      this.showGame = false
    },
    readyToStart: function () {
      this.showGame = true
      this.dialog = true
    },
    showRulesFunc: function () {
      this.showRules = true
      this.dialog = true
    },
    exitRules: function () {
      this.dialog = false
      this.showRules = false
    },
    updateAddress: function (address) {
      this.gameInfo[this.type] = address
      this.updateInfo({ type: address })
    },
    updateUserIDInfo: function (infoObject) {
      this.updateInfo({ emoji: infoObject.emoji, adjective: infoObject.adjective })
    },
    handlePrivateId: function () {
      if (this.privateId === '') {
        const generateKey = () => encodeBase64(randomBytes(secretbox.keyLength))
        const key = generateKey()
        this.updatePrivateId(key)
      }
    }
  },
  async beforeMount () {
    console.log(this.privateId)
    this.handlePrivateId()
    // await this.setQuestions()
    // await this.setMediaInfo()
  }
}
</script>
