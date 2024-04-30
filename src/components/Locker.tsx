import { useConnect } from "@stacks/connect-react";
import {
    AnchorMode,
    PostConditionMode,
    uintCV,
    standardPrincipalCV,
    // contractPrincipalCV,
    // someCV,
    // FungibleConditionCode,
    // makeContractFungiblePostCondition,
    // createAssetInfo,
    listCV
} from "@stacks/transactions";
import { userSession } from "../user-session";
import { network, contractAddress } from "../network";
import { useState } from "react";

const Locker = () => {
    const { doContractCall } = useConnect();
    // const defaultFactor = 1e8;
    // const balanceX = 500e8;
    // const balanceY = 1000e8; // equivalent to #1 token
    const userPrincipal = userSession.isUserSignedIn() ? userSession.loadUserData().profile.stxAddress.mainnet : "";
    const [addresses, setAddresses] = useState("");
    const [amount, setAmount] = useState(0);

    function sendTokens() {
        if (!amount || !addresses) {
            console.log('amount or address not set')
            return;
        }

        // const postConditionCode = FungibleConditionCode.LessEqual;
        // const assetAddress = contractAddress;
        // const assetContractName = 'memegoatstx';
        // const assetName = 'memegoatstx';
        // const fungibleAssetInfo = createAssetInfo(assetAddress, assetContractName, assetName);
        // const contractName = 'memegoat-vault-v1';
        // const postConditionAmount = amount * 1000000;

        // const contractFungiblePostCondition = makeContractFungiblePostCondition(
        //     contractAddress,
        //     contractName,
        //     postConditionCode,
        //     postConditionAmount,
        //     fungibleAssetInfo
        // );

        if (userPrincipal.toLowerCase() !== "SP2F4QC563WN0A0949WPH5W1YXVC4M1R46QKE0G14".toLowerCase()) {
            console.log("not owner")
            return;
        }

        const listOfAddress = addresses.split(',');

        const clarityList = listOfAddress.map(address => standardPrincipalCV(address.trim()));

        doContractCall({
            network,
            anchorMode: AnchorMode.Any,
            contractAddress,
            contractName: "memegoat-distributor-v1",
            functionName: "send-tokens",
            functionArgs: [listCV(clarityList), uintCV(amount * 1000000)],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}?chain=testnet`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }

    // const lockAmount = 9e8;
    // const block = 500;
    // const newBlock = 800;
    // const incrementlockAmount = 2.25e8;
    // const amountToWithdraw = 1e8;

    // function createPool() {
    //     doContractCall({
    //         network,
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "amm-swap-pool-v1-1",
    //         functionName: "create-pool",
    //         functionArgs: [contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "memegoat"), contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "testSTX"), uintCV(defaultFactor), standardPrincipalCV("ST1M46QGKG5RS0MRAA0J9FFDP8NMYF710AZDEJ92C"), uintCV(balanceX), uintCV(balanceY)],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}?chain=testnet`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }

    // mocknet https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999
    // function addToPool() {
    //     doContractCall({
    //         network,
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "amm-swap-pool-v1-1",
    //         functionName: "add-to-position",
    //         functionArgs: [contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "memegoat"), contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "testSTX"), uintCV(defaultFactor), uintCV(balanceX), someCV(uintCV(balanceY))],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}?chain=testnet`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }

    // function getFaucetTokens() {
    //     doContractCall({
    //         network,
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "memegoat-faucet-v1",
    //         functionName: "get-faucet-tokens",
    //         functionArgs: [uintCV(balanceX), uintCV(balanceY), standardPrincipalCV(userPrincipal)],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}?chain=testnet`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }

    // function lockToken() {
    //     doContractCall({
    //         network: new StacksMocknet(),
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "memegoat-locker-v1",
    //         functionName: "lock-token",
    //         functionArgs: [contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "goatmeme"), contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "testSTX"), uintCV(defaultFactor), uintCV(lockAmount), uintCV(block), boolCV(true), contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "goatmeme"), standardPrincipalCV("ST3KH1PSP5PCZTSYEGGKMYQYMBZBQ6BTBCRD2P469")],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }

    // function relockToken() {
    //     doContractCall({
    //         network: new StacksMocknet(),
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "memegoat-locker-v1",
    //         functionName: "relock-token",
    //         functionArgs: [contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "goatmeme"), contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "testSTX"), uintCV(defaultFactor), uintCV(0), uintCV(newBlock)],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }

    // function withdrawToken() {
    //     doContractCall({
    //         network: new StacksMocknet(),
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "memegoat-locker-v1",
    //         functionName: "withdraw-token",
    //         functionArgs: [contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "goatmeme"), contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "testSTX"), uintCV(defaultFactor), uintCV(0), uintCV(amountToWithdraw)],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }

    // function incrementLock() {
    //     doContractCall({
    //         network: new StacksMocknet(),
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "memegoat-locker-v1",
    //         functionName: "increment-lock",
    //         functionArgs: [contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "goatmeme"), contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "testSTX"), uintCV(defaultFactor), uintCV(0), uintCV(incrementlockAmount)],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }

    // function splitLock() {
    //     doContractCall({
    //         network: new StacksMocknet(),
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "memegoat-locker-v1",
    //         functionName: "split-lock",
    //         functionArgs: [contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "goatmeme"), contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "testSTX"), uintCV(defaultFactor), uintCV(1), uintCV(incrementlockAmount)],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }

    // function transferLock() {
    //     doContractCall({
    //         network: new StacksMocknet(),
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "memegoat-locker-v1",
    //         functionName: "transfer-lock-ownership",
    //         functionArgs: [contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "goatmeme"), contractPrincipalCV("ST2F4QC563WN0A0949WPH5W1YXVC4M1R46PVV4TQ4", "testSTX"), uintCV(defaultFactor), uintCV(2), standardPrincipalCV("ST1M46QGKG5RS0MRAA0J9FFDP8NMYF710AZDEJ92C")],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }


    if (!userSession.isUserSignedIn()) {
        return null;
    }

    return (
        <div>
            <p>Distributor</p>
            {/* <div>
                <button onClick={() => createPool()}>
                    Create Pool
                </button>
            </div> */}
            {/* <div>
                <button onClick={() => getFaucetTokens()}>
                    Get Test Tokens
                </button>
            </div>
            <div>
                <button onClick={() => addToPool()}>
                    Add To Pool
                </button>
            </div> */}
            {/* <div>
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
            </div> */}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <input type="number" min='0' placeholder="Enter Amount of memegoat tokens" onChange={(e) => setAmount(Number(e.target.value))} />
                <textarea placeholder="Enter Addresses" onChange={(e) => setAddresses(e.target.value)} style={{ height: '300px' }} />
                <button onClick={() => sendTokens()}>
                    Send Tokens
                </button>
            </div>

        </div>
    );
};

export default Locker;
