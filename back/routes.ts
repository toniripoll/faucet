import { Router, Request, Response } from "express";
import { ethers } from "ethers";
import fs from "fs";

const router = Router();


router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

router.get('/faucet/:address/:amount',async (req: Request, res: Response) => {
  const { address, amount } = req.params
  // 1. Conexion al nodo
  const provider = new ethers.JsonRpcProvider(process.env.URL_NODO) // 'http://localhost:5556'
  // 2. Conexion cuenta autorizada
  // 2.1 Acceso al documento de creación
  const path = process.env.KEYSTORE_FILE as string
  const file = fs.readFileSync(path, 'utf-8')
  // 2.2 Descifrar cuenta autorizada
  const wallet = await ethers.Wallet.fromEncryptedJson(file, process.env.KEYSTORE_PWD as string)
  // 2.3 Conexion cuenta con el nodo
  const connectedWallet = wallet.connect(provider)
  // 3. Generar transacción
  const tx = await connectedWallet.sendTransaction({
    to: address,
    value: amount
  })
  // 4. Esperar que se complete la transacción
  const txCompleted = await tx.wait()
  // 5. Obtener balance
  const balance = await provider.getBalance(address)
  // 6. Enviar datos
  res.json({
    txCompleted,
    address,
    balance: ethers.formatEther(balance),
    amount,
    fecha: new Date().toISOString()
  })
})




router.get('/balance/:address', async (req: Request, res: Response) => {
  // 1. Extraer parametro URL
  const { address } = req.params
  // 2. Conexion al nodo
  const provider = new ethers.JsonRpcProvider(process.env.URL_NODO) // 'http://localhost:5556'
  // 3. Solicitud balance
  const balance = await provider.getBalance(address)
  // 4. Envio de datos
  res.json({
    address,
    balance: ethers.formatEther(balance),
    fecha: new Date().toISOString()
  })
})



router.get("/balance/:address", async (req: Request, res: Response) => {
  const { address } = req.params;
  try {
    const response = await fetch(process.env.URL_NODO as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
        id: 1,
      }),
    });

    const data = await response.json();
    const balance = Number(data.result) / 10 ** 18;
    res.json({
      address,
      amount: balance,
      fecha: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching balance" });
  }
});

export default router;










router.get('/faucet/:address/:amount',async (req: Request, res: Response) => {
  const { address, amount } = req.params
  // 1. Conexion al nodo
  const provider = new ethers.JsonRpcProvider(process.env.URL_NODO) // 'http://localhost:5556'
  // 2. Conexion cuenta autorizada
  // 2.1 Acceso al documento de creación
  const path = process.env.KEYSTORE_FILE as string
  const file = fs.readFileSync(path, 'utf-8')
  // 2.2 Descifrar cuenta autorizada
  const wallet = await ethers.Wallet.fromEncryptedJson(file, process.env.KEYSTORE_PWD as string)
  // 2.3 Conexion cuenta con el nodo
  const connectedWallet = wallet.connect(provider)
  // 3. Generar transacción
  const tx = await connectedWallet.sendTransaction({
    to: address,
    value: amount
  })
  // 4. Esperar que se complete la transacción
  const txCompleted = await tx.wait()
  // 5. Obtener balance
  const balance = await provider.getBalance(address)
  // 6. Enviar datos
  res.json({
    txCompleted,
    address,
    balance: ethers.formatEther(balance),
    amount,
    fecha: new Date().toISOString()
  })
})







