import React, { type FC } from "react";

interface IProduct {
  productname: string;
  productdescription: string;
}

const ProductCard: FC<IProduct> = ({ productname, productdescription }) => {
  return (
    <div style={{ padding: 10 }}>
      <span>{productname}</span>
      <br />
      <span>{productdescription}</span>
    </div>
  );
};

export default ProductCard;
