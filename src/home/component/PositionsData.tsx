import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import { BigNumber } from "ethers";
import React, { useState } from "react";

import IconLoader from "../../components/IconLoader";
import config from "../../config";
import "../../customCss/Custom-Mahadao-Data-Table.css";
import { getDisplayBalance } from "../../utils/formatBalance";
import {
  IUserBorrowReserve,
  IUserCollateralReserve,
  IUserDataWithHF,
} from "../../utils/interface";
import { useGetChainId } from "../../utils/NetworksCustomHooks";

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
};

const PAGINATION_PAGE_SIZE = 5;

const AllPositionData = (props: Props) => {
  const chainId = useGetChainId();
  const [pageNo, setPageNo] = useState<number>(0);
  const noOfSize = 5;

  const classes = useStyles();

  /*useEffect(() => {
    setPageNo(0);
  }, [props.data]);*/

  const handleLiquidate = (symbol: string, borrower: string) => {};

  const columns = [
    {
      field: "id",
      headerName: "OWNER",
      flex: 0.3,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div
            className="single-line-center-start"
            onClick={() =>
              window.open(
                `${config[chainId].etherscanUrl}/address/${params.value}`
              )
            }
          >
            {params.value}
            {/*{truncateMiddle(params.value, 15)}*/}
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
      renderCell: (params: any) => {
        return (
          <div className={"start-center"}>
            {params.value.map((data: IUserCollateralReserve, index: number) => {
              return (
                <div key={index}>
                  {getDisplayBalance(
                    BigNumber.from(data.currentATokenBalance),
                    data.reserve.decimals
                  )}{" "}
                  {data.reserve.symbol}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      field: "borrowReserve",
      headerName: "BORROW",
      flex: 0.23,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className={"start-center"}>
            {params.value.map((data: IUserBorrowReserve, index: number) => {
              return (
                <div key={index}>
                  {getDisplayBalance(
                    BigNumber.from(data.currentTotalDebt),
                    data.reserve.decimals
                  )}{" "}
                  {data.reserve.symbol}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      field: "hf",
      headerName: "Health factor",
      flex: 0.23,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className={"start-center"}>
            {Number(getDisplayBalance(params.value)).toFixed(4)}
          </div>
        );
      },
    },
    /*{
      field: 'delete',
      headerName: 'LIQUIDATE',
      flex: 0.1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div
            className={'start-center'}
          >

          </div>
        );
      },
    },*/
  ];

  return (
    <React.Fragment>
      <div className={classes.root} style={{ position: "relative" }}>
        <DataGrid
          className={classes.gridStyle}
          getRowId={(rows) => {
            return rows.id;
          }}
          // pagination
          rows={props.value}
          columns={columns}
          // pageSize={PAGINATION_PAGE_SIZE}
          rowCount={5}
          // paginationMode="server"
          rowHeight={84}
          /*onPageChange={(newPage) => {
            setPageNo(Number(newPage) || 0);
          }}*/
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
