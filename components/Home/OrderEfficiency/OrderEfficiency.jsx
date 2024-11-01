import { BiCube } from "react-icons/bi";
import { OrderEfficiencySingle } from "./OrderEfficiencySingle";

export const OrderEfficiency = () => {
  const orderEfficiencyData = [
    {
      _id: 1,
      icon: <BiCube />,
      title: "Free Shipping",
      description: "From all orders over $100",
    },
    {
      _id: 2,
      icon: <BiCube />,
      title: "Flexible Payment",
      description: "Pay with Multiple Credit Card",
    },
    {
      _id: 3,
      icon: <BiCube />,
      title: "14 Day Returns",
      description: "Within 30 days for an exchange",
    },
    {
      _id: 4,
      icon: <BiCube />,
      title: "Premium Support",
      description: "Outstanding Support",
    },
  ];
  return (
    <div className="mx-16 grid grid-cols-4 justify-between gap-x-6">
      {orderEfficiencyData.map((orderEfficiency) => (
        <OrderEfficiencySingle
          key={orderEfficiency._id}
          orderEfficiency={orderEfficiency}
        />
      ))}
    </div>
  );
};
