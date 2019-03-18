module.exports = {
  servers: [],
  Discord_Options: {
    version: 'v1.3.0',
    users: 0,
    updatePending: false,
    modules: {
      Admin: true,
      Economy: true,
      Fun: true,
      GameStats: true,
      Info: true,
      Music: true
    }
  },
  Twitch_Options: {
    options: {
      debug: false
    },
    connection: {
      cluster: 'aws',
      reconnect: true
    },
    identity: {
      username: 'FiresideBOT',
      password: process.env.TWITCH_KEY
    },
    channels: ['RevenantEverest', 'Atsuumo', 'Wookie']
  }
};