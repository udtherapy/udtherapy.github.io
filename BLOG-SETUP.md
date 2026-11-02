# Updating the blog

Each article is a standalone HTML page. That puts the full article in the page source for readers, search engines, and other crawlers, while the blog index keeps a compact, expandable listing.

## Add a post

1. Create a new page under `blog/` by copying `blog/im-not-the-patient.html`. Use a short, unique, lowercase slug with hyphens, such as `blog/my-new-post.html`.
2. Update the page title, description, canonical URL, Open Graph metadata, structured `BlogPosting` data, date, headings, and article text. Keep the article text in normal HTML paragraphs and headings; use `<strong>` for bold phrases.
3. Add an entry to the list in `blog.html`, inside `<div class="blog-list">`:

   ```html
   <details class="blog-post">
     <summary class="blog-post-toggle">
       <time class="blog-meta" datetime="2026-11-01">November 1, 2026</time>
       <h2>A post title</h2>
       <p class="blog-post-summary">A short description of the post.</p>
     </summary>
     <div class="blog-post-content">
       <p>A short invitation to read the full article.</p>
       <a class="button" href="blog/my-new-post.html">Read the full post</a>
     </div>
   </details>
   ```

4. Add the page's full URL to `sitemap.xml`, using the same domain and path as its canonical URL.
5. Save and publish the changes. The expandable listing and article pages are regular HTML and do not depend on JavaScript to display their content.

Use dates in `YYYY-MM-DD` format for `datetime`, canonical and structured data URLs should match the page's actual URL, and summaries should briefly describe the article. The blog is maintained with static files and does not store posts in a third-party service.
