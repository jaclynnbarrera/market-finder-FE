import React, { useState, useEffect } from "react";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: "tYUP2yWTTGcJiNG3zBX7nkF7Iv2t-cmBbqUaqSMLI_g",
});

function UnsplashAPI() {
  const [data, setPhotosResp] = useState(null);

  useEffect(() => {
    api.search
      .getPhotos({
        query: "farmers market",
        orientation: "landscape",
        page: 1,
        perPage: 20,
      })
      .then((result) => {
        setPhotosResp(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  });
  return <div></div>;
}

export default UnsplashAPI;
