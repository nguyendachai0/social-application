import { useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import Navbar from "@/Components/app/navBar/NavBar"
import LeftBar from "@/Components/app/leftBar/LeftBar";
import RightBar from "@/Components/app/rightBar/RightBar";
import Content from "@/Components/app/content/Content";
import LeftSidebar from "@/Components/app/LeftSidebar";
import Story from "@/Components/app/Story";
import Contact from "@/Components/app/Contact";

const Home = () => {
      
}
Home.layout = (page) => {
    return  (
<>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    <Content />
                </div>
                <RightBar />
            </div>
        </>

    );
}
    
export default Home;