'use client'
import { config } from "@/utils/wagmi_config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import { WalletOptions } from './test/wallet-options';
import { WagmiProvider, useAccount } from 'wagmi'
import { Account } from './test/account'

function ConnectWallet() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletOptions />
  }  
function Providers({children}: Readonly<{children: React.ReactNode;}>) {
    const queryClient = new QueryClient();
    return ( 
        <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
      </WagmiProvider>
     );
}

export default Providers;