export const OrderEfficiencySingle = ({ orderEfficiency }) => {
  return (
    <div className="border px-10 py-4 rounded">
      <p className="flex justify-center text-3xl">{orderEfficiency?.icon}</p>
      <h5 className="text-center mt-6 font-medium text-lg">
        {orderEfficiency?.title}
      </h5>
      <p className="text-center mt-1.5 text-sm">
        {orderEfficiency?.description}
      </p>
    </div>
  );
};
