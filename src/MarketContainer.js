import MarketCard from "./MarketCard";

// const api = createApi({
//   accessKey: process.env.REACT_APP_UNSPLASH_KEY,
// });

function MarketContainer(props) {
  return (
    <div>
      <h3>{props.markets && props.markets.length} Markets In Your Area</h3>

      {props.markets.map((market, i) => (
        <MarketCard market={market} key={i} />
      ))}
    </div>
  );
}

export default MarketContainer;
