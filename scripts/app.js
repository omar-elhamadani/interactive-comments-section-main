import {
  comments,
  calcMaxLikes,
  calcMinLikes,
  addComment,
  updateComments,
  saveToLocalStorage,
  deleteComment,
  addReply,
  updateReplies,
  replies,
} from "./comments.js";

const sendBtn = document.querySelector(".add-comment-footer button");

const desktopWidth = "(min-width: 765px)";

function dUpdateComment() {
  let commentsHTML = ``;
  comments.forEach((comment) => {
    if (comment.name == "juliusomo") {
      commentsHTML += `
  <div class="comments comment-${comment.name} comment-${comment.id}" >
        <div class="comment-header">
          <img
            class="comment-img"
            src=${comment.image}
            alt="${comment.name}-img"
          />
          <h4 class="comment-user">${comment.name}</h4>
          <p class="comment-you">you</p>
          <p class="comment-date">${comment.date}</p>
                    <button class="delete" data-comment-id="${comment.id}">
            <img src="./images/icon-delete.svg" alt="" /> Delete
          </button>
          <button class="edit" data-comment-id="${comment.id}">
            <img src="./images/icon-edit.svg" alt="" /> Edit
          </button>
        </div>
        <div class="comment-content-container comment-content-container-${comment.id}">
        

          <div class="comment-likes">
            <button class="like" data-comment-id="${comment.id}">+</button>
            <p class="likes-value likes-value-${comment.id}">${comment.likes}</p>
            <button class="dislike" data-comment-id="${comment.id}">–</button>
          </div>
                    <p class="comment-content comment-content-${comment.id}">${comment.content}
          </p>
        </div>
        <div class="comment-footer comment-footer-${comment.id}">
          
          <div class="comment-footer-buttons">

          </div>
        </div>
      </div>
        <div class="hidden add-reply add-reply-${comment.id} " data-comment-id="${comment.id}">
              <div class="add-reply">
                <textarea
                  class="add-reply-content-${comment.id}"
                  name="add-reply-content"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Add a reply..."
                ></textarea>
          <div class="add-reply-footer">
            <img
              class="add-reply-img"
              src="./images/avatars/image-juliusomo.png"
              alt="juliusomo-img"
            />
            <button class="add-reply-button" data-comment-id="${comment.id}">REPLY</button>
          </div>
        </div>
    </div>    
    <div class="replies replies-${comment.id}">
    </div>  
  
  `;
    } else {
      commentsHTML += `
  <div class="comments comment-${comment.name} comment-${comment.id}" >
        <div class="comment-header">
          <img
            class="comment-img"
            src=${comment.image}
            alt="${comment.name}-img"
          />
          <h4 class="comment-user">${comment.name}</h4>
          <p class="comment-date">${comment.date}</p>
          <button class="reply" data-comment-id="${comment.id}">
            <img src="./images/icon-reply.svg" alt="" /> Reply
          </button>
        </div>
        <div class="comment-content-container comment-content-container-${comment.id}">
         
          <div class="comment-likes">
            <button class="like" data-comment-id="${comment.id}">+</button>
            <p class="likes-value likes-value-${comment.id}">${comment.likes}</p>
            <button class="dislike" data-comment-id="${comment.id}">–</button>
          </div>
           <p class="comment-content">${comment.content}</p>
        </div>
        <div class="comment-footer comment-footer-${comment.id}">
          
          
        </div>
      </div>      
      <div class="hidden add-reply add-reply-${comment.id} " data-comment-id="${comment.id}">
           <div class="add-reply">
      <textarea
        class="add-reply-content-${comment.id}"
        name="add-reply-content"
        id=""
        cols="30"
        rows="10"
        placeholder="Add a reply..."
      ></textarea>
      <div class="add-reply-footer">
        <img
          class="add-reply-img"
          src="./images/avatars/image-juliusomo.png"
          alt="juliusomo-img"
        />
        <button class="add-reply-button" data-comment-id="${comment.id}">REPLY</button>
      </div>
    </div>

    </div>  
    <div class="replies replies-${comment.id}">
    </div>

  
  `;
    }
  });
  document.querySelector(".main").innerHTML = commentsHTML;
}
function dUpdateReplies() {
  comments.forEach((comment) => {
    replies.forEach((reply) => {
      if (reply.parentCommentId == comment.id) {
        let addReplyHTML = ``;

        if (reply.name == "juliusomo") {
          addReplyHTML = `
  <div class="comments comment-${reply.name} comment-${reply.id}" >
        <div class="comment-header">
          <img
            class="comment-img"
            src=${reply.image}
            alt="${reply.name}-img"
          />
          <h4 class="comment-user">${reply.name}</h4>
          <p class="comment-you">you</p>
          <p class="comment-date">${reply.date}</p>
            <button class="delete" data-comment-id="${reply.id}">
              <img src="./images/icon-delete.svg" alt="" /> Delete
            </button>
            <button class="edit" data-comment-id="${reply.id}">
              <img src="./images/icon-edit.svg" alt="" /> Edit
            </button>
        </div>
        <div class="comment-content-container comment-content-container-${reply.id}">
          <div class="comment-likes">
            <button class="like" data-comment-id="${reply.id}">+</button>
            <p class="likes-value likes-value-${reply.id}">${reply.likes}</p>
            <button class="dislike" data-comment-id="${reply.id}">–</button>
          </div>
          <p class="comment-content comment-content-${reply.id} ">${reply.content}
          </p>
        </div>
        <div class="comment-footer comment-footer-${reply.id}">
          
          <div class="comment-footer-buttons">

          </div>
        </div>
      </div>      
      <div class="add-reply add-reply-${reply.id}" data-comment-id="${reply.id}">

      </div>
  
  `;
        } else {
          addReplyHTML = `
  <div class="comments comment-${reply.name} comment-${reply.id}" >
        <div class="comment-header">
          <img
            class="comment-img"
            src=${reply.image}
            alt="${reply.name}-img"
          />
          <h4 class="comment-user">${reply.name}</h4>
          <p class="comment-date">${reply.date}</p>
        </div>
        <div class="comment-content-container comment-content-container-${reply.id}">
          <div class="comment-likes">
            <button class="like" data-comment-id="${reply.id}">+</button>
            <p class="likes-value likes-value-${reply.id}">${reply.likes}</p>
            <button class="dislike" data-comment-id="${reply.id}">–</button>
          </div>
          <p class="comment-content">${reply.content}</p>
        </div>
        <div class="comment-footer comment-footer-${reply.id}">
          
          <button class="reply" data-comment-id="${reply.id}">
            <img src="./images/icon-reply.svg" alt="" /> Reply
          </button>
        </div>
      </div>      
      <div class="hidden add-reply add-reply-${reply.id} " data-comment-id="${reply.id}">
           <div class="add-reply">
      <textarea
        class="add-reply-content-${reply.id}"
        name="add-reply-content"
        id=""
        cols="30"
        rows="10"
        placeholder="Add a reply..."
      ></textarea>
      <div class="add-reply-footer">
        <img
          class="add-reply-img"
          src="./images/avatars/image-juliusomo.png"
          alt="juliusomo-img"
        />
        <button class="add-reply-button" data-comment-id="${reply.id}">REPLY</button>
      </div>
    </div>

    </div>  
    <div class="replies replies-${reply.id}">
    </div>

  
  `;
        }
        document.querySelector(`.replies-${comment.id}`).innerHTML +=
          addReplyHTML;
      }
    });
  });
}

function desktop() {
  if (window.matchMedia(desktopWidth).matches) {
    dUpdateComment();

    dUpdateReplies();
    sendBtn.addEventListener("click", () => {
      addComment();
    });

    document.querySelectorAll(".like").forEach((likeBtn) => {
      likeBtn.addEventListener("click", () => {
        const commentId = likeBtn.dataset.commentId;
        const numOfLikes = document.querySelector(`.likes-value-${commentId}`);
        console.log(commentId);

        const maxLikes = calcMaxLikes(commentId);

        if (numOfLikes.innerHTML < maxLikes) {
          numOfLikes.innerHTML++;
          comments.forEach((comment) => {
            if (comment.id == commentId) {
              comment.likes = numOfLikes.innerHTML;
              saveToLocalStorage();
            }
          });
          replies.forEach((reply) => {
            if (reply.id == commentId) {
              reply.likes = numOfLikes.innerHTML;
              saveToLocalStorage();
            }
          });
        }
      });
    });

    document.querySelectorAll(".dislike").forEach((dislikeBtn) => {
      dislikeBtn.addEventListener("click", () => {
        const commentId = dislikeBtn.dataset.commentId;
        const numOfLikes = document.querySelector(`.likes-value-${commentId}`);
        const minLikes = calcMinLikes(commentId);
        if (numOfLikes.innerHTML > minLikes) {
          numOfLikes.innerHTML--;
          comments.forEach((comment) => {
            if (comment.id == commentId) {
              comment.likes = numOfLikes.innerHTML;
              saveToLocalStorage();
            }
          });
          replies.forEach((reply) => {
            if (reply.id == commentId) {
              reply.likes = numOfLikes.innerHTML;
              saveToLocalStorage();
            }
          });
        }
      });
    });

    deleteComment();

    document.querySelectorAll(".edit").forEach((editBtn) => {
      editBtn.addEventListener("click", () => {
        const commentId = editBtn.dataset.commentId;
        const contentContainer = document.querySelector(
          `.comment-content-container-${commentId}`
        );
        console.log(commentId);
        const text = document.createElement("textarea");
        text.value = document.querySelector(
          `.comment-content-${commentId}`
        ).innerHTML;
        const commentToUpdate = document.querySelector(`.comment-${commentId}`);
        const commentContent = document.querySelector(
          `.comment-content-${commentId}`
        );
        const updateContainer = document.createElement("div");
        updateContainer.classList.add("update-container");

        updateContainer.innerHTML += `
<button class="update" data-comment-id="${commentId}">UPDATE</button>
    
    `;
        commentContent.classList.add("hidden");
        if (
          document.querySelector(
            `.comment-content-container-${commentId} textarea`
          )
        ) {
          return;
        }
        contentContainer.appendChild(text);

        commentToUpdate.appendChild(updateContainer);
        document.querySelectorAll(".update").forEach((updateBtn) => {
          updateBtn.addEventListener("click", () => {
            const updateCommentId = updateBtn.dataset.commentId;
            document.querySelector(
              `.comment-content-${updateCommentId}`
            ).innerHTML = text.value;
            updateContainer.remove();
            text.classList.add("hidden");
            commentContent.classList.remove("hidden");
            comments.forEach((comment) => {
              if (comment.id == commentId) {
                comment.content = text.value;
                saveToLocalStorage();
              }
            });
          });
        });
      });
    });

    document.querySelectorAll(".reply").forEach((replyBtn) => {
      replyBtn.addEventListener("click", () => {
        const commentId = replyBtn.dataset.commentId;
        document
          .querySelector(`.add-reply-${commentId}`)
          .classList.toggle("hidden");
      });
    });
    document.querySelectorAll(".add-reply-button").forEach((addReplyBtn) => {
      addReplyBtn.addEventListener("click", () => {
        const commentId = addReplyBtn.dataset.commentId;
        addReply(commentId);
      });
    });
  } else {
    updateComments();
    updateReplies();

    sendBtn.addEventListener("click", () => {
      addComment();
    });

    document.querySelectorAll(".like").forEach((likeBtn) => {
      likeBtn.addEventListener("click", () => {
        const commentId = likeBtn.dataset.commentId;
        const numOfLikes = document.querySelector(`.likes-value-${commentId}`);
        console.log(commentId);

        const maxLikes = calcMaxLikes(commentId);

        if (numOfLikes.innerHTML < maxLikes) {
          numOfLikes.innerHTML++;
          comments.forEach((comment) => {
            if (comment.id == commentId) {
              comment.likes = numOfLikes.innerHTML;
              saveToLocalStorage();
            }
          });
          replies.forEach((reply) => {
            if (reply.id == commentId) {
              reply.likes = numOfLikes.innerHTML;
              saveToLocalStorage();
            }
          });
        }
      });
    });

    document.querySelectorAll(".dislike").forEach((dislikeBtn) => {
      dislikeBtn.addEventListener("click", () => {
        const commentId = dislikeBtn.dataset.commentId;
        const numOfLikes = document.querySelector(`.likes-value-${commentId}`);
        const minLikes = calcMinLikes(commentId);
        if (numOfLikes.innerHTML > minLikes) {
          numOfLikes.innerHTML--;
          comments.forEach((comment) => {
            if (comment.id == commentId) {
              comment.likes = numOfLikes.innerHTML;
              saveToLocalStorage();
            }
          });
          replies.forEach((reply) => {
            if (reply.id == commentId) {
              reply.likes = numOfLikes.innerHTML;
              saveToLocalStorage();
            }
          });
        }
      });
    });

    deleteComment();

    document.querySelectorAll(".edit").forEach((editBtn) => {
      editBtn.addEventListener("click", () => {
        const commentId = editBtn.dataset.commentId;
        const contentContainer = document.querySelector(
          `.comment-content-container-${commentId}`
        );
        console.log(commentId);
        const text = document.createElement("textarea");
        text.value = document.querySelector(
          `.comment-content-${commentId}`
        ).innerHTML;
        const commentToUpdate = document.querySelector(`.comment-${commentId}`);
        const commentContent = document.querySelector(
          `.comment-content-${commentId}`
        );
        const updateContainer = document.createElement("div");
        updateContainer.classList.add("update-container");

        updateContainer.innerHTML += `
<button class="update" data-comment-id="${commentId}">UPDATE</button>
    
    `;
        commentContent.classList.add("hidden");
        if (
          document.querySelector(
            `.comment-content-container-${commentId} textarea`
          )
        ) {
          return;
        }
        contentContainer.appendChild(text);

        commentToUpdate.appendChild(updateContainer);
        document.querySelectorAll(".update").forEach((updateBtn) => {
          updateBtn.addEventListener("click", () => {
            const updateCommentId = updateBtn.dataset.commentId;
            document.querySelector(
              `.comment-content-${updateCommentId}`
            ).innerHTML = text.value;
            updateContainer.remove();
            text.classList.add("hidden");
            commentContent.classList.remove("hidden");
            comments.forEach((comment) => {
              if (comment.id == commentId) {
                comment.content = text.value;
                saveToLocalStorage();
              }
            });
          });
        });
      });
    });

    document.querySelectorAll(".reply").forEach((replyBtn) => {
      replyBtn.addEventListener("click", () => {
        const commentId = replyBtn.dataset.commentId;
        document
          .querySelector(`.add-reply-${commentId}`)
          .classList.toggle("hidden");
      });
    });
    document.querySelectorAll(".add-reply-button").forEach((addReplyBtn) => {
      addReplyBtn.addEventListener("click", () => {
        const commentId = addReplyBtn.dataset.commentId;
        addReply(commentId);
      });
    });
  }
}
window.matchMedia(desktopWidth).addEventListener("change", desktop);
window.onload = desktop;
