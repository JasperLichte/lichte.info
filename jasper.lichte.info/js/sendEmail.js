addEventListener("load", () => {
  const inputNodes = {
    name: document.querySelector(" main .section3 .inputs #name"),
    email: document.querySelector(" main .section3 .inputs #email"),
    phone: document.querySelector(" main .section3 .inputs #phone"),
    message: document.querySelector(" main .section3 .inputs #message"),
    submit: document.querySelector(' main .section3 .inputs button[id="send"]')
  };

  inputNodes["submit"].addEventListener("click", function() {
    let dataFromUser = [];
    for (let key in inputNodes) {
      if (inputNodes[key].value) {
        dataFromUser.push({
          key: key,
          val: inputNodes[key].value
        });
      }
    }

    const data = {
      name: dataFromUser.filter(function(obj) {
        return obj.key === "name";
      })[0],
      email: dataFromUser.filter(function(obj) {
        return obj.key === "email";
      })[0],
      phone: dataFromUser.filter(function(obj) {
        return obj.key === "phone";
      })[0],
      message: dataFromUser.filter(function(obj) {
        return obj.key === "message";
      })[0]
    };

    if (
      data.name !== undefined &&
      data.email !== undefined &&
      data.message !== undefined
    ) {
      showStatus("The Mail is being sent!");
      sendDataToServer(data);
    } else {
      showStatus("Please fill in all required fields!");
    }
  });

  function showStatus(str) {
    document.querySelector("main .section3 .inputs #status").innerHTML = str;
  }

  function sendDataToServer(data) {
    const socket = io.connect("http://jasper.lichte.info:8421");
    console.log(JSON.stringify(data));
    socket.emit('message', JSON.stringify(data));

    socket.on('success', data => {
      console.log(data);
      showStatus(data);
      for (let key in inputNodes) {
        if (inputNodes[key].value) {
          inputNodes[key].value = "";
        }
      }

    });
  }
});
