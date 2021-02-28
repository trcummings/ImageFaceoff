/**
 *
 *
 * @version 1.0.0
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

const calculateMaxMatchups = (entrants = 0) =>
  Math.ceil(Math.pow(entrants, 2) / 2 - entrants);

const validate = (values) => {
  const errors = {};
  const { maxEntrants, totalMatchups, searchTerm } = values;

  if (!searchTerm) {
    errors.searchTerm = "Required";
  }

  if (!maxEntrants) {
    errors.maxEntrants = "Required";
  } else if (maxEntrants < 3) {
    errors.maxEntrants = "Must be at least 3 entrants!";
  } else if (maxEntrants > 200) {
    errors.maxEntrants = "Maximum of 200 entrants";
  }

  const maxMatchups = calculateMaxMatchups(maxEntrants);
  if (!totalMatchups) {
    errors.totalMatchups = "Required";
  } else if (maxEntrants > 1 && totalMatchups > maxMatchups) {
    errors.totalMatchups = `For ${maxEntrants} entrants, cannot exceed ${maxMatchups} matchups!`;
  }

  return errors;
};

const InvisiblePlaceholder = () => (
  <div className="search-for-matchups__invisibleErrorPlaceholder">
    invisible invisible
  </div>
);

const ErrorMessage = ({ value }) => (
  <div className="search-for-matchups__errorMessage">{value}</div>
);

const SearchForMatchups = ({ getImages: onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  return (
    <div className="search-for-matchups">
      <h2>Start a New Matchup</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex-grow-2 flex-column flex-40">
          <label htmlFor="searchTerm">Search Term</label>
          <input
            id="searchTerm"
            type="text"
            name="searchTerm"
            onChange={formik.handleChange}
            value={formik.values.searchTerm}
          />
          {formik.errors.searchTerm ? (
            <ErrorMessage value={formik.errors.searchTerm} />
          ) : (
            <InvisiblePlaceholder />
          )}
        </div>
        <div className="flex-column flex-20">
          <label htmlFor="maxEntrants">Max Entrants</label>
          <input
            id="maxEntrants"
            type="number"
            name="maxEntrants"
            onChange={formik.handleChange}
            value={formik.values.maxEntrants}
          />
          {formik.errors.maxEntrants ? (
            <ErrorMessage value={formik.errors.maxEntrants} />
          ) : (
            <InvisiblePlaceholder />
          )}
        </div>
        <div className="flex-column flex-20">
          <label htmlFor="totalMatchups">Total Matchups</label>
          <input
            id="totalMatchups"
            type="number"
            name="totalMatchups"
            onChange={formik.handleChange}
            value={formik.values.totalMatchups}
          />
          {formik.errors.totalMatchups ? (
            <ErrorMessage value={formik.errors.totalMatchups} />
          ) : (
            <InvisiblePlaceholder />
          )}
        </div>
        <button className="flex-20" type="submit" disabled={!formik.isValid}>
          {formik.isValid ? "Start!" : "Disabled"}
        </button>
      </form>
    </div>
  );
};

export default SearchForMatchups;
