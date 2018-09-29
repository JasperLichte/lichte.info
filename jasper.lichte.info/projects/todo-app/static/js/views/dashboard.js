addEventListener('load', function() {

    var welcomeCard = $('.welcome-card');
    var userClickHandler = $('#user #user-click-handler');
    var userDropdown = $('#user #user-dropdown');
    var todoList = $('.todo .list');
    var addTodoItemForm = $('.todo form#addItem').hide();
    var openAddTodoItemFormButton = $('.todo .inputs #open-form-toogle');
    var reloadTodoListButton = $('.todo .inputs #reload-list');

    setTimeout(function() {
        welcomeCard.fadeOut();
        setTimeout(function() {
            welcomeCard.remove();
        }, 500);
    }, 3000);

    userClickHandler.click(function() {
        userDropdown.fadeToggle();
        $(document).mouseup(function (e) {
            if (!userDropdown.is(e.target) && userDropdown.has(e.target).length === 0) {
                userDropdown.fadeOut();
            }
        });
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
                todoList.html('');
                data.forEach(function(set, i) {
                    todoList.append(`<div class="item">
                                        <span class="title">${set.title ? set.title : ''}</span>
                                        <p class="description">${set.description ? set.description : ''}</span>
                                    </div>`);
                });
            }
        });
    }
    getTodoItems();

    // Post new Todo Entry
    addTodoItemForm.submit(function(e) {
        var titleInput = $(this).find('input[name=title]');
        var descriptionInput = $(this).find('input[name=description]');

        e.preventDefault();

        var data = {
            title: titleInput.val(),
            description: descriptionInput.val(),
        };

        $.ajax('/api/todo', {
            type: 'POST',
            data: data,
            statusCode: {
                400: function (res) {

                }
            },
            success: function() {
                getTodoItems();
                titleInput.val('');
                descriptionInput.val('');
                addTodoItemForm.fadeOut();
            }
        });
    });

    // Form toggle
    openAddTodoItemFormButton.on('click', function() {
        addTodoItemForm.fadeIn();
        $(document).mouseup(function (e) {
            if (!addTodoItemForm.is(e.target) && addTodoItemForm.has(e.target).length === 0) {
                addTodoItemForm.fadeOut();
            }
        });
    });

    // Reload-button
    reloadTodoListButton.click(function() {
        console.log(1);
        todoList.animate({
            scrollTop: 0
        }, 500);
        getTodoItems();
    });

});