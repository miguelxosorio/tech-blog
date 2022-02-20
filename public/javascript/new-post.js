async function newPost (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;
    
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
    
};
console.log(document.querySelector('#new-post-form'))
document.querySelector('#new-post-form').addEventListener('submit', newPost);