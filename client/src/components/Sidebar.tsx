import React, { useContext, useEffect, useState } from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

interface SidebarProps {
  selectedUser: any;
  setSelectedUser: (user: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedUser, setSelectedUser }) => {
  const { logout, onlineUsers } = useContext(AuthContext);
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUse,
    unreadMessages,
    setUnreadMessages,
    getChats,
    chats,
    sendMessage,
    messageSender,
  } = useContext(ChatContext);

  const navigate = useNavigate();
  const [input, setInput] = useState(false);

  const filterUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounder-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="logo"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm" onClick={logout}>
                Logout
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#282142] rounded-full mt-5 flex items-center px-4 py-3 gap-2">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search user..."
          />
        </div>
      </div>

      <div className="flex flex-col">
        {filterUsers.map((user, index) => (
          <div
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              setUnreadMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?._id === user._id ? "bg-[#282142]/50" : ""
            }`}
          >
            <img
              src={user.profilePic || assets.avatar_icon}
              alt=""
              className="w-[35px] aspect-[1/1] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>
            {unreadMessages[user._id] && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {unreadMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
