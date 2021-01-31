import { search } from "./utility/edamam";
import { useState, useEffect, useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import styles from "./styles/index.module.scss";
import General from "./components/General/General";
import { infos } from "./utility/temporary";
import Ingredients from "./components/Ingredients/Ingredients";
import Nutrition from "./components/Nutrition/Nutrition";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { AuthContext } from "../../utility/AuthContext";
import { alreadyAddedChecker } from "../../utility/alreadyAddedChecker";

const Detail = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser ? currentUser.uid : localStorage.getItem("userId");

  const { params } = useRouteMatch();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyAdded, setAlreadyAdded] = useState(null);

  useEffect(() => {
    search(params.id).then((response) => {
      setRecipe(response);
      alreadyAddedChecker(response, userId).then((response) => {
        setAlreadyAdded(response);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <Loader type="Oval" color="#000" height={40} width={40} />
        </div>
      ) : (
        <div className={styles.container}>
          <General
            alreadyAdded={alreadyAdded}
            setAlreadyAdded={setAlreadyAdded}
            recipe={recipe}
          />
          <div className={styles["sub-container"]}>
            <Ingredients
              ingredientLines={recipe.ingredientLines}
              url={recipe.url}
            />
            <Nutrition
              calories={recipe.calories}
              cautions={recipe.cautions}
              service={recipe.yield}
              digest={recipe.digest}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
