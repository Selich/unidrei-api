import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PrivateDocumentInput,
  Document,
  RequestDocumentInput,
  SignInput,
} from '../schema/app.schema';
import algosdk from 'algosdk';
import fs from 'fs/promises';
import crypto from 'crypto';
import { env } from 'process';

async function createAsset(algodClient: any, alice: any) {
  console.log('');
  console.log('==> CREATE ASSET');
  //Check account balance
  const accountInfo = await algodClient.accountInformation(alice.addr).do();
  const startingAmount = accountInfo.amount;
  console.log('Alice account balance: %d microAlgos', startingAmount);

  const params = await algodClient.getTransactionParams().do();
  const defaultFrozen = false;
  const unitName = 'ALICEART';
  const assetName = "Alice's Artwork@arc3";
  const url = 'https://picsum.photos/200/300';
  const managerAddr = alice.addr; // OPTIONAL: FOR DEMO ONLY, USED TO DESTROY ASSET WITHIN
  const reserveAddr = undefined;
  const freezeAddr = undefined;
  const clawbackAddr = undefined;

  const decimals = 0;
  const total = 1; // how many of this asset there will be

  //   const fullPath = '../../metadata.json';
  //   const metadatafile = await fs.readFile(fullPath);
  //   const hash = crypto.createHash('sha256');
  //   hash.update(metadatafile);

  //   const metadata = new Uint8Array(hash.digest()); // use this in your code

  // //   const fullPathImage = __dirname + '/NFT/alice-nft.png';
  // //   const metadatafileImage = await fs.readFile(fullPathImage);
  // //   const hashImage = crypto.createHash('sha256');
  //   hashImage.update(metadatafileImage);
  //   const hashImageBase64 = hashImage.digest('base64');
  //   const imageIntegrity = 'sha256-' + hashImageBase64;

  //   console.log('image_integrity : ' + imageIntegrity);
  const accountSKArray = new Uint8Array([
    113, 39, 235, 189, 185, 21, 217, 193, 83, 185, 143, 127, 93, 170, 135, 211,
    246, 205, 134, 227, 9, 219, 229, 12, 22, 192, 123, 214, 15, 90, 138, 254,
    192, 67, 143, 31, 240, 60, 113, 32, 21, 28, 253, 153, 247, 97, 218, 148,
    159, 103, 43, 21, 22, 98, 169, 102, 90, 184, 5, 108, 100, 110, 80, 21,
  ]);

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: alice.addr,
    total,
    decimals,
    assetName,
    unitName,
    assetURL: url,
    // assetMetadataHash: metadata,
    defaultFrozen,
    freeze: freezeAddr,
    manager: managerAddr,
    clawback: clawbackAddr,
    reserve: reserveAddr,
    suggestedParams: params,
  });
  const enc = new TextDecoder('utf-8');

  const rawSignedTxn = txn.signTxn(accountSKArray);
  const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
  let assetID = null;
  const confirmedTxn = await algosdk.waitForConfirmation(
    algodClient,
    tx.txId,
    4,
  );
  console.log(
    'Transaction ' +
      tx.txId +
      ' confirmed in round ' +
      confirmedTxn['confirmed-round'],
  );
  assetID = confirmedTxn['asset-index'];
  const transaction = tx.txId;
  const round = confirmedTxn['confirmed-round'];

  return {
    assetID,
    transaction,
    round,
  };
}

const tumAddress = 'MHRESQQ66SAY7IA524HER46UIDNEP6AFLREBGRJSLLLKZ7DWF6D5QOYYUA';
const pk =
  'photo leave draft decide example decade kingdom side script today sketch weapon evil abandon hurry unhappy wedding butter silk acoustic brush video zero abstract pilot';
@Resolver(() => Document)
export class AppResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello';
  }

  @Mutation(() => String)
  async sign(@Args('input') input: SignInput): Promise<string> {
    const { signedTxn, address, txId } = input;
    const algodClient = new algosdk.Algodv2(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'http://localhost',
      4001,
    );
    const mparams = {
      version: 1,
      threshold: 2,
      addrs: [address, tumAddress],
    };
    const account = await algosdk.mnemonicToSecretKey(pk);

    const array = signedTxn.split(',').map(Number);

    const temp = new Uint8Array(array);

    // const twosigs = algosdk.appendSignMultisigTransaction(
    //   temp,
    //   mparams,
    //   account.sk,
    // ).blob;

    // console.log(twosigs);

    // await algodClient.sendRawTransaction(twosigs).do();
    // const confirmedTxn = await algosdk.waitForConfirmation(
    //   algodClient,
    //   txId,
    //   4,
    // );
    // if (confirmedTxn) {
    return 'https://transcript-nselic.s3.eu-central-1.amazonaws.com/test.pdf';
    // } else {
    //   throw new Error('Transaction not confirmed');
    // }
  }
  @Mutation(() => String)
  async mint(@Args('input') input: MintInput): Promise<string> {
    return 'https://awstip.com/setting-up-simple-aws-s3-bucket-in-react-bf7e2c3d7e3e';
  }

  @Mutation(() => String)
  async fileUpload(
    @Args('input') input: PrivateDocumentInput,
  ): Promise<string> {
    const accountAddress =
      'YBBY6H7QHRYSAFI47WM7OYO2SSPWOKYVCZRKSZS2XACWYZDOKAK3QSLZWI';
    const accountSK =
      '113,39,235,189,185,21,217,193,83,185,143,127,93,170,135,211,246,205,134,227,9,219,229,12,22,192,123,214,15,90,138,254,192,67,143,31,240,60,113,32,21,28,253,153,247,97,218,148,159,103,43,21,22,98,169,102,90,184,5,108,100,110,80,21';
    const accountSKArray = [
      113, 39, 235, 189, 185, 21, 217, 193, 83, 185, 143, 127, 93, 170, 135,
      211, 246, 205, 134, 227, 9, 219, 229, 12, 22, 192, 123, 214, 15, 90, 138,
      254, 192, 67, 143, 31, 240, 60, 113, 32, 21, 28, 253, 153, 247, 97, 218,
      148, 159, 103, 43, 21, 22, 98, 169, 102, 90, 184, 5, 108, 100, 110, 80,
      21,
    ];
    const accountMnemonic =
      'until prosper ten fortune rate vacant skin moral quiz practice sense honey orbit ticket excuse swallow original flag theme guilt cabbage notable violin abstract soul';
    try {
      const algodToken =
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      const algodServer = 'http://localhost';
      const algodPort = 4001;
      const alice = {
        addr: accountAddress,
        sk: accountSK,
      };
      const algodClient = new algosdk.Algodv2(
        algodToken,
        algodServer,
        algodPort,
      );

      // CREATE ASSET
      const { assetID, transaction, round } = await createAsset(
        algodClient,
        alice,
      );
      // // DESTROY ASSET
      // await destroyAsset(algodClient, alice, assetID);
      // // CLOSEOUT ALGOS - Alice closes out Alogs to dispenser
      // await closeoutAliceAlgos(algodClient, alice);
      return transaction;
    } catch (err) {
      console.log('err', err);
    }
    // const mintResponse = await this.appService.mint(
    //   input.targetTwinId,
    //   input.targetAddress,
    // );
    // return mintResponse;
  }
}
