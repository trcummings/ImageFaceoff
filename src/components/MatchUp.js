/**
 *
 *
 * @version 1.0.0
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { useTheme } from "../providers/ThemeContext";

const CircleCheck = () => (
  <div className="match-up__icon">
    <i className="far fa-check-circle" />
    <div className="solid-circle" />
  </div>
);

const MatchUp = ({
  searchTerm,
  isLoadingRound,
  numMatchupsRemaining = 0,
  currentMatchup = [{}, {}],
  pickEntrant = () => {},
}) => {
  const { theme } = useTheme();
  const [entrant1, entrant2] = currentMatchup;

  const [loadedImages, setImageLoaded] = useState({});

  const bothImagesLoaded =
    loadedImages[entrant1.id] && loadedImages[entrant2.id];

  function setEntrantLoaded(id) {
    setImageLoaded({ ...loadedImages, [id]: true });
  }

  return (
    <div className={`match-up ${theme}`}>
      <h4>Image Faceoff</h4>
      <h1>Pick the best {searchTerm.toLowerCase()}...</h1>
      <div className="match-up__images">
        {numMatchupsRemaining > 0 ? (
          <Fragment>
            <div
              className="match-up__imageItem"
              onClick={() => pickEntrant(entrant1.id, entrant2.id)}
              style={bothImagesLoaded ? {} : { display: "none" }}
            >
              <CircleCheck />
              <img
                src={entrant1.imageUrl}
                onLoad={() => setEntrantLoaded(entrant1.id)}
              />
            </div>
            <div
              className="match-up__imageItem"
              onClick={() => pickEntrant(entrant2.id, entrant1.id)}
              style={bothImagesLoaded ? {} : { display: "none" }}
            >
              <CircleCheck />
              <img
                src={entrant2.imageUrl}
                onLoad={() => setEntrantLoaded(entrant2.id)}
              />
            </div>
            <div
              className="match-up__centerText"
              style={bothImagesLoaded ? { display: "none" } : {}}
            >
              <p>Loading next matchup...</p>
            </div>
          </Fragment>
        ) : (
          <div className="match-up__centerText">
            <p>{isLoadingRound ? "Loading Next Round..." : "Round Over!"}</p>
          </div>
        )}
      </div>
      <p>{numMatchupsRemaining} matchups Remaining</p>
    </div>
  );
};

MatchUp.propTypes = {
  numMatchupsRemaining: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  isLoadingRound: PropTypes.bool.isRequired,
};

export default MatchUp;
