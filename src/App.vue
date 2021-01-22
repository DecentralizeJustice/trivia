<template>
  <v-app dark>
    <v-app-bar
      dark
      app
      absolute
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://res.cloudinary.com/dylevfpbl/image/upload/v1609472198/guidingLanding/croppedCoin.png"
          transition="scale-transition"
          width="50"
        />
        <div class=" display-4 title">
        Guiding Wallet
      </div>
      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon class="hidden-md-and-up"
      @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <a v-for="(item, index) in opts"
        :key="`${item.title}`"
      :href="item.link" style="text-decoration:none">
      <v-btn
        :color='getNaVColor(item, index)'
        v-bind:class="[buttonObject]"
        Go to Bar
      >
        <span class="">{{item.title}}</span>
        <v-icon right>mdi-{{item.icon}}</v-icon>
      </v-btn>
    </a>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      absolute
      temporary
      dark
    >
      <template v-slot:prepend >
        <v-list>
          <v-list-item
            one-line
          >
            <v-list-item-content>
              <v-list-item-title class="title">Guiding Wallet</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      ><a v-for="item in opts"
        :key="`${item.title}`"
        :href="item.link" style="text-decoration:none">
        <v-list-item
        >
          <v-list-item-icon >
            <v-icon>mdi-{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
      </a>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid fill-height
        align-content='center' justify='center'
        :style="btnStyles"
      >
        <trivia/>
      </v-container>
    </v-main>

      <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="white--text text-center"
      style="background-color: #0B5563;width:100%;"
    >
      <v-card-text>
        <v-btn
          class="mx-4 white--text"
          icon
          href='https://twitter.com/GuidingWallet' link
        >
          <v-icon x-large>
            mdi-twitter
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-4 white--text"
          icon
          href='https://github.com/DecentralizeJustice/GWDesk' link
        >
          <v-icon x-large>
            mdi-github
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Decentralize Justice</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>
import trivia from '@/components/triviaShow.vue'
// const TIMEOUT = 1
// current theme https://coolors.co/beb8eb-5299d3-0b5563-a2bce0-5e5c6c
export default {
  name: 'App',
  components: {
    trivia
  },
  data: () => ({
    buttonObject: 'hidden-sm-and-down mr-2',
    drawer: null,
    currentRoute: 0,
    linkObject: {
      home: 0,
      trivia: 1,
      lessons: 2,
      specificLesson: 2,
      blog: 3,
      pastTrivia: 4,
      faq: 5
    },
    opts: [
      { title: 'Home', icon: 'home', link: 'https://guidingwallet.app/' },
      { title: 'Game Show', icon: 'gamepad-variant', link: '/' },
      { title: 'Lessons', icon: 'book', link: 'https://guidingwallet.app/lessons' },
      { title: 'Blog', icon: 'book-open-outline', link: 'https://guidingwallet.app/blog' },
      { title: 'Past Games', icon: 'calendar-clock', link: 'https://guidingwallet.app/pastTrivia' },
      { title: 'FAQ', icon: 'help-circle', link: 'https://guidingwallet.app/faq' }

      // { title: 'About', icon: 'download', link: '#Download' },
      // { title: 'Blog', icon: 'book-open-outline', link: 'https://guidingwallet.app/blog' },
      // { title: 'Download', icon: 'download', link: '/#Download' }
    ],
    icons: [
      'mdi-twitter'
    ]
  }),
  computed: {
    showDialog: function () {
      return !this.torReady || this.updateAvailable
    },
    btnStyles: function () {
      return {
        'background-image': 'url(https://res.cloudinary.com/dylevfpbl/image/upload/v1611305592/background.jpg)',
        height: '100%',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      }
    }
  },
  mounted () {
    // From testing, without a brief timeout, it won't work.
    // if (this.$route.hash) {
    //   setTimeout(() => this.scrollTo(this.$route.hash), TIMEOUT)
    // }
  },
  methods: {
    getNaVColor: function (item, index) {
      if (index === 1) {
        return 'grey darken-2'
      } else {
        return ''
      }
    }
    // scrollTo: function (hashtag) {
    //   setTimeout(() => { location.href = hashtag }, TIMEOUT) // eslint-disable-line
    // },
    // goToPage: function (index) {
    //   console.log(this.$route)
    //   // this.route.push({ path: this.opts[index].link })
    // }
  },
  watch: {
    // $route (to, from) {
    //   console.log(to)
    //   this.currentRoute = this.linkObject[to.name]
    // }
  }
}
</script>
