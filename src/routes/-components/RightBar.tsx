import { useLocation } from "@tanstack/react-router";
import CardProfile from "./components/CardProfile";
import CardSuggested from "./components/CardSuggested";
import CardCreatedBy from "./components/CardCreatedBy";

function RightBar() {
  const currentLocation = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <>
      {
        <aside className="p-10 lg:flex-4/12 lg:block hidden border-s-1 border-[#3f3f3f] max-height-svh">
          <div className="flex flex-col gap-5">
            {currentLocation === "/profile" ? (
              <></>
            ) : (
              // User Profile
              <CardProfile />
            )}
            {/* User Suggested to follow */}
            <CardSuggested />
            {/* Created By  */}
            <CardCreatedBy />
          </div>
        </aside>
      }
    </>
  );
}

export default RightBar;
