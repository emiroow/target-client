import useAuth from "@/store/useAuth";
import useSetting from "@/store/useSetting";
import { IoLogOutOutline } from "react-icons/io5";
import { MdCalendarToday, MdDashboard, MdHistory } from "react-icons/md";
import {
  RiDashboard2Line,
  RiMenu3Fill,
  RiTimerFlashLine,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
  const { setAsideMenuStatus, settings } = useSetting();
  const { logOut } = useAuth();
  const { sideMenuIsOpen } = settings;

  return (
    <div
      className={`${
        sideMenuIsOpen
          ? "2xl:w-[20%] xl:w-[25%] lg:w-[27%] "
          : "2xl:w-[4.5%] xl:w-[5%] lg:w-[7%]"
      } h-[100vh] border-e border-gray-800 drop-shadow-2xl shadow-2xl transition-all duration-500 max-lg:hidden`}
    >
      <div className="w-full flex h-[7vh] relative">
        {sideMenuIsOpen && (
          <span className="w-[100%] h-[7vh] text-center flex justify-center items-center text-3xl">
            Logo
          </span>
        )}

        <span className="absolute left-3 top-3 text-center flex justify-center items-center">
          <button
            onClick={() => setAsideMenuStatus(!sideMenuIsOpen)}
            className="btn-ghost btn btn-circle"
          >
            <RiMenu3Fill className="text-white text-2xl" />
          </button>
        </span>
      </div>

      {/* Fade Wrapper */}
      <div
        className={`transition-opacity duration-300 ${
          sideMenuIsOpen ? "opacity-100" : "opacity-0"
        } ${sideMenuIsOpen ? "block" : "hidden"}`}
      >
        <ul className="w-full menu menu-lg rounded-box mt-4 h-[85vh] overflow-y-auto gap-2">
          <li className="hover:text-secondary">
            <NavLink
              className={({ isActive }) => (isActive ? "text-secondary" : "")}
              to={"/"}
            >
              <RiDashboard2Line className="text-2xl" />
              <span>داشبورد</span>
            </NavLink>
          </li>
          <li>
            <details open>
              <summary className="hover:text-secondary">
                <MdHistory className="text-2xl" />
                <span>تاریخچه تارگت ها</span>
              </summary>
              <ul>
                <li className="hover:text-secondary">
                  <a>تارگت 1</a>
                </li>
                <li className="hover:text-secondary">
                  <a>تارگت 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li className="hover:text-secondary">
            <NavLink
              className={({ isActive }) => (isActive ? "text-secondary" : "")}
              to={"/boards"}
            >
              <MdDashboard className="text-2xl" />
              <span>بورد های من</span>
            </NavLink>
          </li>
          <li className="hover:text-secondary">
            <NavLink
              className={({ isActive }) => (isActive ? "text-secondary" : "")}
              to={"/dailyPlanner"}
            >
              <MdCalendarToday className="text-2xl" />
              <span>برنامه ی روزانه</span>
            </NavLink>
          </li>
          <li className="hover:text-secondary">
            <NavLink
              className={({ isActive }) => (isActive ? "text-secondary" : "")}
              to={"/timer"}
            >
              <RiTimerFlashLine className="text-2xl" />
              <span>تایمر</span>
            </NavLink>
          </li>
        </ul>
        {sideMenuIsOpen && (
          <div className="w-full h-[6vh] px-2 items-center ">
            <div
              onClick={() => logOut()}
              className="w-max flex gap-2  p-3 rounded-lg items-center transition duration-150 cursor-pointer"
            >
              <IoLogOutOutline className="text-3xl" />
              <span className="text-secondary">خروج</span>
            </div>
          </div>
        )}
      </div>

      {!sideMenuIsOpen && (
        <>
          <div className="w-full h-[84vh]  duration-300 transition-opacity flex flex-col justify-start mt-5 gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "ransition-all bg-secondary/50 w-[85%] flex justify-end p-3 rounded-e-xl"
                  : `transition-all hover:bg-secondary/50 w-[85%] flex justify-end p-3 rounded-e-xl`
              }
            >
              <RiDashboard2Line className="text-3xl" />
            </NavLink>
            <NavLink
              to={"/boards"}
              className={({ isActive }) =>
                isActive
                  ? "ransition-all bg-secondary/50 w-[85%] flex justify-end p-3 rounded-e-xl"
                  : `transition-all hover:bg-secondary/50 w-[85%] flex justify-end p-3 rounded-e-xl`
              }
            >
              <MdDashboard className="text-3xl" />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "ransition-all bg-secondary/50 w-[85%] flex justify-end p-3 rounded-e-xl"
                  : `transition-all hover:bg-secondary/50 w-[85%] flex justify-end p-3 rounded-e-xl`
              }
              to={"/dailyPlanner"}
            >
              <MdCalendarToday className="text-3xl" />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "ransition-all bg-secondary/50 w-[85%] flex justify-end p-3 rounded-e-xl"
                  : `transition-all hover:bg-secondary/50 w-[85%] flex justify-end p-3 rounded-e-xl`
              }
              to={"/timer"}
            >
              <RiTimerFlashLine className="text-3xl" />
            </NavLink>
          </div>
          <div onClick={() => logOut()} className="w-full cursor-pointer">
            <IoLogOutOutline className="text-3xl h-[6.5vh] hover:text-secondary transition-all flex justify-center items-center self-center m-auto" />
          </div>
        </>
      )}
    </div>
  );
};

export default SideMenu;
