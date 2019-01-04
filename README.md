# React-Crypto-Chart
React-Crypto-Chart is a lightweight crypto tracker designed to be used on your mobile device for a quick overview of your favorite coins.

### Features
- Pulls the global top 25 coins, with auto refresh
- Option to add coins to favorites
- View coins in CAD or USD
- App stores favorites and preferred currency on device

![screen](https://raw.githubusercontent.com/nTamura/react-crypto-charts/master/public/screen.png)

### Dev Prerequisites 
If you are looking to build on top of this, you must apply for an API key
- register for free [API key here](https://newsapi.org/register)
- create a .env file in root folder
- replace xxx with your API key ( REACT_APP_NEWS_API_KEY=xxx )
- restart react server

### To Start
Paste the text block into terminal:
```
git clone https://github.com/nTamura/react-crypto-charts.git
&& cd react-crypto-charts
&& npm i
&& npm start
```

### TODO
- Fill sprites for coins with no icons
- Select in depth view of coins
- Live search for coins, with autocomplete
- Sort table
- 'Your portfolio' - add coins to view your portfolio worth
- News feed


---

Credits:
[Coinmarketcap](https://coinmarketcap.com/)
[NewsAPI](https://newsapi.org/)
[allienworks/cryptocoins](https://github.com/allienworks/cryptocoins)
