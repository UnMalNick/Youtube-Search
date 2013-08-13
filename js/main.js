var url = 'http://gdata.youtube.com/feeds/api/videos',
    $youtube = $('#youtube'),
    $query = $('#search_query'),
    $search = $('#search_button'),
    $result = $('#result_youtube'),
    $right = $('#right'),
    $link = $('#link'),
    $text = $('#text'),
    $item,
    textSearch;

function hideVideoView() {
    $(this).css({ height: '128px' });
    $(this).on('click', showVideoView);
}

function showVideoView() {
    $(this).css({ height: '477px' });
    $(this).on('click', hideVideoView);
}

function videoTemplate(video) {
    var title = video.title.$t,
        published = video.published.$t.split('T')[0].replace('-','/').replace('-','/'),
        author = video.author[0].name.$t,
        category = video.category[1].label,
        thumb = video.media$group.media$thumbnail[1].url,
        embed = video.media$group.media$content[0].url.split('?')[0].replace('/v/','/embed/'),
        html = "";

    html += '<article class="item">';
    html += '<figure class="image_item"> <img src="' + thumb + '"" /> </figure>';
    html += '<div class="desktop"><h2 class="title_item"><a href="#">' + title + '</a></h2>';
    html += '<p class="author_item"> Por <a href="#">' + author + '</a></p>';
    html += '<p class="data_item"><a class="tag_item" href="#">' + category + '</a><span class="published_item">' + published + '</span></p></div>';
    html += '<div class="embed_item"><iframe src="' + embed + '" frameborder="0" allowfullscreen></iframe></div></article>';

    return html;
}

function callback(res) {
    res = res.feed.entry;
    var html = '';
    for (var i=0; i<res.length; i++) {
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
    $query.val($query.val() || 'Mejorando la');
    textSearch = $query.val();
    $.ajax({
        data : {
            alt: 'json',
            lr: 'es',
            q: $query.val(),
            'max-results': 8
        },
        url: url
    }).done( callback );

    $result.html('<img class="loading_image" src="img/loading.gif" /><p class="loading_text">Loading ...</p>');
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
