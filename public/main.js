import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js'; 

let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);


eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();



var getPosts = function () {
    $.ajax({
      method: 'get',
      url: '/posts',
      dataType: 'json',
      success: function (posts) {
        // add the posts and the comments to array
        postsRepository.posts = posts;
        // render all posts and comments on the page
        postsRenderer.renderPosts(postsRepository.posts);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  getPosts();
