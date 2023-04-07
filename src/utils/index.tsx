import {BigNumber} from 'ethers';

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const truncateMiddle = function (
  fullStr: string = '',
  strLen: number,
  separator?: string,
) {
  if (fullStr.length <= strLen) return fullStr;
  separator = separator || '...';

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 3),
    backChars = Math.floor(charsToShow / 3);

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};

export const InputValidation = function (
  value: string = " ",
  balance: BigNumber,
  collateral: string,
  toCheckFor: ["MAX", "DECIMALS"]
) {
  let returnObj = {
    status: "Success",
    restrict: false,
    msg: "",
  };

  if (toCheckFor.includes("MAX")) {
    if (Number(value) > Number(balance)) {
      returnObj = {
        status: "Warning",
        restrict: true,
        msg: "Input cannot be more than your wallet balance",
      }

      return returnObj;
    }
  }
};
