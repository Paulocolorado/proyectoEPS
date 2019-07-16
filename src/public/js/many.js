
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 20000); // Change image every 2 seconds
}




  var itemsMenu=document.querySelectorAll(".navbar ul li a");

  window.addEventListener('scroll', function(e) {
 

  if(window.scrollY>100){
  	document.querySelector(".navbar").style.backgroundColor="white";

  	for(let i=0;i<itemsMenu.length;i++){
  		itemsMenu[i].style.color="black";
  	}
  
  }
  else{
  	document.querySelector(".navbar").style.backgroundColor="unset";
  	for(let i=0;i<itemsMenu.length;i++){
  		itemsMenu[i].style.color="white";
  	}
  }

  
});
