// Reusing Dashboard styles from java/Dashboard.css
import '../java/Dashboard.css';

function Dashboard() {
    const stats = [
        { label: '총 화면 수', value: '342', change: '+18%', trend: 'up' },
        { label: '변환 성공률', value: '96.2%', change: '+3.1%', trend: 'up' },
        { label: '평균 변환 시간', value: '3.5분', change: '-12%', trend: 'down' },
        { label: '컴포넌트 생성', value: '1,856', change: '+245', trend: 'up' }
    ];

    const recentConversions = [
        { id: 1, name: 'UserList.xfdl', status: 'success', time: '3분 20초', date: '2024-12-24 08:30' },
        { id: 2, name: 'OrderForm.xfdl', status: 'success', time: '2분 55초', date: '2024-12-24 08:25' },
        { id: 3, name: 'Dashboard.xfdl', status: 'success', time: '4분 10초', date: '2024-12-24 08:20' },
        { id: 4, name: 'ProductGrid.xfdl', status: 'error', time: '1분 15초', date: '2024-12-24 08:15' },
        { id: 5, name: 'LoginPage.xfdl', status: 'success', time: '2분 30초', date: '2024-12-24 08:10' }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Nexacro → React 변환 대시보드</h2>
                <p className="dashboard-subtitle">UI 현대화 현황 및 통계</p>
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
                                <th>화면 파일명</th>
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
                            <span className="tech-label">소스 UI</span>
                            <span className="tech-value">Nexacro</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-label">타겟 UI</span>
                            <span className="tech-value">React 18</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-label">언어</span>
                            <span className="tech-value">TypeScript</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-label">상태 관리</span>
                            <span className="tech-value">Zustand</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3>주요 변환 항목</h3>
                    <ul className="conversion-items">
                        <li>Dataset → React State</li>
                        <li>Grid → Table Component</li>
                        <li>Form → React Form</li>
                        <li>Transaction → API Call</li>
                        <li>Event Handler → React Event</li>
                        <li>Layout → Flexbox/Grid</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
