// Reusing Dashboard styles
import '../java/Dashboard.css';

function Dashboard() {
    const stats = [
        { label: '총 SP 건수', value: '486', change: '+24%', trend: 'up' },
        { label: '변환 성공률', value: '94.8%', change: '+1.8%', trend: 'up' },
        { label: '평균 변환 시간', value: '4.2분', change: '-18%', trend: 'down' },
        { label: '생성된 클래스', value: '2,134', change: '+312', trend: 'up' }
    ];

    const recentConversions = [
        { id: 1, name: 'SP_GET_USER_LIST', status: 'success', time: '4분 15초', date: '2024-12-24 08:30' },
        { id: 2, name: 'SP_INSERT_ORDER', status: 'success', time: '3분 45초', date: '2024-12-24 08:25' },
        { id: 3, name: 'SP_UPDATE_PRODUCT', status: 'success', time: '5분 10초', date: '2024-12-24 08:20' },
        { id: 4, name: 'SP_DELETE_PAYMENT', status: 'error', time: '2분 30초', date: '2024-12-24 08:15' },
        { id: 5, name: 'SP_CALCULATE_TOTAL', status: 'success', time: '3분 55초', date: '2024-12-24 08:10' }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>SP → Java 21 변환 대시보드</h2>
                <p className="dashboard-subtitle">로직 마이그레이션 현황 및 통계</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-header">
                            <span className="stat-label">{stat.label}</span>
                            <span className={`stat-trend ${stat.trend}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="dashboard-section">
                <h3>최근 변환 내역</h3>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>SP 이름</th>
                                <th>상태</th>
                                <th>소요 시간</th>
                                <th>변환 일시</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentConversions.map((item) => (
                                <tr key={item.id}>
                                    <td className="file-name">{item.name}</td>
                                    <td>
                                        <span className={`badge badge-${item.status === 'success' ? 'success' : 'error'}`}>
                                            {item.status === 'success' ? '성공' : '실패'}
                                        </span>
                                    </td>
                                    <td>{item.time}</td>
                                    <td className="date-time">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>변환 기술 스택</h3>
                    <div className="tech-list">
                        <div className="tech-item">
                            <span className="tech-label">소스</span>
                            <span className="tech-value">Stored Procedure</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-label">타겟</span>
                            <span className="tech-value">Java 21 + JPA</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-label">AI 모델</span>
                            <span className="tech-value">GPT-4 / Claude 3.5</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-label">아키텍처</span>
                            <span className="tech-value">Layered Architecture</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3>주요 변환 항목</h3>
                    <ul className="conversion-items">
                        <li>SQL Logic → Java Stream</li>
                        <li>Stored Procedure → Service Layer</li>
                        <li>DB Table → JPA Entity</li>
                        <li>Cursor → Java Iterator</li>
                        <li>Transaction → @Transactional</li>
                        <li>Function → Repository Method</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
