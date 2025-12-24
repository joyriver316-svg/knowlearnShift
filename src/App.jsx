import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import JavaModernization from './pages/JavaModernization';
import UIModernization from './pages/UIModernization';
import LogicMigration from './pages/LogicMigration';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="java/*" element={<JavaModernization />} />
                    <Route path="ui/*" element={<UIModernization />} />
                    <Route path="logic/*" element={<LogicMigration />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
