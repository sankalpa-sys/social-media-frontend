import MainLayout from "./layouts/MainLayout.tsx";
import MainFeedSection from "./components/MainFeedSection/MainFeedSection.tsx";
import {useState} from "react";
import {UserContext} from "./context/userContext";
function App() {
    const [user, setUser] = useState(null)
    return (

       <div>
               <UserContext.Provider value={{user, setUser}}>
                   <MainLayout>
                       <MainFeedSection/>
                   </MainLayout>
               </UserContext.Provider>
       </div>
    );
}

export default App;