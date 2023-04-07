import useCore from './useCore';
import ERC20 from '../protocol/ERC20';
import useTokenBalanceOf from './useTokenBalanceOf';

const useTokenBalance = (token: ERC20) => {
  const core = useCore();
  return useTokenBalanceOf(token, core.myAccount);
};

export default useTokenBalance;
