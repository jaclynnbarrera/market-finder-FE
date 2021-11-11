export function getMarketDetails(markets) {
  const fetchDetails = (m) => {
    return fetch(
      `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${m.id}`
    )
      .then((resp) => resp.json())
      .catch((err) => {
        console.log(err);
      });
  };

  const newMarketsArr = markets.map(getDeetsAndFormat);

  function getDeetsAndFormat(market) {
    let reformattedMarket = {};
    fetchDetails(market).then((details) => {
      reformattedMarket["id"] = market.id;
      reformattedMarket["name"] = market.marketname.slice(4);
      reformattedMarket["distance"] = market.marketname.slice(0, 3);
      reformattedMarket["address"] = details.marketdetails.Address;
      reformattedMarket["products"] = details.marketdetails.Products;
      reformattedMarket["schedule"] = details.marketdetails.Schedule;
    });
    return reformattedMarket;
  }
  return newMarketsArr;
}
