const get = async (resurs) => {
  const request = await fetch(resurs);
  const data = await request.json();
  console.log(data);
  return data;
}
const orderId = JSON.parse(localStorage.getItem("orderId"));
const orderId1 = orderId.filter((element, index) => {
  return orderId.indexOf(element) === index;
});
const orderData = []
const orders = document.querySelector('.orders')
console.log(orders);
get("pizza.json").then((data) => {
  data.forEach((item) => {
    orderId1.forEach((e) => {
      if (item.id == e) {
        orderData.push(item);
        console.log(orderData);
      }
    });
  });
  orderData.forEach((item) => {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const h3 = document.createElement("h3")
    span.innerHTML = item.title;
    p.innerHTML = `${item.price} USD`;
    h2.innerHTML = item.name;
    img.src = `./${item.png}`;
    h3.innerHTML = 'Status: Sending'
    a.classList = "card-items";
    a.href = "";
    a.appendChild(img);
    a.appendChild(h2);
    a.appendChild(span);
    orders.appendChild(a);
    div.appendChild(p);
    div.appendChild(h3)
    a.appendChild(div)

    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.style.justifyContent = 'space-between'
    h3.style.fontWeight = '400'
  });
})