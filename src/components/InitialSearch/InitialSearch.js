import React from "react";
import PropTypes from "prop-types";
import "./InitialSearch.scss";
// import Chemistry from "../../Assets/chemistry.png";
import AutoInput from "../AutoInput/AutoInput";
import Pyridine from "../Pyridine/Pyridine";

const InitialSearch = (props) => (
  <div className="InitialSearch__Wrapper">
    <Pyridine />
    <div className="InitialSearch__Container">
      <AutoInput initial={true} />
      <div className="InitialSearch__Tip">
        Tip: You can use IUPAC or compound name
        <div className="InitialSearch__Tip--example"></div>
        <code>C9H8O4</code> or <code>Aspirin</code> or{" "}
        <code>Acetylsalicylic Acid</code>
      </div>
    </div>
  </div>
);

InitialSearch.propTypes = {
  // bla: PropTypes.string,
};

InitialSearch.defaultProps = {
  // bla: 'test',
};

export default InitialSearch;
