import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import '../src/polyfilss.js'
import "react-toastify/dist/ReactToastify.css";
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets ,RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, celo, celoCannoli, celoAlfajores} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { BrowserRouter } from 'react-router-dom'
import {ToastContainer} from "react-toastify";


const { chains, publicClient } = configureChains(
  [mainnet, polygon, arbitrum, celo, celoAlfajores, celoCannoli],
  [publicProvider()],
  [jsonRpcProvider({ rpc: (chain) => ({http: chain.rpcUrls.default.http }) }) ]
);

const { connectors } = getDefaultWallets({
  appName: "socialconnecthistory",
  projectId: "0.0.1",
  chains,

});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {/* <BrowserRouter> */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
            <App />
          
        {/* </BrowserRouter> */}
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
