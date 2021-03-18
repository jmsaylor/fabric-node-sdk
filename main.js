/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

async function main(action, payload) {
  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, "MiniGwConnection.json");
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    console.log(ccp);

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(
      __dirname,
      "config/vscode/wallets",
      "org0.example.com"
    );
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get("Admin");

    if (!identity) {
      console.log("Admin identity can not be found in the wallet");
      return;
    }

    const gateway = new Gateway();
    console.log("check1");
    await gateway.connect(ccp, {
      wallet,
      identity: "Admin",
      discovery: { enabled: true, asLocalhost: false },
    });
    console.log("check2");

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    console.log("check3");
    // Get the contract from the network.
    const contract = network.getContract("simple");
    console.log("check4");

    let result = "";

    console.log(action);
    console.log(payload);

    switch (action) {
      case "QUERY":
        const { id } = payload;
        const query = await contract.submitTransaction("query", [id]);
        result = query.toString();
        break;
      case "TRANSFER":
        const { id_1, id_2, amount } = payload;
        // const args = Array.from(id_1, id_2, amount);
        // console.log(args);
        // console.log(args.length);
        const ok = await contract.submitTransaction(
          "invoke",
          id_1,
          id_2,
          amount
        );
        if (ok) result = "OK";
        break;
      default:
        result = "Unidentified action";
    }
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.log(error);
    console.error(`Failed to enroll admin user "admin": ${error}`);
    process.exit(1);
  } finally {
  }
}

module.exports.main = main;
