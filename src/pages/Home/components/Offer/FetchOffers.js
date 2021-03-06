import { useEffect, useState } from "react";
import axios from "axios";
import Offer from "./Offer";

function FetchOffers() {
  const [select, setSelect] = useState("dessert");
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const key = process.env.REACT_APP_EDAMAM_KEY;
    const appid = process.env.REACT_APP_EDAMAM_ID;
    axios
      .get(
        `https://api.edamam.com/search?q=${select}&app_id=${appid}&app_key=${key}`
      )
      .then((res) => setOffers(res.data.hits));
  }, [select, setSelect]);

  return (
    <>
      <Offer setSelect={setSelect} offers={offers} />
    </>
  );
}

export default FetchOffers;
