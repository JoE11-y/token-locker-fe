import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
// import Launchpad from "./components/Launchpad";
import Locker from "./components/Locker";

function App() {
  return (
    <>
      <h2>MEMEGOAT LOCKER TESTER 🔐</h2>

      <ConnectWallet />
      <Locker />
      <hr />
      {/* <Launchpad /> */}
    </>
  );
}

export default App;
