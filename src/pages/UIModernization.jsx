import { Routes, Route, Navigate } from 'react-router-dom';
import FeatureLayout from '../components/FeatureLayout';
import UIDashboard from './ui/Dashboard';
import UIConversion from './ui/Conversion';
import UIReport from './ui/Report';

function UIModernization() {
    return (
        <FeatureLayout
            title="UI 현대화"
            icon="palette"
            basePath="/ui"
        >
            <Routes>
                <Route index element={<UIDashboard />} />
                <Route path="conversion" element={<UIConversion />} />
                <Route path="report" element={<UIReport />} />
                <Route path="*" element={<Navigate to="/ui" replace />} />
            </Routes>
        </FeatureLayout>
    );
}

export default UIModernization;
