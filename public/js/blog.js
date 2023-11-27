const newBlog = (event) => {
    event.preventDefault();

    const userBlogs = document.querySelector('.user-blogs')
    userBlogs.setAttribute("style", "display: none;");

    const button = document.querySelector('.new-blog-btn')
    button.setAttribute("style", "display: none;")
  
    const newBlogForm = document.querySelector('.new-blog-form');

    newBlogForm.setAttribute("style", "display: block;")
}

const createBlog = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blog-name').value.trim();
    const description = document.querySelector('#blog-description').value.trim();
    console.log('blogName: ', name);
    console.log('blogDescription: ', description);

            if (name && description) {
                // Send a POST request to the API endpoint
                const response = await fetch('/api/blogs', {
                method: 'POST',
                body: JSON.stringify({ name, description }),
                headers: { 'Content-Type': 'application/json' }
                })

                if (response.ok) {
                    // If successful, refresh page
                    document.location.replace('/dashboard');
                    console.log('New Blog Created!');
                } else {
                    alert('Failed to create blog');
                };
            };

}

const deleteBlog = async (event) => {
        if (event.target.hasAttribute('data-id')) {
          const id = event.target.getAttribute('data-id');
      
          const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to delete blog');
          }
        }
}

const editBlog = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const userBlogs = document.querySelector('.user-blogs');
    userBlogs.setAttribute("style", "display: none;");

    const newBlogBtn = document.querySelector('.new-blog-btn');
    newBlogBtn.setAttribute("style", "display: none;"); 

    const editForm = document.querySelector('.edit-blog-form');
    editForm.setAttribute("style", "display: block;");
    editForm.setAttribute("data-id", `${id}`);
}

const updateBlog = async (event) => {
    event.preventDefault();

    console.log('event.target: ', event.target);

    const id = event.target.getAttribute('data-id');

    const name = document.querySelector('#new-blog-name').value.trim();
    const description = document.querySelector('#new-blog-description').value.trim();
    console.log('blogName: ', name);
    console.log('blogDescription: ', description);

        if (name && description) {
            // Send a PUT request to the API endpoint
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, description }),
                headers: { 'Content-Type': 'application/json' }
            })
        
            if (response.ok) {
                // If successful, refresh page
                document.location.replace('/dashboard');
                console.log('Blog Updated!');
            } else {
                alert('Failed to update blog');
            };
        };
}
  

  
document
    .querySelector('.new-blog-btn')
    .addEventListener('click', newBlog);

document  
    .querySelector('.new-blog-form')
    .addEventListener('submit', createBlog);

document    
    .querySelectorAll('.delete').forEach(function(blog) {
        blog.addEventListener('click', deleteBlog);
    });

document
    .querySelectorAll('.edit').forEach(function(blog) {
        blog.addEventListener('click', editBlog);
    });

document  
    .querySelector('.edit-blog-form')
    .addEventListener('submit', updateBlog);