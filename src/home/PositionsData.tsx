import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";
import { BigNumber } from "ethers";
import React, { useState } from "react";
import Button from "../components/Button";

import IconLoader from "../components/IconLoader";
import TextWrapper from "../components/TextWrapper";
import config from "../config";
import "../customCss/Custom-Mahadao-Data-Table.css";
import theme from "../theme";
import { truncateMiddle } from "../utils";
import { getDisplayBalance } from "../utils/formatBalance";
import {
  IUserBorrowReserve,
  IUserCollateralReserve,
  IUserDataWithHF,
} from "../utils/interface";
import { useGetChainId } from "../utils/NetworksCustomHooks";

export function SortedDescendingIcon() {
  return <IconLoader iconName={"ArrowUp"} iconType="arrow" />;
}

export function SortedAscendingIcon() {
  return <IconLoader iconName={"ArrowDown"} iconType="arrow" />;
}

const useStyles = makeStyles({
  root: {
    "& .super-app-theme--header": {
      cursor: "pointer",
    },
    "& .super-app.negative": {
      color: "#FA4C69",
      fontWeight: "600",
    },
    "& .super-app.positive": {
      color: "#20C974",
      fontWeight: "600",
    },
    "& .super-app.loss": {
      color: "#FA4C69",
      fontWeight: "600",
    },
    "& .super-app.profit": {
      color: "#20C974",
      fontWeight: "600",
    },
  },
  gridStyle: {
    color: "white",
  },
});

type Props = {
  value: IUserDataWithHF[];
  setSelectedUser: (data: IUserDataWithHF) => void;
};

const PAGINATION_PAGE_SIZE = 4;

const AllPositionData = (props: Props) => {
  const chainId = useGetChainId();
  const [pageNo, setPageNo] = useState<number>(0);
  const noOfSize = 5;

  const classes = useStyles();

  /*useEffect(() => {
    setPageNo(0);
  }, [props.data]);*/

  const handleLiquidate = (user: string) => {
    const userFiltered = props.value.filter((data) => data.id === user);
    if (userFiltered.length === 1) props.setSelectedUser(userFiltered[0]);
    console.log("data", user, pageNo, noOfSize);
  };

  const columns = [
    {
      field: "id",
      headerName: "OWNER",
      flex: 0.3,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <div
            className="single-line-center-start"
            onClick={() =>
              window.open(
                `${config[chainId].etherscanUrl}/address/${params.row.id}`
              )
            }
          >
            {truncateMiddle(params.row.id, 15)}
            <IconLoader iconName={"ArrowLink"} iconType={"arrow"} />
          </div>
        );
      },
    },
    {
      field: "collateralReserve",
      headerName: "COLLATERAL",
      flex: 0.2,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <div className={"start-center"}>
            {params.row.collateralReserve.map(
              (data: IUserCollateralReserve, index: number) => {
                return (
                  <div key={index}>
                    {getDisplayBalance(
                      BigNumber.from(data.currentATokenBalance),
                      data.reserve.decimals
                    )}{" "}
                    {data.reserve.symbol}
                  </div>
                );
              }
            )}
          </div>
        );
      },
    },
    {
      field: "borrowReserve",
      headerName: "BORROW",
      flex: 0.23,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <div className={"start-center"}>
            {params.row.borrowReserve.map(
              (data: IUserBorrowReserve, index: number) => {
                return (
                  <div key={index}>
                    {getDisplayBalance(
                      BigNumber.from(data.currentTotalDebt),
                      data.reserve.decimals
                    )}{" "}
                    {data.reserve.symbol}
                  </div>
                );
              }
            )}
          </div>
        );
      },
    },
    {
      field: "hf",
      headerName: "Health factor",
      flex: 0.23,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <div className={"start-center"}>
            <TextWrapper
              text={Number(getDisplayBalance(params.row.hf)).toFixed(4)}
              color={
                Number(getDisplayBalance(params.row.hf)) > 1
                  ? theme.color.green[300]
                  : theme.color.red[300]
              }
            />
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: " ",
      flex: 0.1,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <div className={"start-center"}>
            <Button
              trackingid={"liquidate"}
              className={"primary-button"}
              disabled={Number(getDisplayBalance(params.row.hf)) < 1}
              onClick={() => handleLiquidate(params.row.id)}
            >
              Liquidate
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className={classes.root} style={{ position: "relative" }}>
        <DataGrid
          className={classes.gridStyle}
          getRowId={(rows) => {
            return rows.id;
          }}
          pagination
          rows={props.value}
          columns={columns}
          pageSize={PAGINATION_PAGE_SIZE}
          rowCount={PAGINATION_PAGE_SIZE}
          paginationMode="server"
          rowHeight={84}
          onPageChange={(newPage) => {
            setPageNo(Number(newPage) || 0);
          }}
          onRowClick={(data) => console.log("data", data)}
          autoHeight={true}
          disableColumnMenu={true}
          components={{
            ColumnSortedDescendingIcon: SortedDescendingIcon,
            ColumnSortedAscendingIcon: SortedAscendingIcon,
          }}
          disableColumnSelector={true}
          disableSelectionOnClick={true}
        />
      </div>
    </React.Fragment>
  );
};

export default AllPositionData;
