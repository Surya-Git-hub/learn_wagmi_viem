"use client"
import { Inter } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, DisclaimerComponent, midnightTheme } from '@rainbow-me/rainbowkit';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';

const inter = Inter({ subsets: ['latin'] })

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    sepolia,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

let projectId = 'eb377f8878487f35be77ce714ecebe12';

const connectors = connectorsForWallets([
  {
    groupName: 'select wallet to connect',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: 'web3connect' }),
      injectedWallet({ chains }),
    ],
  },
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider modalSize="compact" coolMode={true} chains={chains} appInfo={{
            appName: 'web3connect',
          }}
            theme={midnightTheme()}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
        </body>
    </html>
  )
}
