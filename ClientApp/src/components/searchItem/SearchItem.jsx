import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ hotel }) => {
  return (
    <div className="searchItem">
      <img src={hotel.photos[0] || ""} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">
          <Link to={`/hotels/${hotel._id}`} state={{ hotelId: hotel._id }}>
            {hotel.name}
          </Link>
        </h1>
        <span className="siDistance">{hotel.distance} from center</span>
        {/* <span className="siTaxiOp">{tag}</span> */}
        <span className="siSubtitle">{hotel.description}</span>
        <span className="siFeatures">{hotel.type}</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{hotel.rating}</span>
          {/* <button>{rate}</button> */}
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${hotel.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
