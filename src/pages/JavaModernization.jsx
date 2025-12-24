import { Routes, Route, Navigate } from 'react-router-dom';
import FeatureLayout from '../components/FeatureLayout';
import JavaDashboard from './java/Dashboard';
import JavaConversion from './java/Conversion';
import JavaReport from './java/Report';

function JavaModernization() {
    return (
        <FeatureLayout
            title="Java 현대화"
            icon="code"
            basePath="/java"
        >
            <Routes>
                <Route index element={<JavaDashboard />} />
                <Route path="conversion" element={<JavaConversion />} />
                <Route path="report" element={<JavaReport />} />
                <Route path="*" element={<Navigate to="/java" replace />} />
            </Routes>
        </FeatureLayout>
    );
}

export default JavaModernization;
