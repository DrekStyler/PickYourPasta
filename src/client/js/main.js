(function () {

  console.log('sanity check!');

  $(document).on('click', '.restaurant_delete-btn', function() {
    const answer = confirm('Are you sure?');
    if (answer) {
      const $this = $(this);
      const restaurantId = parseInt($this.data('id'));
      $.ajax({
        type: 'DELETE',
        url: '/restaurants/delete/' + restaurantId,
        success: function(result) {
          window.location = result;
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
  });

  //pre-check the users original rating on edit-review page

  $(document).ready(function() {
    const oldRating = $('.oldRating').val();

    $('input:radio').each(function(index) {
      if ($('input:radio')[index].value === oldRating) {
        $(this).attr('checked', 'checked');
      }
    });
  });

  //send put request

  $('.editReview').on('submit', function(e) {
    e.preventDefault();

    const restID = $('.hiddenRest').val();

    const userID = $('.hiddenUser').val();

    const review = $('.reviewText').val();

    const rating = $('input:radio:checked').val();

    const editedReview = {
      rest_id: restID,
      user_id: userID,
      review: review,
      rating: rating
    };

    $.ajax({
      url: '/restaurants/' + restID + '/reviews/' + userID + '/edit',
      type: 'PUT',
      data: JSON.stringify(editedReview),
      contentType: 'application/json',
      success: function(result) {
        window.location = result;
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  $(document).on('click', '.deleteReview', function() {
    const restID = $('.deleteReview').data('id');
    const userID = $('.deleteReview').data('userid');

    const answer = confirm('Are you sure?');

    if (answer) {
      $.ajax({
        url: '/restaurants/' + restID + '/reviews/' + userID + '/delete',
        type: 'DELETE',
        success: function(result) {
          window.location = result;
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
  });

  $('.editRestaurant').on('click', e => {
    e.preventDefault();
    console.log('something');
    const restID = parseInt($('.hiddenRestId').val());
    const name = $('#restName').val();
    const city = $('#city').val();
    const state = $('#state').val();
    const cuisine = $('#cuisine').val();
    const description = $('#description').text();
    const imageUrl = $('#imageUrl').val();

    const updatedRestaurant = {
      name: name,
      city: city,
      state: state,
      cuisine: cuisine,
      description: description,
      imageUrl: imageUrl
    };

    $.ajax({
      url: '/restaurants/' + restID + '/edit',
      type: 'PUT',
      data: JSON.stringify(updatedRestaurant),
      contentType: 'application/json',
      success: function(result) {
        window.location = result;
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

})();
