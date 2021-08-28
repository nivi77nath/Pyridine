import "./AutoInput.scss";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getAutoComplete } from "../../Utils/pubchem";
import { useHistory, useLocation } from "react-router-dom";
import IoSpinner from "../IoSpinner/IoSpinner";
import Chemistry from "../../Assets/chemistry.png";

function AutoInput({ width, initial, props }) {
  let history = useHistory();
  let location = useLocation();
  let [loading, setLoading] = useState(false);
  let [inputValue, setInputValue] = useState("");

  const suggestionInitialState = {
    dictionary_terms: { compound: [] },
    total: 0,
  };
  const [suggestions, setSuggestions] = useState(suggestionInitialState);

  useEffect(() => {
    document.querySelector(".AutoInputWrapper__input").value = "";
    setSuggestions(suggestionInitialState);
  }, [location]);

  useEffect(() => {
    if (inputValue === "") {
      setLoading(false);
    }
  }, [inputValue]);

  const suggestionItems = () => {
    if (suggestions["total"] !== 0 && suggestions !== {}) {
      if (loading) {
        setLoading(false);
      }
      return suggestions["dictionary_terms"]["compound"].map((obj, index) => {
        return (
          <div
            className="AutoInputWrapper__SuggestionBox--item"
            onClick={() => {
              history.push(`/demo/${obj}`);
            }}
            key={index}
          >
            {obj}
          </div>
        );
      });
    }

    if (!loading && inputValue !== "") {
      setLoading(true);
    }
  };

  return (
    <div className="AutoInputWrapper">
      {loading ? <IoSpinner /> : <></>}
      {suggestions.total === 0 && initial ? (
        <img src={Chemistry} alt="beakers" />
      ) : (
        <></>
      )}
      <input
        className="AutoInputWrapper__input"
        placeholder="Search compound"
        onChange={(e) => {
          setInputValue(e.target.value);
          getAutoComplete(e.target.value)
            .then((res) => {
              setLoading(false);
              if (e.target.value !== "") {
                setSuggestions(
                  JSON.parse(res.replace("callback(", "").replace(")", ""))
                );
              }
            })
            .catch(() => setLoading(true));
        }}
      />
      <div className="AutoInputWrapper__SuggestionBox">{suggestionItems()}</div>
    </div>
  );
}

AutoInput.propTypes = {
  width: PropTypes.string,
  initial: PropTypes.bool,
};

AutoInput.defaultProps = {
  width: "",
  initial: false,
};

export default AutoInput;
