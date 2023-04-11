import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";

export function getBalance(balance: BigNumber, decimals = 18): string {
  try {
    return formatUnits(balance, decimals);
  } catch (err) {
    return "0";
  }
}

export const getDisplayBalance = (
  balance: BigNumber,
  decimals = 18,
  fractionDigits = 3
): string => {
  try {
    const formattedBalance: string = getBalance(balance, decimals);
    const decimalsPointIndex = formattedBalance.indexOf(".");
    if (decimalsPointIndex === -1) return formattedBalance;
    return (
      formattedBalance.slice(0, decimalsPointIndex) +
      "." +
      formattedBalance.slice(
        decimalsPointIndex + 1,
        decimalsPointIndex + 1 + fractionDigits
      )
    );
  } catch (error) {
    return "0";
  }
};

export const convertBigIntToNumber = (
  value: string | number,
  decimals = 18
): number => {
  try {
    console.log("value", value, Number(value));
    return Number(value) / Math.pow(10, decimals);
  } catch {
    return 0;
  }
};

export const formatToBN = (
  value: number | string,
  decimals = 18
): BigNumber => {
  try {
    const [beforeDecimals, afterDecimal] = `${value}`.split(".");

    const beforeDecimalsPrecisionText = beforeDecimals?.slice(0, 18) || "0";
    const afterDecimalsPrecisionText = afterDecimal?.slice(0, decimals) || "0";
    const fixedPrecisionValue = `${beforeDecimalsPrecisionText}.${afterDecimalsPrecisionText}`;

    return BigNumber.from(parseUnits(`${fixedPrecisionValue}`, decimals));
  } catch (error) {
    return BigNumber.from("0");
  }
};
