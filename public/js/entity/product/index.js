(function() {
    var modelApp = "product-app";
    var selectedProduct =  null;
    var productList = document.getElementById('product-list');
    var productItems = document.querySelectorAll('.product');
    var productControls = document.querySelectorAll('.product-control');
    var refreshButton = document.getElementById(`${modelApp}-refresh`);
    var goTopButton = document.getElementById(`${modelApp}-go-top`);
    var confirmButton = document.getElementById(`${modelApp}-confirm`);
    var nameSpan = document.getElementById(`${modelApp}-name`);
    var priceSpan = document.getElementById(`${modelApp}-price`);
    var stockSpan = document.getElementById(`${modelApp}-stock`);
    var productSearchInput = document.getElementById(`${modelApp}-search`);
    var categoryList = document.getElementById('category-list');
    var categoryItems = document.querySelectorAll('.category');    
    var categoryControls = document.querySelectorAll('.category-control');
    var cart = new Cart("table");

    productControls.forEach(productControl => productControl.addEventListener("click", function() {
        var type = this.dataset.type;
        var value = this.dataset.value;
        switch(type){
            case "scroll":            
                if (value == "down"){
                    productList.scrollTop += 50;
                }else{
                    productList.scrollTop -= 50;
                }
            break;
            case "filter":
                if (value == "img"){
                    displayProductImages(true);
                    displayProductNames(false);
                    
                }else{
                    displayProductImages(false);
                    displayProductNames(true);
                }
            break;
        }
    }));

    function displayProductNames(show){
        var products = productList.getElementsByClassName('product');
        for (i = 0; i < products.length; i++) {
            var product = products[i];
            var text = product.getElementsByClassName('product-name')[0];
            var img = product.getElementsByClassName('product-img')[0];
            if (img.dataset.img == "true"){
                (show) ? product.classList.add("valign-wrapper") : product.classList.remove("valign-wrapper");            
                text.style.display = (show) ? "block" : "none";
            }
        }
    }

    function displayProductImages(show){
        var products = productList.getElementsByClassName('product');
        for (i = 0; i < products.length; i++) {
            var product = products[i];
            var img = product.getElementsByClassName('product-img')[0];
            if (img.dataset.img == "true"){
                img.style.display = (show) ? "block" : "none";
                (show) ? img.classList.add("product-full-img") : img.classList.remove("product-full-img");
            }
        }
    }

    categoryControls.forEach(categoryControl => categoryControl.addEventListener("click", function() {
        var go = this.dataset.go;
        if (go == "down"){
            categoryList.scrollTop += 50;
        }else{
            categoryList.scrollTop -= 50;
        }
    }));

    goTopButton.addEventListener('click', () => {
        productList.scrollTop = 0;
    });

    /*Product Get Information*/
    addEventListenerToProducts();
    addEventListenerToCategories()
    refreshButton.addEventListener('click', () => {
        fetch("/product/list", {
            method: 'POST',
            body: JSON.stringify({entityId: entityId}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((response) => {
            productList.innerHTML = response.object.html;
            addEventListenerToProducts();
        }).catch((error) => {
            alert(error)
        });
    });

    confirmButton.addEventListener('click', () => {
        cart.addProduct(selectedProduct);
        nameSpan.innerHTML = "";
        priceSpan.innerHTML = "";
        stockSpan.innerHTML = "";
    });

    function addEventListenerToProducts() {
        productItems = document.querySelectorAll('.product');
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
                nameSpan.innerHTML = selectedProduct.nomtipoProducto;
                priceSpan.innerHTML = selectedProduct.pretipoProducto;
                stockSpan.innerHTML = selectedProduct.saltipoProducto;
            }).catch((error) => {
                alert(error)
            });
        }));
    }

    function addEventListenerToCategories() {
        categoryItems = document.querySelectorAll('.category');
        categoryItems.forEach(categoryItem => categoryItem.addEventListener("click", function() {
            fetch("/product/get_by_category", {
                method: 'POST',
                body: JSON.stringify({
                    entityId: entityId,
                    CategoryId: this.dataset.id
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then((response) => {
                productList.innerHTML = response.object.html;
                addEventListenerToProducts();
            }).catch((error) => {
                alert(error)
            });
        }));
    }
    
    productSearchInput.addEventListener('keyup', () => {
        var filter = document.getElementById(`${modelApp}-search`).value.toUpperCase();
        var products = productList.getElementsByClassName("product");
        for (i = 0; i < products.length; i++) {
            var product = products[i];
            if (product.dataset.name.toUpperCase().indexOf(filter) > -1) {
                product.style.display = "";      
            } else if (product.dataset.barcode.toUpperCase().indexOf(filter) > -1) {
                product.style.display = "";                
            }else{
                product.style.display = "none";
            }
        }
    });

    //Payment
    var paymentModal = document.getElementById('payment-app-modal')
    var paymentOpenModalButton = document.getElementById('product-app-payment');
    var paymentPayButton = document.getElementById('payment-modal-pay');
    
    paymentOpenModalButton.addEventListener('click', () => {
        if (selectedCustomer) { 
            cart.updateModalTable();
            M.Modal.getInstance(paymentModal).open();
        }else{
            alert("Por favor, seleccione un cliente.");
        }
    });

    paymentPayButton.addEventListener('click', () => {
        fetch("/payment", {
            method: 'POST',
            body: JSON.stringify(cart.getPaymentData()),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((response) => {
            alert(response.message);
            console.log(response)
        }).catch((error) => {
            alert(error)
        });
    });
})();