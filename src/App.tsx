import MainLayout from "./layouts/MainLayout.tsx";
import MainFeedSection from "./components/MainFeedSection/MainFeedSection.tsx";
import {UserContext} from "./context/userContext";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserProfile from "./pages/profile/UserProfile";
import LocationComponent from "./components/LocationComponent/LocationComponent.tsx";
import {useEffect, useState} from "react";
import {privateApi} from "./api/api.ts";
import {ToggleCurrentUser} from "./context/toggleCurrentUser.ts";

function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [toggler, setToggler] = useState<boolean>(false)
    useEffect(()=> {
        const getUserProfile = async() => {
            setLoading(true)
            setError("")
            try{
                const res = await privateApi({
                    method: "GET",
                    url: "/user/profile"
                })
                setUser(res.data);
            }catch (e) {
                setError(e)
            }finally {
                setLoading(false)
            }
        }
        getUserProfile()
    },[toggler])
    return (

        <Router>
            <UserContext.Provider value={{ user, setUser, loading, error }}>
               <ToggleCurrentUser.Provider value={{toggler: toggler, setToggler: setToggler}}>
                   <Routes>
                       <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                       <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

                       <Route element={<MainLayout />}>
                           <Route path="/" element={<ProtectedRoute element={<MainFeedSection />} user={user} />} />
                           <Route path="/profile/:id" element={<ProtectedRoute element={<UserProfile />} user={user} />} />
                       </Route>
                   </Routes>
               </ToggleCurrentUser.Provider>
            </UserContext.Provider>
            <LocationComponent/>
        </Router>
    );
}

function ProtectedRoute({ element, user }) {
    return user ? element : <Navigate to="/login" replace />;
}

export default App;