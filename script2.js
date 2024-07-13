const basketData = JSON.parse(localStorage.getItem("id"));
const basketDataId = basketData.filter((element, index) => {
  return basketData.indexOf(element) === index;
});
const cardBig = document.querySelector(".card-big1");
console.log(basketDataId);
const count1 = document.querySelector(".text");
let count = 0;
let priceAll = 0;
const price = document.querySelector(".text1");


let basketIdArr = [];
const get = async (resurs) => {
  const request = await fetch(resurs);
  const data = await request.json();
  console.log(data);
  return data;
};
const basketIdNumber = [];
get("pizza.json").then((data) => {
  data.forEach((item) => {
    basketDataId.forEach((e) => {
      if (item.id == e) {
        basketIdNumber.push(item);
      }
    });
  });
  basketIdNumber.forEach((item) => {
    const card = document.createElement("div");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const a = document.createElement("a");
    const img = document.createElement("img");

    span.innerHTML = item.title;
    p.innerHTML = `${item.price} USD`;
    h2.innerHTML = item.name;
    img.src = `./${item.png}`;
    a.classList = "card-items";
    a.href = "";
    a.appendChild(img);
    a.appendChild(h2);
    a.appendChild(span);
    card.appendChild(a);
    cardBig.appendChild(card);
    a.appendChild(p);
  });
  basketIdNumber.map((item) => {
    count++;
    count1.innerHTML = `Pizzas:${count}`;
    priceAll += item.price;
    price.innerHTML = `Total price ${priceAll} USD`;
  });
  console.log(basketIdNumber);
});
