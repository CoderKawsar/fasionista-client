import { rootPath } from "@/constants";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useError = () => {
  const router = useRouter();
  const apiErrorHandel = (error) => {
    const errorMessages = error.response?.data?.errorMessages ?? [];

    if (error.response?.status === 500) {
      toast.error("Something went wrong");
    } else if (error.response?.status === 401) {
      toast.error(error.response?.data?.message);
      router.push(`${rootPath}/login`);
    }

    if (errorMessages?.length > 0) {
      for (let key of errorMessages) {
        toast.error(key?.message);
      }
    } else {
      toast.error(error.response?.data?.message);
    }
  };

  return { apiErrorHandel };
};

export default useError;
