/**
 *
 *
 * @version 1.0.0
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React from "react";
import PropTypes from "prop-types";

const ResultItem = ({ idx, imgUrl, numMatchups, winRate, eloRating }) => (
  <div className="live-results__resultItem">
    <p className="flex-basis-10">{idx + 1}</p>
    <img src={imgUrl} />
    <p className="flex-basis-25">
      {numMatchups} {numMatchups === 1 ? "matchup" : "matchups"}
    </p>
    <p className="flex-basis-25">{winRate}% win rate</p>
    <p className="flex-basis-25">{eloRating} ELO Score</p>
  </div>
);

const LiveResults = ({ matchupData }) => {
  // Order results by win rate
  const rankedResults = Object.keys(matchupData)
    .filter(
      (id) => matchupData[id].winsReceived > 0 && matchupData[id].eloRating > 0
    )
    .map((id) => {
      const { numMatchups, winsReceived, previewUrl, eloRating } = matchupData[
        id
      ];
      const winRate = parseInt(
        Math.floor((parseFloat(winsReceived) / parseFloat(numMatchups)) * 100)
      );

      return {
        id,
        imgUrl: previewUrl,
        numMatchups,
        winRate,
        eloRating,
      };
    })
    .sort(({ eloRating: wr1 }, { eloRating: wr2 }) => {
      if (wr1 > wr2) return -1;
      if (wr2 > wr1) return 1;
      return 0;
    });

  return (
    <div className="live-results">
      <h2>Live Results</h2>
      <div className="live-results__results">
        {rankedResults.length > 0 ? (
          rankedResults.map(
            ({ id, imgUrl, numMatchups, winRate, eloRating }, idx) => (
              <ResultItem
                key={id}
                idx={idx}
                imgUrl={imgUrl}
                numMatchups={numMatchups}
                winRate={winRate}
                eloRating={eloRating}
              />
            )
          )
        ) : (
          <div className="live-results__noResults">No Results Yet</div>
        )}
      </div>
    </div>
  );
};

LiveResults.propTypes = {
  matchupData: PropTypes.object.isRequired,
};

export default LiveResults;
