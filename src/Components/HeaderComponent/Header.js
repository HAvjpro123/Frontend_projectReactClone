window.addEventListener('scroll', function() {
    var myDiv = document.getElementById('myDiv');
    var myDiv1 = document.getElementById('myDiv1');
  
    var scrollPosition = window.scrollY;
  
    if (scrollPosition > 200) { // Khoảng cách từ đỉnh trang để thẻ div biến mất
      myDiv.classList.add('hide');
      myDiv1.classList.add('fixed-top');
    } else {
      myDiv.classList.remove('hide');
      myDiv1.classList.remove('fixed-top');
    }
  });