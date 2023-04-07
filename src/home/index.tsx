import React from "react";
import useGetV3UnhealthyPosition from "../hooks/state/useGetV3UnhealthyPosition";
import PositionsData from "./component/PositionsData";
import './index.css'

const Home = () => {
  const position = useGetV3UnhealthyPosition('');

  return (
    <div id={'app'}>
      <div className={'material-primary'}>
        <PositionsData value={position}/>
      </div>
    </div>
  )
}

export default Home;
