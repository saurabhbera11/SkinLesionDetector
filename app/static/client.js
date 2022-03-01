var el = x => document.getElementById(x);
var type_lesion=''
var type_severity=''
function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function getClass(severity) {

  if(severity=='MEL'){
    return 'Melanoma';
  }
  if(severity=='NV'){
    return 'Melanocytic nevus';
  }
  if(severity=='BCC'){
    return 'Basal cell carcinoma';
  }
  if(severity=='AK'){
    return 'Actinic keratosis';
  }
  if(severity=='SCC'){
    return 'Squamous cell carcinoma';
  }
  if(severity=='VASC'){
    return 'Vascular lesion';
  }
  if(severity=='DF'){
    return 'Dermatofibroma';
  }
  if(severity=='BKL'){
    return 'Benign keratosis';
  }
  if(severity=='malignant'){
    return 'Malignant';
  }
  if(severity=='benign'){
    return 'Benign';
  }
}


function analyze() {
  var result;
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      result=`${response["result"]}`
      el("result-label").innerHTML=`The type of disease is ${getClass(result)}`; 
    }else{
      return
    }
    el("analyze-button").innerHTML = "Analyze";
    return `${result}`;
  };
  
  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

function severity() {
  var result;
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/severity`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = async function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      result=`${response["result"]}`
      el("severity-label").innerHTML=`Your disease belongs to class ${getClass(result)}`; 
    }
    else{
      return;
    }
    el("analyze-button").innerHTML = "Analyze";
  };
  
  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
  return result;
}

function run(){
  analyze()
  severity()
  el("results").classList.remove("display_none")
}
