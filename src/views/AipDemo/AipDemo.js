import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getCID, getImage, getSynonyms } from "../../Utils/pubchem";
import AutoInput from "../../components/AutoInput/AutoInput";
//import { Test } from './AipDemo.styles';

function AipDemo({ props }) {
  const [cid, setCid] = useState("");
  const [synonyms, setSynonyms] = useState();

  let { compoundName } = useParams();

  const chemicalName = compoundName;

  useEffect(() => {
    getCID(chemicalName)
      .then((data) => setCid(data))
      .catch((err) => {
        setCid(err);
      });

    getSynonyms(cid)
      .then((data) => setSynonyms(data))
      .catch((err) => {
        setSynonyms(err);
      });
  }, [chemicalName, cid]);
  return (
    <header className="App-header">
      <AutoInput />
      CID : {typeof cid == "object" ? JSON.stringify(cid, 2, null) : cid}
      <img src={getImage(cid)} alt="structure" />
      <iframe
        src={`https://www.ncbi.nlm.nih.gov/Structure/icn3d/full.html?cid=${cid}&showmenu=false&resize=false&width=300&height=300&showcommand=0&shownote=0&mobilemenu=1&showtitle=0`}
        width="300"
        height="300"
      />
      <details>
        <summary>Synonyms</summary>
        <pre>{JSON.stringify(synonyms)}</pre>
      </details>
    </header>
  );
}

AipDemo.propTypes = {
  // bla: PropTypes.string,
};

AipDemo.defaultProps = {
  // bla: 'test',
};

export default AipDemo;
