(function() {
    var model = "customer-modal";
    var newButton = document.getElementById(`${model}-create`);
    var modal = M.Modal.getInstance(document.getElementById(`${model}`));
    var modalTitle = document.getElementById(`${model}-title`);
    var modalSumbit = document.getElementById(`${model}-submit`);

    var form = {
        category :          {ele: `input[name="${model}-category"]:checked`, value: "value",    selector: "querySelector"   ,required: true},
        name :              {ele: `${model}-name`                          , value: "value",    selector: "getElementById"  ,required: true},
        firstLastName :     {ele: `${model}-first-last-name`               , value: "value",    selector: "getElementById"  ,required: false},
        secondLastName :    {ele: `${model}-second-last-name`              , value: "value",    selector: "getElementById"  ,required: false},
        address :           {ele: `${model}-address`                       , value: "value",    selector: "getElementById"  ,required: false},
        city :              {ele: `${model}-city`                          , value: "value",    selector: "getElementById"  ,required: false},
        country :           {ele: `${model}-country`                       , value: "value",    selector: "getElementById"  ,required: false},
        sex :               {ele: `input[name="${model}-sex"]:checked`     , value: "value",    selector: "querySelector"   ,required: false},
        refer :             {ele: `${model}-refer`                         , value: "value",    selector: "getElementById"  ,required: false},
        phone :             {ele: `${model}-phone`                         , value: "value",    selector: "getElementById"  ,required: false},
        delivery :          {ele: `${model}-delivery`                      , value: "checked",  selector: "getElementById"  ,required: false},
        cellphone :         {ele: `${model}-cellphone`                     , value: "value",    selector: "getElementById"  ,required: true},   
        email :             {ele: `${model}-email`                         , value: "value",    selector: "getElementById"  ,required: false},
        dni :               {ele: `${model}-dni`                           , value: "value",    selector: "getElementById"  ,required: false},
        printProfile :      {ele: `${model}-print-profile`                 , value: "checked",  selector: "getElementById"  ,required: false},
        printConsent :      {ele: `${model}-print-consent`                 , value: "checked",  selector: "getElementById"  ,required: false},
    }

    M.Autocomplete.init(document[form.city.selector](form.city.ele), {
        data: {
            "Beni": null, "Chuquisaca": null, "Cochabamba": null, "La Paz": null, "Oruro": null, "Pando": null, "Potosí": null, "Santa Cruz": null, "Tarija": null
        },
        limit: 5
    });
    M.Autocomplete.init(document[form.city.selector](form.country.ele), {
        data: {
            "Afghanistan": null,"Albania": null,"Algeria": null,"Andorra": null,"Angola": null,"Anguilla": null,"Antigua &amp; Barbuda": null,"Argentina": null,"Armenia": null,"Aruba": null,"Australia": null,"Austria": null,"Azerbaijan": null,"Bahamas": null,"Bahrain": null,"Bangladesh": null,"Barbados": null,"Belarus": null,"Belgium": null,"Belize": null,"Benin": null,"Bermuda": null,"Bhutan": null,"Bolivia": null,"Bosnia &amp; Herzegovina": null,"Botswana": null,"Brazil": null,"British Virgin Islands": null,"Brunei": null,"Bulgaria": null,"Burkina Faso": null,"Burundi": null,"Cambodia": null,"Cameroon": null,"Cape Verde": null,"Cayman Islands": null,"Chad": null,"Chile": null,"China": null,"Colombia": null,"Congo": null,"Cook Islands": null,"Costa Rica": null,"Cote D Ivoire": null,"Croatia": null,"Cruise Ship": null,"Cuba": null,"Cyprus": null,"Czech Republic": null,"Denmark": null,"Djibouti": null,"Dominica": null,"Dominican Republic": null,"Ecuador": null,"Egypt": null,"El Salvador": null,"Equatorial Guinea": null,"Estonia": null,"Ethiopia": null,"Falkland Islands": null,"Faroe Islands": null,"Fiji": null,"Finland": null,"France": null,"French Polynesia": null,"French West Indies": null,"Gabon": null,"Gambia": null,"Georgia": null,"Germany": null,"Ghana": null,"Gibraltar": null,"Greece": null,"Greenland": null,"Grenada": null,"Guam": null,"Guatemala": null,"Guernsey": null,"Guinea": null,"Guinea Bissau": null,"Guyana": null,"Haiti": null,"Honduras": null,"Hong Kong": null,"Hungary": null,"Iceland": null,"India": null,"Indonesia": null,"Iran": null,"Iraq": null,"Ireland": null,"Isle of Man": null,"Israel": null,"Italy": null,"Jamaica": null,"Japan": null,"Jersey": null,"Jordan": null,"Kazakhstan": null,"Kenya": null,"Kuwait": null,"Kyrgyz Republic": null,"Laos": null,"Latvia": null,"Lebanon": null,"Lesotho": null,"Liberia": null,"Libya": null,"Liechtenstein": null,"Lithuania": null,"Luxembourg": null,"Macau": null,"Macedonia": null,"Madagascar": null,"Malawi": null,"Malaysia": null,"Maldives": null,"Mali": null,"Malta": null,"Mauritania": null,"Mauritius": null,"Mexico": null,"Moldova": null,"Monaco": null,"Mongolia": null,"Montenegro": null,"Montserrat": null,"Morocco": null,"Mozambique": null,"Namibia": null,"Nepal": null,"Netherlands": null,"Netherlands Antilles": null,"New Caledonia": null,"New Zealand": null,"Nicaragua": null,"Niger": null,"Nigeria": null,"Norway": null,"Oman": null,"Pakistan": null,"Palestine": null,"Panama": null,"Papua New Guinea": null,"Paraguay": null,"Peru": null,"Philippines": null,"Poland": null,"Portugal": null,"Puerto Rico": null,"Qatar": null,"Reunion": null,"Romania": null,"Russia": null,"Rwanda": null,"Saint Pierre &amp; Miquelon": null,"Samoa": null,"San Marino": null,"Satellite": null,"Saudi Arabia": null,"Senegal": null,"Serbia": null,"Seychelles": null,"Sierra Leone": null,"Singapore": null,"Slovakia": null,"Slovenia": null,"South Africa": null,"South Korea": null,"Spain": null,"Sri Lanka": null,"St Kitts &amp; Nevis": null,"St Lucia": null,"St Vincent": null,"St. Lucia": null,"Sudan": null,"Suriname": null,"Swaziland": null,"Sweden": null,"Switzerland": null,"Syria": null,"Taiwan": null,"Tajikistan": null,"Tanzania": null,"Thailand": null,"Timor L'Este": null,"Togo": null,"Tonga": null,"Trinidad &amp; Tobago": null,"Tunisia": null,"Turkey": null,"Turkmenistan": null,"Turks &amp; Caicos": null,"Uganda": null,"Ukraine": null,"United Arab Emirates": null,"United Kingdom": null,"Uruguay": null,"Uzbekistan": null,"Venezuela": null,"Vietnam": null,"Virgin Islands (US)": null,"Yemen": null,"Zambia": null,"Zimbabwe":null        
        },
        limit: 5
    });
    
    newButton.addEventListener('click', () => {
        modalTitle.innerHTML = 'Nuevo cliente';
        modalSumbit.innerHTML = 'Guardar';
        modal.open();
    });

    modalSumbit.addEventListener('click', () => {
        //Print Form Values ready to be sent
        console.log(getForm());
        modal.close();
    });

    function getForm(){
        var result = {}
        for (var key in form) {
            var ele = document[form[key].selector](form[key].ele);
            var value = ele[form[key].value];
            if (form[key].required && !value){
                alert(`${ele.dataset.name} no puede estar vacío`)
            }
            result[key] = value
        }
        return result
    }
})();