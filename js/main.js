var $youtube = $('#youtube'),
	url = 'http://gdata.youtube.com/feeds/api/videos',
	$query = $('#search_query'),
	$search = $('#search_button'),
	$result = $('#result_youtube'),
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
		embed = video.media$group.media$content[0].url.split('?')[0];
	console.log(embed);

	html = '<li class="item">';
	html += '<figure class="image_item"> <img src="' + thumb + '"" /> </figure>';
	html += '<div class="desktop"><h2 class="title_item"><a href="#">' + title + '</a></h2>';
	html += '<p class="author_item"> Por <a href="#">' + author + '</a></p>';
	html += '<p class="data_item"><a class="tag_item" href="#">' + category + '</a><span class="published_item">' + published + '</span></p></div>';
	html += '<div class="embed_item"><iframe src="' + embed + '" frameborder="0" allowfullscreen></iframe></div></li>';

	return html;
}

function Callback (res){
	res = res.feed.entry;
	var html = '';
	for (var i=0; i<res.length; i++){
		html += VideoTemplate(res[i]);
	}
	$result.html(html);
	$item = $('.item')
	$item.on('click', video_view);
	if ($(window).width() > 768)
	{
		$('li:first-child').off('click');
	}
}

function Submit(){
	$.ajax({
		data : {
			alt: 'json',
			lr: 'es',
			q: $query.val(),
			'max-results': 7
		},
		url: url
	}).done( Callback );

	$result.html('<img class="loading_image" src="img/loading.gif" /><p class="loading_text">Loading ...</p>');
}


$search.on('click', Submit);
$query.keyup(function (key) {
	if (key.keyCode == 13){
		Submit()
	}
});
