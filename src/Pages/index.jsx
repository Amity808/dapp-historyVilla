import AddNewHistory from "../component/AddNewHistory";
// 0x18D6bEba1BE036E51249322E8888C06D1D8a3a2B

// 0xA515FcA8538E5Fcb81EbEe127270A4f130B4FF06

import 'react-toastify/dist/ReactToastify.css'

import '@rainbow-me/rainbowkit/style.css'

import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { metaMaskWallet, omniWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig, WagmiConfig, creatClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { Valora, CeloWallet, CeloDance } from "@celo/rainbowkit-celo/wallets";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import {ToastContainer} from "react-toastify";

const { chains, provider } = configureChains(
    [Alfajores, Celo],
    [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }) })]
  );
  
  // Create the list of wallets to connect to.
  const connectors = connectorsForWallets([
    {
      groupName: "Recommended with CELO",
      wallets: [
        Valora({ chains }),
        CeloWallet({ chains }),
        CeloDance({ chains }),
        metaMaskWallet({ chains }),
        omniWallet({ chains }),
        walletConnectWallet({ chains }),
      ],
    },
  ]);
  
  // Create the Wagmi client.
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  

  