import { useConnect } from "@stacks/connect-react";
import {
    AnchorMode,
    PostConditionMode,
    standardPrincipalCV,
    uintCV,
    makeStandardSTXPostCondition
} from "@stacks/transactions";
import { userSession } from "../user-session";
import { network, contractAddress } from "../network";
import {
    StacksMocknet,
    StacksMainnet,
    // StacksTestnet,
} from "@stacks/network";
import {
    FungibleConditionCode,
    createAssetInfo,
    makeStandardFungiblePostCondition,
} from '@stacks/transactions';


const Launchpad = () => {
    const { doContractCall } = useConnect();

    const userPrincipal = userSession.isUserSignedIn() ? userSession.loadUserData().profile.stxAddress.mainnet : "";

    // With a standard principal
    const postConditionAddress = userPrincipal;
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = 500000000000000n;
    const assetAddress = contractAddress;
    const assetContractName = 'memegoatstx';
    const assetName = 'memegoatstx'
    const fungibleAssetInfo = createAssetInfo(assetAddress, assetContractName, assetName);

    const standardFungiblePostCondition = makeStandardFungiblePostCondition(
        postConditionAddress,
        postConditionCode,
        postConditionAmount,
        fungibleAssetInfo
    );

    // const amount = 50000000000;

    const test = new StacksMocknet()

    const getUserPrincipal = () => {
        const userPrincipal = userSession.isUserSignedIn()
            ? userSession.loadUserData().profile.stxAddress.testnet
            : "";
        return userPrincipal;
    };


    // With a contract principal
    // const contractAddress = 'SPBMRFRPPGCDE3F384WCJPK8PQJGZ8K9QKK7F59X';
    // const contractName = 'memegoat-launchpad-v1';
    // const assetAddress = 'SP62M8MEFH32WGSB7XSF9WJZD7TQB48VQB5ANWSJ';
    // const assetContractName = 'test-asset-contract';
    // const fungibleAssetInfo = createAssetInfo(assetAddress, assetContractName);

    // const contractFungiblePostCondition = makeContractFungiblePostCondition(
    //     contractAddress,
    //     contractName,
    //     postConditionCode,
    //     postConditionAmount,
    //     fungibleAssetInfo
    // );


    const blockNumber = 200;
    // mocknet https://explorer.hiro.so/txid/${data.txId}?chain=testnet&api=http://localhost:3999

    function setDuration() {
        doContractCall({
            network: test,
            anchorMode: AnchorMode.Any,
            contractAddress: 'STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W',
            contractName: "memegoat-launchpad-v1",
            functionName: "set-duration",
            functionArgs: [uintCV(blockNumber)],
            postConditionMode: PostConditionMode.Deny,
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

    function fundLaunchpad() {
        doContractCall({
            network,
            anchorMode: AnchorMode.Any,
            contractAddress,
            contractName: "memegoat-distributor-v1",
            functionName: "fund-vault",
            functionArgs: [],
            postConditionMode: PostConditionMode.Deny,
            postConditions: [standardFungiblePostCondition],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}`,
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
            network: new StacksMainnet(),
            anchorMode: AnchorMode.Any,
            contractAddress: 'SP2F4QC563WN0A0949WPH5W1YXVC4M1R46QKE0G14',
            contractName: "memegoat-vault-v1",
            functionName: "transfer-stx",
            functionArgs: [uintCV(50000000000), standardPrincipalCV('SP2F4QC563WN0A0949WPH5W1YXVC4M1R46QKE0G14')],
            postConditionMode: PostConditionMode.Allow,
            postConditions: [],
            onFinish: (data) => {
                console.log("onFinish:", data);
                window
                    .open(
                        `https://explorer.hiro.so/txid/${data.txId}`,
                        "_blank"
                    )
                    ?.focus();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }



    function depositSTX() {
        const amount = 80;
        if (!amount) return;

        const userPrincipal = getUserPrincipal();
        if (userPrincipal == "") {
            return;
        }

        // With a standard principal
        const postConditionAddress = userPrincipal;
        const postConditionCode = FungibleConditionCode.GreaterEqual;
        const postConditionAmount = BigInt(20 * 1000000);

        const standardSTXPostCondition = makeStandardSTXPostCondition(
            postConditionAddress,
            postConditionCode,
            postConditionAmount
        );


        const postConditionCode1 = FungibleConditionCode.LessEqual;
        const postConditionAmount1 = BigInt(200 * 1000000);

        const standardSTXPostCondition1 = makeStandardSTXPostCondition(
            postConditionAddress,
            postConditionCode1,
            postConditionAmount1
        );

        doContractCall({
            network: test,
            anchorMode: AnchorMode.Any,
            contractAddress: 'STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W',
            contractName: "memegoat-launchpad-v1",
            functionName: "deposit-stx",
            functionArgs: [
                uintCV(amount * 1000000),
            ],
            postConditionMode: PostConditionMode.Deny,
            postConditions: [standardSTXPostCondition, standardSTXPostCondition1],
            onFinish: async (data) => {
                console.log(data)
                // storePendingTxn("Buy Presale", data.txId, amount.toString());
                // getStoredPendingTransactions();
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
            },
        });
    }

    // function bburn() {
    //     doContractCall({
    //         network: test,
    //         anchorMode: AnchorMode.Any,
    //         contractAddress: userPrincipal,
    //         contractName: "memegoatstxV2",
    //         functionName: "burn",
    //         functionArgs: [uintCV(amount), standardPrincipalCV(userPrincipal)],
    //         postConditionMode: PostConditionMode.Allow,
    //         postConditions: [],
    //         onFinish: (data) => {
    //             console.log("onFinish:", data);
    //             window
    //                 .open(
    //                     `https://explorer.hiro.so/txid/${data.txId}`,
    //                     "_blank"
    //                 )
    //                 ?.focus();
    //         },
    //         onCancel: () => {
    //             console.log("onCancel:", "Transaction was canceled");
    //         },
    //     });
    // }



    // function depositSTX() {
    //     doContractCall({
    //         network,
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "memegoat-launchpad-v1",
    //         functionName: "deposit-stx",
    //         functionArgs: [uintCV(amount)],
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


    // function transferSTX() {
    //     doContractCall({
    //         network,
    //         anchorMode: AnchorMode.Any,
    //         contractAddress,
    //         contractName: "memegoat-vault-v1",
    //         functionName: "transfer-stx",
    //         functionArgs: [uintCV(amount), standardPrincipalCV("ST1M46QGKG5RS0MRAA0J9FFDP8NMYF710AZDEJ92C")],
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


    function startPresale() {
        doContractCall({
            network: test,
            anchorMode: AnchorMode.Any,
            contractAddress: 'STHSSNNW4X73WMDB5XZV387WME91DQCNZMEK833W',
            contractName: "memegoat-launchpad-v1",
            functionName: "start-presale",
            functionArgs: [],
            postConditionMode: PostConditionMode.Deny,
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
                <button onClick={() => setDuration()}>
                    Set Duration
                </button>
            </div>
            <div>
                <button onClick={() => withdrawToken()}>
                    Fund Launchpad
                </button>
            </div>
            <div>
                <button onClick={() => startPresale()}>
                    Start Presale
                </button>
            </div>

            <div>
                <button onClick={() => depositSTX()}>
                    Deposit
                </button>
            </div>
            <div>
                <button onClick={() => fundLaunchpad()}>
                    Deposit GOATSTX
                </button>
            </div>
        </div>
    );
};

export default Launchpad;
