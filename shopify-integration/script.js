async function fetchProducts() {
    const apiURL = `https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}`;

    let productRow = document.querySelector(".products");

    productRow.innerHTML = "";
    
    try {
        const productsRes = await fetch(apiURL).then(res => res.json());

        const products = productsRes.data.products.edges;
        
        
        products.map((product)=>{
            productRow.innerHTML += `
            <div class="grid grid-cols-[150px_1fr] gap-4 bg-zinc-50 rounded-lg border border-zinc-100 p-2">

                <div class="w-full flex justify-center items-center bg-white p-2 rounded-sm">
                    <img src="${product.node.featuredImage.url}"
                        class="w-full rounded-md">
                </div>
                <div>
                    <h3 class="font-medium">
                        ${product.node.title}
                    </h3>
                    <p class="text-xs text-zinc-500 mb-3">
                        ${product.node.description}
                    </p>
                    <h3>
                        $ ${product.node.variants.edges[0].node.price.amount}
                    </h3>

                    <button
                        class="w-full rounded-lg py-2 text-center w-full bg-teal-700 text-white text-xs mt-4 cursor-pointer">add
                        to cart</button>
                </div>

            </div>
            `
        })

    } catch (err) {

        alert("Something went wrong")
        console.log(err);

    }
}

fetchProducts();