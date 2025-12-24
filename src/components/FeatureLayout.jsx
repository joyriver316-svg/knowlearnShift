import { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import './FeatureLayout.css';

function FeatureLayout({ title, icon, children, basePath }) {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { path: '', label: '대시보드', icon: 'dashboard' },
        { path: 'conversion', label: '변환작업', icon: 'conversion' },
        { path: 'report', label: '결과확인', icon: 'report' }
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="feature-layout">
            <div className="container">
                <div className={`feature-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
                    <aside className={`feature-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                        <div className="sidebar-header">
                            <div className="sidebar-title-section">
                                <div className="sidebar-icon">
                                    {icon === 'code' && '{ }'}
                                    {icon === 'palette' && '◨'}
                                    {icon === 'refresh' && '⟲'}
                                </div>
                                {!isCollapsed && <h2 className="sidebar-title">{title}</h2>}
                            </div>
                            <button className="sidebar-toggle" onClick={toggleSidebar}>
                                {isCollapsed ? '›' : '‹'}
                            </button>
                        </div>

                        <nav className="feature-nav">
                            {menuItems.map((item) => {
                                const fullPath = `${basePath}${item.path ? '/' + item.path : ''}`;
                                const isActive = location.pathname === fullPath;

                                return (
                                    <Link
                                        key={item.path}
                                        to={fullPath}
                                        className={`feature-nav-link ${isActive ? 'active' : ''}`}
                                        title={isCollapsed ? item.label : ''}
                                    >
                                        <span className="nav-icon-box">
                                            {item.icon === 'dashboard' && '☰'}
                                            {item.icon === 'conversion' && '⚙'}
                                            {item.icon === 'report' && '📄'}
                                        </span>
                                        {!isCollapsed && <span className="nav-label">{item.label}</span>}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    <main className="feature-main">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default FeatureLayout;
