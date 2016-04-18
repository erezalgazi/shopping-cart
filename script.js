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
	}


	var addItem = function (name, price) {

	  	var newItem = {
	  	name: name,
	  	price: price,
	  	occurrences: 1,
	  	isMoreThanOne: 0
	  }

	  	total = total + newItem.price;
	  	// console.log(newItem,total);	
	  	cart.push(newItem);
		for (var i=0; i<(cart.length-1); i++)
		{
			if (cart[i].name === newItem.name)
			{
				// console.log(cart[i].occurrences);
				cart[i].occurrences = cart[i].occurrences + 1;
				// console.log(cart[i].occurrences);
				cart[i].isMoreThanOne = 1;
				cart.splice((cart.length-1),1);
				// break; 	
			}
		}
		 console.log(cart);

	  	// item.isMoreThanOne();
		saveToLocalStorage();
	};

	var decreaseItemByOne = function	(currentItem) {
		var clickedItemIndex = $(currentItem).closest('.item').index();

		if (cart[clickedItemIndex].occurrences === 1)
		{
			total = total - cart[clickedItemIndex].price;
			cart.splice(clickedItemIndex, 1);
			$(currentItem.closest('.item')).remove();		
		}
		else if (cart[clickedItemIndex].occurrences === 2)
		{
			total = total - cart[clickedItemIndex].price;
			cart[clickedItemIndex].occurrences--;
			cart[clickedItemIndex].isMoreThanOne = 0;	
		}	
		else {
			total = total - cart[clickedItemIndex].price;
			cart[clickedItemIndex].occurrences--;
		}

		saveToLocalStorage();
		updateCart();
	
	

		// $('.total').html(total);
		// console.log(clickedItemIndex);
		// console.log(cart);
	};
	var removeItem = function	(currentItem) {
		var clickedItemIndex = $(currentItem).closest('.item').index();
	
		total = total - (cart[clickedItemIndex].price) * (cart[clickedItemIndex].occurrences);
		cart.splice(clickedItemIndex, 1);
		$(currentItem.closest('.item')).remove();
		saveToLocalStorage();
		updateCart();	
	

		// $('.total').html(total);
		// console.log(clickedItemIndex);
		// console.log(cart);
	};

	var increaseItemByOne = function (currentItem) {
		var clickedItemIndex = $(currentItem).closest('.item').index();
		var name = cart[clickedItemIndex].name;
		var price = cart[clickedItemIndex].price;
		addItem(name,price);
		updateCart();				
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
		decreaseItemByOne: decreaseItemByOne,
		updateCart: updateCart,
		clearCart: clearCart,
		toggleShoppingCart: toggleShoppingCart,
		increaseItemByOne: increaseItemByOne,
		removeItem: removeItem
	};
};

var app = shoppingCartApp();
app.loadLocalStorage();
app.updateCart();

$('.view-cart').on('click', function () {		
 	app.toggleShoppingCart(); 	
});

$('.add-to-cart').on('click', function () {  
  var name = $(this).closest('.card').data().name;
  var price = $(this).closest('.card').data().price; 

  // var item = $(this).closest('.card').data();

  app.addItem(name, price);
  app.updateCart();
});

$('.cart-list').on('click', '.fa-plus', function () {
	app.increaseItemByOne(this);
});

$('.cart-list').on('click', '.fa-minus', function () {
	app.decreaseItemByOne(this);
});

$('.cart-list').on('click', '.fa-times', function () {
	app.removeItem(this);
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});