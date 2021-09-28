const getApi = async () => {
  const response = await fetch(' https://api.coinlore.net/api/tickers/?start=0&limit=50').then(response => response.json());
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

function createLogos(nameid, newSpan) {
  if (nameid === 'ripple') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/xrp.png?v=013`;
    newSpan.appendChild(img);
  } else if (nameid === 'polkadot') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/polkadot-new.png?v=013`;
    newSpan.appendChild(img);
  } else if (nameid === 'theta-token') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/theta.png?v=013`;
    newSpan.appendChild(img);
  } else if (nameid === 'axie-infinity') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://monnos.com/wp-content/uploads/2021/08/axie-1.png`;
    newSpan.appendChild(img);
  } else if (nameid === 'elrond-egold') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/elrond-egld.png?v=013`;
    newSpan.appendChild(img);
  } else if (nameid === 'terrausd') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://s3-us-west-1.amazonaws.com/compliance-ico-af-us-west-1/production/token_profiles/logos/original/49e/d76/27-/49ed7627-3930-497b-a45f-7304ea9f7d83-1614303905-4ad23deebf089f767bfb868a69f674316a0fdc3c.png`;
    newSpan.appendChild(img);
  } else if (nameid === 'bitcoin-cash-sv') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/bitcoin-cash.png?v=013`;
    newSpan.appendChild(img);
  } else {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/${nameid}.png?v=013`;
    newSpan.appendChild(img); 
  }
}

function createRank(section, rank, title, nameid) {
  const newSpan = document.createElement('span');
  newSpan.innerText = rank;
  if ( parseFloat(rank) < 0) {
    newSpan.style.color = 'red';
    newSpan.style.fontWeight = '900';
    newSpan.innerText += '%';
  } else if ((title === '1h' || title ==='24h' || title ==='7d') && parseFloat(rank) > 0){
    newSpan.style.fontWeight = '900';
    newSpan.style.color = 'green';
    newSpan.innerText += '%';
  } else if (title === 'Volume 24h' || title === 'Suprimento' || title === 'Market Cap') {
    newSpan.innerText = Number(newSpan.innerText).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (title === 'Símbolo') {
    createLogos(nameid, newSpan);
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
    createRank(newSection, coin[key], title, coin.nameid);
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