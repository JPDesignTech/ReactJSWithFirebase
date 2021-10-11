import { db } from "../database/firebase";

export function startAddingPost(post) {
  return (dispatch) => {
    return db
      .ref("posts")
      .update({ [post.id]: post })
      .then(() => {
        dispatch(addPost(post));
      });
  };
}

export function startLoadingPost(post) {
  return (dispatch) => {
    return db
      .ref("posts")
      .once("value")
      .then((snapshot) => {
        let posts = [];
        snapshot.forEach((childSnapshot) => {
          posts.push(childSnapshot.val());
        });
        dispatch(loadPosts(posts));
      });
  };
}

export function startRemovingPost(index, id) {
  return (dispatch) => {
    return db
      .ref(`posts/${id}`)
      .remove()
      .then(() => {
        dispatch(removePost(index));
      });
  };
}

export function startAddingComment(comment, postId) {
  return (dispatch) => {
    return db
      .ref(`comments/${postId}`)
      .push(comment)
      .then(() => {
        dispatch(addComment(comment, postId));
      });
  };
}

export function startLoadingComments() {
  return (dispatch) => {
    db.ref("comments")
      .once("value")
      .then((snapshot) => {
        let comments = {};
        snapshot.forEach((childSnapshot) => {
          comments[childSnapshot.key] = Object.values([childSnapshot.val()]);
        });
      });
  };
}

export function loadComments(comments) {
  return {
    type: "LOAD_COMMENTS",
    comments,
  };
}

export function loadPosts(posts) {
  return {
    type: "LOAD_POSTS",
    posts,
  };
}

export function removePost(index) {
  return {
    type: "REMOVE_POST",
    index,
  };
}

export function addPost(post) {
  return {
    type: "ADD_POST",
    post,
  };
}

export function addComment(comment, postId) {
  return {
    type: "ADD_COMMENT",
    comment,
    postId,
  };
}
