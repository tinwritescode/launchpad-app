export const getBalance = async (address: string) => {
  const provider = window.ethereum;
  if (provider) {
    const balance = await provider.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    return balance;
  }
  return null;
};
