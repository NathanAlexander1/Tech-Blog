const addBlogForm = document.querySelector(".addBlog")

addBlogForm.addEventListener("submit", e=>{
    e.preventDefault();
    // console.log("Prevented default!")

    const blogObj = {
        title:document.querySelector(".blogTitle").value,
        blog_content:document.querySelector(".blog_content").value
    }

    fetch("/api/blogs", {
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.reload()
        } else {
            console.log(res)
            alert("trumpet sound")
        }
    })
})