import React from "react";

function BlogPostPortalItem({ image, name, price }) {
  return (
    <div className="postsItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
    </div>
  );
}

export default BlogPostPortalItem;
