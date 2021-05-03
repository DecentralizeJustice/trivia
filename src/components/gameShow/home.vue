<template>
    <v-col
      cols="10"
    >
    <v-card class="" >
      <v-card-title class="headline justify-center">
      Crypto Trivia Show 🧐
      </v-card-title>
      <v-divider></v-divider>
      <v-row no-gutters align-content='center' justify='space-around' class="pa-5">
        <v-col
          cols="4"
        >
        <v-card class="" color='grey darken-3'>
          <v-card-title class="headline justify-center">
            General Info
          </v-card-title>
          <v-divider/>
          <v-col  cols='12'>
          <v-card-text style="">
            <div class="" style="font-size: large;">
              Winning Pot Amount: {{genInfo.amountUSD}} USD
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large color="blue lighten-1">
                   mdi-cash-usd
                 </v-icon>
               </v-col>
             </v-row>
            </div>
            <!-- <div class="" style="font-size: large;">
              Donation Amount: {{genInfo.donatationAmountUSD}} USD
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large color="blue lighten-1">
                   mdi-gift-outline
                 </v-icon>
               </v-col>
             </v-row>
            </div> -->
            <!-- <div class="" style="font-size: large;">
              Max Win Amount: {{maxWinUSD}} USD
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large color="blue lighten-1">
                   mdi-currency-usd-off
                 </v-icon>
               </v-col>
             </v-row>
            </div> -->
            <div class="mt-2" style="font-size: large;" v-if='!hideTimer'>
              Next Gameshow: {{regularTime}}
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large color="blue lighten-1">
                   mdi-av-timer
                 </v-icon>
               </v-col>
             </v-row>
            </div>

            <div class="mt-2" style="font-size: large;">
              Trivia Subject: {{genInfo.subject}}
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large color="blue lighten-1">
                   mdi-library-books
                 </v-icon>
               </v-col>
             </v-row>
            </div>
            <v-row
              align="center"
              justify="center"
            >
              <v-btn
              href="https://guidingwallet.app/triviaInfo"
                color="orange accent-4"
                class="mt-4"
              >
                Get More Info
              </v-btn>
            </v-row>
          </v-card-text>
          </v-col>
        </v-card>
        </v-col>
        <v-col
          cols="6"
        >
        <v-card class="" color='grey darken-2'>
          <v-card-title class="headline justify-center">
            Your Info
          </v-card-title>
          <v-divider/>
          <v-col  cols='12'>
              <v-row justify="space-around">
                <v-col cols='4'>
                  <div class="text-center text-h6" >
                    Your Winnings Crypto:
                  <v-select
                    :items="coinChoices"
                    v-model="selectedCoin"
                    solo
                    @change='updateAddressType'
                    class="mt-2"
                  ></v-select>
                    <v-img
                      :src="coinImg"
                    ></v-img>
                  </div>
                </v-col>
                <v-col cols='5'>
              <div class="text-center text-h6" >
                Your {{selectedCoin}} Address:
                <div v-if='!settingAddress' class="text-left mt-1 text-body-1"
                >
                  {{userIdInfo.address}}
                </div>
                <v-row v-if='settingAddress'>
                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      v-model="addressValue"
                      color="black"
                      background-color="black"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="mt-3"
                >
                  <v-btn
                  v-if='!settingAddress && !addressReady'
                  @click='setAddress'
                    color="warning"
                    class="ma-2"
                  >
                    Set Address
                  </v-btn>
                  <v-btn
                  v-if='!settingAddress && addressReady'
                  @click='setAddress'
                    color="red"
                    class="ma-2"
                  >
                    Edit Address
                  </v-btn>
                  <v-btn
                  v-if='settingAddress'
                  @click='confirmAddress(addressValue)'
                    color="green"
                    class=""
                  >
                    Confirm Address
                  </v-btn>
                </v-row>
              </div>
            </v-col>
            <v-col cols='6' class="text-center text-h6">
              Display Name:
              <div class="text-center mt-3 text-h5" v-if='!settingDisplayName'>
                {{userIdInfo.displayName}}
              </div>
              <v-row v-if='settingDisplayName'>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="displayNameValue"
                    color="black"
                    background-color='black'
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row
                align="center"
                justify="center"
                class="mt-3"
              >
                <v-btn
                v-if='!settingDisplayName && !displayNameReady'
                @click='setDisplayName'
                  color="warning"
                  class="ma-2"
                >
                  Set Display Name
                </v-btn>
                <v-btn
                v-if='!settingDisplayName && displayNameReady'
                @click='setDisplayName'
                  color="red"
                  class="ma-2"
                >
                  Edit Display Name
                </v-btn>
                <v-btn
                v-if='settingDisplayName'
                @click='confirmDisplayName(displayNameValue)'
                  color="green"
                >
                  Confirm Display Name
                </v-btn>
              </v-row>
            </v-col>
            </v-row>
                <v-row justify='center' class="">
                 <v-col cols='8'  class="justify-center text-center" v-if='allInfoSet'>
                   <v-alert
                      type="success"
                      border="left"
                      class="text-center"
                    >
                      Your All Set!!
                    </v-alert>
                 </v-col>
                 <v-col cols='12'  class="" v-if='!allInfoSet'>
                   <v-alert
                      v-if='!addressReady'
                      dense
                      border="left"
                      type="warning"
                      class="text-center"
                    >
                      <div class="text-center text-h6" >
                        You need to set your address!</div>
                      <!-- <v-btn
                      @click='goToRoute'
                        color="primary"
                        class="mt-4"
                      >
                        How To Get Monero Address
                      </v-btn> -->
                    </v-alert>
                    <v-alert
                        v-if='addressReady && !displayNameReady'
                       dense
                       border="left"
                       type="warning"
                       class="text-center"
                     >
                       <div class="text-center text-h6" >
                         You need to set your Display Name!</div>
                     </v-alert>
                 </v-col>
               </v-row>
          </v-col>
        </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters align-content='center' class="text-center" v-if='!ready || !hideTimer' align="center"
        justify="space-around" >
        <v-col
          cols="5"
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
            <v-col
              cols="3"
            >
          <div class="mt-2" style="font-size: large;">
            {{tillShowTime.days}} <br> Days
          </div>
        </v-col>
        <v-col
          cols="3"
        >
          <div class="mt-2" style="font-size: large;">
            {{tillShowTime.hours}} <br> Hours
          </div>
        </v-col>
        <v-col
          cols="3"
        >
          <div class="mt-2" style="font-size: large;">
            {{tillShowTime.minutes}} <br> Minutes
          </div>
        </v-col>
        <v-col
          cols="3"
        >
          <div class="mt-2" style="font-size: large;">
            {{tillShowTime.seconds}} <br> Seconds
          </div>
        </v-col>
        </v-row>
          </v-alert>
        </div>
        </v-col>
        <v-col
          cols="4"
          align-content='center'
          align='center'
        >
        <div>
          <v-alert
            prominent
            type="warning"
          >
            <v-row align="center">
              <v-col class="text-left">
                Get Here Early, we start right on time.
              </v-col>
            </v-row>
          </v-alert>
        </div>
        </v-col>
      </v-row>
      <v-row
        align="center"
        justify="center"
        v-if='ready && !showOver'
      >
        <v-btn
          @click.stop='start'
          color="primary"
          class="mb-5"
        >
          {{startButtonText}}
        </v-btn>
      </v-row>
      <v-divider/>
      <v-card-actions>
      <v-btn
      href="https://guidingwallet.app/triviaInfo"
        color="orange"
        text
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-card-actions>
    </v-card>
    </v-col>
</template>

<script>
import { get } from '@/assets/util/axios.js'
import btcImg from '@/assets/cryptoCoins/btc.png'
import moneroImg from '@/assets/cryptoCoins/monero.png'
import ethImg from '@/assets/cryptoCoins/ethereum.png'
export default {
  name: 'home',
  props: ['userIdInfo', 'dev', 'genInfo'],
  components: {
  },
  data: () => ({
    difference: 3000000,
    selectedCoin: '',
    coinChoices: ['Bitcoin', 'Monero', 'Ethereum'],
    settingAddress: false,
    addressValue: '',
    settingDisplayName: false,
    displayNameValue: '',
    oneHour: (3600 * 1000),
    hideTimer: false
  }),
  computed: {
    coinImg: function () {
      if (this.selectedCoin === 'Monero') {
        return moneroImg
      }
      if (this.selectedCoin === 'Ethereum') {
        return ethImg
      }
      return btcImg
    },
    startButtonText: function () {
      if (this.dev) {
        return 'Play Last Trivia Show'
      } else {
        return 'Start Show'
      }
    },
    addressReady: function () {
      return this.addressValue.length !== 0
    },
    displayNameReady: function () {
      return this.displayNameValue.length !== 0
    },
    introLength: function () {
      return parseInt(this.genInfo.intro.length) * 1000
    },
    outroLength: function () {
      return parseInt(this.genInfo.outro.length) * 1000
    },
    allQuestionsLength: function () {
      return (parseInt(this.genInfo.timeToAnswerGenQuestion) +
       parseInt(this.genInfo.explantionTime)) *
        1000 *
        parseInt(this.genInfo.numberOfQuestions)
    },
    showOver: function functionName () {
      if (this.currentTime > (this.startTime + this.oneHour)) {
        return true
      }
      return false
    },
    startTime: function () {
      return parseInt(this.genInfo.startEpochTime) * 1000
    },
    allInfoSet: function () {
      const infoReady =
      (this.userIdInfo.displayName !== '' && this.userIdInfo.address !== '')
      if (infoReady) {
        return true
      }
      return false
    },
    tillShowTime: function () {
      const distance = this.difference
      if (this.difference < 0) {

      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      return {
        days, hours, minutes, seconds
      }
    },
    ready: function () {
      const pregameTime = 120000
      const timeReady = (this.difference - pregameTime < 0) && (Date.now() < this.startTime + this.oneHour)
      const infoReady = this.allInfoSet
      if ((timeReady && infoReady) || this.dev) {
        return true
      } else {
        return false
      }
    },
    regularTime: function () {
      const d = new Date(this.startTime)
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const month = months[d.getMonth()]
      const day = d.getDate()
      let hour = d.getHours()
      const ampm = hour >= 12 ? 'p.m.' : 'a.m.'
      hour = hour % 12
      if (hour === 0) {
        hour = 12
      }
      let minutes = d.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      return hour + ':' + minutes + ' ' + ampm + ' ' + month + ' ' + day
    }
  },
  methods: {
    updateAddressType (capCoin) {
      const chosenCoin = capCoin.toLowerCase()
      this.$emit('updateAddressType', chosenCoin)
    },
    setAddress () {
      this.settingAddress = true
    },
    setDisplayName () {
      this.settingDisplayName = true
    },
    confirmAddress (address) {
      this.settingAddress = false
      const cleanAddress = address.replace(/\s+/g, '')
      this.addressValue = address
      this.$emit('updateAddress', cleanAddress)
    },
    confirmDisplayName (displayName) {
      this.settingDisplayName = false
      this.displayNameValue = displayName
      this.$emit('updateDisplayName', displayName)
    },
    start () {
      this.$emit('readyToStart')
    },
    countDownTimer () {
      const current = Date.now()
      if (current > this.startTime + this.oneHour) {
        this.hideTimer = true
        // setTimeout(() => {
        //   const next = this.genInfo.default.nextShow * 1000
        //   this.difference = next - current
        //   this.countDownTimer()
        // }, 1000)
      } else {
        setTimeout(() => {
          this.difference = this.startTime - current
          this.countDownTimer()
        }, 1000)
      }
    },
    testSpeed: async function () {
      const sendTime = Date.now()
      const url = this.genInfo.getApi
      const result = await get(url)
      const serverTime = result.data.time
      console.log('lag:', serverTime - sendTime, ' ms')
    }
  },
  watch: {
  },
  async mounted () {
    this.addressValue = this.userIdInfo.address
    this.displayNameValue = this.userIdInfo.displayName
    if (this.userIdInfo.addressType === '') {
      const randNum = Math.floor(Math.random() * Math.floor(this.coinChoices.length))
      this.selectedCoin = this.coinChoices[randNum]
      this.updateAddressType(this.coinChoices[randNum])
    } else {
      this.selectedCoin = this.userIdInfo.addressType.charAt(0).toUpperCase() + this.userIdInfo.addressType.slice(1)
    }
    this.countDownTimer()
  }
}
</script>
