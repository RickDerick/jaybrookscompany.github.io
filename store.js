if(document.readyState=='loading'){
	document.addEventListener('DOMContentLoaded',ready)
}
else{
	ready()
}
function ready(){
	 var removeCartItemButtons=document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons)
for(var i=0; i<removeCartItemButtons.length; i++){ 
	var button=removeCartItemButtons[i]
	button.addEventListener('click',removeCartItem)
		
	}
	var quantityInputs=document.getElementsByClassName('cart-quantity-input')
	for(var i=0; i<quantityInputs.length; i++ ){
	var input=quantityInputs[i]
input.addEventListener('change',quantitychanged)	
}
var addToCartButtons=document.getElementsByClassName('shop-item-button')
for(var i=0; i<addToCartButtons.length; i++){
var button=addToCartButtons[i]
	button.addEventListener('click',addToCartClicked)
}
  var purchaseClicked=document.getElementsByClassName('btn-purchase')[0]
  button.addEventListener('click',purchaseClicked)
} 
function purchaseClicked(){
	alert('Thank you for your purchase continue on checkout')
	var cartItems=document.getElementsByClassName('cart-items')[0]
	while(cartItems.hasChildNodes()){
		cartItems.removeChild(cartItems.firstChild)
		updateCartTotal()
	}
	
}
function removeCartItem(event){
	var buttonClicked= event.target
		buttonClicked.parentElement.parentElement.remove()
		updateCartTotal()
}
function quantitychanged(event){
	var input=event.target
	if(isNaN(input.value)|| input.value<=0){
		input.value=1
	}
	updateCartTotal()
}
function addToCartClicked(event){
	var button=event.target
	var shopItem=button.parentElement.parentElement
	var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var imageSrc=shopItem.getElementsByClassName('img')[0].src
	console.log(title,price,imageSrc)
	addItemToCart(title,price,imageSrc)
	
}
function addItemToCart(title,price,imageSrc){
	var cartRow=document.createElement('div')
	cartRow.classList.add('row')
	var cartItems=document.getElementsByClassName('cart-items')[0]
	var cartItemNames=cartItems.getElementsByClassName('cart-item-title')
	for(var i=0; i<cartItemNames.length; i++){
		if(cartItemNames[i].innerText==title){
			alert('This item is already added to the cart')
			return
		}
	}
	var cartRowContents=`
	<div class="cart-item cart-column">
	<img src="${imageSrc}" class="img" width="100" height="100" >
 <span class="cart-item-title">${title}</span>
 </div>
 <span class="cart-price cart-column">${price}</span>
 <div class="cart-quantity cart-column">
 <input class="cart-quantity-input" type="number" value="1">
 <button class="btn btn-danger" type="button">REMOVE</button>
 </div>`
   cartRow.innerHTML=cartRowContents
   cartItems.append(cartRow)
   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantitychanged)
	updateCartTotal()
}
function openmenu()
 {
 document.getElementById("side-menu").style.display="block";
 document.getElementById("menu-btn").style.display="none";
 document.getElementById("close-btn").style.display="block";
 }
 function closemenu()
 {
 document.getElementById("side-menu").style.display="none";
 document.getElementById("menu-btn").style.display="block";
 document.getElementById("close-btn").style.display="none ";
 }
  function userTyped(){
var userTyped=document.getElementById('searchValue').value;
var dataInDataBase=["Ball","Pen","Shirt","Book","List"];
if(dataInDataBase.includes(userTyped)){
document.getElementById('userfeedback').innerHTML=userTyped;
}
else{
document.getElementById('userfeedback').innerHTML='';
}
}
 
function updateCartTotal(){
	var cartItemContainer=document.getElementsByClassName('cart-items')[0]
	var cartRows=cartItemContainer.getElementsByClassName('row')
	var total=0
	for (var i=0; i<cartRows.length; i++){
		var cartRow=cartRows[i]
		var priceElement=cartRow.getElementsByClassName('cart-price')[0]
		var quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price=parseFloat(priceElement.innerText.replace('ksh.',''))
		var quantity=quantityElement.value
		total=total+(price*quantity)
	}
	document.getElementsByClassName('cart-total-price')[0].innerText='ksh.'+total
}
function checkBrowser(){
if('localStorage' in window && window['localStorage'] !==null){
	return true
}
else{
     return false
}
}
