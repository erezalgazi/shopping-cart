var shoppingCartApp = function () {

	// an array with all of our cart items
	var cart = [];
	var total = 0;
	var LOCALSTORAGE_ID = 'shopping-cart';
	var LOCALTOTAL_ID = 'shopping-total';

	var loadLocalStorage = function () {
		var loadCartToPage = JSON.parse(localStorage.getItem(LOCALSTORAGE_ID));
		var loadTotalToPage = JSON.parse(localStorage.getItem(LOCALTOTAL_ID));
		// console.log(loadStorageToPage);
		if (loadCartToPage != null) {
			cart = loadCartToPage;
			total = loadTotalToPage;
		}
	};
	
	// var replaced = $('.total').html().replace('0', total);
	// $('.total').html(replaced);

	var saveToLocalStorage = function () {
		localStorage.setItem(LOCALSTORAGE_ID,JSON.stringify(cart));
		localStorage.setItem(LOCALTOTAL_ID,JSON.stringify(total));	
		// console.log(localStorage);
	}

	var updateCart = function () {

	    $('.cart-list').empty();

	    var source = $('#menu-template').html();

	    var template = Handlebars.compile(source);

	    var newHTML = template({cart});

	    $('.cart-list').append(newHTML);
	    $('.total').html(total);
		// $('.total').html(replaced);
	}


	var addItem = function (item) {
		// console.log(cart);
	  total = total + item.price;
		cart.push(item);
		saveToLocalStorage();
	};

	var clearCart = function () {
		cart = [];
		total = 0;
		$('.cart-list').empty();
		$('.total').html(total);
		saveToLocalStorage();	
	};

	var toggleShoppingCart = function () {
			$('.container').find('.shopping-cart').toggleClass('show');
	}; 

	return {
		loadLocalStorage: loadLocalStorage,
		addItem: addItem,
		updateCart: updateCart,
		clearCart: clearCart,
		toggleShoppingCart: toggleShoppingCart
	};
};

var app = shoppingCartApp();
app.loadLocalStorage();
app.updateCart();

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
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});

// update the cart as soon as the page loads!
// updateCart();