//Gets the Extensions which are selected from options page
chrome.management.getAll(function (a) {
  var ext = {};
  var extensionProp = [];

  for (var i = 0; i <= a.length - 1; i++) {
    ext = a[i];

    if (!(ext.description && ext.description.includes("Reloads Active")) &&
      (!ext.isApp)) {
      // array created to store all the names of extension list
      extensionProp[i] = {
        name: a[i].name,
        id: a[i].id
      };
    }
  }
  var listContainer = document.createElement('ul');
  document.getElementsByClassName('getExtensionsData')[0].appendChild(listContainer);

  var appendd = '';
  extensionProp.forEach(function (item) {
    appendd = appendd + returnTag(item);
  });

  listContainer.innerHTML = appendd;

});

function returnTag(item, shouldCheck) {
  return `<div class="adjust"><input type="checkbox" id="${item.id}" name="LOADED_EXTENSIONS" value='${item.name}' ${shouldCheck ? 'checked' : ''}><p>${item.name}</p></input></div>`;
}

var data = [];

function getDatafromBg() {
  console.log('!1');
  return new Promise((res) => {
    const messageBody = {
      type: 'get'
    };
    chrome.runtime.sendMessage(messageBody, (response) => {
      console.log('******', data);
      data = response;


      var a = document.querySelectorAll('[name*="LOADED_EXTENSIONS"]');
      a.forEach((element) => {
        const isPresent = data.find((a) => a.name === element.value);
        if (isPresent) {
          element.checked = true
        }
      })
      res(data)
    });
  });
}

getDatafromBg();

document.getElementById('update').onclick = async function () {
  // console.log({ data });
  var a = document.querySelectorAll('[name*="LOADED_EXTENSIONS"]');
  var checkedExtensions = [];

  var datatatata = [];

  a.forEach(element => {

    if (element.checked) {
      const name = element.value;
      const id = element.getAttribute('id');
      console.log('PUSH', name, id);
      checkedExtensions.push({ name, id }); // [{id: 123, name: 'Sindu'}]
      const messageBody = {
        name: element.value,
        data: id
      }
      datatatata.push(messageBody);
    }

  });

  const messageBody = {
    type: 'save',
    data: datatatata
  }

  chrome.runtime.sendMessage(messageBody, function (response) {
    console.log('RESPONSE', { response });
  });


  console.log('JSON.stringify(checkedExtensions)', JSON.stringify(checkedExtensions), checkedExtensions);
  window.localStorage.setItem('storedExtensions', JSON.stringify(checkedExtensions));
}

document.querySelector('body').onload = function load() {
  var inputs = JSON.parse(localStorage.getItem('storedExtensions'));
  console.log('inputs', inputs);
  inputs.forEach(function (storedExtensions) {
    console.log("storedExtensions", storedExtensions)
    const extensionId = storedExtensions.id;
    console.log("extensionId", extensionId)
    document.getElementById(storedExtensions.id).setAttribute('checked', 'checked');
  });
}
