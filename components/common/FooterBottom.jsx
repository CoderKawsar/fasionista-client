import Image from "next/image";
import Link from "next/link";

export const FooterBottom = () => {
  return (
    <footer className="py-6 md:py-8 px-12">
      <div className="gap-4 space-y-5 xl:flex xl:items-center xl:justify-between xl:space-y-0">
        <Link href="#" title="" className="block">
          <Image
            className="h-8 w-auto dark:block"
            src="/assets/images/logo.png"
            width={200}
            height={50}
            alt=""
          />
        </Link>

        <ul className="flex flex-wrap items-center gap-4 text-sm text-gray-900 dark:text-white xl:justify-center">
          <li>
            <Link href="#" title="" className="font-medium hover:underline">
              {" "}
              Fashionista Express{" "}
            </Link>
          </li>
          <li>
            <Link href="#" title="" className="font-medium hover:underline">
              {" "}
              Legal Notice{" "}
            </Link>
          </li>
          <li>
            <Link href="#" title="" className="font-medium hover:underline">
              {" "}
              Product Listing Policy{" "}
            </Link>
          </li>
          <li>
            <Link href="#" title="" className="font-medium hover:underline">
              {" "}
              Terms of Use{" "}
            </Link>
          </li>
        </ul>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024{" "}
          <Link href="#" className="hover:underline">
            Fashionista
          </Link>
          , All rights reserved.
        </p>
      </div>
    </footer>
  );
};
