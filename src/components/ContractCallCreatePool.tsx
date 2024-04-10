import { useConnect } from "@stacks/connect-react";
import { StacksDevnet } from "@stacks/network";
import {
    AnchorMode,
    PostConditionMode,
    uintCV,
    standardPrincipalCV,
    contractPrincipalCV,
    boolCV,
    someCV
} from "@stacks/transactions";
import { userSession } from "../user-session";

const ContractCallCreatePool = () => {
    const { doContractCall } = useConnect();

    const defaultFactor = 0.0001e8;
    const balanceX = 1e8;
    const balanceY = 9e8; // equivalent to #900 million
    const lockAmount = 9e8;
    const block = 500;
    const newBlock = 800;
    const incrementlockAmount = 2.25e8;
    const amountToWithdraw = 1e8;

    function createPool() {
        doContractCall({
            network: new StacksDevnet(),
            anchorMode: AnchorMode.Any,
            contractAddress: "STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W",
            contractName: "amm-swap-pool-v1-1",
            functionName: "create-pool",
            functionArgs: [contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "goatmeme"), contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "dummy"), uintCV(defaultFactor), standardPrincipalCV("ST1M46QGKG5RS0MRAA0J9FFDP8NMYF710AZDEJ92C"), uintCV(balanceX), uintCV(balanceY)],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }

    function addToPool() {
        doContractCall({
            network: new StacksDevnet(),
            anchorMode: AnchorMode.Any,
            contractAddress: "STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W",
            contractName: "amm-swap-pool-v1-1",
            functionName: "add-to-position",
            functionArgs: [contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "goatmeme"), contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "dummy"), uintCV(defaultFactor), uintCV(balanceX), someCV(uintCV(balanceY))],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }


    function lockToken() {
        doContractCall({
            network: new StacksDevnet(),
            anchorMode: AnchorMode.Any,
            contractAddress: "STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W",
            contractName: "goatmeme-locker",
            functionName: "lock-token",
            functionArgs: [contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "goatmeme"), contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "dummy"), uintCV(defaultFactor), uintCV(lockAmount), uintCV(block), boolCV(true), contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "goatmeme"), standardPrincipalCV("ST3KH1PSP5PCZTSYEGGKMYQYMBZBQ6BTBCRD2P469")],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }

    function relockToken() {
        doContractCall({
            network: new StacksDevnet(),
            anchorMode: AnchorMode.Any,
            contractAddress: "STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W",
            contractName: "goatmeme-locker",
            functionName: "relock-token",
            functionArgs: [contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "goatmeme"), contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "dummy"), uintCV(defaultFactor), uintCV(0), uintCV(newBlock)],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }

    function withdrawToken() {
        doContractCall({
            network: new StacksDevnet(),
            anchorMode: AnchorMode.Any,
            contractAddress: "STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W",
            contractName: "goatmeme-locker",
            functionName: "withdraw-token",
            functionArgs: [contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "goatmeme"), contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "dummy"), uintCV(defaultFactor), uintCV(0), uintCV(amountToWithdraw)],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }

    function incrementLock() {
        doContractCall({
            network: new StacksDevnet(),
            anchorMode: AnchorMode.Any,
            contractAddress: "STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W",
            contractName: "goatmeme-locker",
            functionName: "increment-lock",
            functionArgs: [contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "goatmeme"), contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "dummy"), uintCV(defaultFactor), uintCV(0), uintCV(incrementlockAmount)],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }

    function splitLock() {
        doContractCall({
            network: new StacksDevnet(),
            anchorMode: AnchorMode.Any,
            contractAddress: "STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W",
            contractName: "goatmeme-locker",
            functionName: "split-lock",
            functionArgs: [contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "goatmeme"), contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "dummy"), uintCV(defaultFactor), uintCV(1), uintCV(incrementlockAmount)],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }

    function transferLock() {
        doContractCall({
            network: new StacksDevnet(),
            anchorMode: AnchorMode.Any,
            contractAddress: "STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W",
            contractName: "goatmeme-locker",
            functionName: "transfer-lock-ownership",
            functionArgs: [contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "goatmeme"), contractPrincipalCV("STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W", "dummy"), uintCV(defaultFactor), uintCV(2), standardPrincipalCV("ST1M46QGKG5RS0MRAA0J9FFDP8NMYF710AZDEJ92C")],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }



    if (!userSession.isUserSignedIn()) {
        return null;
    }

    return (
        <div>
            <p>Test</p>
            <div>
                <button onClick={() => createPool()}>
                    Create Pool
                </button>
            </div>
            <div>
                <button onClick={() => addToPool()}>
                    Add To Pool
                </button>
            </div>
            <div>
                <button onClick={() => lockToken()}>
                    Lock Token
                </button>
            </div>
            <div>
                <button onClick={() => relockToken()}>
                    ReLock Token
                </button>
            </div>
            <div>
                <button onClick={() => withdrawToken()}>
                    Withdraw Token
                </button>
            </div>
            <div>
                <button onClick={() => incrementLock()}>
                    Increment Lock
                </button>
            </div>
            <div>
                <button onClick={() => splitLock()}>
                    Split Lock
                </button>
            </div>
            <div>
                <button onClick={() => transferLock()}>
                    Transfer Lock
                </button>
            </div>
        </div>
    );
};

export default ContractCallCreatePool;
