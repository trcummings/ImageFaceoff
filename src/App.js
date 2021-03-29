/**
 * The main component.
 *
 * @version 1.0.0
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React, { Fragment, useEffect, useState, useRef } from "react";
import Elo from "elo-js";

import MatchUp from "./components/MatchUp";
import LiveResults from "./components/LiveResults";
import SearchForMatchups from "./components/SearchForMatchups";
import ThemeModeButton from "./components/ThemeModeButton";
import GithubFooter from "./components/GithubFooter";

import {
  createNewMatchups,
  createNewMatchupData,
} from "./util/matchupDataUtil";
import { usePageUnload } from "./util/hooks";

const initialMatchSearch = {
  searchTerm: "Couch",
  maxEntrants: 10,
  totalMatchups: 40,
  // 50 exceeds the possible number of matchups given by a set of 10 entrants
  // I derived this by a simple formula of n^2/2 - n, which I arrived at
  // by excluding duplicates, and self-pairs
};

const App = () => {
  const [matchupData, setMatchupData] = useState({});
  const [currentMatchups, setCurrentMatchups] = useState([]);
  // These are just for display purposes, display search term, show initial load instead of "Round Over"
  const [currentSearchTerm, setSearchTerm] = useState(
    initialMatchSearch.searchTerm
  );
  const [isLoadingRound, setIsLoadingRound] = useState(true);

  const getImages = ({ searchTerm, maxEntrants, totalMatchups }) => {
    setSearchTerm(searchTerm);
    setIsLoadingRound(true);

    return fetch(
      `/pixabay?maxEntrants=${maxEntrants}&searchTerm=${searchTerm}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((body) => {
        const { hits: data } = body;
        const newMatchupData = createNewMatchupData(data, matchupData);
        const newMatchups = createNewMatchups(data, totalMatchups);

        // Set new value in state
        setMatchupData(newMatchupData);
        setCurrentMatchups(newMatchups);
        setIsLoadingRound(false);
      });
  };

  const pickEntrant = (winId, loserId) => {
    // Add pick to matchup data and update ELO
    const elo = new Elo();
    const winnerMatchData = matchupData[winId];
    const loserMatchData = matchupData[loserId];
    const newMatchupData = Object.assign(
      {},
      matchupData,
      {
        [winId]: {
          ...winnerMatchData,
          numMatchups: winnerMatchData.numMatchups + 1,
          winsReceived: winnerMatchData.winsReceived + 1,
          eloRating: elo.ifWins(
            winnerMatchData.eloRating,
            loserMatchData.eloRating
          ),
        },
      },
      {
        [loserId]: {
          ...loserMatchData,
          numMatchups: loserMatchData.numMatchups + 1,
          eloRating: elo.ifLoses(
            loserMatchData.eloRating,
            winnerMatchData.eloRating
          ),
        },
      }
    );
    // Remove current matchup from front of the list
    const newMatchups = [...currentMatchups];
    newMatchups.shift();

    // Set new value in state
    setMatchupData(newMatchupData);
    setCurrentMatchups(newMatchups);
  };

  // Constants for localStorage management
  const MATCHUPS = "ImageFaceoff--matchups";
  const MATCHUP_DATA = "ImageFaceoff--matchupData";
  const SEARCH_TERM = "ImageFaceoff--searchTerm";
  // Hydrate state from localStorage, or else run image search if no state exists
  useEffect(() => {
    const _currentMatchups = localStorage.getItem(MATCHUPS);
    const _matchupData = localStorage.getItem(MATCHUP_DATA);
    const _searchTerm = localStorage.getItem(SEARCH_TERM);

    if (!_matchupData) {
      getImages(initialMatchSearch);
    } else {
      setCurrentMatchups(JSON.parse(_currentMatchups));
      setMatchupData(JSON.parse(_matchupData));
      setSearchTerm(JSON.parse(_searchTerm));
      setIsLoadingRound(false);
    }
  }, []);
  // Dehydrate state on pageUnload to persist matchups across sessions
  usePageUnload(() => {
    localStorage.setItem(MATCHUPS, JSON.stringify(currentMatchups));
    localStorage.setItem(MATCHUP_DATA, JSON.stringify(matchupData));
    localStorage.setItem(SEARCH_TERM, JSON.stringify(currentSearchTerm));
  });
  // Create clear data function
  const clearMatchData = () => {
    localStorage.removeItem(MATCHUPS);
    localStorage.removeItem(MATCHUP_DATA);
    setMatchupData({});
    setCurrentMatchups([]);
  };

  // Create ref to scroll up to after getImages call
  const topRef = useRef(null);
  const getImagesThenScroll = async (...args) => {
    // Start Getting Images
    getImages(...args);
    // Scroll to top
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Render
  return (
    <Fragment>
      <div ref={topRef} />
      {/* This div only exists to be at page top to scroll to*/}
      <ThemeModeButton />
      <MatchUp
        isLoadingRound={isLoadingRound}
        searchTerm={currentSearchTerm}
        currentMatchup={currentMatchups[0]}
        numMatchupsRemaining={currentMatchups.length}
        pickEntrant={pickEntrant}
      />
      <LiveResults matchupData={matchupData} clearMatchData={clearMatchData} />
      <SearchForMatchups
        getImages={getImagesThenScroll}
        initialValues={initialMatchSearch}
      />
      <GithubFooter />
    </Fragment>
  );
};

export default App;
