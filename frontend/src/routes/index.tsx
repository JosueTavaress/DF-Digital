import { Routes, Route } from "react-router-dom";
import { Login, Home } from '../pages'
const CRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
}

export default CRoutes;
