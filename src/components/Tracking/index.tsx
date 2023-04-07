import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Mixpanel } from "../../analytics/Mixpanel";
import { useGetAccount } from "../../utils/NetworksCustomHooks";

const Tracking = () => {
  const location = useLocation();
  const account = useGetAccount();

  useEffect(() => {
    Mixpanel.track(`${location.pathname}`, { type: "screen" });
  }, [location.pathname]);

  useEffect(() => {
    if (account) {
      Mixpanel.identify(account);
      Mixpanel.people.set({ walletId: account });
    }
  }, [account]);

  return null;
};

export default Tracking;
