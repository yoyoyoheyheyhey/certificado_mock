function sendData() {
  const text = document.querySelector(".data").value;
  let data = text.split("\n");
  data = data.map(function(x) { return {"key": x.split(" ")[0], "value": x, "type": "string"}} );
  const tx = {
      type: 12, // data transaction
      data: {
        data: data,
        fee: {
          "tokens": "0.001",
          "assetId": "WAVES"
        }
      }
  };
  WavesKeeper.signAndPublishTransaction(tx);
  return text;
};

function checkData() {
    const text = document.querySelector(".data").value.split("\n")[0];
    const certificateId = text.split(" ")[0];

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://nodes-testnet.wavesnodes.com/addresses/data/3MzNriGtbH3iWV2N6fKYmWVHSwv9gb5HARG/"+certificateId);
    xhr.onload  = function() {
        const doesExist = JSON.parse(xhr.response).value === text;
        document.querySelector(".result").innerHTML =
          doesExist
            ? "<span style='color: green'><strong>certificado</strong> exists</span>"
            : "<span style='color: red'><strong>certificado</strong> does not exist</span>";
        return doesExist;
    };
    xhr.send();
}