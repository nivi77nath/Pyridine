import "./AutoInput.scss";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getAutoComplete, getCID } from "../../Utils/pubchem";
import { useHistory, useLocation } from "react-router-dom";
//import { Test } from './AutoInput.styles';

function AutoInput({ props }) {
  let history = useHistory();
  let location = useLocation();
  const suggestionInitialState = {
    dictionary_terms: { compound: [] },
  };
  const [suggestions, setSuggestions] = useState(suggestionInitialState);

  useEffect(() => {
    document.querySelector(".AutoInputWrapper__input").value = "";
    setSuggestions(suggestionInitialState);
  }, [location]);

  const suggestionItems = () => {
    if (suggestions["total"] !== 0 && suggestions !== {}) {
      return suggestions["dictionary_terms"]["compound"].map((obj, index) => {
        return (
          <div
            className="AutoInputWrapper__SuggestionBox--item"
            onClick={() => {
              history.push(`/${obj}`);
            }}
            key={index}
          >
            {obj}
          </div>
        );
      });
    }
    // console.log(suggestions);
    return <div>NONE</div>;
  };

  return (
    <div className="AutoInputWrapper">
      <input
        className="AutoInputWrapper__input"
        placeholder="Search component"
        onChange={(e) => {
          getAutoComplete(e.target.value).then((res) => {
            console.log(suggestions);

            if (e.target.value !== "") {
              setSuggestions(
                JSON.parse(res.replace("callback(", "").replace(")", ""))
              );
            }
          });
        }}
      />
      <div className="AutoInputWrapper__SuggestionBox">{suggestionItems()}</div>
    </div>
  );
}

AutoInput.propTypes = {
  // bla: PropTypes.string,
};

AutoInput.defaultProps = {
  // bla: 'test',
};

export default AutoInput;
