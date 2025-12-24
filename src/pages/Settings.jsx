import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

function Settings() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [dbConfig, setDbConfig] = useState({
        host: 'localhost',
        port: '3306',
        username: '',
        password: '',
        database: ''
    });



    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.role !== 'admin') return null;

    const handleSave = () => {
        alert('설정이 저장되었습니다.');
    };

    return (
        <div className="settings-page">
            <div className="settings-container">
                <h2>환경설정</h2>

                <div className="settings-content">
                    <div className="settings-card">
                        <h3>데이터베이스 연결 정보</h3>
                        <div className="form-group">
                            <label>Host</label>
                            <input
                                type="text"
                                value={dbConfig.host}
                                onChange={(e) => setDbConfig({ ...dbConfig, host: e.target.value })}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Port</label>
                            <input
                                type="text"
                                value={dbConfig.port}
                                onChange={(e) => setDbConfig({ ...dbConfig, port: e.target.value })}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Database Name</label>
                            <input
                                type="text"
                                value={dbConfig.database}
                                onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={dbConfig.username}
                                onChange={(e) => setDbConfig({ ...dbConfig, username: e.target.value })}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={dbConfig.password}
                                onChange={(e) => setDbConfig({ ...dbConfig, password: e.target.value })}
                                className="form-input"
                            />
                        </div>
                        <button className="btn btn-secondary" style={{ marginTop: '15px', width: '100%' }}>연결 테스트</button>
                    </div>
                </div>

                <div className="settings-actions">
                    <button className="btn btn-primary" onClick={handleSave}>저장</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
