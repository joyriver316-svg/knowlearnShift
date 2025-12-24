import './Dashboard.css';

function Dashboard() {
    const stats = [
        { label: '총 변환 건수', value: '1,247', change: '+12%', trend: 'up' },
        { label: '성공률', value: '98.5%', change: '+2.3%', trend: 'up' },
        { label: '평균 변환 시간', value: '2.3분', change: '-15%', trend: 'down' },
        { label: '에러 건수', value: '18', change: '-8', trend: 'down' }
    ];

    const recentConversions = [
        { id: 1, name: 'UserService.java', status: 'success', time: '2분 15초', date: '2024-12-24 08:30' },
        { id: 2, name: 'OrderController.java', status: 'success', time: '1분 45초', date: '2024-12-24 08:25' },
        { id: 3, name: 'ProductRepository.java', status: 'success', time: '3분 10초', date: '2024-12-24 08:20' },
        { id: 4, name: 'PaymentService.java', status: 'error', time: '0분 30초', date: '2024-12-24 08:15' },
        { id: 5, name: 'AuthController.java', status: 'success', time: '2분 00초', date: '2024-12-24 08:10' }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Java 1.6 → Java 21 변환 대시보드</h2>
                <p className="dashboard-subtitle">실시간 변환 현황 및 통계</p>
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
                                <th>파일명</th>
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
                            <span className="tech-label">소스 버전</span>
                            <span className="tech-value">Java 1.6</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-label">타겟 버전</span>
                            <span className="tech-value">Java 21</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-label">프레임워크</span>
                            <span className="tech-value">Spring Boot 3.x</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-label">빌드 도구</span>
                            <span className="tech-value">Gradle 8.x</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3>주요 변환 항목</h3>
                    <ul className="conversion-items">
                        <li>Vector → ArrayList/Stream</li>
                        <li>Hashtable → HashMap/ConcurrentHashMap</li>
                        <li>Anonymous Classes → Lambda</li>
                        <li>Legacy Loops → Stream API</li>
                        <li>Raw Types → Generics</li>
                        <li>Traditional Switch → Pattern Matching</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
