import {makeStyles} from '@material-ui/core/styles';
import {DataGrid} from '@material-ui/data-grid';
import {BigNumber} from "ethers";
import React, {useState} from 'react';
import '../../customCss/Custom-Mahadao-Data-Table.css';
import TextWrapper from "../../components/TextWrapper";
import {truncateMiddle} from "../../utils";

import IconLoader from "../../components/IconLoader";
import config from "../../config";
import {IUserBorrowReserve, IUserCollateralReserve, IUserData, IUserDataWithHF} from "../../utils/interface";
import {useGetChainId} from "../../utils/NetworksCustomHooks";

export function SortedDescendingIcon() {
  return <IconLoader iconName={'ArrowUp'} iconType="arrow"/>;
}

export function SortedAscendingIcon() {
  return <IconLoader iconName={'ArrowDown'} iconType="arrow"/>;
}

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      cursor: 'pointer',
    },
    '& .super-app.negative': {
      color: '#FA4C69',
      fontWeight: '600',
    },
    '& .super-app.positive': {
      color: '#20C974',
      fontWeight: '600',
    },
    '& .super-app.loss': {
      color: '#FA4C69',
      fontWeight: '600',
    },
    '& .super-app.profit': {
      color: '#20C974',
      fontWeight: '600',
    },
  },
  gridStyle: {
    color: 'white',
  },
});

type Props = {
  value: {isLoading: boolean; data: IUserDataWithHF[]};
};

const PAGINATION_PAGE_SIZE = 5


const AllLoansTable = (props: Props) => {
  console.log('value', props.value)
  const chainId = useGetChainId()
  const [pageNo, setPageNo] = useState<number>(0);
  const noOfSize = 5;

  const classes = useStyles();

  /*useEffect(() => {
    setPageNo(0);
  }, [props.data]);*/

  const handleLiquidate = (symbol: string, borrower: string) => {
  };

  const columns = [
    {
      field: 'id',
      headerName: 'OWNER',
      flex: 0.3,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className="single-line-center-start" onClick={() => window.open(`${config[chainId].etherscanUrl}/address/${params.value}`)}>
            {truncateMiddle(params.value, 15)}
            <IconLoader
              iconName={'ArrowLink'}
              iconType={'arrow'}
              onClick={() =>
                window.open(`${config[chainId].etherscanUrl}/address/${params.row.owner}`)
              }
            />
          </div>
        );
      },
    },
   {
      field: 'collateralReserve',
      headerName: 'COLLATERAL',
      flex: 0.2,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className={'start-center'}>
            {
              params.value.map((data: IUserCollateralReserve) => {
                return (
                  <div>
                    [{data.reserve.price.priceInEth} $ETH] {data.reserve.symbol}
                  </div>
                )
              })
            }
          </div>
        );
      },
    },
    {
      field: 'borrowReserve',
      headerName: 'BORROW',
      flex: 0.23,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className={'start-center'}>
            {
              params.value.map((data: IUserBorrowReserve) => {
                return (
                  <div>
                    [{data.reserve.price.priceInEth} $ETH] {data.reserve.symbol}
                  </div>
                )
              })
            }
          </div>
        );
      },
    },
    /*{
      field: 'borrowReserve',
      headerName: 'COLLATERAL RATIO',
      flex: 0.23,
      sortable: false,
      sortingOrder: ['asc', 'desc'],
      cellClassName: (params: any) =>
        clsx('super-app', {
          negative: params.row.isLiquidateable,
          positive: !params.row.isLiquidateable,
        }),
      renderCell: (params: any) => {
        return (
          <div
            className={'start-center'}
            onClick={() => {
              window.open(`/#/loan/details/${params.row.owner}/${params.row.token}`);
            }}
          >
            {Number(params.value.toString()).toLocaleString()}%
          </div>
        );
      },
    },*/
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

  const LoadingOverlayComponent = () => {
    return (
      <div className="noResultContainer">
        <div className="internal">
        </div>
      </div>
    );
  };

  const noResultsComponent = () => {
    return (
      <div className="noResultContainer">
        <div className="internal">
          <TextWrapper
            text={'There are no opens loans yet.'}
            fontSize={24}
            fontWeight={'bold'}
            className="m-b-8"
          />
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className={classes.root} style={{position: 'relative'}}>
        <DataGrid
          className={classes.gridStyle}
          getRowId={(rows) => {
            return rows.id;
          }}
          pagination
          rows={props.value.data}
          columns={columns}
          pageSize={PAGINATION_PAGE_SIZE}
          rowCount={10}
          paginationMode="server"
          onRowClick={(newSelection) => {
            // window.open(`/#/loan/details/${newSelection.row.owner}/${newSelection.row.token}`);
          }}
          rowHeight={84}
          loading={false}
          onPageChange={(newPage) => {
            setPageNo(Number(newPage) || 0);
          }}
          autoHeight={true}
          disableColumnMenu={true}
          components={{
            LoadingOverlay: LoadingOverlayComponent,
            NoRowsOverlay: noResultsComponent,
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

export default AllLoansTable;
