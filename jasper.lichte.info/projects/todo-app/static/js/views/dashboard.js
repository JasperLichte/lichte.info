addEventListener('load', function() {

    this.setTimeout(function() {
        $('.welcome-card').remove();
    }, 4000);

    $('#user #user-click-handler').click(function() {
        $('#user #user-dropdown').toggle();
    });


    // Get Todo items
    function getTodoItems() {
        $.ajax('/api/todo', {
            type: 'GET',
            statusCode: {
                400: function (res) {

                }
            },
            success: function(data) {
                var listNode = $('.todo .list');
                listNode.html('');
                data.forEach(function(set, i) {
                    listNode
                        .append(`  <div class="item">
                                        <span class="title">${set.title ? set.title : ''}</span>
                                        <p class="description">${set.description ? set.description : ''}</span>
                                    </div>`)
                });
            }
        });
    }
    getTodoItems();

    // Post new Todo Entry
    $('.todo form#addItem').submit(function(e) {

        var titleNode = $(this).find('input[name=title]');
        var descriptionNode = $(this).find('input[name=description]');

        e.preventDefault();

        var data = {
            title: titleNode.val(),
            description: descriptionNode.val(),
        };

        $.ajax('/api/todo', {
            type: 'POST',
            data: data,
            statusCode: {
                400: function (res) {

                }
            },
            success: function() {
                console.log('success');
                titleNode.val('');
                descriptionNode.val('');
                getTodoItems();
            }
        });

    });

});