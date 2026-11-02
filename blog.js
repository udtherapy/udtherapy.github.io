const blogList = document.querySelector('[data-blog-list]');

if (blogList) {
  if (!Array.isArray(window.blogPosts)) {
    throw new Error('Blog posts could not be loaded. Check blog-posts.js.');
  }

  const posts = [...window.blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  blogList.replaceChildren();

  if (posts.length === 0) {
    const emptyState = document.createElement('article');
    emptyState.className = 'blog-empty';

    const heading = document.createElement('h2');
    heading.textContent = 'New articles coming soon';

    const message = document.createElement('p');
    message.textContent = 'Please check back for future reflections and resources.';

    emptyState.append(heading, message);
    blogList.append(emptyState);
  } else {
    const dateFormatter = new Intl.DateTimeFormat('en', {
      dateStyle: 'long',
      timeZone: 'UTC'
    });

    posts.forEach((post) => {
      const article = document.createElement('details');
      article.className = 'blog-post';

      const toggle = document.createElement('summary');
      toggle.className = 'blog-post-toggle';

      const date = document.createElement('time');
      date.className = 'blog-meta';
      date.dateTime = post.date;
      date.textContent = dateFormatter.format(new Date(`${post.date}T00:00:00Z`));

      const heading = document.createElement('h2');
      heading.textContent = post.title;

      const summary = document.createElement('p');
      summary.className = 'blog-post-summary';
      summary.textContent = post.summary;

      const content = document.createElement('div');
      content.className = 'blog-post-content';
      post.paragraphs.forEach((block) => {
        if (typeof block === 'string') {
          const paragraph = document.createElement('p');
          paragraph.textContent = block;
          content.append(paragraph);
          return;
        }

        if (block.type === 'heading') {
          const subheading = document.createElement('h3');
          subheading.textContent = block.text;
          content.append(subheading);
          return;
        }

        if (block.type === 'paragraph') {
          const paragraph = document.createElement('p');
          const lead = document.createElement('strong');
          lead.textContent = block.lead;
          paragraph.append(lead, document.createTextNode(block.text));
          content.append(paragraph);
        }
      });

      toggle.append(date, heading, summary);
      article.append(toggle, content);
      blogList.append(article);
    });
  }
}
