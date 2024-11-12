// JavaScript for toggling mobile nav
document.getElementById('hamburger').addEventListener('click', function() {
    var mobileNav = document.getElementById('mobileNav');
    
    // Toggle between showing and hiding the mobile nav
    if (mobileNav.style.display === "flex") {
       mobileNav.style.display = "none";
    } else {
       mobileNav.style.display = "flex";
    }
 });