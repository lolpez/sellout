(function() {
    var modelApp = "product-app";
    var selectedProduct =  null;
    var productList = document.getElementById('product-list');
    var productItems = document.querySelectorAll('.product');
    var productControls = document.querySelectorAll('.product-control');    
    var confirmButton = document.getElementById(`${modelApp}-confirm`);
    var cart = new Cart("table");

    productControls.forEach(productControl => productControl.addEventListener("click", function() {
        var go = this.dataset.go;
        if (go == "down"){
            productList.scrollTop += 50;
        }else{
            productList.scrollTop -= 50;
        }
    }));

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
            document.getElementById(`${modelApp}-details`).style.textAlign = "center";
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