// an array with all of our cart items
var cart = [];
var total = 0;
// var replaced = $('.total').html().replace('0', total);
// $('.total').html(replaced);

// var updateCart = function () {
//   // TODO: finish
// }


var addItem = function (item) {
    total = total + item.price;
    var source = $('#result-template').html();

    var template = Handlebars.compile(source);

    var newHTML = template(item);

    $('.cart-list').append(newHTML);
    $('.total').html(total);
	// $('.total').html(replaced);

}

var clearCart = function () {
	cart = [];
	total = 0;
	$('.cart-list').empty();
	$('.total').html(total);	
}

$('.view-cart').on('click', function () {
	// var $clickedPost = $(currentPost).closest('.post');
	$('.container').find('.shopping-cart').toggleClass('show');
});

$('.add-to-cart').on('click', function () {
  var name = $(this).closest('.card').data().name;
  var price = $(this).closest('.card').data().price; 
  var item = {
  	name:name,
  	price: price
  }
  cart.push(item);
  console.log(cart);
  addItem(item);
  // updateCart();
});

$('.clear-cart').on('click', function () {
  clearCart();
});

// update the cart as soon as the page loads!
// updateCart();