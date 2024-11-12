export const NoDataFound = ({ dataType }) => {
  return (
    <p className="w-full text-center text-xl text-red-400 py-8">
      No {dataType} found
    </p>
  );
};
