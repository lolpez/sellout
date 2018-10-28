//var paymentTable = 
    //Nombre	Tipo	Cantidad	Precio Unitario	Precio Total

function Cart(tableId) {
    this.model = "payment-app";
    this.table = document.getElementById(`${this.model}-${tableId}`);
    this.controlButtonClass = "waves-effect waves-light btn app-button";
    this.products = [];
    this.total = 0;
}

Cart.prototype.addProduct = function(product) {
    var row = this.table.insertRow(-1);
    var nameCell = row.insertCell(0);
    var typeCell = row.insertCell(1);
    var quantityCell = row.insertCell(2);
    var priceCell = row.insertCell(3);
    var totalCell = row.insertCell(4);
    nameCell.innerHTML = product.nomtipoProducto;
    typeCell.innerHTML = "TIPO?";
    quantityCell.innerHTML = 1;
    var buttonContainer = document.createElement("div");
    buttonContainer.style = "float: right";
    //add button
    var addButton = document.createElement("button");
    addButton.className = this.controlButtonClass;
    addButton.title = `agregar ${product.nomtipoProducto}`;
    addButton.innerHTML = `<i class="material-icons">add</i>`;
    //subtrac button
    var subtractButton = document.createElement("button");
    subtractButton.className = this.controlButtonClass;
    subtractButton.title = `disminuir ${product.nomtipoProducto}`;
    subtractButton.innerHTML = `<i class="material-icons">remove</i>`;
    //remove button
    var removeButton = document.createElement("button");
    removeButton.className = this.controlButtonClass;
    removeButton.title = `quitar ${product.nomtipoProducto}`;    
    removeButton.innerHTML = `<i class="material-icons">delete</i>`;
    //add to table
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(subtractButton);
    buttonContainer.appendChild(removeButton);
    quantityCell.appendChild(buttonContainer);
    priceCell.innerHTML = product.pretipoProducto;
    totalCell.innerHTML = product.pretipoProducto;
}