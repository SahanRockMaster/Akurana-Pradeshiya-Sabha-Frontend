import React from 'react';
import { BlogPostPortalList } from '../helpers/BlogPostPortalList';
import BlogPostPortalItem from '../components/BlogPostPortalItem';
import '../styles/BlogPostPortal.css';

function BlogPostPortal() {
  return (
    <div className="posts">
      <h1 className="postsTitle">Blog Post View</h1>
      <div className="postsList">
        {BlogPostPortalList.map((blogPostPortalItem, key) => {
          return (
            <BlogPostPortalItem
              key={key}
              image={blogPostPortalItem.image}
              name={blogPostPortalItem.name}
              price={blogPostPortalItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BlogPostPortal;
