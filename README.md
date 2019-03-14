# Mini-Crypto

Mini-Crypto is a mini crypto tracker designed to be used on your mobile device for a quick overview of your favorite coins. Just open the app and start using immediately - no signup required.

### Features

- Pulls the global top 100 coins, with auto refresh intervals
- Search to quickly add to favorites, with live updating results
- View coin prices in CAD or USD
- Newsfeed pulls currently trending crypto topics
- Quickly view only the coins you care about using favorites
- App stores favorites and preferred currency on device

![screen](https://raw.githubusercontent.com/nTamura/mini-crypto/master/public/screen-min.png)

### Dev Prerequisites

- register for an API key [here](https://min-api.cryptocompare.com/)
- create a .env file in root folder
- replace xxx with your API key ( REACT_APP_CRYPTO_COMPARE_API_KEY=xxx )

### To Start

Paste the text block into terminal:

```
git clone https://github.com/nTamura/mini-crypto.git
&& cd mini-crypto
&& npm i
&& npm start
```

##### TODO

- PWA add to homescreen shortcut
- Fill sprites for coins with no icons
- Click on individual coins to view more detail in accordion
- Sort table by
- 'Your portfolio' - add coins to view your portfolio worth
- Add wallet address for automatic account balances

---

Credits:

- [Cryptocompare](https://cryptocompare.com/)
- [allienworks/cryptocoins](https://github.com/allienworks/cryptocoins)
