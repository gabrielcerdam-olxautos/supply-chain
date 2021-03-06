var SupplyChain = artifacts.require("SupplyChain");
var assert = require("assert");
const truffleAssert = require("truffle-assertions");

var supplyChain;
var upc = 1;
var ownerID;
var originFarmerID;
var distributorID;
var retailerID;
var consumerID;
const originFarmName = "John Doe";
const originFarmInformation = "Yarray Valley";
const originFarmLatitude = "-38.239770";
const originFarmLongitude = "144.341490";
var productID = upc;
const productNotes = "Best beans for Espresso";
const productPrice = web3.utils.toWei("1", "ether");
const buy = web3.utils.toWei("2", "ether");
var itemState = 0;
const emptyAddress = "0x00000000000000000000000000000000000000";

contract("Testing supply chain contract", async (accounts) => {
  ownerID = accounts[0];
  originFarmerID = accounts[1];
  distributorID = accounts[2];
  retailerID = accounts[3];
  consumerID = accounts[4];
  before("Deploy supplyChain Contract and asign roles", async () => {
    supplyChain = await SupplyChain.deployed({ from: ownerID });

    await supplyChain.addFarmer(originFarmerID, {
      from: ownerID,
    });
    await supplyChain.addDistributor(distributorID, { from: ownerID });
    await supplyChain.addRetailer(retailerID, { from: ownerID });
    await supplyChain.addConsumer(consumerID, { from: ownerID });
  });

  it("Harvest coffe item and check information of item", async () => {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    // await supplyChain.addFarmer(originFarmerID);

    var tx = await supplyChain.harvestItem(
      upc,
      originFarmerID,
      originFarmName,
      originFarmInformation,
      originFarmLatitude,
      originFarmLongitude,
      productNotes,
      { from: originFarmerID }
    );
    truffleAssert.eventEmitted(tx, "Harvested", (ev) => {
      return ev.upc.toNumber() === upc;
    });
    // Watch the emitted event Harvested()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    let resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    var resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    // console.log("eventEmitted", eventEmitted);
    assert.equal(originFarmerID, resultBufferOne["originFarmerID"]);
    assert.equal(originFarmName, resultBufferOne["originFarmName"]);
    assert.equal(originFarmLatitude, resultBufferOne["originFarmLatitude"]);
    assert.equal(
      originFarmInformation,
      resultBufferOne["originFarmInformation"]
    );
    assert.equal(originFarmLongitude, resultBufferOne["originFarmLongitude"]);
    assert.equal(productNotes, resultBufferTwo["3"]);
  });
  it("processItem", async () => {
    var tx2 = await supplyChain.processItem(upc, { from: originFarmerID });

    truffleAssert.eventEmitted(tx2, "Processed", (ev) => {
      return ev.upc.toNumber() === upc;
    });
    var resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    assert.equal(resultBufferTwo["itemState"].toNumber(), 1);
  });

  it("packItem", async () => {
    var tx3 = await supplyChain.packItem(upc, { from: originFarmerID });

    truffleAssert.eventEmitted(tx3, "Packed", (ev) => {
      return ev.upc.toNumber() === upc;
    });
    var resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    assert.equal(resultBufferTwo["itemState"].toNumber(), 2);
  });

  it("sellItem", async () => {
    var tx4 = await supplyChain.sellItem(upc, productPrice, {
      from: originFarmerID,
    });

    truffleAssert.eventEmitted(tx4, "ForSale", (ev) => {
      return ev.upc.toNumber() === upc;
    });
    var resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    let price = await web3.utils.fromWei(
      resultBufferTwo["productPrice"],
      "Wei"
    );
    assert.equal(resultBufferTwo["itemState"].toNumber(), 3);
    assert.equal(price, productPrice);
  });

  it("buyItem", async () => {
    var tx5 = await supplyChain.buyItem(upc, {
      from: distributorID,
      value: buy,
    });

    truffleAssert.eventEmitted(tx5, "Sold", (ev) => {
      return ev.upc.toNumber() === upc;
    });
    var resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    var resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    assert.equal(resultBufferTwo["itemState"].toNumber(), 4);
    assert.equal(resultBufferOne["ownerID"], distributorID);
    assert.equal(resultBufferTwo["distributorID"], distributorID);
  });

  it("shipItem", async () => {
    var tx6 = await supplyChain.shipItem(upc, { from: distributorID });

    truffleAssert.eventEmitted(tx6, "Shipped", (ev) => {
      return ev.upc.toNumber() === upc;
    });
    var resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    assert.equal(resultBufferTwo["itemState"].toNumber(), 5);
  });

  it("receiveItem", async () => {
    var tx7 = await supplyChain.receiveItem(upc, { from: retailerID });

    truffleAssert.eventEmitted(tx7, "Received", (ev) => {
      return ev.upc.toNumber() === upc;
    });
    var resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    var resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    assert.equal(resultBufferTwo["itemState"].toNumber(), 6);
    assert.equal(resultBufferOne["ownerID"], retailerID);
    assert.equal(resultBufferTwo["retailerID"], retailerID);
  });

  it("purchaseItem", async () => {
    var tx8 = await supplyChain.purchaseItem(upc, { from: consumerID });

    truffleAssert.eventEmitted(tx8, "Purchased", (ev) => {
      return ev.upc.toNumber() === upc;
    });
    var resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    var resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    assert.equal(resultBufferTwo["itemState"].toNumber(), 7);
    assert.equal(resultBufferOne["ownerID"], consumerID);
    assert.equal(resultBufferTwo["consumerID"], consumerID);
  });
});
