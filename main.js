const data = [
    {
        id: 1,
        name: "Brown Muffins",
        img: "images/browncakes.jpg",
        price: 74,
        cat: "Breakfast"
    },
    {
        id: 1,
        name: "Dark Muffins",
        img: "images/darkbgmuffins.jpg",
        price: 80,
        cat: "Lunch"
    },
    {
        id: 1,
        name: "Dark Cakes",
        img: "images/darkcakes.jpg",
        price: 80,
        cat: "Evening"
    },
    {
        id: 1,
        name: "Milk Shake",
        img: "images/milkshake.jpg",
        price: 74,
        cat: "Dinner"
    },
    {
        id: 1,
        name: "Light Muffins",
        img: "images/lightmuffins.jpg",
        price: 100,
        cat: "Breakfast"
    }
];

const productsContainer = document.querySelector(".products")
const searchInput = document.querySelector(".search")
const categoriesContainer = document.querySelector(".cats")
const priceRange = document.querySelector(".priceRange")
const priceValue = document.querySelector(".priceValue")


// Products
const displayProducts = (filteredProducts) => {
    // Add the products to the html
    productsContainer.innerHTML = filteredProducts.map((product) =>
        `
            <div class="product">
                <img src=${product.img}>
                <span class="name">${product.name}</span>
                <span class="priceText">${product.price}</span>
            </div>
    `
    ).join("");
};

displayProducts(data)

searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();

    if (value) {
        displayProducts(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1));
    } else {
        displayProducts(data)
    }
});


// Categories
const setCategories = () => {
    const allCats = data.map(item => item.cat)
    // console.log(allCats.filter((item,i)=>{
    //     return allCats.indexOf(item)===i
    // }))
    const categories = ["All", ...allCats.filter((item, i) => {
        return allCats.indexOf(item) === i
    })]
    // add the categories to the html
    categoriesContainer.innerHTML = categories.map(cat =>
        `
        <span class="cat">${cat}</span>
        `
    ).join("")


    // click event and filter
    categoriesContainer.addEventListener("click", (e) => {
        const selectedCategory = e.target.textContent;

        selectedCategory === "All" ? displayProducts(data) :
            displayProducts(data.filter((item) => item.cat === selectedCategory))
    })
}

const setPrices = () => {
    const priceList = data.map(item => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "$" + maxPrice;

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "$" + e.target.value;
        displayProducts(data.filter((item) => item.price <= e.target.value));
    });
};

setCategories()
setPrices()