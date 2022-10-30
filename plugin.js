"use strict"
//Universal element selector
let el = function (element) {
    return document.querySelector(element)
}

//Universal elements selector
let els = function (element) {
    return document.querySelectorAll(element)
}
// Element creater function
const createElement=function(tagName,className,content){
    const newElement=document.createElement(tagName);
    if(className){
       newElement.setAttribute('class', className);
    }
 
    if(content){
       newElement.innerHTML=content
    }
    return newElement;
 }