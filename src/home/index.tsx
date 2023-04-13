import React, { useState } from "react";
import useGetPositionHF from "../hooks/state/useGetPositionsHF";
import LiquidationModal from "../modals/LiquidationModal";
import { IUserDataWithHF } from "../utils/interface";
import "./index.css";
import PositionsData from "./PositionsData";

const Home = () => {
  const position = useGetPositionHF();
  const [selectedUser, setSelectedUser] = useState<IUserDataWithHF | null>(
    null
  );

  return (
    <div id={"app"}>
      {selectedUser && (
        <LiquidationModal
          openModal={true}
          onModalClose={() => setSelectedUser(null)}
          selectedUserData={selectedUser}
        />
      )}
      <div className={"p-l-24 p-r-24"}>
        {position.isLoading ? (
          <p>Fetching position this might take several minutes</p>
        ) : position.data.length === 0 && !position.isLoading ? (
          <p>No position found</p>
        ) : (
          <PositionsData
            value={position.data}
            setSelectedUser={(data: IUserDataWithHF) => setSelectedUser(data)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
