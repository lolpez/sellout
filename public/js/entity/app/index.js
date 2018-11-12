(function() {
    /* UI initialization */
    var modals = document.querySelectorAll('.modal');
    var navs = document.querySelectorAll('.sidenav');
    var tabs = document.getElementById('tabs');
    var drops = document.querySelectorAll('.dropdown-trigger');
    var datepickers = document.querySelectorAll('.datepicker');
    M.Modal.init(modals, {
        dismissible: false
    });
    M.Sidenav.init(navs, {});
    M.Tabs.init(tabs, {
        onShow: function(tab) {
            window.location.hash = '#!' + tab.id;
        }
    });
    M.Dropdown.init(drops, { constrainWidth: false });
    M.Datepicker.init(datepickers, {format: 'dd/mm/yyyy', maxDate: new Date(), container: document.body});
    var id = window.location.hash.replace(/^#!/, '');
    if (id) M.Tabs.getInstance(tabs).select(id);

    /* App layout */
    var timeLabels = document.getElementsByClassName('app-time');
    startTime();
   
    function startTime() {
        var today = new Date();
        var dateTime = `${checkZero(today.getUTCDate())}/${checkZero(today.getUTCMonth())}/${today.getFullYear()} ${checkZero(today.getHours())}:${checkZero(today.getMinutes())}:${checkZero(today.getSeconds())}`
        for (i = 0; i < timeLabels.length; i++) {
            timeLabels[i].innerHTML = dateTime;
        }
        var t = setTimeout(startTime, 1000);
    }
    function checkZero(i) {
        if (i < 10) {i = "0" + i};
        return i;
    }
})();