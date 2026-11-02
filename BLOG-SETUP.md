# Updating the blog

The blog uses a small post list so it can be maintained without a separate service or account.

1. Open `blog-posts.js`.
2. Replace the empty array (`[]`) with one or more post objects in this format:

   ```js
   window.blogPosts = [
     {
       title: 'A post title',
       date: '2026-11-01',
       summary: 'A short introduction to the post.',
       paragraphs: [
         'The first paragraph of the article.',
         'The next paragraph of the article.'
       ]
     }
   ];
   ```

3. Keep dates in `YYYY-MM-DD` format. Add each new post as another object in the array; the newest date appears first.
4. Each post initially displays its date, title, and summary. Readers can select the post to expand or collapse its paragraphs.
5. Save the file and publish the site the same way you publish other website changes.

Post text is treated as plain text, so characters such as apostrophes do not need HTML escaping. The page does not store posts in a third-party service.
