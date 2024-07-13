const card = document.querySelector(".card");
const cardBig = document.querySelector(".card-big");
const basketBtn = document.querySelector(".basket");
const modal = document.querySelector(".modal-order");
const body = document.body;
let basketIdArr = [];

const get = async (resurs) => {
  const request = await fetch(resurs);
  const data = await request.json();
  return data;
};

const itemId = [];
const basketData = [];
const byname = (arr) => {
  card.innerHTML = "";
  cardBig.innerHTML = "";

  if(arr.length === 0){
    cardBig.innerHTML = 'not found'
  }
  if(arr.length>0){

    arr.forEach((item) => {
      const h2 = document.createElement("h2");
      const span = document.createElement("span");
      const p = document.createElement("p");
      const a = document.createElement("a");
      const img = document.createElement("img");
      const basket = document.createElement("button");
      const order = document.createElement("button");
      const div = document.createElement("div");
      const basketId = document.createElement("p");
      order.innerHTML = "Order";
      basket.innerHTML = "add";
      span.innerHTML = item.title;
      p.innerHTML = `${item.price} USD`;
      h2.innerHTML = item.name;
      basketId.innerHTML = item.id;
      img.src = `./${item.png}`;
      a.classList = "card-items";
      a.href = "";
      a.appendChild(img);
      a.appendChild(h2);
      a.appendChild(span);
      div.appendChild(p);
      card.appendChild(a);
      a.appendChild(div);
      a.appendChild(basketId);
      div.appendChild(basket);
      div.appendChild(order);
      basketId.style.display = "none";
  
      let count = 0;
      basket.addEventListener("click", (e) => {
        e.preventDefault();
        basketIdArr.push(
          e.target.parentElement.parentElement.lastElementChild.innerHTML
        );
        localStorage.setItem("id", JSON.stringify(basketIdArr));
      });
  
      order.addEventListener("click", (e) => {
        e.preventDefault();
        const cancelIcon = document.querySelector("#cancelIcon");
        const cancelBtn = document.querySelector("#cancelBtn");
        const pizzaPhoto = document.querySelector("#pizzaPhoto");
  
        cancelIcon.addEventListener("click", () => {
          modal.style.display = "none";
        });
  
        cancelBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
  
        if (e.target.parentElement.parentElement.lastChild.innerHTML == item.id) {
          pizzaPhoto.src = item.png;
          itemId.push(item.id);
          localStorage.setItem("orderId", JSON.stringify(itemId));
        }
        modal.style.display = "block";
        const confirm = document.querySelector("#Confirm");
  
        confirm.addEventListener("click", (e) => {
          e.preventDefault();
          window.open("./orders.html");
        });
  
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      });
    });
  }

  const elements = Array.from(card.children);
  let added;
  elements.forEach((element, index) => {
    if (index % 3 === 0) {
      added = document.createElement("div");
      added.classList = "card";
      cardBig.appendChild(added);
      const lastAdded = cardBig.lastElementChild;
      lastAdded.style.justifyContent = "start";
    }
    added.appendChild(element);
  });
};
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
console.log(search);
console.log(searchBtn);
get("pizza.json").then((data) => {
  let arr = Array.from(data);
  const filter = document.getElementById("filter");
  byname(arr);
  filter.addEventListener("change", () => {
    const filterValue = filter.value;

    if (filterValue === "name") {
      arr.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterValue === "none") {
      arr = Array.from(data);
      console.log(arr);
    } else if (filterValue === "price") {
      arr.sort((a, b) => a.price - b.price);
    }
    byname(arr);
  });
  let arr2 = [] 
  let arr1 = [] 
  search.addEventListener("input", () => {
    
      arr1 =[]
      arr1 = arr.filter(e => e.name.toLowerCase().includes(search.value.toLowerCase()));
      byname(arr1);
  });
  basketBtn.addEventListener("click", () => {
    window.open("./basket.html");
  });
});

