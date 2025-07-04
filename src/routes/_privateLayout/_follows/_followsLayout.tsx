import { useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const isActive = (route: string) => {
    return pathname === route;
  };

  return (
    <section className="md:max-w-full md:w-full max-md:w-95">
      <div className="md:pt-10 px-5 pb-3 max-md:pt-5">
        <h1 className="text-3xl font-bold">Follows</h1>
      </div>
      <div className="flex w-full border-b-1 border-[#3F3F3F]">
        <Link
          to={"/followers"}
          className={
            isActive("/followers")
              ? "mx-5 py-2 w-1/2 flex justify-center items-center border-b-4 border-[#04A51E] hover:border-[#04A51E] hover:border-b-4 cursor-pointer"
              : `mx-5 py-2 w-1/2 flex justify-center items-center border-b-4 border-[#1d1d1d] hover:border-[#04A51E] hover:border-b-4 cursor-pointer`
          }
        >
          <h3 className="">Followers</h3>
        </Link>
        <Link
          to={"/followings"}
          className={
            isActive("/followings")
              ? "mx-5 py-2 w-1/2 flex justify-center items-center border-b-4 border-[#04A51E] hover:border-[#04A51E] hover:border-b-4 cursor-pointer"
              : `mx-5 py-2 w-1/2 flex justify-center items-center border-b-4 border-[#1d1d1d] hover:border-[#04A51E] hover:border-b-4 cursor-pointer`
          }
        >
          <h3>Followings</h3>
        </Link>
      </div>
      <Outlet />
    </section>
  );
}
