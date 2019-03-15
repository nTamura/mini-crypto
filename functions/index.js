const functions = require('firebase-functions')
exports.cryptocompare = firebase.functions.httpsCallable('cck')

export const getKey = () => {
  cryptocompare().then(() => {})
}
// .config().cryptocompare.key)
