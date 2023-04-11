import React from "react";
import useGetPositionHF from "../hooks/state/useGetPositionsHF";
import useGetV3UnhealthyPosition from "../hooks/state/useGetV3UnhealthyPosition";
import PositionsData from "./component/PositionsData";
import './index.css'

const Home = () => {
  const position = useGetPositionHF();
  const temp = useGetV3UnhealthyPosition();

  return (
    <div id={'app'}>
      <div className={'material-primary'}>
        <PositionsData value={position}/>
      </div>
    </div>
  )
}

export default Home;
