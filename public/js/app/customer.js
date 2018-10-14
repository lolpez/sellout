(function() {
    var model = "customer";
    var newButton = document.getElementById(`${model}-create`);
    var modal = M.Modal.getInstance(document.getElementById(`${model}-modal`));
    var modalTitle = document.getElementById(`${model}-title`);
    var modalSumbit = document.getElementById(`${model}-submit`);
    
    newButton.addEventListener('click', () => {
        modalTitle.innerHTML = 'Nuevo cliente';
        modalSumbit.innerHTML = 'Guardar';
        modal.open();
    });

    // modalSumbit.addEventListener('click', () => {
    //     console.log(getForm())
    //     modal.close();
    // });

    // function getForm(){
    //     var birthdayTokens = inputBirthday.value.split("/");
    //     return {
    //         id : inputId.value,
    //         name : inputName.value,
    //         lastName : inputLastName.value,
    //         birthday : new Date(birthdayTokens[2], parseInt(birthdayTokens[1]) - 1, birthdayTokens[0])
    //     }
    // }
})();