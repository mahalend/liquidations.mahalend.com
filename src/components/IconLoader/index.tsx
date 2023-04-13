import React, { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DefaultIcon from "../../assets/icons/misc/Default.svg";

export interface IconLoaderProps {
  iconName:
    | "QuickSwap"
    | "PancakeSwap"
    | "ArrowUp"
    | "ArrowDown"
    | "ArrowLeft"
    | "ArrowRight"
    | "ArrowLink"
    | "ArrowFilledUp"
    | "ArrowTailUp"
    | "ArrowTailDown"
    | "ArrowTailLeft"
    | "ArrowTailRight"
    | "ARTHlg"
    | "Mahalg"
    | "Checked"
    | "Empty"
    | "GreenCheck"
    | "CreameFinance"
    | "PickleFinance"
    | "Sushiswap"
    | "Uniswap"
    | "Yfi"
    | "CosmicFinance"
    | "Cryption"
    | "Dfyn"
    | "Firbird"
    | "Polydex"
    | "YearnFinance"
    | "Info"
    | "Error"
    | "Warning"
    | "Discord"
    | "Facebook"
    | "Forum"
    | "Github"
    | "Instagram"
    | "Medium"
    | "Reddit"
    | "Telegram"
    | "Twitter"
    | "Alert"
    | "Pending"
    | "Success"
    | "Caution"
    | "ARTH.usd"
    | "ARTH"
    | "ARTHX"
    | "MAHA"
    | "superMAHA"
    | "CNT"
    | "COSMIC"
    | "DFYN"
    | "ETH"
    | "HOPE"
    | "POLYGON"
    | "USDC"
    | "WBTC"
    | "WETH"
    | "DAI"
    | "Sync"
    | "InfoToolTip"
    | "Cross"
    | "Calendar"
    | "Menu"
    | "Transaction"
    | "Wallet"
    | "Copy"
    | "Copied"
    | "Search"
    | "Polygon"
    | "Bsc"
    | "Gov"
    | "Starter"
    | "Add"
    | "Delete"
    | "DeleteFaded"
    | "Settings"
    | "Default"
    | "BentoMenu"
    | string;
  iconType?:
    | "arrow"
    | "infoTip"
    | "exchangePlatform"
    | "products"
    | "socialMedia"
    | "status"
    | "tokenSymbol"
    | "misc"
    | "brandLogo"
    | "checkbox"
    | "chains";
  height?: number | "auto";
  width?: number | "auto";
  className?: string;
  onClick?: () => void;
}

const IconLoader = (props: IconLoaderProps) => {
  const {
    iconName,
    iconType = "misc",
    height = "auto",
    width = "auto",
    className = "",
    onClick,
  } = props;

  const [Icon, setIcon] = useState<string>(DefaultIcon);

  useEffect(() => {
    import(`../../assets/icons/${iconType}/${iconName}.svg`)
      .then(async (image) => {
        setIcon(image.default);
      })
      .catch(() => {
        setIcon(DefaultIcon);
      });
  }, [iconName, iconType]);

  return (
    <img
      src={Icon}
      alt={iconName}
      width={width}
      height={height}
      className={className}
      onClick={() => {
        if (onClick) onClick();
      }}
    />
  );
};

export default IconLoader;
