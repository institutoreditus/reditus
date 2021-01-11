module.exports = {
  env: {
    PAGARME_ENC_KEY: process.env.PAGARME_ENC_KEY,
    ROLLOUT_API_KEY: process.env.ROLLOUT_API_KEY
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
}
}