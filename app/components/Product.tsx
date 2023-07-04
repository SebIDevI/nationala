import formatPrice from "@/util/PriceFormat";
import { ProductType } from "@/types/ProductType";
import { BsCheck2 } from "react-icons/bs";
import Link from "next/link";
import AddCart from "../product/[id]/AddCart";

export default function Product({
  name,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;
  const feature = features.split(", ");

  const ProductToCart = () => {
    return {
      name,
      id,
      unit_amount,
    };
  };

  const prodFin = ProductToCart();
  return (
    <div className="shadow-3xl font-gothamBook rounded-lg w-full p-4 mx-auto px-6 my-8 max-w-[800px]">
      <div className="font-medium py-2 text-start">
        <h3 className="font-gothamBlack text-3xl">{name}</h3>
        <h4 className="text-lg text-accent">
          {unit_amount !== null ? formatPrice(unit_amount) : "N/A"}
        </h4>
        {/* <hr className="my-4" /> */}
        {/* <Link
          href={{
            pathname: `/product/${id}`,
            query: { name, unit_amount, id, description, features },
          }}
        > */}
        <AddCart {...prodFin} />

        {/* </Link> */}
        <ul>
          {feature.map((val) => (
            <li className="flex items-center gap-4 pb-2">
              <BsCheck2 className="text-accent" />
              {val}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
