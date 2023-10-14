import React from "react";

import { PRICE } from "..";

interface Props {
  price: PRICE;
}

export const Price: React.FC<Props> = ({ price }) => {
  return (
    <div className="flex mr-3">
      {price === PRICE.CHEAP && (
        <>
          <span>$$</span>
          <span className="text-gray-400">$$</span>
        </>
      )}

      {price === PRICE.REGULAR && (
        <>
          <span>$$$</span>
          <span className="text-gray-400">$</span>
        </>
      )}

      {price === PRICE.EXPENSIVE && <span>$$$$</span>}
    </div>
  );
};
