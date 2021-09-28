const getApi = async () => {
  const response = await fetch(' https://api.coinlore.net/api/tickers/').then(response => response.json());
  const response2 = await fetch('https://api.coinlore.net/api/coin/markets/?id=90').then(response => response.json());
  const response3 = await fetch('https://api.coinlore.net/api/global/').then(response => response.json());
  return { coins: response, exchanges: response2, global: response3 };
}


function createSection(main) {
  const newSection = document.createElement('section');
  newSection.className = 'coin-section';
  main.appendChild(newSection);
  return newSection
}

function createRank(section, rank, title) {
  const newSpan = document.createElement('span');
  newSpan.innerText = rank;
  if ( parseFloat(rank) < 0) {
    newSpan.style.color = 'red';
    newSpan.style.fontWeight = '900';
  } else if ((title === '1h' || title ==='24h' || title ==='7d') && parseFloat(rank) > 0){
    newSpan.style.fontWeight = '900';
    newSpan.style.color = 'green';
  }
  section.appendChild(newSpan);
}

function createMainContent(coins, key, main, title) {
  const newSection = createSection(main);
  const titleSpan = document.createElement('span');
  titleSpan.className = 'title-span';
  titleSpan.innerText = title;
  newSection.appendChild(titleSpan);
  coins.data.forEach(coin => {
    createRank(newSection, coin[key], title);
  });
}

const fillSections = async () => {
  const { coins } = await getApi();
  console.log(coins)
  const main = document.querySelector('.main-content');
  const keyArray = ['rank', 'symbol', 'name', 'percent_change_1h', 'percent_change_24h', 'percent_change_7d', 'price_usd', 'market_cap_usd', 'volume24', 'tsupply'];
  const titleArray = ['Rank', 'Símbolo', 'Nome', '1h', '24h', '7d', 'Preço(USD)', 'Market Cap', 'Volume 24h', 'Suprimento']
  keyArray.forEach((key, i) => {
    createMainContent(coins, key, main, titleArray[i]);
  });
  loadingRemove();
}

function loadingScreen() {
  const newSection = document.createElement('section');  
  const nav = document.querySelector('.nav-bar');
  newSection.className = 'loading-container';
  document.querySelector('body').insertBefore(newSection, nav);
  const loadImage = document.createElement('img'); 
  loadImage.className = 'load-image';
  loadImage.src = './imgs/cc_logo_transp.png';
  newSection.appendChild(loadImage);
}

function loadingRemove() {
  const section = document.querySelector('.loading-container');
  section.remove();
}

window.onload = () => {
  loadingScreen();
  fillSections();  
}