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
  // console.log('are', extensionProp.length, appendd);
  listContainer.innerHTML = appendd;

});

function returnTag(item, shouldCheck) {
  return `<div class="adjust"><input type="checkbox" id="${item.id}" name="LOADED_EXTENSIONS" value='${item.name}' ${shouldCheck ? 'checked' : ''}><p>${item.name}</p></input></div>`;
}

document.getElementById('update').onclick = function () {
  console.log('a');
  var a = document.querySelectorAll('[name*="LOADED_EXTENSIONS"]');
  var checkedExtensions = [];
  a.forEach(element => {
    if (element.checked) {
      const name = element.value;
      const id = element.getAttribute('id');
      checkedExtensions.push({ name, id }); // [{id: 123, name: 'Sindu'}]
    }
  });
  if (checkedExtensions.length === 0) {
    console.log('checkedExtensions.length', checkedExtensions.length);

    //For popup
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("myModal");
    
    var btn = document.getElementById('update');
    
    // When the user clicks the button, open the modal 
    btn.onclick = function () {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  }
  window.localStorage.setItem('storedExtensions', JSON.stringify(checkedExtensions));
}

