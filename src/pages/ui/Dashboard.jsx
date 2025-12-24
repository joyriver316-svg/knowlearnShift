import { useState, useEffect } from 'react';
import '../java/Dashboard.css';
import { getJobs, saveJob } from '../../utils/jobStorage';

function Dashboard() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        let loadedJobs = getJobs('ui');

        if (loadedJobs.length === 0) {
            const mockJobs = [
                {
                    jobName: 'UI 현대화 작업_2024-12-24 15:20',
                    totalCount: 12,
                    successCount: 11,
                    failCount: 1,
                    duration: '35초',
                    convertedAt: '2024. 12. 24. 오후 3:20:00',
                    files: Array.from({ length: 12 }, (_, i) => ({
                        id: i + 1,
                        name: `Screen${i + 1}.xfdl`,
                        status: i < 11 ? 'success' : 'error'
                    }))
                },
                {
                    jobName: 'UI 현대화 작업_2024-12-24 11:30',
                    totalCount: 18,
                    successCount: 17,
                    failCount: 1,
                    duration: '48초',
                    convertedAt: '2024. 12. 24. 오전 11:30:00',
                    files: Array.from({ length: 18 }, (_, i) => ({
                        id: i + 1,
                        name: `Component${i + 1}.xfdl`,
                        status: i < 17 ? 'success' : 'error'
                    }))
                },
                {
                    jobName: 'UI 현대화 작업_2024-12-23 14:00',
                    totalCount: 10,
                    successCount: 10,
                    failCount: 0,
                    duration: '28초',
                    convertedAt: '2024. 12. 23. 오후 2:00:00',
                    files: Array.from({ length: 10 }, (_, i) => ({
                        id: i + 1,
                        name: `Form${i + 1}.xfdl`,
                        status: 'success'
                    }))
                }
            ];

            mockJobs.forEach(job => saveJob('ui', job));
            loadedJobs = getJobs('ui');
        }

        setJobs(loadedJobs.slice(0, 10));
    }, []);

    const stats = [
        { label: '총 변환 건수', value: '856', change: '+8%', trend: 'up' },
        { label: '성공률', value: '97.2%', change: '+1.8%', trend: 'up' },
        { label: '평균 변환 시간', value: '1.8분', change: '-12%', trend: 'down' },
        { label: '에러 건수', value: '24', change: '-6', trend: 'down' }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Nexacro → React 변환 대시보드</h2>
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
