<template>
  <div style="width:100%;" class="my-7">
    <v-row no-gutters align-content='center' justify='center'>
    <home
    v-if='!dialog'
    v-bind:old='old'
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

    <question
    v-bind:type='type'
    v-bind:old='old'
    v-bind:userIdInfo='gameInfo'
    v-if='dialog && showGame'
    v-bind:questions='questions'
    v-bind:encrypted='true'
    v-bind:mediaInfo='mediaInfo'
    v-bind:dev='dev'
    v-bind:privateId='privateId'
    v-bind:genInfo='genGameInfo'
    v-on:exit="exitGame"
    v-bind:pastGameInfo='pastGameInfo'
    style='overflow:hidden;'/>
    </v-dialog>
  </div>
</template>

<script>
import home from '@/components/gameShow/home.vue'
import question from '@/components/gameShow/question.vue'
import gameInformation from '@/assets/gameShow/gameInfo.js'
import mediaInfoJson from '@/assets/gameShow/mediaInfo.json'
import encryptedQuestions from '@/assets/gameShow/encryptedQuestions.json'
import pastGameInfo from '@/assets/pastGame.js'
import { secretbox, randomBytes } from 'tweetnacl'
import {
  encodeBase64
} from 'tweetnacl-util'
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
axios.defaults.withCredentials = false
axios.defaults.timeout = 60000
export default {
  name: 'triviaShow',
  components: {
    home,
    question
  },
  data: () => ({
    dev: true,
    old: true,
    oldStarTime: 2,
    showGame: false,
    questions: {},
    mediaInfo: {},
    dialog: false,
    showRules: false,
    genGameInfo: gameInformation.default
  }),
  computed: {
    pastGameInfo: function () {
      return JSON.parse(pastGameInfo)
    },
    ...mapState('gameInfo', [
      'gameInfo', 'privateId'
    ]),
    type: function () {
      if (this.genGameInfo.crypto === 'Bitcoin (BTC)') {
        return 'btcAddress'
      }
      // should not be hit
      return 'btcAddress'
    },
    fileLink: function () {
      return this.genGameInfo.fileLink
    }
  },
  methods: {
    ...mapActions('gameInfo',
      ['updateInfo', 'updatePrivateId']
    ),
    setQuestions: async function () {
      const info = encryptedQuestions
      this.questions = info.questions
    },
    creatBlobLink: async function (file) {
      const response = await axios({
        url: this.fileLink + file,
        method: 'GET',
        responseType: 'blob'
      })
      const url = await window.URL.createObjectURL(new Blob([response.data], {type: "application/json"})) // eslint-disable-line
      return url
    },
    setMediaInfo: async function () {
      await this.encryptedSetHv(mediaInfoJson)
      await this.encryptedSetIntro(mediaInfoJson, 'intro')
      await this.encryptedSetIntro(mediaInfoJson, 'outro')
      await this.encryptedQuestions(mediaInfoJson, parseInt(this.genGameInfo.numberOfQuestions))
    },
    encryptedSetHv: async function (mediaInfo) {
      this.mediaInfo.hv = {}
      const audio = await this.creatBlobLink('hvMediaAudio.json')
      this.mediaInfo.hv.audio = audio
      const imgArray = []
      for (var i = 0; i < mediaInfo.hv.img.length; i++) {
        const img = await this.creatBlobLink(`hvMediaImg${i}.json`)
        imgArray.push(img)
      }
      this.mediaInfo.hv.imgs = imgArray
      this.mediaInfo.hv.slideTiming = mediaInfo.hv.slideTiming
    },
    encryptedSetIntro: async function (mediaInfo, type) {
      this.mediaInfo[type] = {}
      this.mediaInfo[type].audio = await this.creatBlobLink(`${type}Audio.json`)
      const imgArray = []
      for (var i = 0; i < mediaInfo[type].img.length; i++) {
        const img = await this.creatBlobLink(`${type}Img${i}.json`)
        imgArray.push(img)
      }
      this.mediaInfo[type].img = imgArray
      this.mediaInfo[type].slideTiming = mediaInfo[type].slideTiming
    },
    encryptedQuestions: async function (info, numberOfQuestions) {
      for (var i = 1; i < numberOfQuestions + 1; i++) {
        const audio = await this.creatBlobLink(`questionMediaAudio${i}.json`)
        const imgArray = []
        for (var y = 0; y < info[i].img.length; y++) {
          const img = await this.creatBlobLink(`questionMediaImg${i}-${y}.json`)
          imgArray.push(img)
        }
        this.mediaInfo[i] = {}
        this.mediaInfo[i].audio = audio
        this.mediaInfo[i].imgs = imgArray
        this.mediaInfo[i].slideTiming = info[i].slideTiming
      }
    },
    exitGame: function () {
      this.unsetOldGame()
      this.dialog = false
      this.showGame = false
    },
    setOldGame: function functionName () {
      const target = {}
      Object.assign(target, gameInformation.default)
      target.startEpochTime = Math.round(Date.now() / 1000)
      target.postApi = ''
      this.genGameInfo = target
    },
    unsetOldGame: function functionName () {
      this.genGameInfo = gameInformation.default
    },
    readyToStart: function () {
      if (this.old) {
        this.setOldGame()
      }
      this.showGame = true
      this.dialog = true
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
    this.handlePrivateId()
    await this.setQuestions()
    this.setMediaInfo()
  }
}
</script>
