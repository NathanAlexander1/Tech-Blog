const addBlogForm = document.querySelector(".addBlog");
const deletePost = document.querySelectorAll(".deletePost");

addBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("Prevented default!")

  const blogObj = {
    title: document.querySelector(".blogTitle").value,
    blog_content: document.querySelector(".blog_content").value,
  };

  fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(blogObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      console.log(res);
      alert("trumpet sound");
    }
  });
});

// deletePost.forEach(.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("Prevented default!");

//   fetch("/api/blogs/:id", {
//     method: "DELETE",
//   }).then((res) => {
//     location.reload();
//   });
// })
// )

deletePost.forEach((delBtn) => {
  delBtn.addEventListener("click", (e) => {
    const blogId = e.target.getAttribute("data-blogId");
    console.log(blogId);
    fetch(`/api/blogs/${blogId}`, {
      method: "DELETE"
    }).then((res) => {
      if (res.ok) {
        location.reload();
      } else {
        alert("trumpet sound");
      }
    });
  });
});
