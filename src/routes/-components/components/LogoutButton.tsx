import useLogout from "@/hooks/useLogout";
import { TbLogout2 } from "react-icons/tb";

function LogoutButton() {
  const { mutate: logoutUser, isPending: isPendingLogout } = useLogout();

  const onSubmitLogout = () => {
    logoutUser();
  };

  return (
    <>
      <button
        onClick={onSubmitLogout}
        className="flex items-center bg-transparent rounded-md w-full lg:hover:bg-black active:bg-black/50 py-4 px-5 gap-4 cursor-pointer"
        disabled={isPendingLogout}
      >
        <TbLogout2 className="w-8 h-8 stroke-1" />
        <span className="lg:text-lg lg:font-medium lg:block md:hidden">
          Logout
        </span>
      </button>
    </>
  );
}

export default LogoutButton;
