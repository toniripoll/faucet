import { useUserContext } from "@/UserProvider";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Balance = () => {
  const { ethereum } = window;
  const { cuenta } = useUserContext();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const provider = new ethers.BrowserProvider(ethereum);
    provider.getBalance(cuenta.acc)
      .then((balance) => setBalance(ethers.formatEther(balance)));
  }, [cuenta.acc]);

  return (
    <div>
      {cuenta ? (
        <div>Balance: {balance}</div>
      ) : (
        <div>Noy hay cuenta cargada...</div>
      )}
    </div>
  );
};

export default Balance;
