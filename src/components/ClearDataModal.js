/**
 * A specialized Modal to clear session data with
 *
 * @version 1.0.0
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React, { Fragment, useRef } from "react";

import Modal from "./modal";
import { useTheme } from "../providers/ThemeContext";

const ClearDataModal = ({ clearData = () => {} }) => {
  const modalRef = useRef(null);
  const { theme } = useTheme();

  return (
    <Fragment>
      <button
        className={`open-modal-button ${theme}`}
        onClick={() => modalRef.current.open()}
      >
        Clear Matchup Data
      </button>
      <Modal ref={modalRef}>
        <div className={`modalWrapper__outer ${theme}`}>
          <div className="modalWrapper__inner">
            <button
              className="x-out-button"
              onClick={() => modalRef.current.close()}
            >
              X
            </button>
            <h2>
              <i class="fas fa-exclamation-triangle" /> Warning{" "}
              <i class="fas fa-exclamation-triangle" />
            </h2>
            <p>
              This will clear ALL your data, AND end the current round of match
              ups. Are you sure you want to proceed?
            </p>
            <button
              className="clear-data-button"
              onClick={() => {
                clearData();
                modalRef.current.close();
              }}
            >
              Clear Data
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ClearDataModal;
