import React, { useEffect, useState } from 'react';
import { BlogPostPortalList } from '../helpers/BlogPostPortalList';
import BlogPostPortalItem from '../components/BlogPostPortalItem';
import '../styles/BlogPostPortal.css';
import axios from 'axios';
import Homes from "../assets/homes.jpg";

function BlogPostPortal() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem('token');
    getData(token);
  },[]);

  const getData = async(token) => {
    await axios.get('http://local.backend-dev/api/posts', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      console.log(response.data.data)
      setPost(response.data.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="posts">
      <h1 className="postsTitle">Blog Post View</h1>
      <div className="postsList">
        {posts.map((post) => {
          return (
            <BlogPostPortalItem
              key={post.id}
              image={post.post_attachments.length === 0? Homes: post.post_attachments[0].attachment }
              name={post.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BlogPostPortal;
