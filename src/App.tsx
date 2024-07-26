import MainLayout from "./layouts/MainLayout.tsx";
import MainFeedSection from "./components/MainFeedSection/MainFeedSection.tsx";
import Register from "./pages/Register/Register.tsx";
const user: boolean = true
function App() {
    return (

       <div>
           {user ? (
               <MainLayout>
                   <MainFeedSection/>
               </MainLayout>
           ): <Register/>}
       </div>
    );
}

export default App;