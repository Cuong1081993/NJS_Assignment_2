import { useSelector } from "react-redux";
import "./propertyList.css";

const PropertyList = () => {
  const { loading, hotels } = useSelector((state) => state.hotels);
  // filter hotels array to find hotel.type === hotel and add to hotelQuantity
  // if does not match, the lenght have value = 0
  const hotelQuantity =
    hotels.filter((hotel) => hotel.type === "hotel").length || 0;
  const apartmentQuantity =
    hotels.filter((hotel) => hotel.type === "apartment").length || 0;
  const resortQuantity =
    hotels.filter((hotel) => hotel.type === "resort").length || 0;
  const villaQuantity =
    hotels.filter((hotel) => hotel.type === "villa").length || 0;
  const cabinQuantiy =
    hotels.filter((hotel) => hotel.type === "cabin").length || 0;

  return (
    <div className="pList">
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Hotels</h1>
          <h2>{hotelQuantity} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Apartments</h1>
          <h2>{apartmentQuantity} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Resorts</h1>
          <h2>{resortQuantity} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Villas</h1>
          <h2>{villaQuantity} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Cabins</h1>
          <h2>{cabinQuantiy} hotels</h2>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
