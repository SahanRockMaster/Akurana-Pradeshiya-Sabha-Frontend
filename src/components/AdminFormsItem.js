import React from "react";

function AdminFormsItem({ image, name}) {
  return (
    <div className="formsItem">
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h3> {name} </h3>
      <div className="Dbutton"><button className="DownloadButton">Download</button></div>
    </div>
  );
}

export default AdminFormsItem;
