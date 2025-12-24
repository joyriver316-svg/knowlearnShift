import { useState, useEffect } from 'react';
import '../java/Dashboard.css';
import { getJobs, saveJob } from '../../utils/jobStorage';

function Dashboard() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        let loadedJobs = getJobs('logic');

        if (loadedJobs.length === 0) {
            const mockJobs = [
                {
                    jobName: '로직 마이그레이션 작업_2024-12-24 16:00',
                    totalCount: 18,
                    successCount: 16,
                    failCount: 2,
                    duration: '65초',
                    convertedAt: '2024. 12. 24. 오후 4:00:00',
                    files: Array.from({ length: 18 }, (_, i) => ({
                        id: i + 1,
                        name: `sp_user_${i + 1}.sql`,
                        status: i < 16 ? 'success' : 'error'
                    }))
                },
                {
                    jobName: '로직 마이그레이션 작업_2024-12-24 13:45',
                    totalCount: 22,
                    successCount: 21,
                    failCount: 1,
                    duration: '72초',
                    convertedAt: '2024. 12. 24. 오후 1:45:00',
                    files: Array.from({ length: 22 }, (_, i) => ({
                        id: i + 1,
                        name: `sp_order_${i + 1}.sql`,
                        status: i < 21 ? 'success' : 'error'
                    }))
                },
                {
                    jobName: '로직 마이그레이션 작업_2024-12-23 17:30',
                    totalCount: 14,
                    successCount: 14,
                    failCount: 0,
                    duration: '58초',
                    convertedAt: '2024. 12. 23. 오후 5:30:00',
                    files: Array.from({ length: 14 }, (_, i) => ({
                        id: i + 1,
                        name: `sp_product_${i + 1}.sql`,
                        status: 'success'
                    }))
                }
            ];

            mockJobs.forEach(job => saveJob('logic', job));
            loadedJobs = getJobs('logic');
        }

        setJobs(loadedJobs.slice(0, 10));
    }, []);

    const stats = [
        { label: '총 변환 건수', value: '642', change: '+15%', trend: 'up' },
        { label: '성공률', value: '96.8%', change: '+3.2%', trend: 'up' },
        { label: '평균 변환 시간', value: '3.5분', change: '-18%', trend: 'down' },
        { label: '에러 건수', value: '21', change: '-9', trend: 'down' }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>SP → Java 21 마이그레이션 대시보드</h2>
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
                                <th>작업명</th>
                                <th>총개수</th>
                                <th>정상개수</th>
                                <th>실패개수</th>
                                <th>소요시간</th>
                                <th>변환일시</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="no-data">
                                        변환 내역이 없습니다
                                    </td>
                                </tr>
                            ) : (
                                jobs.map((job) => (
                                    <tr key={job.id}>
                                        <td className="job-name-cell">{job.jobName}</td>
                                        <td>{job.totalCount}</td>
                                        <td className="success-count">{job.successCount}</td>
                                        <td className="fail-count">{job.failCount}</td>
                                        <td>{job.duration}</td>
                                        <td>{job.convertedAt}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
