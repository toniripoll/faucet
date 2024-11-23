import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { ethers } from "ethers";
import { Loader2 } from "lucide-react";

type Formulario = {
  origen: string;
  destino: string;
  amount: number;
};


const Trasnfer = () => {
  const { ethereum } = window;
  const { register, handleSubmit, reset } = useForm();
  const [accounts, setAccounts] = useState<[string]>([""]);
  const [transaction, setTransaction] = useState< {} | null >();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    ethereum &&
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: [string]) => setAccounts(accounts));
    console.log("h");
  }, []);

  async function onSubmit(data: Formulario) {
    setLoading(true);
    setTransaction(null)
    const { origen, destino, amount } = data;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner(origen);
    const tx = await signer.sendTransaction({
      to: destino,
      value: ethers.parseEther(amount.toString()),
    });
    await tx.wait();
    setTransaction(tx);
    console.log("transaccion", transaction);
    setLoading(false);
    reset()
  }

  return (
    <div className="container flex flex-col m-4 p-6 bg-gray-100 justify-center border border-black rounded-md max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex p-4 gap-4 justify-center bg-white border rounded-md shadow-md w-3/4 mx-auto">
          <label>Cuenta Origen</label>
          <select
            className="border rounded-sm border-black"
            {...register("origen")}
            defaultValue={""}
          >
            <option value="" disabled>
              Selecciona una cuenta de origen...
            </option>
            {accounts.map((account, index) => (
              <option key={index} value={account}>
                {account}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center p-4 mt-4 gap-4 bg-white border rounded-md shadow-md w-3/4 mx-auto">
          <label>Cuenta Destino</label>
          <select
            className="border rounded-sm border-black"
            {...register("destino")}
            defaultValue={""}
          >
            <option value="" disabled>
              Selecciona una cuenta de destino...
            </option>
            {accounts.map((account, index) => (
              <option key={index} value={account}>
                {account}
              </option>
            ))}
          </select>
        </div>
        <div className="flex mt-4 p-4 gap-4 border rounded-md shadow-md bg-white justify-center w-1/2 mx-auto">
          <label>Cantidad:</label>
          <input
            type="number"
            className="border border-black rounded-md w-full"
            placeholder="Cantidad a enviar"
            {...register("amount")}
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit">
            {loading && <Loader2 className="animate-spin" />}
            Enviar
          </Button>
        </div>
      </form>
      {/* Transacción debajo del formulario */}
      {transaction && (
        <div className="mt-6 bg-white p-4 border rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Transacción realizada</h1>
          <pre>{JSON.stringify(transaction, null, 4)}</pre>
        </div>
      )}
    </div>
  );
};

export default Trasnfer;
