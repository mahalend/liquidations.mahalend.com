import ERC20 from "../protocol/ERC20";
import useCore from "./useCore";
import useTokenBalanceOf from "./useTokenBalanceOf";

const useTokenBalance = (token: ERC20) => {
  const core = useCore();
  if (core) return useTokenBalanceOf(token, core.myAccount || "");
};

export default useTokenBalance;
