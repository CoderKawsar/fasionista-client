import Image from "next/image";

export const ShopTheLook = () => {
  return (
    <div>
      <h1 className="text-3xl text-center mb-4">Shop the look</h1>
      <p className="text-center mb-12">
        Inspire and let yourself be inspired, from one unique fashion to
        another.
      </p>
      <div className="grid grid-cols-2">
        <Image
          src="/assets/images/shop-for-look/lookbook-3.jpg"
          width={1200}
          height={600}
          alt="shop the look"
        />
        <Image
          src="/assets/images/shop-for-look/lookbook-4.jpg"
          width={1200}
          height={600}
          alt="shop the look"
        />
      </div>
    </div>
  );
};
