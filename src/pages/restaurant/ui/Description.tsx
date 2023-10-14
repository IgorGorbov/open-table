import React from "react";

interface Props {
  description: string;
}

export const Description: React.FC<Props> = ({ description }) => {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  );
};
