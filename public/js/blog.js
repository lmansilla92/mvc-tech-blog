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
                headers: { 'Content-Type': 'application/json' },
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
  

  
  document
    .querySelector('.new-blog-btn')
    .addEventListener('click', newBlog);

  document  
    .querySelector('.new-blog-form')
    .addEventListener('submit', createBlog);