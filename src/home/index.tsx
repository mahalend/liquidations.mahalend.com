import React from "react";
import useGetPositionHF from "../hooks/state/useGetPositionsHF";
import {getDisplayBalance} from "../utils/formatBalance";
import {IUserDataWithHF} from "../utils/interface";
import PositionsData from "./component/PositionsData";
import './index.css'

const Home = () => {
  const position = useGetPositionHF();

  return (
    <div id={'app'}>
      <div className={'p-l-24 p-r-24'}>
        {position.isLoading
          ? <p>Fetching position this might take several minutes</p>
          : position.data.length === 0 && !position.isLoading
            ? <p>No position found</p>
            : <PositionsData value={position.data.sort((a: IUserDataWithHF, b: IUserDataWithHF) => {
              return Number(getDisplayBalance(a.hf)) - Number(getDisplayBalance(b.hf))
            })}/>}
      </div>
    </div>
  )
}

export default Home;
