var Templates = {};

Templates.video = [
    '<article class="item">',
        '<figure class="image_item"> <img src="{{ thumb }}" /> </figure>',
        '<div class="desktop">',
            '<h2 class="title_item"><a href="#">{{ title }}</a></h2>',
            '<p class="author_item"> Por <a href="#">{{ author }}</a></p>',
            '<p class="data_item">',
                '<a class="tag_item" href="#">{{ category }}</a>',
                '<span class="views"><strong>Views: </strong>{{ views }}</span>&nbsp;',
                '<span class="published_item">{{ published }}</span>',
            '</p>',
        '</div>',
        '<div class="embed_item">',
            '<iframe src="{{ embed }}" frameborder="0" allowfullscreen></iframe>',
        '</div>',
    '</article>'
].join("\n");