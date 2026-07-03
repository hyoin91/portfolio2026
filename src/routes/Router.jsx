//어떤 경로(URL)에서 어떤 페이지를 보여줄지"  매핑만 전담하는 파일입니다. 
import{Routes,Route} from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Projects from "../pages/Projects"
import ProjectDetail from "../pages/ProjectDetail"
import DesignSystem from "../pages/DesignSystem"
import About from "../pages/About"
import Contact from "../pages/Contact"
import MainLayout from "../components/layout/MainLayout"

function Router(){
    return(
        <Routes>
            <Route element={<MainLayout />}> 
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/projects/:id" element={<ProjectDetail/>}/>
                 <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                {/* <Route path="/design-system" element={<DesignSystem/>}/> */}
            </Route>
        </Routes>
    );
}

export default Router;
//---------------------styled----------------//
