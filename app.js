const fs = require('fs');

let apiFile = fs.readFileSync('src/api.json');
let apiData = JSON.parse(apiFile);

const { customer: { purchases } } = apiData;


const allProducts = {};
purchases.forEach((purchase) => {
    // Si products no tiene el sku dentro, se cree con un valor inicial de 1 y si lo tiene le sumamos al valor actual + 1
    purchase.products.forEach((product) => !allProducts[product.sku] ? allProducts[product.sku] = 1 : allProducts[product.sku] = allProducts[product.sku] + 1)
})


const repeatedProducts = {}
Object.entries(allProducts).forEach((entry) => {
    let filteredProducts = []
    if(entry[1] >= 2){
        purchases.forEach((purchase) => {
            filteredProducts = [...filteredProducts, ...purchase.products.map((product) => {
                if(product.sku === entry[0]){
                    return {
                        ...product,
                        date: purchase.date
                    }
                }
                return null;
            }).filter((item) => item)]
        })
    repeatedProducts[entry[0]] = filteredProducts 
    }}
)
    


Object.entries(repeatedProducts).forEach((product) => {
    const products = product[1];
    let totalDays = 0;

    for(let i = 0 ; i < products.length - 1 ; i++){
        let currentPurchase = new Date(products[i].date);
        let nextPurchase = new Date(products[i+1].date)

        let resta = nextPurchase.getTime() - currentPurchase.getTime()
        totalDays = totalDays + Math.round(resta / (1000 * 60 * 60 * 24));
    }
    console.log('Producto: ',product[0],',', 'Fecha promedio de recompra: ', Math.ceil(totalDays / products.length) , ' dias.')
})
