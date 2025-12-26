import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <svg className="logo-svg" width="280" height="50" viewBox="0 0 280 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Database icon (cylinder) */}
                            <ellipse cx="18" cy="15" rx="12" ry="4" stroke="#4f46e5" strokeWidth="2" fill="none" />
                            <line x1="6" y1="15" x2="6" y2="30" stroke="#4f46e5" strokeWidth="2" />
                            <line x1="30" y1="15" x2="30" y2="30" stroke="#4f46e5" strokeWidth="2" />
                            <ellipse cx="18" cy="30" rx="12" ry="4" stroke="#4f46e5" strokeWidth="2" fill="none" />

                            {/* Connection lines from database to nodes */}
                            <line x1="18" y1="11" x2="18" y2="5" stroke="#4f46e5" strokeWidth="1.5" />
                            <line x1="10" y1="13" x2="5" y2="8" stroke="#4f46e5" strokeWidth="1.5" />
                            <line x1="26" y1="13" x2="31" y2="8" stroke="#4f46e5" strokeWidth="1.5" />

                            {/* Nodes (circles) on top */}
                            <circle cx="18" cy="5" r="3" fill="#4f46e5" />
                            <circle cx="5" cy="8" r="2.5" fill="#4f46e5" />
                            <circle cx="31" cy="8" r="2.5" fill="#4f46e5" />

                            {/* Text: KNOWLEARN SHIFT */}
                            <text x="42" y="28" fontFamily="Pretendard, sans-serif" fontSize="18" fontWeight="700" fill="#4f46e5">
                                KNOWLEARN SHIFT
                            </text>

                            {/* Subtext */}
                            <text x="42" y="40" fontFamily="Pretendard, sans-serif" fontSize="10" fontWeight="400" fill="#9ca3af">
                                AI-Powered Legacy Modernization
                            </text>
                        </svg>
                    </Link>
                    <nav className="nav">
                        <Link
                            to="/"
                            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            홈
                        </Link>
                        <Link
                            to="/java"
                            className={`nav-link ${location.pathname.startsWith('/java') ? 'active' : ''}`}
                        >
                            Java 현대화
                        </Link>
                        <Link
                            to="/ui"
                            className={`nav-link ${location.pathname.startsWith('/ui') ? 'active' : ''}`}
                        >
                            UI 현대화
                        </Link>
                        <Link
                            to="/logic"
                            className={`nav-link ${location.pathname.startsWith('/logic') ? 'active' : ''}`}
                        >
                            SP 현대화
                        </Link>

                    </nav>
                    <div className="auth-section">
                        {user ? (
                            <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                                    Hello, <strong>{user.username}</strong>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="btn-text"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#6b7280',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        padding: '4px 8px',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-login" style={{
                                padding: '6px 16px',
                                background: '#4f46e5',
                                color: 'white',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
