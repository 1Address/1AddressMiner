// @flow
'use strict';

// Every miner will change
const minerPrivateKey = '***';
const vanitygenDir = '../vanitygen-plus';
const vanitygenCmd = './oclvanitygen -d 2';
const gasPrice = 2e9; // 2 Gwei

// Some miners will change
const args = process.argv.splice(process.execArgv.length + 2); // https://stackoverflow.com/a/5767589/440168
const ethnet = args[0] || 'mainnet';
const nodeUrl = {
    'mainnet':'wss://mainnet.infura.io/ws',
    'ropsten':'wss://ropsten.infura.io/ws',
}[ethnet];
const explorerUrl = {
    'mainnet':'https://etherscan.io/tx/',
    'ropsten':'https://ropsten.etherscan.io/tx/',
}[ethnet];
const contractAddress = {
    'mainnet':'0x7a848abebea15a4bc2c27a40fa78f44c3daecd2c',
    'ropsten':'0x16b0e794fEb8C4008C62269134908b12C6Ed5750',
}[ethnet];
if (!contractAddress) {
    console.log(`Unknown network name "${ethnet}"`);
    return;
}
const abi = [{"constant":true,"inputs":[],"name":"MAX_PERCENT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"indexOfActiveTaskId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"}],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"startUpgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"prefixArg","type":"bytes"}],"name":"isValidBicoinAddressPrefix","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[],"name":"endUpgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"publicXPoint","type":"uint256"},{"name":"publicYPoint","type":"uint256"}],"name":"createBtcAddress","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"taskIds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_value","type":"uint256"},{"name":"appCode","type":"bytes1"}],"name":"toBase58Checked","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"prefix","type":"bytes"},{"name":"length","type":"uint256"}],"name":"complexityForBtcAddressPrefixWithLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"name":"isValidPublicKey","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allTasks","outputs":[{"name":"taskId","type":"uint256"},{"name":"creator","type":"address"},{"name":"referrer","type":"address"},{"name":"reward","type":"uint256"},{"name":"data","type":"bytes32"},{"name":"requestPublicXPoint","type":"uint256"},{"name":"requestPublicYPoint","type":"uint256"},{"name":"answerPrivateKey","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"completedTasks","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_size","type":"uint256"}],"name":"upgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint256"}],"name":"payForTask","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"prefix","type":"bytes"}],"name":"complexityForBtcAddressPrefix","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_serviceFee","type":"uint256"}],"name":"setServiceFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getActiveTasks","outputs":[{"name":"t_taskIds","type":"uint256[]"},{"name":"t_creators","type":"address[]"},{"name":"t_rewards","type":"uint256[]"},{"name":"t_datas","type":"bytes32[]"},{"name":"t_requestPublicXPoints","type":"uint256[]"},{"name":"t_requestPublicYPoints","type":"uint256[]"},{"name":"t_answerPrivateKeys","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCompletedTasks","outputs":[{"name":"t_taskIds","type":"uint256[]"},{"name":"t_creators","type":"address[]"},{"name":"t_rewards","type":"uint256[]"},{"name":"t_datas","type":"bytes32[]"},{"name":"t_requestPublicXPoints","type":"uint256[]"},{"name":"t_requestPublicYPoints","type":"uint256[]"},{"name":"t_answerPrivateKeys","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"completedTaskIds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"referrerFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allTasksCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"completedTasksCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"prefix","type":"bytes"},{"name":"length","type":"uint256"}],"name":"countBtcAddressLeadingOnes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"serviceFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"tasks","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"indexOfCompletedTaskId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"upgradableState","outputs":[{"name":"isUpgrading","type":"bool"},{"name":"prevVersion","type":"address"},{"name":"nextVersion","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"prefix","type":"bytes"},{"name":"requestPublicXPoint","type":"uint256"},{"name":"requestPublicYPoint","type":"uint256"},{"name":"referrer","type":"address"}],"name":"createBitcoinAddressPrefixTask","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"tasksCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"source","type":"bytes"}],"name":"bytesToBytes32","outputs":[{"name":"result","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"publicXPoint","type":"uint256"},{"name":"publicYPoint","type":"uint256"}],"name":"createBtcAddressHex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint256"},{"name":"_answerPrivateKey","type":"uint256"},{"name":"publicXPoint","type":"uint256"},{"name":"publicYPoint","type":"uint256"}],"name":"solveTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"bytes32"},{"name":"b","type":"bytes32"}],"name":"haveCommonPrefixUntilZero","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"indexOfTaskId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_referrerFee","type":"uint256"}],"name":"setReferrerFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ec","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextTaskId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_ec","type":"address"},{"name":"_prevVersion","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"taskId","type":"uint256"}],"name":"TaskCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"taskId","type":"uint256"},{"indexed":false,"name":"reward","type":"uint256"}],"name":"TaskSolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"taskId","type":"uint256"},{"indexed":false,"name":"value","type":"uint256"}],"name":"TaskPayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"prevVersion","type":"address"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"nextVersion","type":"address"}],"name":"Upgrading","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"nextVersion","type":"address"}],"name":"Upgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];;

const { exec, spawn } = require('child_process');
const bitcore = require('bitcore-lib');
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

let web3;
let app;
let proc = null;
let foundTask;
let foundPrivkeyPartHex;

process.on('unhandledRejection', async function(reason, p) {
    console.log('Unhandled Rejection at: Promise', p, '\nreason:', reason, '\nstack:', reason.stack);
    if (proc) {
        proc.kill('SIGINT');
        proc = null;
    }
    web3.setProvider(nodeUrl.startsWith('ws') ? new Web3.providers.WebsocketProvider(nodeUrl) : new Web3.providers.HttpProvider(nodeUrl));
    await app();
});

(app = async function() {
    // Accessing contract
    web3 = new Web3(nodeUrl.startsWith('ws') ? new Web3.providers.WebsocketProvider(nodeUrl) : new Web3.providers.HttpProvider(nodeUrl));
    if (contractAddress.length != 42) {
        console.log('contractAddress should be of length 42' + (contractAddress.length == 40 ? ' Prepend with "0x".' : ''));
        return;
    }
    let contract = new web3.eth.Contract(abi, contractAddress);

    // Accessing account
    if (minerPrivateKey.length != 66) {
        console.log('minerPrivateKey should be of length 66.' + (minerPrivateKey.length == 64 ? ' Prepend with "0x".' : ''));
        return;
    }
    const minerAccount = await web3.eth.accounts.privateKeyToAccount(minerPrivateKey);
    web3.eth.defaultAccount = minerAccount.address;
    console.log('Using account ' + minerAccount.address);

    let nonce = await web3.eth.getTransactionCount(minerAccount.address);
    console.log('Nonce = ' + nonce);

    let subscription = null;
    let transactionPromise = null;

    async function submitSolution() {
        const taskIndex = await contract.methods.indexOfTaskId(foundTask.taskId).call();
        if (taskIndex == 0) {
            console.log('Task #' + foundTask.taskId + ' was already solved by someone');
            foundTask = null;
            foundPrivkeyPartHex = null;
            return;
        }

        const privateKey = new bitcore.PrivateKey(foundPrivkeyPartHex);
        const publicKey = privateKey.toPublicKey();
        const pubX = '0x' + publicKey.point.x.toString(16, 64).toUpperCase();
        const pubY = '0x' + publicKey.point.y.toString(16, 64).toUpperCase();

        console.log(`Submitting solution ${foundPrivkeyPartHex} for taskId = ${foundTask.taskId}`);
        const data = contract.methods.solveTask(foundTask.taskId, '0x' + foundPrivkeyPartHex, pubX, pubY).encodeABI();
        const estimateGas = await contract.methods.solveTask(foundTask.taskId, '0x' + foundPrivkeyPartHex, pubX, pubY).estimateGas({from: minerAccount.address});
        let options = {
            from: minerAccount.address,
            to: contract.options.address,
            data: data,
            gas: estimateGas,
            gasPrice: gasPrice,
            nonce: nonce
        };
        let tx = new Tx(options);
        tx.sign(new Buffer(minerPrivateKey.substr(2), 'hex'));
        let serializedTx = tx.serialize();

        let resolve;
        const promise = new Promise(done => resolve = done);
        await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('transactionHash', function(hash) {
                console.log(`Sending transaction ${explorerUrl}${hash}`);
            })
            .on('error', function(error) {
                console.error(error);
                resolve();
            })
            .then(function(receipt) {
                console.log(`Transaction was mined.`);
                foundTask = null;
                foundPrivkeyPartHex = null;
                nonce++;
                resolve();
            });
        await promise;
    }

    while (true) {
        // Move to the latest contract
        let nextVersion = 0;
        while ((nextVersion = (await contract.methods.upgradableState().call()).nextVersion) != 0) {
            contract = new web3.eth.Contract(abi, nextVersion);
            if (proc) {
                return;
            }
            console.log('Upgraded contract to next version: ' + contract.options.address);
        }

        if ((await contract.methods.upgradableState().call()).isUpgrading) {
            if (proc) {
                return;
            }
            console.log('Waiting until contract upgrade finished');
            await new Promise(done => setTimeout(done, 5000));
            continue;
        }

        if (foundTask) {
            await submitSolution();
        }
        if (proc) {
            return;
        }

        // Resubscribe
        if (subscription != null) {
            subscription.unsubscribe(function(error, success) {
                if (error) {
                    console.log('Error while unsubscribing: ' + error);
                }
            });
        }
        subscription = web3.eth.subscribe('logs', {
            address: contract.options.address,
            topics: [
                web3.utils.sha3('TaskCreated(uint256)'),
                web3.utils.sha3('TaskSolved(uint256,uint256)'),
                web3.utils.sha3('TaskPayed(uint256,uint256)'),
                web3.utils.sha3('Upgraded(address)'),
            ]
        }, function(error, result) {
            if (error) {
                console.log('Error: ' + error);
            } else {
                console.log('Subscription: ' + result);
            }

            if (proc) {
                proc.kill('SIGINT');
            }
        });

        // Get all tasks
        const tasksCount = await contract.methods.tasksCount().call();
        console.log('Fetching ' + tasksCount + ' active tasks...');
        let promises = [];
        for (let i = 0; i < tasksCount; i++) {
            promises.push(contract.methods.tasks(i).call().then(async function(res) {
                const task = {};
                task.taskId = res[0];
                task.creator = res[1];
                task.referrer = res[2];
                task.reward = res[3];
                task.data = res[4];
                task.requestPublicXPoint = res[5];
                task.requestPublicYPoint = res[6];
                task.answerPrivateKey = res[7];
                task.prefix = web3.utils.hexToAscii(task.data).replace(/\0/g, '');
                task.difficulty = await contract.methods.complexityForBtcAddressPrefixWithLength(task.data, task.prefix.length).call();
                return task;
            }));
        }
        const tasks = await Promise.all(promises);
        if (proc) {
            return;
        }
        tasks.sort((b,a) => a.reward / a.difficulty - b.reward / b.difficulty);
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            console.log('Task #' + task.taskId + ': ' + web3.utils.toAscii(task.data) + ' (' +
                    task.reward/10**18 + ' ETH, ' +
                    task.difficulty/10**9 + ' GH, ' +
                    task.reward/task.difficulty/10**9 + ' ETH/GH)');
        }

        if (tasks.length == 0) {
            await new Promise(done => setTimeout(done, 5000));
            continue;
        }

        if (proc) {
            return;
        }

        const task = tasks[0];
        const publicKey = `04${web3.utils.padLeft(web3.utils.toHex(task.requestPublicXPoint).substr(2),64)}${web3.utils.padLeft(web3.utils.toHex(task.requestPublicYPoint).substr(2),64)}`;
        const cmd = `${vanitygenCmd} -P ${publicKey} -Z ${minerAccount.address.substr(2,32)} ${task.prefix}`;
        console.log(cmd);
        transactionPromise = new Promise(resolve => proc = exec(cmd, {cwd: vanitygenDir, detached: true}, async function(e, stdout, stderr) {
            if (e instanceof Error) {
                console.error(e);
                throw e;
            }

            const privkeyPart = stdout.split(require('os').EOL)
                                      .find(line => line.startsWith('PrivkeyPart:'))
                                      .split(' ')[1];
            const privkeyPartHex = bs58.decode(privkeyPart).toString('hex').substr(2,64);
            console.log(`Found solution ${privkeyPartHex} for taskId = ${task.taskId}`);

            foundTask = task;
            foundPrivkeyPartHex = privkeyPartHex;
            await submitSolution();
            resolve();
        }));

        // Await process termination
        await new Promise(done => proc.on('close', async function(code) {
            proc = null;
            if (code == 0) {
                await transactionPromise;
            }
            done();
        }));
    }

})();
