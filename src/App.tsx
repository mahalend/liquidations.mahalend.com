import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {SnackbarProvider} from "notistack";
import React from "react";
import {Provider} from "react-redux";
import {useMediaQuery} from "@material-ui/core";
import {HashRouter as Router} from "react-router-dom";
import {configureChains, createClient, WagmiConfig} from "wagmi";
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from "wagmi/providers/public";
import Popups from "./components/Popups";
import TopBar from "./components/TopBar";
import Tracking from "./components/Tracking";
import {ConfigChains} from "./config";
import ProtocolProvider from "./context/Provider";

import "./index.css";
import Navigation from "./Navigation";

import store from "./state";
import Updaters from "./state/Updaters";
import {myCustomTheme} from "./theme/rainbowKitCustomTheme";

interface IProps {
  children: React.ReactNode;
}

const RainbowProvider = (props: IProps) => {
  const {chains, provider} = configureChains(
    ConfigChains,
    [
      alchemyProvider({apiKey: 'HY3urTDGBnhgqGXmCsjPEzyiVSY3NLh8'}),
      publicProvider()]
  );

  const {connectors} = getDefaultWallets({
    appName: "Mahalend",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={myCustomTheme}
        showRecentTransactions={true}
      >
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

const Providers = (props: IProps) => {
  return (
    <Provider store={store}>
      <RainbowProvider>
        <ProtocolProvider>
          <SnackbarProvider
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            maxSnack={2}
          >
            <>
              <Popups/>
              {props.children}
            </>
          </SnackbarProvider>
        </ProtocolProvider>
      </RainbowProvider>
    </Provider>
  );
};

export let isMobileGlobal = false;

const App = () => {
  isMobileGlobal = useMediaQuery("");

  return (
    <Providers>
      <Router>
        <TopBar/>
        <Updaters/>
        <Navigation/>
        <Tracking/>
      </Router>
    </Providers>
  );
};

export default App;
