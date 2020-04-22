'use strict';

window.onload = function () {

  const textarea = document.querySelector("textarea");
  const url = 'https://raw.githubusercontent.com/saniketprdxn/JsonData/master/Users.json';
  let Userdata = null;

  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    Userdata = data;
    textarea.readOnly = true;
    textarea.innerHTML = JSON.stringify(data, null, 1);
  }).catch(function( error){
    console.log("something went wrong and the error is " + error)
  })
}