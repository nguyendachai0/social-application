import Navbar from "@/Components/app/navBar/NavBar"
import LeftBar from "@/Components/app/leftBar/LeftBar";
import RightBar from "@/Components/app/rightBar/RightBar";
import Content from "@/Components/app/content/Content";
const Home = ({}) => {
   
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