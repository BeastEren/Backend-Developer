import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/pages/login';
import Register from './features/auth/pages/register';
import Feed from './features/post/pages/feed';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;