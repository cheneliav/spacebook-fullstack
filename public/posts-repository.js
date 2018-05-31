    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    // addPost(postText) {
    //     this.posts.push({ text: postText, comments: [] });
    // }
    addPost(postText) {
        return $.ajax({
            method: 'post',
            url: '/posts',
            data: { text: postText, comments: [] },
            success: (newPost) => {
                console.log("postText: " + postText);
                this.posts.push(newPost);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }

    // removePost(index) {
    //     this.posts.splice(index, 1);
    // }

    removePost(id,index) {
        return $.ajax({
            method: 'DELETE',
            url: '/posts/' + id,
            dataType: 'json',
            success: (post) => {
                this.posts.splice(index, 1);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }
    
    // addComment(newComment, id,postIndex) {
    //     this.posts[postIndex].comments.push(newComment);
    // };
    addComment(newComment,id, postIndex) {
        
        return $.ajax({
            method: 'post',
            url: '/posts/' + id + '/comments',
            data: newComment,
            success: (post) => {
                console.log(newComment);
                this.posts[postIndex].comments.push(newComment);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

    };
    
    // deleteComment(postIndex, commentIndex) {
    //     this.posts[postIndex].comments.splice(commentIndex, 1);
    //   };
    deleteComment(postIndex,postId, commentIndex, commentId) {
        return $.ajax({
            method: 'DELETE',
            url: '/posts/' + postId + '/comments/' + commentId,
            dataType: 'json',
            success: (post) => {
                this.posts[postIndex].comments.splice(commentIndex, 1);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
      };
}

export default PostsRepository