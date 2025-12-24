import { useState, useEffect } from 'react';
import './Dashboard.css';
import { getJobs, saveJob } from '../../utils/jobStorage';

function Dashboard() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Load jobs from localStorage
        let loadedJobs = getJobs('java');

        // If no jobs exist, create mock data
        if (loadedJobs.length === 0) {
            const mockJobs = [
                {
                    jobName: 'Java 변환 작업_2024-12-24 14:30',
                    totalCount: 15,
                    successCount: 13,
                    failCount: 2,
                    duration: '45초',
                    convertedAt: '2024. 12. 24. 오후 2:30:00',
                    files: Array.from({ length: 15 }, (_, i) => ({
                        id: i + 1,
                        name: `UserService${i + 1}.java`,
                        status: i < 13 ? 'success' : 'error'
                    }))
                },
                {
                    jobName: 'Java 변환 작업_2024-12-24 10:15',
                    totalCount: 20,
                    successCount: 19,
                    failCount: 1,
                    duration: '52초',
                    convertedAt: '2024. 12. 24. 오전 10:15:00',
                    files: Array.from({ length: 20 }, (_, i) => ({
                        id: i + 1,
                        name: `Controller${i + 1}.java`,
                        status: i < 19 ? 'success' : 'error'
                    }))
                },
                {
                    jobName: 'Java 변환 작업_2024-12-23 16:45',
                    totalCount: 12,
                    successCount: 12,
                    failCount: 0,
                    duration: '38초',
                    convertedAt: '2024. 12. 23. 오후 4:45:00',
                    files: Array.from({ length: 12 }, (_, i) => ({
                        id: i + 1,
                        name: `Repository${i + 1}.java`,
                        status: 'success'
                    }))
                }
            ];

            // Save mock jobs
            mockJobs.forEach(job => saveJob('java', job));
            loadedJobs = getJobs('java');
        }

        setJobs(loadedJobs.slice(0, 10));
    }, []);

    const stats = [
        { label: '총 변환 건수', value: '1,247', change: '+12%', trend: 'up' },
        { label: '성공률', value: '98.5%', change: '+2.3%', trend: 'up' },
        { label: '평균 변환 시간', value: '2.3분', change: '-15%', trend: 'down' },
        { label: '에러 건수', value: '18', change: '-8', trend: 'down' }
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
                            <span className={`stat - trend ${stat.trend} `}>
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
