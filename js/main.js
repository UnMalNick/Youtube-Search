var $youtube = $('#youtube'),
	url = 'http://gdata.youtube.com/feeds/api/videos',
	$query = $('#search_query'),
	$search = $('#search_button'),
	$result = $('#result_youtube'),
	$right = $('#right'),
	$link = $('#welcome #link'),
	$text = $('#welcome #text'),
	$item;

function video_Noview () {
	$(this).css({height:'128px'});
	$(this).on('click', video_view);
}

function video_view () {
	$(this).css({height:'477px'});
	$(this).on('click', video_Noview);
}

function VideoTemplate(video){
	var title = video.title.$t,
		published = video.published.$t.split('T')[0].replace('-','/').replace('-','/'),
		author = video.author[0].name.$t,
		category = video.category[1].label,
		thumb = video.media$group.media$thumbnail[1].url,
		embed = video.media$group.media$content[0].url.split('?')[0].replace('/v/','/embed/');

	html = '<article class="item">';
	html += '<figure class="image_item"> <img src="' + thumb + '"" /> </figure>';
	html += '<div class="desktop"><h2 class="title_item"><a href="#">' + title + '</a></h2>';
	html += '<p class="author_item"> Por <a href="#">' + author + '</a></p>';
	html += '<p class="data_item"><a class="tag_item" href="#">' + category + '</a><span class="published_item">' + published + '</span></p></div>';
	html += '<div class="embed_item"><iframe src="' + embed + '" frameborder="0" allowfullscreen></iframe></div></article>';

	return html;
}

function Callback (res){
	res = res.feed.entry;
	var html = '';
	for (var i=0; i<res.length; i++){
		html += VideoTemplate(res[i]);
	}
	$result.html(html);
	$text.html($query.val() + ', Do you want to do the search on YouTube?');
	$link.attr('href','http://www.youtube.com/results?search_query=' + $query.val() );
	$item = $('.item');
	$item.on('click', video_view);
	if ($(window).width() > 768)
	{
		$('article:first-child').off('click');
	}
	$right.css({display:'block'});
	$query.val('');
}

function Submit(){
	if ($query.val() == '')
	{
		$query.val('Mejorando la');
	}
	$.ajax({
		data : {
			alt: 'json',
			lr: 'es',
			q: $query.val(),
			'max-results': 8
		},
		url: url
	}).done( Callback );

	$result.html('<img class="loading_image" src="img/loading.gif" /><p class="loading_text">Loading ...</p>');
}


$search.on('click', Submit);
$query.keyup(function (key) {
	if (key.keyCode == 13){
		Submit();
	}
});

Submit();
