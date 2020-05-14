$(function() {
    
    //bay one click
    $('.product-layout > .product-thumb').each(function (e) {

        e +=1;

        var img_url = $(this).find('.img-responsive').attr('src'),
            item_name = $(this).find('h4 a').text(),
            item_price = $(this).find('.price').html(),
            admin = $('#callback [name=admin_email]').val();
            

    $(this).after('\
    <div id="pp-item-' + e + '" class="product-popup">\
        <h2>Купить в один клик</h2>\
        <div class="pp-img-wrap">\
            <img src="' + img_url + '" alt="ENL"/>\
        </div>\
        <div class="pp-content">\
        <h3>' + item_name + '</h3>\
        <p>' + item_price + '</p>\
        <form class="ajax-form">\
          <input type="hidden" name="project_name" value="EcoNaturalLifeStore">\
          <input type="hidden" name="admin_email" value="' + admin + '">\
          <input type="hidden" name="form_subject" value="Заявка с сайта EcoNaturalLifeStore"></input>\
          <input type="hidden" name="Продукция" value="' + item_name + '"></input>\
          <input class="form-control" type="text" name="Телефон" placeholder="Введите номер телефона..." required>\
          <button class="btn btn-primary">Заказать</button>\
        </form>\
        <div class="success">Спасибо за заявку!</div>\
        </div>\
    </div>');


        // добавляю строчку "Купить в один клик"
        $(this).find('.button-group').append('<a class="button toclick" href="#pp-item-'+ e +'">Купить в один клик</a>');
        // добавляю класс
        $(this).parent().attr({ 
            'class' : 'product-layout col-lg-4 col-md-4 col-sm-6 col-xs-12'
        });
    });

    

    $('.product-thumb h4').css('height', '').equalHeights();
    $('.price').css('height', '').equalHeights();
    $('.toclick, .callback').magnificPopup({
        mainClass: 'mfp-zoom-in',
        removalDelay: 500
    });
    //E-mail Ajax Send
	$(".ajax-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "catalog/view/theme/straw/unimail/mail.php", //Change
			data: th.serialize()
		}).done(function() {
            //alert("Thank you!");
            var pp_suc = th.closest('.product-popup').find('.success');
            pp_suc.fadeIn();
			setTimeout(function() {
				// Done Functions
                th.trigger("reset");
                pp_suc.fadeOut();
                $.magnificPopup.close();
			}, 4000);
		});
		return false;
	});


});