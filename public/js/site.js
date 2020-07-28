---
---
const searchForm = document.getElementById("searchredirect");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchInput = searchForm.querySelector("input[type=search]");
  let originalSearchValue = searchInput.value;
  searchInput.value = "site:devslashrand.com " + searchInput.value;
  searchForm.submit();
  searchInput.value = originalSearchValue;
});

// Scroll
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});

// Slick FX
$(document).ready(function(){
    $("#showsearch").click(function(){
        $("#search").slideToggle();
    });
});
