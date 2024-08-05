import { useState } from "react";
import { Link } from "react-router-dom";
import "./navBar.scss";
import { AiFillHome } from "react-icons/ai";
import ChatLayout from "../chatLayout/ChatLayout";

const Navbar = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(false);

    const handleMessageIconClick = () => {
        setIsChatVisible(prev => !prev);
    };
    const handleUserIconClick = () => {
        setIsMenuVisible(prev => !prev);
    };

    return (
        <div className="navbar">
            <div className="left">
                {/* <Link to="/" style={{ textDecoration: "none" }}>
                </Link> */}
                    <span>In</span>
                <div className="search">
                    {/* <SearchOutlinedIcon /> */}
                    <input type="text" placeholder="Tìm kiếm trên Facebook..." />
                </div>
            </div>

            <div className="center">
                <AiFillHome />
                <AiFillHome />
                <AiFillHome />
                <AiFillHome />
            </div>

            <div className="right">
                <div className="user">
                    <div className="user-icons">
                        <AiFillHome />
                    </div>
                    <div className="user-icons" onClick={handleMessageIconClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
                    </div>
                    <div className="user-icons">
                        <AiFillHome />
                    </div>
                    <img 
                        src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/358439054_816747766761639_650919250803168650_n.jpg?stp=cp0_dst-jpg_p74x74&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=_M4CETGy7qsQ7kNvgHSPacO&_nc_ht=scontent.fdad1-3.fna&oh=00_AYBUiitiOJafL3J1lDfZcqtZ4he6TFWC5eeeNjTMgakQgA&oe=66B2AC2B"
                        alt="User Profile"
                        onClick={handleUserIconClick}
                    />
                    <span>Nam</span>
                    {isMenuVisible && (
                        <div className="menu">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Logout</Link>
                        </div>
                    )}
                </div>
                {isChatVisible && (
                    <ChatLayout/>
                )}
            </div>
        </div>
    );
};

export default Navbar;
