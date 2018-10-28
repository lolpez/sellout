function Cart(tableId) {
    this.model = "payment-app";
    this.table = document.getElementById(`${this.model}-${tableId}`);
    this.controlButtonClass = "waves-effect waves-light btn app-button";
    this.products = {};
    this.total = 0;
}

Cart.prototype.addProduct = function(product) {
    var id = this.generateID();
    this.products[id] = {
        id: product.idtipoProducto,
        name: product.nomtipoProducto,
        quantity: 1,
        price: product.pretipoProducto
    };
    var row = this.table.insertRow(-1);
    row.id = `row-${id}`;
    var nameCell = row.insertCell(0);
    var typeCell = row.insertCell(1);
    var quantityCell = row.insertCell(2);
    var priceCell = row.insertCell(3);
    var totalCell = row.insertCell(4);
    nameCell.innerHTML = this.products[id].name;
    typeCell.innerHTML = "TIPO?";
    //quantityCell.innerHTML = this.products[id].quantity;
    var quantityText = document.createElement("span");
    quantityText.innerHTML = this.products[id].quantity;
    quantityText.id = `quantity-${id}`;
    quantityCell.appendChild(quantityText);
    var buttonContainer = document.createElement("div");
    buttonContainer.style = "float: right";
    //add button
    var addButton = this.createButtonControl("add", this.products[id].name, id)
    //subtrac button
    var subtractButton = this.createButtonControl("subtract", this.products[id].name, id)
    //remove button
    var removeButton = this.createButtonControl("remove", this.products[id].name, id)
    //add to table
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(subtractButton);
    buttonContainer.appendChild(removeButton);
    quantityCell.appendChild(buttonContainer);
    priceCell.innerHTML = this.products[id].price;
    totalCell.innerHTML = this.products[id].price;
}

Cart.prototype.createButtonControl = function(buttonType, productName, id) {
    var button = document.createElement("button");
    button.className = this.controlButtonClass;
    switch(buttonType) {
        case "add":
            button.title = `agregar ${productName}`;
            button.innerHTML = `<i class="material-icons">add</i>`;
            button.addEventListener('click', () => {
                this.doAction("add", id)
            });
            break;
        case "subtract":
            button.title = `disminuir ${productName}`;
            button.innerHTML = `<i class="material-icons">remove</i>`;
            button.addEventListener('click', () => {
                this.doAction("subtract", id)
            });
            break;
        case "remove":
            button.title = `quitar ${productName}`;    
            button.innerHTML = `<i class="material-icons">delete</i>`;
            button.addEventListener('click', () => {
                this.doAction("remove", id)
            });
            break;
    }
    return button;
}


Cart.prototype.doAction = function(action, id) {
    this[action](id);
}

Cart.prototype.generateID = function() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + "xxxxxxxxxxxxxxxx".replace(/[x]/g, function(){
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}

Cart.prototype.add = function(id) {
    this.products[id].quantity ++;
    var quantityText = document.getElementById(`quantity-${id}`);
    quantityText.innerHTML = this.products[id].quantity;
}

Cart.prototype.subtract = function(id) {
    this.products[id].quantity --;
    var quantityText = document.getElementById(`quantity-${id}`);
    quantityText.innerHTML = this.products[id].quantity;
}

Cart.prototype.remove = function(id) {
    var row = document.getElementById(`row-${id}`);
    row.parentNode.removeChild(row);
    delete this.products[id];
}