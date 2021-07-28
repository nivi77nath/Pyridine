import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AutoInput from "../../components/AutoInput/AutoInput";
import * as Pubchem from "../../Utils/pubchem";
import "./Home.scss";

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">Hello there</header>
    </div>
  );
}
