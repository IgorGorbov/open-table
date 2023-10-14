import React from "react";

interface Props {
  images: string[];
}

export const Images: React.FC<Props> = ({ images }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images.length} photos
      </h1>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <img
            key={image}
            src={image}
            className="w-56 h-44 mr-1 mb-1"
            alt="restaurant image"
          />
        ))}
      </div>
    </div>
  );
};
