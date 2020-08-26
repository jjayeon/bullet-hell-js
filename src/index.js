import input from "@jjy/input";

input.bind(" ", function () {
  const newtext = document.createElement("p");
  newtext.innerHTML = "haha nice";
  document.body.appendChild(newtext);
});
