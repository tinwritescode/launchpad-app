import React from "react";
import { api } from "../../../../../utils/api";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

function WhitelistTable() {
  const { query } = useRouter();
  const { address } = useAccount();
  const { data: whitelist } = api.project.getUserWhiteListInfo.useQuery(
    {
      id: query?.id as string,
      walletAddress: address as string,
    },
    {
      enabled: !!query?.id && !!address,
    }
  );

  return (
    <div className="space-y-3">
      {whitelist?.proof !== null ? (
        <div>
          <div>✅ You are whitelisted!</div>
          <div>
            Your rank is:{" "}
            <span className="text-muted-foreground">{whitelist?.rank}</span>
          </div>
        </div>
      ) : (
        <div>❌ You are not whitelisted!</div>
      )}
    </div>
  );
}

export default React.memo(WhitelistTable);
