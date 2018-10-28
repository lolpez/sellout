(function() {
    var productItems = document.querySelectorAll('.product');

    /*Product Get Information*/
    var modelApp = "product-app";
    var selectedProduct =  null;
    productItems.forEach(productItem => productItem.addEventListener("click", function() {
        fetch("/product/get", {
            method: 'POST',
            body: JSON.stringify({id: this.dataset.id}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((response) => {
            selectedCustomer = response.object;
            console.log(response)
        }).catch((error) => {
            alert(error)
        });
    }));
})();