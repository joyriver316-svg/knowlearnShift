import { useState } from 'react';
import './Report.css';

function Report() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeTab, setActiveTab] = useState('original');

    const convertedFiles = [
        { id: 1, name: 'UserService.java', status: 'success', apis: 5, params: 12 },
        { id: 2, name: 'OrderController.java', status: 'success', apis: 8, params: 20 },
        { id: 3, name: 'ProductRepository.java', status: 'success', apis: 6, params: 15 },
        { id: 4, name: 'PaymentService.java', status: 'error', apis: 0, params: 0 },
        { id: 5, name: 'AuthController.java', status: 'success', apis: 4, params: 10 },
        { id: 6, name: 'CustomerService.java', status: 'success', apis: 7, params: 18 },
        { id: 7, name: 'InvoiceController.java', status: 'success', apis: 5, params: 14 },
        { id: 8, name: 'ReportService.java', status: 'success', apis: 9, params: 22 }
    ];

    const tabs = [
        { id: 'original', label: '원소스' },
        { id: 'converted', label: '변환소스' },
        { id: 'apis', label: '호출 API' },
        { id: 'params', label: '파라미터' }
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

    const sampleConverted = `// Java 21 Modern Code
@Service
public class UserService {
    private final List<User> users = new CopyOnWriteArrayList<>();
    private final Map<String, String> cache = new ConcurrentHashMap<>();
    
    public List<User> getActiveUsers() {
        return users.stream()
            .filter(User::isActive)
            .toList();
    }
}`;

    const getFileIcon = (filename) => {
        if (filename.endsWith('.java')) {
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2C6.5 3.5 6.5 5 8 6.5C9.5 5 9.5 3.5 8 2Z" fill="#EA2D2E" />
                    <path d="M8 9.5C6.5 11 6.5 12.5 8 14C9.5 12.5 9.5 11 8 9.5Z" fill="#0074BD" />
                    <path d="M4 5.5C4 5.5 5.5 6 8 6C10.5 6 12 5.5 12 5.5C12 5.5 10.5 7 8 7C5.5 7 4 5.5 4 5.5Z" fill="#EA2D2E" />
                    <path d="M4 9C4 9 5.5 9.5 8 9.5C10.5 9.5 12 9 12 9C12 9 10.5 10.5 8 10.5C5.5 10.5 4 9 4 9Z" fill="#0074BD" />
                </svg>
            );
        } else if (filename.endsWith('.jsx') || filename.endsWith('.js')) {
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="6" fill="#61DAFB" opacity="0.2" />
                    <ellipse cx="8" cy="8" rx="6" ry="2.5" stroke="#61DAFB" strokeWidth="0.8" fill="none" />
                    <ellipse cx="8" cy="8" rx="2.5" ry="6" stroke="#61DAFB" strokeWidth="0.8" fill="none" />
                    <ellipse cx="8" cy="8" rx="5.2" ry="4.3" stroke="#61DAFB" strokeWidth="0.8" fill="none" transform="rotate(60 8 8)" />
                    <circle cx="8" cy="8" r="1.5" fill="#61DAFB" />
                </svg>
            );
        } else if (filename.endsWith('.css')) {
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 2L4 14L8 15L12 14L13 2H3Z" fill="#1572B6" />
                    <path d="M8 3V14L11.5 13L12.3 3H8Z" fill="#33A9DC" />
                    <path d="M8 6H10.5L10.7 4H8V6Z" fill="white" />
                    <path d="M8 10H10L9.8 11.5L8 12V10Z" fill="white" />
                    <path d="M8 6V4H5.5L5.7 6H8Z" fill="#EBEBEB" />
                    <path d="M8 12V10H6L6.2 11.5L8 12Z" fill="#EBEBEB" />
                </svg>
            );
        } else if (filename.endsWith('.xml') || filename.endsWith('.xfdl')) {
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="12" height="12" rx="1" fill="#E44D26" opacity="0.1" />
                    <path d="M4 4L5 5M5 5L6 4M5 5L4 6M5 5L6 6" stroke="#E44D26" strokeWidth="1" strokeLinecap="round" />
                    <path d="M10 4L11 5M11 5L12 4M11 5L10 6M11 5L12 6" stroke="#E44D26" strokeWidth="1" strokeLinecap="round" />
                    <path d="M6 8H10M7 10H9" stroke="#E44D26" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="8" cy="8" r="0.5" fill="#E44D26" />
                </svg>
            );
        }
        return (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 2H9L12 5V14H4V2Z" fill="#6B7280" opacity="0.2" />
                <path d="M9 2V5H12" stroke="#6B7280" strokeWidth="1" />
                <path d="M4 2H9L12 5V14H4V2Z" stroke="#6B7280" strokeWidth="1" fill="none" />
            </svg>
        );
    };

    return (
        <div className="report">
            <div className="report-header">
                <div className="header-content">
                    <div className="tab-header">
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
                    <div className="panel-header">
                        <h3>변환 완료 파일</h3>
                    </div>
                    <div className="file-items">
                        {convertedFiles.map((file) => (
                            <div
                                key={file.id}
                                className={`file-item ${selectedFile?.id === file.id ? 'active' : ''}`}
                                onClick={() => setSelectedFile(file)}
                            >
                                <div className="file-info">
                                    <span className="file-icon">{getFileIcon(file.name)}</span>
                                    <span className="file-name">{file.name}</span>
                                    <span className={`badge badge-${file.status === 'success' ? 'success' : 'error'}`}>
                                        {file.status === 'success' ? '✓' : '✗'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="detail-panel">
                    {selectedFile ? (
                        <div className="tab-content">
                            {activeTab === 'original' && (
                                <div className="code-view">
                                    <pre className="code-block">{sampleOriginal}</pre>
                                </div>
                            )}

                            {activeTab === 'converted' && (
                                <div className="code-view">
                                    <pre className="code-block">{sampleConverted}</pre>
                                </div>
                            )}

                            {activeTab === 'apis' && (
                                <div className="api-list">
                                    <div className="api-items">
                                        <div className="api-item">
                                            <span className="api-method get">GET</span>
                                            <span className="api-path">/api/users/active</span>
                                        </div>
                                        <div className="api-item">
                                            <span className="api-method post">POST</span>
                                            <span className="api-path">/api/users</span>
                                        </div>
                                        <div className="api-item">
                                            <span className="api-method put">PUT</span>
                                            <span className="api-path">/api/users/{id}</span>
                                        </div>
                                        <div className="api-item">
                                            <span className="api-method delete">DELETE</span>
                                            <span className="api-path">/api/users/{id}</span>
                                        </div>
                                        <div className="api-item">
                                            <span className="api-method get">GET</span>
                                            <span className="api-path">/api/users/{id}/profile</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'params' && (
                                <div className="params-view">
                                    <table className="params-table">
                                        <thead>
                                            <tr>
                                                <th>메서드</th>
                                                <th>입력 파라미터</th>
                                                <th>반환 타입</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>getActiveUsers</td>
                                                <td>없음</td>
                                                <td>List&lt;User&gt;</td>
                                            </tr>
                                            <tr>
                                                <td>createUser</td>
                                                <td>UserDTO dto</td>
                                                <td>User</td>
                                            </tr>
                                            <tr>
                                                <td>updateUser</td>
                                                <td>Long id, UserDTO dto</td>
                                                <td>User</td>
                                            </tr>
                                            <tr>
                                                <td>deleteUser</td>
                                                <td>Long id</td>
                                                <td>void</td>
                                            </tr>
                                            <tr>
                                                <td>getUserProfile</td>
                                                <td>Long id</td>
                                                <td>UserProfile</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>좌측에서 파일을 선택하세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Report;

