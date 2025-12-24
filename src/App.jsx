import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import JavaModernization from './pages/JavaModernization';
import UIModernization from './pages/UIModernization';
import LogicMigration from './pages/LogicMigration';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="java/*" element={<JavaModernization />} />
                        <Route path="ui/*" element={<UIModernization />} />
                        <Route path="logic/*" element={<LogicMigration />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
