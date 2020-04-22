'use strict';

window.onload = () => {

  const textarea = document.querySelector("textarea");
  const input = document.querySelector("input");
  const submit = document.querySelector("button");
  const url = 'https://raw.githubusercontent.com/saniketprdxn/JsonData/master/Users.json';
  let Userdata = null;

  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    Userdata = data;
    textarea.readOnly = true;
    textarea.innerHTML = JSON.stringify(data, null, 1);
  }).catch(function (error) {
    console.log("something went wrong and the error is " + error)
  })

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    let yearInput = input.value;
    validateInput(yearInput);
  })

  let validateInput = yearInput => {
    const validYear = /^[0-9]{4}$/;
    if (validYear.test(yearInput)) {
      input.parentElement.classList.remove("error");
      updateData(yearInput);
    } else {
      input.parentElement.classList.add("error");
      setTimeout(() => {
        input.parentElement.classList.remove("error");
      }, 3000)
    }
  }

  let updateData = (inputYear) => {
    
    let clientSectionArray = Array.from(document.querySelectorAll(".client-section"));

    clientSectionArray.forEach(element => {
      element.innerHTML = "";
    });

    Userdata.forEach( ({fullName , Birthdate}) => {
      // console.log(fullName , Birthdate)
      let birthYear = Birthdate.slice(0 , 4);
      let initials = fullName.charAt(0) + fullName.charAt(fullName.indexOf(" ") + 1);
      let age = parseInt(inputYear) - parseInt(birthYear);
      console.log(age);
      // console.log(birthYear , initials);
        // console.log(new Date(inputYear + Birthdate.split("T")[0].slice(4)));
        let currentDayIndex =  new Date(inputYear + Birthdate.split("T")[0].slice(4)).getDay();
        // console.log(currentDay);
        clientSectionArray.forEach( element => {
          if(clientSectionArray.indexOf(element) === currentDayIndex){
            
            let liNode = createElement("li", initials);
            liNode.setAttribute('data-birthyear', birthYear);

            if(element.childElementCount > 0){
              let childElementArray = Array.from(element.querySelectorAll("li"));
              let className = null;

              if(element.childElementCount === 1){
                className = "half-width";
              } else { className = "quarter-width"; }

              liNode.setAttribute("class" , className);

              for(let i = 0; i < childElementArray.length; i++) { 
                if(parseInt(childElementArray[i].getAttribute('data-birthyear')) < parseInt(birthYear)){
                  element.insertBefore(liNode, childElementArray[i]);
                  break;
                } else{ element.appendChild(liNode);}
              };

              childElementArray.forEach(chilElement => {
                chilElement.classList = className;
              });

            } else {
              element.appendChild(liNode);
              liNode.setAttribute("class" , "full-width");
            }
          }
        });
    });
  }

  let createElement = (node, text) => {
      var elementNode = document.createElement(node);
      elementNode.innerHTML = text;
      // place.appendChild(elementNode);

      return elementNode;
  }
}