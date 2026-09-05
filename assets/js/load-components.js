// Load header and footer, then update navigation based on user role.

document.addEventListener('DOMContentLoaded', function() {
    const headerElement = document.getElementById('header-placeholder');
    if (!headerElement) return;

    // fetch header.html and insert it into the page
    fetch('header.html')
        .then(res => res.text())
        .then(html => {
            headerElement.innerHTML = html;

            // get user and token from localStorage
            let user = null;
            try {
                user = JSON.parse(localStorage.getItem('user'));
                if (user && user.user && typeof user.user === 'object') user = user.user;
            } catch (e) {
                user = null;
            }
            const token = localStorage.getItem('token');

            // store all nav elements
            const navShop = document.getElementById('nav-shop');
            const navLogo = document.getElementById('nav-logo');
            const navLogin = document.getElementById('nav-login');
            const navRegister = document.getElementById('nav-register');
            const navLogout = document.getElementById('nav-logout');
            const navBuildBike = document.getElementById('nav-build-bike');
            const navMyAccount = document.getElementById('nav-my-account');
            const navMyCart = document.getElementById('nav-my-cart');
            const navOrderHistory = document.getElementById('nav-order-history');
            const navClerkOrders = document.getElementById('nav-clerk-orders');
            const navClerkAssembly = document.getElementById('nav-clerk-assembly');
            const navClerkFulfillment = document.getElementById('nav-clerk-fulfillment');
            const navAdmin = document.getElementById('nav-admin');
            const navAdminComponents = document.getElementById('nav-admin-components');
            const navAdminCompatibility = document.getElementById('nav-admin-compatibility');
            const navAddAdmin = document.getElementById('nav-add-admin');
            const navManagerStock = document.getElementById('nav-manager-stock');
            const navManagerReports = document.getElementById('nav-manager-reports');
            const navHome = document.getElementById('nav-home');
            const navAddClerk = document.getElementById('nav-add-clerk');
            const navAddManager = document.getElementById('nav-add-manager');

            // hide all nav items first
            const allNavItems = [
                navLogin, navRegister, navLogo, navLogout, navBuildBike, navHome,
                navMyAccount, navMyCart, navOrderHistory, navClerkOrders,
                navClerkAssembly, navClerkFulfillment, navAdmin,
                navAdminComponents, navAdminCompatibility, navAddAdmin, navAddClerk, navAddManager,
                navManagerStock, navManagerReports, navShop
            ];
            allNavItems.forEach(el => { if (el) el.style.display = 'none'; });

            // show home and shop for guests and customers only
            if (!user || user.role === 'customer') {
                if (navHome) navHome.style.display = 'inline-block';
                if (navShop) navShop.style.display = 'inline-block';
            }

            // make the logo clickable only for customers and guests
            if (navLogo) {
                navLogo.style.display = 'inline-block';
                if (user && (user.role === 'admin' || user.role === 'clerk' || user.role === 'manager')) {
                    navLogo.removeAttribute('href');
                    navLogo.style.cursor = 'default';
                }
            }

            // show links based on logged-in user role
            if (user && token) {
                // logged in: show logout and profile links
                if (navLogout) navLogout.style.display = 'inline-block';
                if (navMyAccount) navMyAccount.style.display = 'inline-block';

                // role-specific links
                if (user.role === 'customer') {
                    if (navBuildBike) navBuildBike.style.display = 'inline-block';
                    if (navMyCart) navMyCart.style.display = 'inline-block';
                    if (navOrderHistory) navOrderHistory.style.display = 'inline-block';
                } else if (user.role === 'clerk') {
                    if (navClerkOrders) navClerkOrders.style.display = 'inline-block';
                    if (navClerkAssembly) navClerkAssembly.style.display = 'inline-block';
                    if (navClerkFulfillment) navClerkFulfillment.style.display = 'inline-block';
                    if (navAddClerk) navAddClerk.style.display = 'inline-block';
                } else if (user.role === 'manager') {
                    if (navManagerStock) navManagerStock.style.display = 'inline-block';
                    if (navManagerReports) navManagerReports.style.display = 'inline-block';
                    if (navAddManager) navAddManager.style.display = 'inline-block';
                } else if (user.role === 'admin') {
                    if (navAdmin) navAdmin.style.display = 'inline-block';
                    if (navAdminComponents) navAdminComponents.style.display = 'inline-block';
                    if (navAdminCompatibility) navAdminCompatibility.style.display = 'inline-block';
                    if (navAddAdmin) navAddAdmin.style.display = 'inline-block';
                }
            } else {
                // not logged in: show login and register
                if (navLogin) navLogin.style.display = 'inline-block';
                if (navRegister) navRegister.style.display = 'inline-block';
            }
        })
        .catch(err => console.error('Header load error:', err));
});

// logout function: clear session and go to home page
function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// load footer.html and insert it into the page
const footerElement = document.getElementById('footer-placeholder');
if (footerElement) {
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            footerElement.innerHTML = html;
        })
        .catch(error => console.error('Footer error:', error));
}