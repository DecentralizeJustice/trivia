export const gameInfo = {
  namespaced: true,
  state: {
    gameInfo: {
      addressType: '',
      displayName: '',
      address: ''
    },
    privateId: ''
  },
  mutations: {
    updateInfo (state, info) {
      if (info.displayName) {
        state.gameInfo.displayName = info.displayName
      }
      if (info.address) {
        state.gameInfo.address = info.address
      }
      if (info.addressType) {
        state.gameInfo.addressType = info.addressType
      }
    },
    updatePrivateId (state, privateId) {
      state.privateId = privateId
    }
  },
  actions: {
    updateInfo (context, payload) {
      context.commit('updateInfo', payload)
    },
    updatePrivateId (context, payload) {
      context.commit('updatePrivateId', payload)
    }
  }
}
