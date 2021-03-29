// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
// NB: SIDE EFFECT, and DESTRUCTIVE. Use at own risk
function shuffleInPlace(arr) {
  let i, j, temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export function createNewMatchups(data = [], numMatchups = 0) {
  // Create list of possible pairs
  const allPossiblePairs = [];

  // create set to track existing pairs
  const alreadyPaired = {};
  const isInvalidPair = (idx1, idx2) =>
    alreadyPaired[`${idx1},${idx2}`] || alreadyPaired[`${idx2},${idx1}`];

  // Iterate through the data
  for (const match1 of data) {
    for (const match2 of data) {
      // Ignore self matches or already paired matches
      if (match1.id === match2.id || isInvalidPair(match1.id, match2.id))
        continue;

      // Log our match in the already paired set
      alreadyPaired[`${match1.id},${match2.id}`] = true;

      allPossiblePairs.push([match1.id, match2.id]);
    }
  }

  // Shuffle our pairs
  shuffleInPlace(allPossiblePairs);

  // Take a candidate slice of all matches based on the amt requested
  return allPossiblePairs.slice(0, numMatchups);
}

export function createNewMatchupData(data = [], oldMatchupData = {}) {
  // Create new entries of matchup data in an object
  let newMatchupData = data.reduce((acc, hit) => {
    const { previewURL, userImageURL, largeImageURL, id, user, tags } = hit;
    const matchData = {
      id,
      previewUrl: previewURL,
      userImageUrl: userImageURL,
      largeImageUrl: largeImageURL,
      numMatchups: 0,
      winsReceived: 0,
      eloRating: 0,
      user,
      tags,
    };
    return Object.assign(acc, { [id]: matchData });
  }, {});

  // Overwrite existing values in state
  newMatchupData = Object.assign({}, newMatchupData, oldMatchupData);

  return newMatchupData;
}
