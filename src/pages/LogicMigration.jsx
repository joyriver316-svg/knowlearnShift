import { Routes, Route, Navigate } from 'react-router-dom';
import FeatureLayout from '../components/FeatureLayout';
import LogicDashboard from './logic/Dashboard';
import LogicConversion from './logic/Conversion';
import LogicReport from './logic/Report';

function LogicMigration() {
    return (
        <FeatureLayout
            title="로직 마이그레이션"
            icon="refresh"
            basePath="/logic"
        >
            <Routes>
                <Route index element={<LogicDashboard />} />
                <Route path="conversion" element={<LogicConversion />} />
                <Route path="report" element={<LogicReport />} />
                <Route path="*" element={<Navigate to="/logic" replace />} />
            </Routes>
        </FeatureLayout>
    );
}

export default LogicMigration;
