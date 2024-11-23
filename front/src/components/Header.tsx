import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserContext } from "../UserProvider";
import { useEffect } from "react";

const Header = () => {
  const { cuenta, setCuenta } = useUserContext();

  useEffect(() => {
    const { ethereum } = window;
    ethereum &&
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((cuentas: [string]) => {
          setCuenta({ acc: cuentas[0] });
        });
        ethereum.on('accountsChanged', (cuentas: [string]) => {
          setCuenta({acc: cuentas[0]})
        })
  }, []);

  return (
    <div className="flex gap-4 justify-center">
      <Link to={"/home"}>
        <Button>Home</Button>
      </Link>
      <Link to={"/faucet"}>
        <Button>Faucet</Button>
      </Link>
      <Link to={"/balance"}>
        <Button>Balance</Button>
      </Link>
      <Link to={"/transfer"}>
        <Button>Transfer</Button>
      </Link>
      {cuenta ? <div>{cuenta.acc}</div> : <div>Cuenta no seleccionada</div>}
    </div>
  );
};

export default Header;
