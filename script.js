var shoppingCartApp = function () {

	// an array with all of our cart items
	var cart = [];
	var total = 0;
	// var replaced = $('.total').html().replace('0', total);
	// $('.total').html(replaced);

	var updateCart = function (item) {

	    var source = $('#result-template').html();

	    var template = Handlebars.compile(source);

	    var newHTML = template(item);

	    total = total + item.price;
	    $('.cart-list').append(newHTML);
	    $('.total').html(total);
		// $('.total').html(replaced);
	}


	var addItem = function (item) {
	    cart.push(item);
	};

	var clearCart = function () {
		cart = [];
		total = 0;
		$('.cart-list').empty();
		$('.total').html(total);	
	};

	var toggleShoppingCart = function () {
			$('.container').find('.shopping-cart').toggleClass('show');
	}; 

	return {
		addItem: addItem,
		updateCart: updateCart,
		clearCart: clearCart,
		toggleShoppingCart: toggleShoppingCart
	};
};
var app = shoppingCartApp();


	$('.view-cart').on('click', function () {		
 	app.toggleShoppingCart(); 	
});
// $('.view-cart').on('click', function () {
// 	// var $clickedPost = $(currentPost).closest('.post');
// 	$('.container').find('.shopping-cart').toggleClass('show');
// });

$('.add-to-cart').on('click', function () {
  var name = $(this).closest('.card').data().name;
  var price = $(this).closest('.card').data().price; 
  var item = {
  	name: name,
  	price: price
  }
  app.addItem(item);
  app.updateCart(item);
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});

// update the cart as soon as the page loads!
// updateCart();