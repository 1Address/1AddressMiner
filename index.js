// @flow
'use strict';

// Every miner will change
const minerPrivateKey = '***';
const vanitygenDir = '../vanitygen-plus';
const vanitygenCmd = './oclvanitygen -d 2';
const gasPrice = 4 * 10**9; // 4 Gwei

// Some miners will change
const nodeUrl = 'wss://ropsten.infura.io/ws';
const explorerUrl = 'https://ropsten.etherscan.io/tx/';
const contractAddress = '0x16b0e794fEb8C4008C62269134908b12C6Ed5750';
const gasToContract = 1200000;
const abi = [{"constant":true,"inputs":[{"name":"privateKey","type":"uint256"}],"name":"bitcoinPublicKey","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"p","type":"uint256"}],"name":"invmod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[],"name":"startUpgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"endUpgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"bytes"},{"name":"b","type":"bytes"}],"name":"equalBytesToBytes","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"publicXPoint","type":"uint256"},{"name":"publicYPoint","type":"uint256"}],"name":"createBtcAddress","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"_value","type":"uint256"},{"name":"appCode","type":"bytes1"}],"name":"toBase58Checked","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"prefix","type":"bytes"},{"name":"length","type":"uint256"}],"name":"complexityForBtcAddressPrefixWithLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"},{"name":"p","type":"uint256"}],"name":"submod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"completedTasks","outputs":[{"name":"taskType","type":"uint8"},{"name":"taskId","type":"uint256"},{"name":"creator","type":"address"},{"name":"reward","type":"uint256"},{"name":"data","type":"bytes32"},{"name":"dataLength","type":"uint256"},{"name":"requestPublicXPoint","type":"uint256"},{"name":"requestPublicYPoint","type":"uint256"},{"name":"answerPrivateKey","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskId","type":"uint256"},{"name":"answerPrivateKey","type":"uint256"}],"name":"solveTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"prefix","type":"bytes"}],"name":"complexityForBtcAddressPrefix","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"taskId","type":"uint256"}],"name":"safeIndexOfTaskId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"bytes"},{"name":"b","type":"bytes"}],"name":"lengthOfCommonPrefix","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"totalReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"completedTasksCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskId","type":"uint256"},{"name":"reward","type":"uint256"}],"name":"payForTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"prefix","type":"bytes"},{"name":"length","type":"uint256"}],"name":"countBtcAddressLeadingOnes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tasks","outputs":[{"name":"taskType","type":"uint8"},{"name":"taskId","type":"uint256"},{"name":"creator","type":"address"},{"name":"reward","type":"uint256"},{"name":"data","type":"bytes32"},{"name":"dataLength","type":"uint256"},{"name":"requestPublicXPoint","type":"uint256"},{"name":"requestPublicYPoint","type":"uint256"},{"name":"answerPrivateKey","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"upgradableState","outputs":[{"name":"isUpgrading","type":"bool"},{"name":"prevVersion","type":"address"},{"name":"nextVersion","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"loser","type":"address"}],"name":"recoverLost","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"prefixArg","type":"bytes"}],"name":"requireValidBicoinAddressPrefix","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"tasksCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"source","type":"bytes"}],"name":"bytesToBytes32","outputs":[{"name":"result","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"publicXPoint","type":"uint256"},{"name":"publicYPoint","type":"uint256"}],"name":"createBtcAddressHex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"x1","type":"uint256"},{"name":"y1","type":"uint256"},{"name":"x2","type":"uint256"},{"name":"y2","type":"uint256"}],"name":"addXY","outputs":[{"name":"x3","type":"uint256"},{"name":"y3","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"x1","type":"uint256"},{"name":"y1","type":"uint256"},{"name":"privateKey","type":"uint256"}],"name":"mulXY","outputs":[{"name":"x2","type":"uint256"},{"name":"y2","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"bytes32"},{"name":"b","type":"bytes32"}],"name":"lengthOfCommonPrefix3232","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"indexOfTaskId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"prefix","type":"bytes"},{"name":"reward","type":"uint256"},{"name":"requestPublicXPoint","type":"uint256"},{"name":"requestPublicYPoint","type":"uint256"}],"name":"createBitcoinAddressPrefixTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"x1","type":"uint256"},{"name":"y1","type":"uint256"}],"name":"doubleXY","outputs":[{"name":"x2","type":"uint256"},{"name":"y2","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"bytes32"},{"name":"b","type":"bytes"}],"name":"lengthOfCommonPrefix32","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"bytes32"},{"name":"b","type":"bytes"}],"name":"equalBytes32ToBytes","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"ec","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextTaskId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_ec","type":"address"},{"name":"_token","type":"address"},{"name":"_prevVersion","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"taskId","type":"uint256"}],"name":"TaskCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"taskId","type":"uint256"}],"name":"TaskSolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"prevVersion","type":"address"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"nextVersion","type":"address"}],"name":"Upgrading","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"nextVersion","type":"address"}],"name":"Upgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

const { exec } = require('child_process');
const bs58 = require('bs58');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const BigNumber = Web3.BigNumber;

/*
$ ../vanitygen-plus/vanitygen -v 1
Prefix difficulty:                    1 1
Difficulty: 1
Using 8 worker thread(s)
Pattern: 1                                                                     
Pubkey (hex): 04a7459afcefe4a4d355309788396eb13cb79137f80527a03b5caad8c503c85dfb4b472ef03622f504f907c5c42bd1549fe895e1d0bbbd6a2d0ca6fd72fdc25500
Privkey (hex): F0F2FA207AE5432910AA3FAA4C85DDA56B4A89977A24A78BE0583125B31DC0C8
Privkey (ASN1): 308201130201010420f0f2fa207ae5432910aa3faa4c85dda56b4a89977a24a78be0583125b31dc0c8a081a53081a2020101302c06072a8648ce3d0101022100fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f300604010004010704410479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8022100fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141020101a14403420004a7459afcefe4a4d355309788396eb13cb79137f80527a03b5caad8c503c85dfb4b472ef03622f504f907c5c42bd1549fe895e1d0bbbd6a2d0ca6fd72fdc25500
Address: 1C3VkYSkoJLVZoyraVPb1oXCs6RvUfGWHN
Privkey: 5KeQJZeYM6sshKSetgRShizacvBvtSReR8DstunBTqyyVFff1XA

04
a7459afcefe4a4d355309788396eb13cb79137f80527a03b5caad8c503c85dfb
4b472ef03622f504f907c5c42bd1549fe895e1d0bbbd6a2d0ca6fd72fdc25500
*/

(async function() {
    // Accessing contract
    const web3 = new Web3(nodeUrl.startsWith('ws') ? new Web3.providers.WebsocketProvider(nodeUrl) : new Web3.providers.HttpProvider(nodeUrl));
    if (contractAddress.length != 42) {
        console.log('contractAddress should be of length 42' + (contractAddress.length == 40 ? ' Prepend with "0x".' : ''));
        return;
    }
    var contract = new web3.eth.Contract(abi, contractAddress);
    var nextVersion = 0;
    while ((nextVersion = (await contract.methods.upgradableState().call()).nextVersion) != 0) {
        contract = new web3.eth.Contract(abi, nextVersion);
        console.log('Upgraded contract to next version: ' + nextVersion);
    }

    // Accessing account
    if (minerPrivateKey.length != 66) {
        console.log('minerPrivateKey should be of length 66.' + (minerPrivateKey.length == 64 ? ' Prepend with "0x".' : ''));
        return;
    }
    const minerAccount = await web3.eth.accounts.privateKeyToAccount(minerPrivateKey);
    web3.eth.defaultAccount = minerAccount.address;
    console.log('Using account ' + minerAccount.address);

    var nonce = await web3.eth.getTransactionCount(minerAccount.address);
    console.log('Nonce = ' + nonce);

    while (true) {

        // Get all tasks
        const tasksCount = await contract.methods.tasksCount().call();
        console.log('Found ' + tasksCount + ' tasks:');

        const tasks = [];
        for (var i = 0; i < tasksCount; i++) {
            const task = await contract.methods.tasks(i).call();
            task.difficulty = await contract.methods.complexityForBtcAddressPrefixWithLength(task.data, task.dataLength).call();
            task.prefix = web3.utils.hexToAscii(task.data);
            tasks.push(task);
            console.log('Task #' + i + ': ' + task.data + ' (' +
                        task.reward/10**18 + ' VIP, ' +
                        task.difficulty/10**6 + ' MH, ' +
                        task.reward/task.difficulty/10**12 + ' VIP/MH)');
        }
        tasks.sort(function(a, b){ a.reward/a.difficulty - b.reward/b.difficulty });

        const task = tasks[0];
        const publicKey = `04${web3.utils.toHex(task.requestPublicXPoint).substr(2)}${web3.utils.toHex(task.requestPublicYPoint).substr(2)}`;
        const cmd = `${vanitygenCmd} -P ${publicKey} -Z ${minerAccount.address.substr(2,32)} ${task.prefix}`;
        console.log(cmd);
        exec(cmd, {cwd: vanitygenDir}, async function(error, stdout, stderr) {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }

            const privkeyPart = stdout.split('\n').find(line => line.startsWith('PrivkeyPart:')).split(' ')[1];
            const privkeyPartHex = bs58.decode(privkeyPart).toString('hex').substr(2,64);
            console.log(`Found solution ${privkeyPartHex} for taskId = ${task.taskId}`);

            const taskIndex = await contract.methods.indexOfTaskId(task.taskId).call();
            if (taskIndex != 0) {
                const data = contract.methods.solveTask(task.taskId, privkeyPartHex).encodeABI();
                var options = {
                    from: minerAccount.address,
                    to: contractAddress,
                    data: data,
                    gas: gasToContract,
                    gasPrice: gasPrice,
                    nonce: nonce
                };
                var tx = new Tx(options);
                tx.sign(new Buffer(minerPrivateKey.substr(2), 'hex'));
                var serializedTx = tx.serialize();

                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                .on('transactionHash', function(hash){
                    console.log(`Sending transaction ${explorerUrl}${hash}`);
                })
                .on('receipt', function(receipt){
                    console.log(`Transaction was mined.`);
                })
                .on('error', console.error);
            } else {
                console.log('Task was already solved');
            }
        });

        return; // TODO: rm
    }

})();
