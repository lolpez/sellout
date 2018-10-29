(function() {
    var modelApp = "product-app";
    var selectedProduct =  null;
    var productItems = document.querySelectorAll('.product');
    var confirmButton = document.getElementById(`${modelApp}-confirm`);
    var cart = new Cart("table")

    /*Product Get Information*/    
    productItems.forEach(productItem => productItem.addEventListener("click", function() {
        fetch("/product/get", {
            method: 'POST',
            body: JSON.stringify({id: this.dataset.id}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((response) => {
            selectedProduct = response.object;
            document.getElementById(`${modelApp}-details`).style.display = "block";
            document.getElementById(`${modelApp}-name`).innerHTML = selectedProduct.nomtipoProducto;
            document.getElementById(`${modelApp}-price`).innerHTML = selectedProduct.pretipoProducto;
            document.getElementById(`${modelApp}-stock`).innerHTML = selectedProduct.saltipoProducto;
        }).catch((error) => {
            alert(error)
        });
    }));

    confirmButton.addEventListener('click', () => {
        cart.addProduct(selectedProduct);
    });
})();