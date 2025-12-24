import { useState, useEffect } from 'react';
import '../java/Report.css';
import '../java/Dashboard.css';
import { getJobs } from '../../utils/jobStorage';

function Report() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeTab, setActiveTab] = useState('original');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadedJobs = getJobs('logic');
        setJobs(loadedJobs);
    }, []);

    const tabs = [
        { id: 'original', label: '원소스' },
        { id: 'converted', label: '변환소스' }
    ];

    const sampleOriginal = `-- Stored Procedure
CREATE PROCEDURE sp_get_user_orders
    @user_id INT
AS
BEGIN
    SELECT o.order_id, o.order_date, o.total_amount
    FROM orders o
    WHERE o.user_id = @user_id
    AND o.status = 'ACTIVE'
    ORDER BY o.order_date DESC
END`;

    const sampleConverted = `// Java Service Layer
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    
    public List<OrderDto> getUserOrders(Long userId) {
        return orderRepository.findByUserIdAndStatus(
            userId, 
            OrderStatus.ACTIVE
        )
        .stream()
        .map(OrderDto::from)
        .toList();
    }
}`;

    const getFilteredFiles = () => {
        if (!selectedJob || !selectedJob.files) return [];

        let filtered = selectedJob.files;

        if (filterStatus !== 'all') {
            filtered = filtered.filter(file => file.status === filterStatus);
        }

        if (searchQuery) {
            filtered = filtered.filter(file =>
                file.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    const filteredFiles = getFilteredFiles();

    if (!selectedJob) {
        return (
            <div className="report">
                <div className="report-header">
                    <h2>로직 마이그레이션 결과 보고서</h2>
                    <p className="report-subtitle">변환 작업을 선택하여 결과를 확인하세요</p>
                </div>

                <div className="job-list-container">
                    {jobs.length === 0 ? (
                        <div className="no-jobs">
                            <p>변환 작업 내역이 없습니다</p>
                            <p className="no-jobs-hint">변환 작업 메뉴에서 변환을 실행해주세요</p>
                        </div>
                    ) : (
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
                                                변환 작업 내역이 없습니다
                                            </td>
                                        </tr>
                                    ) : (
                                        jobs.map((job) => (
                                            <tr
                                                key={job.id}
                                                onClick={() => setSelectedJob(job)}
                                                style={{ cursor: 'pointer' }}
                                            >
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
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="report">
            <div className="report-header">
                <div className="header-left">
                    <div className="header-title-group">
                        <button
                            className="back-button"
                            onClick={() => {
                                setSelectedJob(null);
                                setSelectedFile(null);
                                setFilterStatus('all');
                                setSearchQuery('');
                            }}
                        >
                            ← 작업 목록으로
                        </button>
                        <span className="job-name-small">{selectedJob.jobName}</span>
                    </div>
                    <div className="report-tabs" style={{ marginLeft: '20px', alignSelf: 'flex-start', marginTop: '4px' }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="report-layout">
                <div className="file-list-panel">
                    <div className="file-list-header">
                        <h3>변환 파일</h3>

                        <div className="filter-controls">
                            <div className="filter-buttons">
                                <button
                                    className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilterStatus('all')}
                                >
                                    전체 ({selectedJob.files?.length || 0})
                                </button>
                                <button
                                    className={`filter-btn success ${filterStatus === 'success' ? 'active' : ''}`}
                                    onClick={() => setFilterStatus('success')}
                                >
                                    성공 ({selectedJob.successCount})
                                </button>
                                <button
                                    className={`filter-btn error ${filterStatus === 'error' ? 'active' : ''}`}
                                    onClick={() => setFilterStatus('error')}
                                >
                                    실패 ({selectedJob.failCount})
                                </button>
                            </div>

                            <input
                                type="text"
                                className="search-input"
                                placeholder="파일명 검색..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="file-list">
                        {filteredFiles.length === 0 ? (
                            <div className="no-files">
                                검색 결과가 없습니다
                            </div>
                        ) : (
                            filteredFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className={`file-item ${selectedFile?.id === file.id ? 'active' : ''} ${file.status}`}
                                    onClick={() => setSelectedFile(file)}
                                >
                                    <div className="file-icon">
                                        {file.status === 'success' ? '✓' : '✗'}
                                    </div>
                                    <span className="file-name">{file.name}</span>
                                    <span className={`status-badge ${file.status === 'success' ? 'success' : 'error'}`}>
                                        {file.status === 'success' ? '성공' : '실패'}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="detail-panel">
                    {selectedFile ? (
                        <div className="code-viewer">
                            <pre className="code-content">
                                <code>
                                    {activeTab === 'original' ? sampleOriginal : sampleConverted}
                                </code>
                            </pre>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <p>파일을 선택하여 상세 내용을 확인하세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Report;
