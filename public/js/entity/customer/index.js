(function() {
    var model = "customer-modal";
    var editingMode = false;
    var newButton = document.getElementById(`${model}-create`);
    var editButton = document.getElementById(`${model}-edit`);
    var selectCountry = document.getElementById(`${model}-idtipoPais`)
    var selectCity = document.getElementById(`${model}-idtipoDpto`)
    var modal = M.Modal.getInstance(document.getElementById(`${model}`));
    var modalTitle = document.getElementById(`${model}-title`);
    var modalSumbit = document.getElementById(`${model}-submit`); 
    var customerTableRows = document.querySelectorAll('.customer-tr');

    /*Customer Form*/
    var form = {
        idCliente       : {ele: `${model}-idCliente`                            , value: "value",    selector: "getElementById"  ,required: false   },
        tipCliente      : {ele: `input[name="${model}-tipCliente"]:checked`     , value: "value",    selector: "querySelector"   ,required: false   },
        nomCliente      : {ele: `${model}-nomCliente`                           , value: "value",    selector: "getElementById"  ,required: true    },
        patCliente      : {ele: `${model}-patCliente`                           , value: "value",    selector: "getElementById"  ,required: false   },
        matCliente      : {ele: `${model}-matCliente`                           , value: "value",    selector: "getElementById"  ,required: false   },
        dirCliente      : {ele: `${model}-dirCliente`                           , value: "value",    selector: "getElementById"  ,required: false   },
        idtipoDpto      : {ele: `${model}-idtipoDpto`                           , value: "value",    selector: "getElementById"  ,required: false   },
        idtipoPais      : {ele: `${model}-idtipoPais`                           , value: "value",    selector: "getElementById"  ,required: false   },
        idtipoGenero    : {ele: `input[name="${model}-idtipoGenero"]:checked`   , value: "value",    selector: "querySelector"   ,required: false   },
        fnaCliente      : {ele: `${model}-fnaCliente`                           , value: "value",    selector: "getElementById"  ,required: false   },
        telCliente      : {ele: `${model}-telCliente`                           , value: "value",    selector: "getElementById"  ,required: false   },
        celCliente      : {ele: `${model}-celCliente`                           , value: "value",    selector: "getElementById"  ,required: true    },
        mailCliente     : {ele: `${model}-mailCliente`                          , value: "value",    selector: "getElementById"  ,required: false   },
        ciCliente       : {ele: `${model}-ciCliente`                            , value: "value",    selector: "getElementById"  ,required: false   }
    }

    /* M.Autocomplete.init(document[form.idtipoDpto.selector](form.idtipoDpto.ele), {
        data: {
            "Beni": null, "Chuquisaca": null, "Cochabamba": null, "La Paz": null, "Oruro": null, "Pando": null, "Potosí": null, "Santa Cruz": null, "Tarija": null
        },
        limit: 5
    });
    M.Autocomplete.init(document[form.idtipoDpto.selector](form.idtipoPais.ele), {
        data: {
            "Afghanistan": null,"Albania": null,"Algeria": null,"Andorra": null,"Angola": null,"Anguilla": null,"Antigua &amp; Barbuda": null,"Argentina": null,"Armenia": null,"Aruba": null,"Australia": null,"Austria": null,"Azerbaijan": null,"Bahamas": null,"Bahrain": null,"Bangladesh": null,"Barbados": null,"Belarus": null,"Belgium": null,"Belize": null,"Benin": null,"Bermuda": null,"Bhutan": null,"Bolivia": null,"Bosnia &amp; Herzegovina": null,"Botswana": null,"Brazil": null,"British Virgin Islands": null,"Brunei": null,"Bulgaria": null,"Burkina Faso": null,"Burundi": null,"Cambodia": null,"Cameroon": null,"Cape Verde": null,"Cayman Islands": null,"Chad": null,"Chile": null,"China": null,"Colombia": null,"Congo": null,"Cook Islands": null,"Costa Rica": null,"Cote D Ivoire": null,"Croatia": null,"Cruise Ship": null,"Cuba": null,"Cyprus": null,"Czech Republic": null,"Denmark": null,"Djibouti": null,"Dominica": null,"Dominican Republic": null,"Ecuador": null,"Egypt": null,"El Salvador": null,"Equatorial Guinea": null,"Estonia": null,"Ethiopia": null,"Falkland Islands": null,"Faroe Islands": null,"Fiji": null,"Finland": null,"France": null,"French Polynesia": null,"French West Indies": null,"Gabon": null,"Gambia": null,"Georgia": null,"Germany": null,"Ghana": null,"Gibraltar": null,"Greece": null,"Greenland": null,"Grenada": null,"Guam": null,"Guatemala": null,"Guernsey": null,"Guinea": null,"Guinea Bissau": null,"Guyana": null,"Haiti": null,"Honduras": null,"Hong Kong": null,"Hungary": null,"Iceland": null,"India": null,"Indonesia": null,"Iran": null,"Iraq": null,"Ireland": null,"Isle of Man": null,"Israel": null,"Italy": null,"Jamaica": null,"Japan": null,"Jersey": null,"Jordan": null,"Kazakhstan": null,"Kenya": null,"Kuwait": null,"Kyrgyz Republic": null,"Laos": null,"Latvia": null,"Lebanon": null,"Lesotho": null,"Liberia": null,"Libya": null,"Liechtenstein": null,"Lithuania": null,"Luxembourg": null,"Macau": null,"Macedonia": null,"Madagascar": null,"Malawi": null,"Malaysia": null,"Maldives": null,"Mali": null,"Malta": null,"Mauritania": null,"Mauritius": null,"Mexico": null,"Moldova": null,"Monaco": null,"Mongolia": null,"Montenegro": null,"Montserrat": null,"Morocco": null,"Mozambique": null,"Namibia": null,"Nepal": null,"Netherlands": null,"Netherlands Antilles": null,"New Caledonia": null,"New Zealand": null,"Nicaragua": null,"Niger": null,"Nigeria": null,"Norway": null,"Oman": null,"Pakistan": null,"Palestine": null,"Panama": null,"Papua New Guinea": null,"Paraguay": null,"Peru": null,"Philippines": null,"Poland": null,"Portugal": null,"Puerto Rico": null,"Qatar": null,"Reunion": null,"Romania": null,"Russia": null,"Rwanda": null,"Saint Pierre &amp; Miquelon": null,"Samoa": null,"San Marino": null,"Satellite": null,"Saudi Arabia": null,"Senegal": null,"Serbia": null,"Seychelles": null,"Sierra Leone": null,"Singapore": null,"Slovakia": null,"Slovenia": null,"South Africa": null,"South Korea": null,"Spain": null,"Sri Lanka": null,"St Kitts &amp; Nevis": null,"St Lucia": null,"St Vincent": null,"St. Lucia": null,"Sudan": null,"Suriname": null,"Swaziland": null,"Sweden": null,"Switzerland": null,"Syria": null,"Taiwan": null,"Tajikistan": null,"Tanzania": null,"Thailand": null,"Timor L'Este": null,"Togo": null,"Tonga": null,"Trinidad &amp; Tobago": null,"Tunisia": null,"Turkey": null,"Turkmenistan": null,"Turks &amp; Caicos": null,"Uganda": null,"Ukraine": null,"United Arab Emirates": null,"United Kingdom": null,"Uruguay": null,"Uzbekistan": null,"Venezuela": null,"Vietnam": null,"Virgin Islands (US)": null,"Yemen": null,"Zambia": null,"Zimbabwe":null        
        },
        limit: 5
    });*/
    M.FormSelect.init(selectCountry);
    M.FormSelect.init(selectCity);
    
    newButton.addEventListener('click', () => {
        modalTitle.innerHTML = 'Nuevo cliente';
        modalSumbit.innerHTML = 'Guardar';
        editingMode = false;
        clearForm();
        modal.open();
    });

    editButton.addEventListener('click', () => {
        modalTitle.innerHTML = 'Editar Cliente';
        modalSumbit.innerHTML = 'Guardar';
        editingMode = true;
        setForm();
        modal.open();
    });

    modalSumbit.addEventListener('click', () => {
        var data = getForm();
        if (!data.success) return;
        fetch(`/customer/${(editingMode) ? "update" : "add"}`, {
            method: 'POST',
            body: JSON.stringify({data: data.result}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((response) => {
            console.log(response);
            alert(`${response.message}, más información en la consola.`);
            modal.close();
        }).catch((error) => {
            alert(error)
        });
    });

    function getForm(){
        var result = {};
        var success = true;
        for (var key in form) {
            var ele = document[form[key].selector](form[key].ele);
            var value = ele[form[key].value];
            if (form[key].required && !value){
                ele.className += ' invalid';
                success = false;
            }
            result[key] = value;
        }
        if (!editingMode) delete result['idCliente'];  //Remove idCliente when in "adding new customer mode"
        return {result: result, success: success}
    }

    function setForm(){
        for (var key in form) {
            var ele = document[form[key].selector](form[key].ele);
            ele[form[key].value] = selectedCustomer[key]
        }
        M.updateTextFields();
    }

    function clearForm(){
        for (var key in form) {
            var ele = document[form[key].selector](form[key].ele);
            ele[form[key].value] = "";
        }
        M.updateTextFields();
    }

    /*Customer Get Information*/
    var modelApp = "customer-app";
    customerTableRows.forEach(customerTableRow => customerTableRow.addEventListener("click", function() {
        fetch("/customer/get", {
            method: 'POST',
            body: JSON.stringify({id: this.dataset.id}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((response) => {
            selectedCustomer = response.object;
            document.getElementById(`${modelApp}-id`).innerHTML = selectedCustomer.idCliente;
            document.getElementById(`${modelApp}-category`).innerHTML = "";
            document.getElementById(`${modelApp}-phone`).innerHTML = selectedCustomer.celCliente;
            document.getElementById(`${modelApp}-name`).innerHTML = `${selectedCustomer.nomCliente} ${selectedCustomer.patCliente} ${selectedCustomer.matCliente}`;
            document.getElementById(`${modelApp}-address`).innerHTML = selectedCustomer.dirCliente;
            document.getElementById(`${modelApp}-email`).innerHTML = selectedCustomer.mailCliente;
            editButton.removeAttribute("disabled");
        }).catch((error) => {
            alert(error)
        });
    }));

    /*City  Get Information*/
    selectCountry.onchange = function(){
        var id = this.value;
        fetch(`/city/get`, {
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((response) => {
            var cities = response.object;
            selectCity.innerHTML = "";
            for (var key in cities) {
                var city = cities[key];
                var option = document.createElement("option");
                option.text = city.nomtipoDpto;
                option.value = city.idtipoDpto;
                selectCity.appendChild(option);
            }
            M.FormSelect.getInstance(selectCity).destroy();
            M.FormSelect.init(selectCity);
        }).catch((error) => {
            alert(error)
        });
    }
})();