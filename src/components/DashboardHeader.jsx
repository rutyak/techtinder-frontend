import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineInbox } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../pages/menu/Menu";
import { useGlobalVariable } from "../context/GlobalContext";

function DashboardHeader() {
  const user = useSelector((state) => state.user);

  const requests = useSelector((state) => state.requests);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  return (
    <div className="h-full lg:h-[122px]  relative md:bg-gradient-to-r from-blue-400 to-blue-500 p-4 md:pb-6">
      <div className="flex items-center justify-between md:mb-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenDropdown(true);
          }}
          className="flex items-center gap-2 text-gray-500 md:text-white cursor-pointer"
        >
          <div className="w-8 h-8 bg-gray-300 md:bg-white text-blue-600 flex items-center justify-center rounded-full font-bold">
            {user?.firstname?.[0] || "U"}
          </div>
          <div className="text-[16px] flex items-center justify-center gap-1">
            <div className="text-gray-500 md:text-white font-light leading-none">
              Welcome
            </div>
            <div className="text-gray-500 md:text-white  font-semibold -mt-0.5">
              {user?.firstname}
            </div>
          </div>
          <FiChevronDown className="text-gray-500 md:text-white" />
        </div>

        <Link to="/dashboard/requests" className="relative cursor-pointer">
          <HiOutlineInbox className="text-2xl text-gray-500 md:text-white" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-gray-500 md:text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {requests.length}
          </span>
        </Link>
      </div>

      {isOpenDropdown && <Menu setIsOpenDropdown={setIsOpenDropdown} />}

      <div className="relative mt-5 hidden lg:block">
        <IoIosSearch className="absolute text-gray-500 left-3 text-xl top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search a person"
          className="w-full bg-white/20 text-white placeholder:text-white/80 rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-white focus:bg-white/30 outline-none"
        />
      </div>
    </div>
  );
}

export default DashboardHeader;
