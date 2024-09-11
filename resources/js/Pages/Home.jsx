import Navbar from "@/Components/app/navBar/NavBar"
import LeftBar from "@/Components/app/leftBar/LeftBar";
import RightBar from "@/Components/app/rightBar/RightBar";
import Content from "@/Components/app/content/Content";



const Home = () => {

    return (
        <div>
            <Content /> 
        </div>
    );
};
Home.layout = (page) => {
    return  (
<>  

            <Navbar />
            <div style={{ display: "flex" }}>
            {page.type.name !== "ProfilePage" &&   <LeftBar user={page.props.auth?.user} /> }
                <div style={{ flex: 6 }}>
                    {page}
                </div>
                {page.type.name !== "ProfilePage" && <RightBar />}
            </div>
        </>

    );
}
    
export default Home;