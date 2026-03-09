console.log(this);

const myBody = document.querySelector("body");
myBody.style.backgroundColor = "black";
myBody.style.color = "green";
console.log(myBody);

setTimeout(() => {
  myBody.childNodes.forEach((e) => {
    console.dir(e.nodeName);
    if (e.nodeName === "H1") {
      e.style.color = "yellow";
      e.textContent = e.textContent.toUpperCase(); // Key change here!
    }
    console.log(e);
  });

  myBody.children[0].textContent.toUpperCase();
});
