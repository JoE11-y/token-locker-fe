import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import ContractCallCreatePool from "./components/ContractCallCreatePool";

function App() {
  return (
    <>
      <h2>MEMEGOAT LOCKER TESTER 🔐</h2>

      <ConnectWallet />
      <ContractCallCreatePool />
    </>
  );
}

export default App;
