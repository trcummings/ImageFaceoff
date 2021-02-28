/**
 *
 *
 * @version 1.0.0
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";

const CircleCheck = () => (
  <div className="match-up__icon">
    <i className="far fa-check-circle" />
    <div className="solid-circle" />
  </div>
);

const MatchUp = ({
  numMatchupsRemaining = 0,
  currentMatchup = [{}, {}],
  pickEntrant = () => {},
}) => {
  const [entrant1, entrant2] = currentMatchup;

  return (
    <div className="match-up">
      <h4>Couch Faceoff</h4>
      <h1>Pick the best couch...</h1>
      <div className="match-up__images">
        {numMatchupsRemaining > 0 ? (
          <Fragment>
            <div
              className="match-up__imageItem"
              onClick={() => pickEntrant(entrant1.id, entrant2.id)}
            >
              <CircleCheck />
              <img src={entrant1.imageUrl} />
            </div>
            <div
              className="match-up__imageItem"
              onClick={() => pickEntrant(entrant2.id, entrant1.id)}
            >
              <CircleCheck />
              <img src={entrant2.imageUrl} />
            </div>
          </Fragment>
        ) : (
          <div />
        )}
      </div>
      <p>{numMatchupsRemaining} matchups Remaining</p>
    </div>
  );
};

MatchUp.propTypes = {
  numMatchupsRemaining: PropTypes.number.isRequired,
};

export default MatchUp;
