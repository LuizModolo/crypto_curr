const getApi = async () => {
  const response = await fetch(' https://api.coinlore.net/api/tickers/').then(response => response.json());
  console.log(response)
  const response2 = await fetch('https://api.coinlore.net/api/coin/markets/?id=90').then(response => response.json());
  console.log(response2)
 
  const response3 = await fetch('https://api.coinlore.net/api/global/').then(response => response.json());
  console.log(response3)
 }
 
 getApi();