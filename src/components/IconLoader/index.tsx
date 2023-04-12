import React, { useState } from "react";

export interface IconLoaderProps {
  iconName:
    | "ArrowUp"
    | "ArrowDown"
    | "ArrowLeft"
    | "ArrowRight"
    | "ArrowLink"
    | "ArrowLinkColored"
    | "ArrowFilledUp"
    | "ArrowTailUp"
    | "ArrowTailDown"
    | "ArrowTailLeft"
    | "ArrowTailRight"
    | "ARTHlg"
    | "Mahalg"
    | "MAHAStarterlg"
    | "MAHAStartersm"
    | "BSC"
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
    | "ColoredSuccess"
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
    | "SCLP"
    | "BNB"
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
    | "DotMenu"
    | "Loans"
    | "Starter"
    | "Add"
    | "Delete"
    | "DeleteFaded"
    | "Settings"
    | "Default"
    | "Tick"
    | "ProposalPending"
    | "BentoMenu"
    | string;
  iconType?:
    | "arrow"
    | "infoTip"
    | "exchangePlatform"
    | "socialMedia"
    | "products"
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

  const [Icon, setIcon] = useState<string>("");

  import(`../../assets/icons/${iconType}/${iconName}.svg`)
    .then((image) => {
      setIcon(image.default);
    })
    .catch(() => {
      // if (Icon !== DefaultIcon) setIcon(DefaultIcon);
    });

  return (
    <img
      src={Icon}
      alt={Icon}
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
