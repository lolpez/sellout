(function() {
    var modals = document.querySelectorAll('.modal');
    var navs = document.querySelectorAll('.sidenav');
    var tabs = document.getElementById('tabs');
    var drops = document.querySelectorAll('.dropdown-trigger');
    var datepickers = document.querySelectorAll('.datepicker');
    M.Modal.init(modals);
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
})();