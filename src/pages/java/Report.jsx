import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Report.css';
import './Dashboard.css';
import { getJobs } from '../../utils/jobStorage';

function Report() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeTab, setActiveTab] = useState('original');
    const [convertedTab, setConvertedTab] = useState('controller'); // 'controller', 'service'
    const [parameterTab, setParameterTab] = useState('before'); // 'before', 'after'
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const location = useLocation();

    useEffect(() => {
        const loadedJobs = getJobs('java');
        setJobs(loadedJobs);

        // Check for navigation state
        if (location.state?.jobId) {
            const linkedJob = loadedJobs.find(job => job.id === location.state.jobId);
            if (linkedJob) {
                setSelectedJob(linkedJob);
            }
        }
    }, [location.state]);

    const tabs = [
        { id: 'original', label: '원소스' },
        { id: 'converted', label: '변환소스' },
        { id: 'api', label: '호출 API' },
        { id: 'parameter', label: '파라미터' }
    ];

    const sampleOriginal = `// Java 1.6 Legacy Code
public class UserService {
    private Vector<User> users = new Vector<User>();
    private Hashtable<String, String> cache = new Hashtable<String, String>();
    
    public List getActiveUsers() {
        List result = new ArrayList();
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            if (user.isActive()) {
                result.add(user);
            }
        }
        return result;
    }
}`;

    const sampleConvertedController = `// Java 21 Controller
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/active")
    public List<UserDto> getActiveUsers() {
        return userService.getActiveUsers();
    }
}`;

    const sampleConvertedService = `// Java 21 Service
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    
    public List<UserDto> getActiveUsers() {
        return userRepository.findAllByActiveTrue()
            .stream()
            .map(UserDto::from)
            .toList();
    }
}`;

    const sampleApiList = [
        { type: 'Internal', method: 'GET', path: '/api/v1/orders/{id}', description: '주문 상세 정보 조회' },
        { type: 'External', method: 'POST', path: 'https://payment-gateway.com/api/pay', description: '결제 승인 요청' },
        { type: 'Internal', method: 'PUT', path: '/api/v1/users/{id}/status', description: '사용자 상태 변경' }
    ];

    const sampleParamBefore = `// Legacy Parameter Structure
Map<String, Object> inputParams = new HashMap<String, Object>();
inputParams.put("userId", "String");     // 사용자 ID
inputParams.put("searchType", "int");    // 검색 유형 (1: 이름, 2: 이메일)
inputParams.put("page", "int");          // 페이지 번호`;

    const sampleParamAfter = `// Modern DTO Structure
public record UserSearchRequest(
    @NotBlank String userId,
    @Min(1) @Max(2) int searchType,
    @Positive int page
) {}`;

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

    // Helper to render content based on tabs
    const renderContent = () => {
        if (!selectedFile) {
            return (
                <div className="no-selection">
                    <p>파일을 선택하여 상세 내용을 확인하세요</p>
                </div>
            );
        }

        if (activeTab === 'original') {
            return (
                <div className="code-viewer">
                    <pre className="code-content"><code>{sampleOriginal}</code></pre>
                </div>
            );
        }

        if (activeTab === 'converted') {
            return (
                <div className="tab-content-wrapper">
                    <div className="sub-tabs">
                        <button
                            className={`sub-tab-btn ${convertedTab === 'controller' ? 'active' : ''}`}
                            onClick={() => setConvertedTab('controller')}
                        >
                            Controller
                        </button>
                        <button
                            className={`sub-tab-btn ${convertedTab === 'service' ? 'active' : ''}`}
                            onClick={() => setConvertedTab('service')}
                        >
                            Service
                        </button>
                    </div>
                    <div className="code-viewer">
                        <pre className="code-content">
                            <code>{convertedTab === 'controller' ? sampleConvertedController : sampleConvertedService}</code>
                        </pre>
                    </div>
                </div>
            );
        }

        if (activeTab === 'api') {
            return (
                <div className="api-list-view">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>유형</th>
                                <th>Method</th>
                                <th>API Path</th>
                                <th>설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleApiList.map((api, idx) => (
                                <tr key={idx}>
                                    <td><span className={`badge ${api.type.toLowerCase()}`}>{api.type}</span></td>
                                    <td>{api.method}</td>
                                    <td>{api.path}</td>
                                    <td>{api.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (activeTab === 'parameter') {
            return (
                <div className="tab-content-wrapper">
                    <div className="sub-tabs">
                        <button
                            className={`sub-tab-btn ${parameterTab === 'before' ? 'active' : ''}`}
                            onClick={() => setParameterTab('before')}
                        >
                            변경전
                        </button>
                        <button
                            className={`sub-tab-btn ${parameterTab === 'after' ? 'active' : ''}`}
                            onClick={() => setParameterTab('after')}
                        >
                            변경후
                        </button>
                    </div>
                    <div className="code-viewer">
                        <pre className="code-content">
                            <code>{parameterTab === 'before' ? sampleParamBefore : sampleParamAfter}</code>
                        </pre>
                    </div>
                </div>
            );
        }
    };

    if (!selectedJob) {
        return (
            <div className="report">
                <div className="report-header">
                    <h2>Java 변환 결과 보고서</h2>
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
                                    {jobs.map((job) => (
                                        <tr key={job.id} onClick={() => setSelectedJob(job)} style={{ cursor: 'pointer' }}>
                                            <td className="job-name-cell">{job.jobName}</td>
                                            <td>{job.totalCount}</td>
                                            <td className="success-count">{job.successCount}</td>
                                            <td className="fail-count">{job.failCount}</td>
                                            <td>{job.duration}</td>
                                            <td>{job.convertedAt}</td>
                                        </tr>
                                    ))}
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
                                <button className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}>전체 ({selectedJob.files?.length || 0})</button>
                                <button className={`filter-btn success ${filterStatus === 'success' ? 'active' : ''}`} onClick={() => setFilterStatus('success')}>성공 ({selectedJob.successCount})</button>
                                <button className={`filter-btn error ${filterStatus === 'error' ? 'active' : ''}`} onClick={() => setFilterStatus('error')}>실패 ({selectedJob.failCount})</button>
                            </div>
                            <input type="text" className="search-input" placeholder="파일명 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                    </div>
                    <div className="file-list">
                        {filteredFiles.length === 0 ? <div className="no-files">검색 결과가 없습니다</div> : filteredFiles.map((file) => (
                            <div key={file.id} className={`file-item ${selectedFile?.id === file.id ? 'active' : ''} ${file.status}`} onClick={() => setSelectedFile(file)}>
                                <div className="file-icon">{file.status === 'success' ? '✓' : '✗'}</div>
                                <span className="file-name">{file.name}</span>
                                <span className={`status-badge ${file.status === 'success' ? 'success' : 'error'}`}>
                                    {file.status === 'success' ? '성공' : '실패'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="detail-panel">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Report;
