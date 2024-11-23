import { useUserContext } from "@/UserProvider";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type Tx = {
  address: string;
  balance: string;
  fecha: string;
};

const Faucet = () => {
  const { cuenta } = useUserContext();
  const [tx, setTx] = useState<Tx | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    setTx(null)
    const amount = 10;
    const response = await fetch(
      `http://localhost:3333/api/faucet/${cuenta.acc}/${amount}/`
    );
    const data = await response.json();
    setTx(data);
    console.log(data);
    setLoading(false);
  };

  return (
    <div>
      <h1>Faucet</h1>
      <p>Cuenta: {cuenta.acc}</p>
      <Button onClick={() => handleClick()}>
        {loading && <Loader2 className="animate-spin"/>}
        Solicitar fondos
      </Button>
      {loading && <div>Loading transaction...</div>}
      {tx && (
        <div>
          <div>Nuevo balance: {tx.balance}</div>
          <pre>{JSON.stringify(tx, null, 4)}</pre>
        </div>
      )}
    </div>
  );
};

export default Faucet;
