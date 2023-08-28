export let newId = JSON.parse(localStorage.getItem("newId"));
export let comments = JSON.parse(localStorage.getItem("comments"));
if (!comments) {
  comments = [
    {
      id: 1,
      name: "amyrobson",
      image: "./images/avatars/image-amyrobson.png",
      date: "1 month ago",
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      likes: 12,
      maxLikes: 13,
      minLikes: 11,
    },
    {
      id: 2,
      name: "maxblagun",
      image: "./images/avatars/image-maxblagun.png",
      date: "2 weeks ago",
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      likes: 5,
      maxLikes: 6,
      minLikes: 4,
    },
  ];
}
export let replies = JSON.parse(localStorage.getItem("replies"));
if (!replies) {
  replies = [
    {
      parentCommentId: 2,
      id: 150,
      name: "ramsesmiron",
      image: "./images/avatars/image-ramsesmiron.png",
      date: "1 week ago",
      content: `@${nameFromId(
        2
      )}, If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.`,
      likes: 0,
      maxLikes: 1,
      minLikes: -1,
    },
    {
      parentCommentId: 2,
      id: 200,
      name: "juliusomo",
      image: "./images/avatars/image-juliusomo.png",
      date: "2 days ago",
      content: `@${nameFromId(
        2
      )}, I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.`,
      likes: 0,
      maxLikes: 1,
      minLikes: -1,
    },
  ];
}

if (!newId) {
  newId = 2;
}
/* localStorage.clear(); */

export function calcMaxLikes(commentId) {
  let matchedComment = comments.filter((comment) => comment.id == commentId);
  if (typeof matchedComment[0] == "undefined") {
    matchedComment = replies.filter((reply) => reply.id == commentId);
  }
  return matchedComment[0].maxLikes;
}
export function calcMinLikes(commentId) {
  let matchedComment = comments.filter((comment) => comment.id == commentId);
  if (typeof matchedComment[0] == "undefined") {
    matchedComment = replies.filter((reply) => reply.id == commentId);
  }
  return matchedComment[0].minLikes;
}
export function addComment() {
  newId++;
  console.log(newId);
  comments.push({
    id: newId,
    name: "juliusomo",
    image: "./images/avatars/image-juliusomo.png",
    date: "today",
    content: document.querySelector(".add-comment-textarea").value,
    likes: 0,
    maxLikes: 1,
    minLikes: -1,
  });
  let lastElement = comments[comments.length - 1];
  console.log(comments);
  const addCommentHTML = `
  <div class="comments comment-${lastElement.name} comment-${lastElement.id}" >
        <div class="comment-header">
          <img
            class="comment-img"
            src=${lastElement.image}
            alt="${lastElement.name}-img"
          />
          <h4 class="comment-user">${lastElement.name}</h4>
          <p class="comment-date">${lastElement.date}</p>
        </div>
        <div class="comment-content-container comment-content-container-${lastElement.id}">
          <p class="comment-content comment-content-${lastElement.id} ">${lastElement.content}
          </p>
        </div>
        <div class="comment-footer comment-footer-${lastElement.id}">
          <div class="comment-likes">
            <button class="like" data-comment-id="${lastElement.id}">+</button>
            <p class="likes-value likes-value-${lastElement.id}">${lastElement.likes}</p>
            <button class="dislike" data-comment-id="${lastElement.id}">–</button>
          </div>
          <div class="comment-footer-buttons">
            <button class="delete" data-comment-id="${lastElement.id}">
              <img src="./images/icon-delete.svg" alt="" /> Delete
            </button>
            <button class="edit" data-comment-id="${lastElement.id}">
              <img src="./images/icon-edit.svg" alt="" /> Edit
            </button>
          </div>
        </div>
      </div>      
      <div class="add-reply add-reply-${lastElement.id}" data-comment-id="${lastElement.id}">

      </div>
  
  `;
  document.querySelector(".main").innerHTML += addCommentHTML;
  saveToLocalStorage();
  location.reload();
}
export function addReply(commentId) {
  newId++;
  replies.push({
    parentCommentId: commentId,
    id: newId,
    name: "juliusomo",
    image: "./images/avatars/image-juliusomo.png",
    date: "today",
    content: `@${nameFromId(commentId)}, ${
      document.querySelector(`.add-reply-content-${commentId}`).value
    }`,
    likes: 0,
    maxLikes: 1,
    minLikes: -1,
  });
  let lastElement = replies[replies.length - 1];
  const addReplyHTML = `
  <div class="comments comment-${lastElement.name} comment-${lastElement.id}" >
        <div class="comment-header">
          <img
            class="comment-img"
            src=${lastElement.image}
            alt="${lastElement.name}-img"
          />
          <h4 class="comment-user">${lastElement.name}</h4>
          <p class="comment-date">${lastElement.date}</p>
        </div>
        <div class="comment-content-container comment-content-container-${lastElement.id}">
          <p class="comment-content comment-content-${lastElement.id} ">${lastElement.content}
          </p>
        </div>
        <div class="comment-footer comment-footer-${lastElement.id}">
          <div class="comment-likes">
            <button class="like" data-comment-id="${lastElement.id}">+</button>
            <p class="likes-value likes-value-${lastElement.id}">${lastElement.likes}</p>
            <button class="dislike" data-comment-id="${lastElement.id}">–</button>
          </div>
          <div class="comment-footer-buttons">
            <button class="delete" data-comment-id="${lastElement.id}">
              <img src="./images/icon-delete.svg" alt="" /> Delete
            </button>
            <button class="edit" data-comment-id="${lastElement.id}">
              <img src="./images/icon-edit.svg" alt="" /> Edit
            </button>
          </div>
        </div>
      </div>      
      <div class="add-reply add-reply-${lastElement.id}" data-comment-id="${lastElement.id}">

      </div>
  
  `;
  document.querySelector(`.replies-${commentId}`).innerHTML += addReplyHTML;
  document.querySelector(`.add-reply-${commentId}`).classList.toggle("hidden");
  saveToLocalStorage();
  location.reload();
}
export function updateComments() {
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
        </div>
        <div class="comment-content-container comment-content-container-${comment.id}">
          <p class="comment-content comment-content-${comment.id}">${comment.content}
          </p>
        </div>
        <div class="comment-footer comment-footer-${comment.id}">
          <div class="comment-likes">
            <button class="like" data-comment-id="${comment.id}">+</button>
            <p class="likes-value likes-value-${comment.id}">${comment.likes}</p>
            <button class="dislike" data-comment-id="${comment.id}">–</button>
          </div>
          <div class="comment-footer-buttons">
          <button class="delete" data-comment-id="${comment.id}">
            <img src="./images/icon-delete.svg" alt="" /> Delete
          </button>
          <button class="edit" data-comment-id="${comment.id}">
            <img src="./images/icon-edit.svg" alt="" /> Edit
          </button>
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
        </div>
        <div class="comment-content-container comment-content-container-${comment.id}">
          <p class="comment-content">${comment.content}</p>
        </div>
        <div class="comment-footer comment-footer-${comment.id}">
          <div class="comment-likes">
            <button class="like" data-comment-id="${comment.id}">+</button>
            <p class="likes-value likes-value-${comment.id}">${comment.likes}</p>
            <button class="dislike" data-comment-id="${comment.id}">–</button>
          </div>
          <button class="reply" data-comment-id="${comment.id}">
            <img src="./images/icon-reply.svg" alt="" /> Reply
          </button>
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
export function updateReplies() {
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
        </div>
        <div class="comment-content-container comment-content-container-${reply.id}">
          <p class="comment-content comment-content-${reply.id} ">${reply.content}
          </p>
        </div>
        <div class="comment-footer comment-footer-${reply.id}">
          <div class="comment-likes">
            <button class="like" data-comment-id="${reply.id}">+</button>
            <p class="likes-value likes-value-${reply.id}">${reply.likes}</p>
            <button class="dislike" data-comment-id="${reply.id}">–</button>
          </div>
          <div class="comment-footer-buttons">
            <button class="delete" data-comment-id="${reply.id}">
              <img src="./images/icon-delete.svg" alt="" /> Delete
            </button>
            <button class="edit" data-comment-id="${reply.id}">
              <img src="./images/icon-edit.svg" alt="" /> Edit
            </button>
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
          <p class="comment-content">${reply.content}</p>
        </div>
        <div class="comment-footer comment-footer-${reply.id}">
          <div class="comment-likes">
            <button class="like" data-comment-id="${reply.id}">+</button>
            <p class="likes-value likes-value-${reply.id}">${reply.likes}</p>
            <button class="dislike" data-comment-id="${reply.id}">–</button>
          </div>
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
export function saveToLocalStorage() {
  localStorage.setItem("comments", JSON.stringify(comments));
  localStorage.setItem("replies", JSON.stringify(replies));
  localStorage.setItem("newId", JSON.stringify(newId));
}

export function deleteComment() {
  document.querySelectorAll(".delete").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const commentId = deleteBtn.dataset.commentId;
      const modal = document.querySelector(".modal-container");
      const deleteConfirm = document.querySelector(".delete-confirm");
      const cancel = document.querySelector(".cancel");
      modal.classList.remove("hidden");
      deleteConfirm.addEventListener("click", () => {
        comments.forEach((comment) => {
          if (comment.id == commentId) {
            comments = comments.filter((comment) => comment.id != commentId);
            const elementToRemove = document.querySelector(
              `.comment-${commentId}`
            );
            elementToRemove.innerHTML = "";
            modal.classList.add("hidden");
            saveToLocalStorage();
          }
        });
        replies.forEach((reply) => {
          if (reply.id == commentId) {
            replies = replies.filter((reply) => reply.id != commentId);
            const elementToRemove = document.querySelector(
              `.comment-${commentId}`
            );
            elementToRemove.innerHTML = "";
            modal.classList.add("hidden");
            saveToLocalStorage();
          }
        });
      });
      cancel.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    });
  });
}
export function nameFromId(commentId) {
  const matchedComment = comments.filter((comment) => comment.id == commentId);
  return matchedComment[0].name;
}
