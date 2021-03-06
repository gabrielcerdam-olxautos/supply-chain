const App = {
  web3Provider: null,
  contracts: {},
  emptyAddress: "0x0000000000000000000000000000000000000000",
  sku: 0,
  upc: 0,
  metamaskAccountID: "0x0000000000000000000000000000000000000000",
  ownerID: "0x0000000000000000000000000000000000000000",
  originFarmerID: "0x0000000000000000000000000000000000000000",
  originFarmName: null,
  originFarmInformation: null,
  originFarmLatitude: null,
  originFarmLongitude: null,
  productNotes: null,
  productPrice: 0,
  distributorID: "0x0000000000000000000000000000000000000000",
  retailerID: "0x0000000000000000000000000000000000000000",
  consumerID: "0x0000000000000000000000000000000000000000",

  init: async function () {
    App.readForm();
    /// Setup access to blockchain
    return await App.initWeb3();
  },

  readForm: function () {
    console.log({ app: App });
    App.sku = $("#sku").val();
    App.upc = $("#upc").val();
    App.ownerID = $("#ownerID").val();
    App.originFarmerID = $("#originFarmerID").val();
    App.originFarmName = $("#originFarmName").val();
    App.originFarmInformation = $("#originFarmInformation").val();
    App.originFarmLatitude = $("#originFarmLatitude").val();
    App.originFarmLongitude = $("#originFarmLongitude").val();
    App.productNotes = $("#productNotes").val();
    App.productPrice = $("#productPrice").val();
    App.distributorID = $("#distributorID").val();
    App.retailerID = $("#retailerID").val();
    App.consumerID = $("#consumerID").val();

    console.log({
      sku: App.sku,
      upc: App.upc,
      ownerID: App.ownerID,
      originFarmerID: App.originFarmerID,
      originFarmName: App.originFarmName,
      originFarmInformation: App.originFarmInformation,
      originFarmLatitude: App.originFarmLatitude,
      originFarmLongitude: App.originFarmLongitude,
      productNotes: App.productNotes,
      productPrice: App.productPrice,
      distributorID: App.distributorID,
      retailerID: App.retailerID,
      consumerID: App.consumerID,
    });
  },

  initWeb3: async function () {
    /// Find or Inject Web3 Provider
    /// Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      } catch (error) {
        // User denied account access...
        console.error("error: " + "User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new providers.HttpProvider("http://localhost:7545");
    }

    App.getMetaskAccountID();

    return await App.initSupplyChain();
  },

  getMetaskAccountID: function () {
    web3 = new Web3(App.web3Provider);

    // Retrieving accounts
    web3.eth.getAccounts(function (err, res) {
      if (err) {
        console.log("Error:", err);
        return;
      }
      console.log("getMetaskID:", res);
      App.metamaskAccountID = res[0];
    });
  },

  initSupplyChain: async function () {
    /// Source the truffle compiled smart contracts
    var jsonSupplyChain = "../../build/contracts/SupplyChain.json";
    /// JSONfy the smart contracts
    $.getJSON(jsonSupplyChain, function (data) {
      var SupplyChainArtifact = data;
      App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
      App.contracts.SupplyChain.setProvider(App.web3Provider);
      // console.log("App.contracts.SupplyChain", App.contracts.SupplyChain);
      App.fetchItemBufferOne();
      App.fetchItemBufferTwo();
      App.fetchEvents();

      // To test
    });

    return App.bindEvents();
  },

  // async assignRoles(role) {
  //   try {
  //     const instance = await Appy.contracts.SupplyChain.deployed();
  //     const addFarmer = await instance.addFarmer(App.originFarmerID, {
  //       from: App.metamaskAccountID,
  //     });
  //     console.log("addFarmer", addFarmer);
  //     const addDistributor = await instance.addDistributor(App.distributorID, {
  //       from: App.metamaskAccountID,
  //     });
  //     console.log("addDistributor", addDistributor);
  //     const addRetailer = await instance.addRetailer(App.retailerID, {
  //       from: App.metamaskAccountID,
  //     });
  //     console.log("addRetailer", addRetailer);
  //     const addConsumer = await instance.addConsumer(App.consumerID, {
  //       from: App.metamaskAccountID,
  //     });
  //     console.log("addConsumer", addConsumer);
  //   } catch (error) {
  //     console.error("assignRoles", error);
  //   }
  // },

  bindEvents: function () {
    $(document).on("click", App.handleButtonClick);
  },

  handleButtonClick: async function (event) {
    var processId = parseInt($(event.target).data("id"));
    if (!processId) {
      return;
    }
    App.readForm();

    App.getMetaskAccountID();

    switch (processId) {
      case 1:
        return await App.harvestItem(event);
        break;
      case 2:
        return await App.processItem(event);
        break;
      case 3:
        return await App.packItem(event);
        break;
      case 4:
        return await App.sellItem(event);
        break;
      case 5:
        return await App.buyItem(event);
        break;
      case 6:
        return await App.shipItem(event);
        break;
      case 7:
        return await App.receiveItem(event);
        break;
      case 8:
        return await App.purchaseItem(event);
        break;
      case 9:
        return await App.fetchItemBufferOne(event);
        break;
      case 10:
        return await App.fetchItemBufferTwo(event);
        break;
      case 11:
        return await App.uploadFile(event);
        break;
      case 12:
        return await App.readFile(event);
        break;
    }
  },

  harvestItem: function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.harvestItem(
          App.upc,
          App.metamaskAccountID,
          App.originFarmName,
          App.originFarmInformation,
          App.originFarmLatitude,
          App.originFarmLongitude,
          App.productNotes,
          { from: App.metamaskAccountID }
        );
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("harvestItem", result);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  processItem: function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.processItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("processItem", result);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  packItem: function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.packItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("packItem", result);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  sellItem: function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(async function (instance) {
        let productPrice = await web3.utils.toWei(App.productPrice, "ether");
        return instance.sellItem(App.upc, productPrice, {
          from: App.metamaskAccountID,
        });
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("sellItem", result);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  buyItem: function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        const toPay = web3.utils.toWei("2", "ether");
        return instance.buyItem(App.upc, {
          from: App.metamaskAccountID,
          value: toPay,
        });
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("buyItem", result);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  shipItem: function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.shipItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("shipItem", result);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  receiveItem: function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.receiveItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("receiveItem", result);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  purchaseItem: function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.purchaseItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("purchaseItem", result);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
    App.upc = $("#upc").val();
    console.log("upc", App.upc);

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.fetchItemBufferOne(App.upc);
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("fetchItemBufferOne", result);
      })
      .catch(function (err) {
        console.error("error: " + err.message);
      });
  },

  fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.fetchItemBufferTwo.call(App.upc);
      })
      .then(function (result) {
        $("#ftc-item").text(result);
        console.log("fetchItemBufferTwo", result);
      })
      .catch(function (err) {
        console.error("error: " + err.message);
      });
  },

  fetchEvents: function () {
    if (
      typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function"
    ) {
      App.contracts.SupplyChain.currentProvider.sendAsync = function () {
        return App.contracts.SupplyChain.currentProvider.send.apply(
          App.contracts.SupplyChain.currentProvider,
          arguments
        );
      };
    }

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        var events = instance.allEvents(function (err, log) {
          console.log({ err, log });
          if (!err)
            $("#ftc-events").append(
              "<li>" + log.event + " - " + log.transactionHash + "</li>"
            );
        });
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },
  uploadFile: async function (event) {
    console.log("uploadFile", event);
  },
  readFile: async function (event) {
    console.log("readFile", event);
  },
  convertBase64: function (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  },
  handleFile: async function (event) {
    const file = event.target.files[0];
    if (!file) {
      $("#file-content").attr("src", "");
      return;
    }
    const base64 = await App.convertBase64(file);
    $("#file-content").attr("src", base64);
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
  $("#FarmImage").on("change", function (ev) {
    App.handleFile(ev);
  });
});
