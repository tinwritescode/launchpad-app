import Client, { SignClient } from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/react";
import React, { useCallback, useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";
import { env } from "../../env.mjs";
import { ethereumClient, wagmiClient } from "../../utils/wagmi";

type Props = {
  children: React.ReactNode;
};

function WagmiProvider({ children }: Props) {
  const [client, setClient] = useState<Client | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const _subscribeToEvents = useCallback(
    async (_client: Client) => {
      if (typeof _client === "undefined") {
        throw new Error("WalletConnect is not initialized");
      }

      _client.on("session_ping", (args) => {
        console.log("EVENT", "session_ping", args);
      });

      _client.on("session_event", (args) => {
        console.log("EVENT", "session_event", args);
      });

      _client.on("session_update", ({ topic, params }) => {
        console.log("EVENT", "session_update", { topic, params });
        const { namespaces } = params;
        const _session = _client.session.get(topic);
        const updatedSession = { ..._session, namespaces };
        // onSessionConnected(updatedSession);
      });

      _client.on("session_delete", () => {
        console.log("EVENT", "session_delete");
        // reset();
      });
    },
    [
      // onSessionConnected
    ]
  );

  const createClient = useCallback(async () => {
    try {
      setIsInitializing(true);

      const _client = await SignClient.init({
        projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        // optional parameters
        relayUrl: env.NEXT_PUBLIC_RELAY_URL,
        metadata: {
          name: "Example Dapp",
          description: "Example Dapp",
          url: "#",
          icons: ["https://walletconnect.com/walletconnect-logo.png"],
        },
      });

      setClient(_client);

      console.log("CREATED CLIENT: ", _client);
      // console.log("relayerRegion ", relayerRegion);

      // prevRelayerValue.current = relayerRegion;
      await _subscribeToEvents(_client);
      // await _checkPersistedState(_client);
    } catch (err) {
      throw err;
    } finally {
      setIsInitializing(false);
    }
  }, [
    // _checkPersistedState,
    _subscribeToEvents,
    //  relayerRegion
  ]);

  useEffect(() => {
    if (!client) {
      // || prevRelayerValue.current !== relayerRegion)
      createClient();
    }
  }, [
    client,
    createClient,
    //relayerRegion
  ]);

  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>

      <Web3Modal
        ethereumClient={ethereumClient}
        projectId={env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
      />
    </>
  );
}

export default WagmiProvider;
