export function getMarkets() {
  const coordinates = {
    lat: 40.8590831,
    lng: -73.8537585,
  };

  return fetch(
    `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=${coordinates.lat}&lng=${coordinates.lng}`
  )
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
}
