const commaPoint = (number) => number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const globalMarketCapVolume = ({ total_mcap, total_volume, mcap_change, volume_change }) => {
  const marketCap = document.getElementById('market-cap');
  const volume = document.getElementById('volume');
  marketCap.innerText = `  ${commaPoint(total_mcap)} (${mcap_change}%)`;
  volume.innerText = `  ${commaPoint(total_volume)} (${volume_change}%)`;
  if (mcap_change.startsWith('-')) {
    marketCap.style.color = 'red';
  } else {
    marketCap.style.color = 'green';
  }
  if (volume_change.startsWith('-')) {
    volume.style.color = 'red';
  } else {
    volume.style.color = 'green';
  }
}

function createLogosBigAndLose(nameid, li) {
  if (nameid === 'axie-infinity') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://monnos.com/wp-content/uploads/2021/08/axie-1.png`;
    li.appendChild(img);
  } else {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/${nameid}.png?v=013`;
    li.appendChild(img);
  }
}

const biggestLoserWinner = async () => {
  const response = await fetch(' https://api.coinlore.net/api/tickers/?start=0&limit=50').then(response => response.json());
  const winners = response.data.sort((a, b) => a.percent_change_24h - b.percent_change_24h).reverse().splice(0, 5);
  const losers = response.data.sort((a, b) => a.percent_change_24h - b.percent_change_24h).splice(0, 5);

  const winnerLi = document.getElementById('winners');
  const loserLi = document.getElementById('losers');

  winners.forEach((coin) => {
    const li = document.createElement('li');
    li.innerText = `(+${coin.percent_change_24h}%) ${coin.name}`;
    createLogosBigAndLose(coin.nameid, li)
    winnerLi.appendChild(li);
  });

  losers.forEach((coin) => {
    const li = document.createElement('li');
    li.innerText = `(${coin.percent_change_24h}%) ${coin.name}`;
    createLogosBigAndLose(coin.nameid, li)
    loserLi.appendChild(li);
  });
}

const fetchNews = () => {
  const myHeaders = new Headers();
  myHeaders.append("authorization", "c075710bb2a4746fca0e92e034127a432b454e538b43e9f8291d4cb2e8fba8c2");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=PT", requestOptions)
    .then(response => response.json())
    .then(result => {
      createNews(result);
      console.log(result);
    })
    .catch(error => console.log('error', error));
}

const createNews = (result) => {
  for (let i = 14; i < 20; i += 1) {
    const div = document.createElement('div');
    const lin = document.createElement('a');
    lin.href = result.Data[i].guid;
    const img = document.createElement('img');
    const p = document.createElement('p');
    img.src = result.Data[i].imageurl;
    p.innerText = result.Data[i].title;
    const newsSection = document.querySelector('.news');
    newsSection.appendChild(lin);
    lin.appendChild(div);
    div.appendChild(img);
    div.appendChild(p);
  }

}

const getApi = async () => {
  const response = await fetch(' https://api.coinlore.net/api/tickers/?start=0&limit=50').then(response => response.json());
  const response2 = await fetch('https://api.coinlore.net/api/coin/markets/?id=90').then(response => response.json());
  const response3 = await fetch('https://api.coinlore.net/api/global/').then(response => response.json());
  globalMarketCapVolume(response3[0]);
  document.querySelector('.main-content').innerHTML = '';
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
  if (parseFloat(rank) < 0) {
    newSpan.style.color = 'red';
    newSpan.style.fontWeight = '900';
    newSpan.innerText += '%';
  } else if ((title === '1h' || title === '24h' || title === '7d') && parseFloat(rank) > 0) {
    newSpan.style.fontWeight = '900';
    newSpan.style.color = 'green';
    newSpan.innerText += '%';
  } else if (title === 'Volume 24h' || title === 'Suprimento' || title === 'Market Cap') {
    newSpan.innerText = commaPoint(Number(newSpan.innerText));
  } else if (title === 'Símbolo') {
    createLogos(nameid, newSpan);
  }
  section.appendChild(newSpan);
}

function fillSectionsSorted(coins) {
  const main = document.querySelector('.main-content');
  const keyArray = ['rank', 'symbol', 'name', 'percent_change_1h', 'percent_change_24h', 'percent_change_7d', 'price_usd', 'market_cap_usd', 'volume24', 'tsupply'];
  const titleArray = ['Rank', 'Símbolo', 'Nome', '1h', '24h', '7d', 'Preço(USD)', 'Market Cap', 'Volume 24h', 'Suprimento']
  keyArray.forEach((key, i) => {
    createMainContent(coins, key, main, titleArray[i]);
  });
}

async function sort({ target }, key) {
  const { coins } = await getApi();
  if (target.classList[1] === key && (key === 'symbol' || key === 'name')) {
    coins.data.sort();
    document.querySelector('.main-content').innerHTML = '';
    fillSectionsSorted(coins);
  }
}

function createMainContent(coins, key, main, title) {
  const newSection = createSection(main);
  const titleSpan = document.createElement('span');
  titleSpan.className = `title-span ${key}`;
  titleSpan.innerText = title;
  titleSpan.addEventListener('click', async ({ target }) => {
    const { coins } = await getApi();
    if (target.classList[1] === key && (key === 'symbol' || key === 'name')) {
      if (target.nextElementSibling.innerText[0].toLowerCase() === 'a') {
        coins.data.sort((a, b) => a[key] < b[key] && 1 || -1);
        document.querySelector('.main-content').innerHTML = '';
        fillSectionsSorted(coins);
      } else {
        coins.data.sort((a, b) => a[key] > b[key] && 1 || -1);
        document.querySelector('.main-content').innerHTML = '';
        fillSectionsSorted(coins);
      }

    } else {
      if (parseFloat(target.nextElementSibling.innerText) > parseFloat(target.parentNode.lastChild.innerText)) {
        coins.data.sort((a, b) => a[key] - b[key]);
        document.querySelector('.main-content').innerHTML = '';
        fillSectionsSorted(coins);
      } else {
        coins.data.sort((a, b) => b[key] - a[key]);
        document.querySelector('.main-content').innerHTML = '';
        fillSectionsSorted(coins);
      }

    }
  });
  newSection.appendChild(titleSpan);
  coins.data.forEach(coin => {
    createRank(newSection, coin[key], title, coin.nameid);
  });
}

const fillSections = async () => {
  const { coins } = await getApi();
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

const submitButton = document.querySelector('.button');
submitButton.addEventListener('click', () => {
  const emailInput = document.querySelector('.input');
  const re = /\S+@\S+\.\S+/;
  if (re.test(emailInput.value)) {
    emailInput.value = '';
    alert('E-mail cadastrado com sucesso!')
  } else {
    emailInput.value = '';
    alert('E-mail inválido!')
  }
})

window.onload = () => {
  loadingScreen();
  fillSections();
  biggestLoserWinner();
  fetchNews();
  setInterval(() => {
    fillSections();
  }, 60000)
}
