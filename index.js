

  
    let postsData = [
      {
        id: 1,
        author: "John",
        content: "Hello, Instagram!",
        likes: 10,
        comments: ["Great post!", "Nice photo!"],
        image: "https://files.codingninjas.in/image2-28694.jpg",
      },
      {
        id: 2,
        author: "Jane",
        content: "This is a great post!",
        likes: 15,
        comments: [],
        image: "https://files.codingninjas.in/oip-28704.jpg",
      },
      {
        id: 3,
        author: "Alice",
        content: "Another post",
        likes: 8,
        comments: [],
        image: "https://files.codingninjas.in/th-2-28706.jpg",
      },
      {
        id: 4,
        author: "Bob",
        content: "Check out this photo!",
        likes: 20,
        comments: [],
        image: "https://files.codingninjas.in/image1-28708.jpg",
      },
    ];

    const likedPosts = new Set();

    function renderPosts() {
      const postsContainer = document.getElementById("posts");
      postsContainer.innerHTML = "";

      postsData.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const authorElement = document.createElement("h3");
        authorElement.textContent = post.author;

        const contentElement = document.createElement("p");
        contentElement.textContent = post.content;

        const imageElement = document.createElement("img");
        imageElement.src = post.image;
        imageElement.alt = "Post Image";
        imageElement.style.maxWidth = "100%";

        const likeButton = document.createElement("button");
        likeButton.textContent = `Like`;
        likeButton.dataset.postId = post.id;
        likeButton.classList.add("like-button");

        // Highlight liked post button in red
        if (likedPosts.has(post.id)) {
          likeButton.style.backgroundColor = 'red';
          likeButton.disabled = true;
        }

        likeButton.addEventListener("click", () => {
          if (!likedPosts.has(post.id)) {
            likedPosts.add(post.id);
            likePost(post.id); // this calls renderPosts again
          }
        });

        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Write a comment...";

        const commentButton = document.createElement("button");
        commentButton.textContent = "Comment";
        commentButton.classList.add("comment-button");

        commentButton.addEventListener("click", () => {
          addComment(commentInput.value, post.id);
          commentInput.value = "";
        });

        const postFooter = document.createElement("div");
        postFooter.classList.add("post-footer");
        postFooter.textContent = `Likes: ${post.likes}   Comments: ${post.comments.length}`;

        const commentsContainer = document.createElement("div");
        commentsContainer.classList.add("comments-container");
        commentsContainer.style.display = "none";

        post.comments.forEach((comment) => {
          const commentElement = document.createElement("p");
          commentElement.textContent = comment;
          commentsContainer.appendChild(commentElement);
        });

        postFooter.addEventListener("click", () => {
          commentsContainer.style.display =
            commentsContainer.style.display === "none" ? "block" : "none";
        });

        // Append all elements
        postElement.appendChild(authorElement);
        postElement.appendChild(imageElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(likeButton);
        postElement.appendChild(commentInput);
        postElement.appendChild(commentButton);
        postElement.appendChild(postFooter);
        postElement.appendChild(commentsContainer);

        postsContainer.appendChild(postElement);
      });
    }

    function likePost(postId) {
      const post = postsData.find((p) => p.id === postId);
      if (post) {
        post.likes++;
        renderPosts(); // re-render with updated data
      }
    }

    function addComment(comment, postId) {
      const post = postsData.find((p) => p.id === postId);
      if (post) {
        post.comments.push(comment);
        renderPosts(); // re-render with updated comments
      }

    }

const form = document.getElementById("postForm");

form.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const captionInput = document.getElementById("postInput");
  let caption = captionInput.value.trim(); // ✅ fixed

  const imageInput = document.getElementById("imageInput");
  let img = imageInput.files[0];

 

  let imgUrl = URL.createObjectURL(img);

  const post = {
    id: postsData.length + 1,
    author: "John",
    content: caption,
    likes: 0,
    comments: [],
    image: imgUrl
  };
    console.log("New post added:", post.id);

  postsData.push(post); // ✅ Add to JSON array


  renderPosts();

  // Optional: Reset form
  form.reset();
});






    renderPosts();

