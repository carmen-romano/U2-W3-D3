const fetchLibrary = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      return response.json();
    })
    .then((libraryData) => {
      console.log(libraryData);
      let rowContainer = document.getElementById("row-container");
      libraryData.forEach((library) => {
        let col = document.createElement("div");
        col.classList.add("col");

        let card = document.createElement("div");
        card.classList.add("card", "h-100");

        let imgCard = document.createElement("img");
        imgCard.classList.add("card-img-top");
        imgCard.src = library.img;
        imgCard.alt = library.title;

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = library.title;

        let cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");

        let small = document.createElement("small");
        small.classList.add("text-body-secondary");

        let p = document.createElement("p");
        p.textContent = "Prezzo: €" + library.price;

        let btnScarta = document.createElement("button");
        btnScarta.classList.add("btn", "btn-outline-danger", "me-1");
        btnScarta.textContent = "Scarta";
        btnScarta.addEventListener("click", () => {
          console.log("Elemento scartato: ", library.title);
          let cart = JSON.parse(localStorage.getItem(CART_MEMORY)) || [];
          let updatedCart = cart.filter((book) => book.title !== library.title);
          localStorage.setItem(CART_MEMORY, JSON.stringify(updatedCart));
          updateCartCounter();
          addToModal();
          card.parentNode.remove();
        });

        let btnCompra = document.createElement("button");
        btnCompra.classList.add("btn", "btn-outline-success");
        btnCompra.textContent = "Acquista!";
        btnCompra.addEventListener("click", () => {
          console.log("Elemento comprato: ", library.title);
          addToCart(library.title);
        });

        small.appendChild(p);
        small.appendChild(btnScarta);
        small.appendChild(btnCompra);

        col.appendChild(card);
        card.appendChild(imgCard);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        card.appendChild(cardFooter);
        cardFooter.appendChild(small);

        rowContainer.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

const CART_MEMORY = "cart";

const addToCart = (bookTitle) => {
  let cart = JSON.parse(localStorage.getItem(CART_MEMORY)) || [];
  cart.push({ title: bookTitle });
  localStorage.setItem(CART_MEMORY, JSON.stringify(cart));
  updateCartCounter();
  addToModal();
};

const updateCartCounter = () => {
  let cart = JSON.parse(localStorage.getItem(CART_MEMORY)) || [];
  let counter = document.getElementById("counterCart");
  counter.textContent = cart.length;
};

const addToModal = () => {
  let modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = "";
  let carts = JSON.parse(localStorage.getItem(CART_MEMORY)) || [];
  for (let i = 0; i < carts.length; i++) {
    let p = document.createElement("p");
    p.textContent = carts[i].title;
    modalBody.appendChild(p);
  }
};

window.onload = () => {
  fetchLibrary();
  updateCartCounter();
  addToModal();
};
