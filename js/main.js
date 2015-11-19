var url = 'https://www.googleapis.com/youtube/v3/search',
    $youtube = $('#youtube'),
    $query = $('#search_query'),
    $search = $('#search_button'),
    $result = $('#result_youtube'),
    $right = $('#right'),
    $link = $('#link'),
    $text = $('#text'),
    $item,
    textSearch;

function sendSocialEvent (e) {
    e.preventDefault();
    ga('send', 'social', 'YouTube', 'Click', 'http://unmalnick.github.io/')
    window.location.href = 'http://youtube.com';
    // body...
}

$link.on('click', sendSocialEvent);

function hideVideoView() {
    ga('send', 'event', 'Video', 'Click', 'Ocultar video');
    $(this).on('click', showVideoView).removeClass('active');
}

function showVideoView() {
    ga('send', 'event', 'Video', 'Click', 'Mostrar video');
    $(this).on('click', hideVideoView).addClass('active');
}

function videoTemplate(video) {
    var title = video.snippet.title,
        published = video.snippet.publishedAt.split('T')[0].replace('-','/').replace('-','/'),
        author = video.snippet.channelTitle,
        category = "Tech",
        thumb = video.snippet.thumbnails.high.url,
        embed = "https://www.youtube.com/embed/" + video.id.videoId,
        views = "10K",
        html = "";

    html = Mustache.render(Templates.video, {
        thumb : thumb,
        title : title,
        author : author,
        category : category,
        published : published,
        embed : embed,
        views : views
    });

    return html;
}

function callback(res) {
    res = res.items;
    var html = '';
    for (var i=1; i<res.length; i++) {
        html += videoTemplate(res[i]);
    }

    $result.html(html);
    
    $text.html( textSearch + ', Do you want to do the search on YouTube?');
    
    $link.attr('href','http://www.youtube.com/results?search_query=' + textSearch );
    
    $('.item').on('click', showVideoView);
    
    if ($(window).width() > 768) {
        $('article:first-child').off('click');
    }

    $right.css({ display:'block' });
    
    $('a').on('click', function(){
        event.preventDefault();
    });
    
    $query.val('');
}

function submit() {
    ga('send', 'event', 'Busqueda', 'Submit', 'Caja de busqueda de la parte superior');
    //Compra ficticia de mi empresa
    ga('ecommerce:addTransaction',{
        'id': '1234',                     // Transaction ID. Required.
        'affiliation': 'Acme Clothing',   // Affiliation or store name.
        'revenue': '11.99',               // Grand Total.
        'shipping': '5',                  // Shipping.
        'tax': '1.29'     
    })
    ga('ecommerce:addItem', {
        'id': '1234',                     // Transaction ID. Required.
        'name': 'Cursos de Platzo',    // Product name. Required.
        'sku': 'DD23444',                 // SKU/code.
        'category': 'Cursos',         // Category or variation.
        'price': '76.900',                 // Unit price.
        'quantity': '1',                   // Quantity.
        'currency': 'COP'
    });
    ga('ecommerce:send');
    //Termina Compra ficticia de mi empresa
    $query.val($query.val() || 'Platzi');
    textSearch = $query.val();
    $.ajax({
        data : {
            q: $query.val(),
            key: 'AIzaSyC9X_RJzeeCplmrB6mB6qgZuLy_MLoyjEA',
            part: 'snippet',
            maxResults: 25,
        },
        url: url
    }).done( callback );

    $result.html('<img class="loading_image" src="img/loading.gif" /><p class="loading_text">Loading ...</p>');
    $right.css({ display:'none' });
}


$search.on( 'click', submit() );

$query.keyup(function (key) {
    if (key.keyCode == 13) {
        submit();
    }
});


$('#activity a').on('click', function(){
    $query.val($(this).text());
    submit();
});

submit();
