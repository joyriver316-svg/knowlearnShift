// Reusing Report styles
import { useState } from 'react';
import '../java/Report.css';

function Report() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeTab, setActiveTab] = useState('sp');

    const convertedFiles = [
        { id: 1, name: 'SP_GET_USER_LIST', status: 'success', classes: 4, methods: 8 },
        { id: 2, name: 'SP_INSERT_ORDER', status: 'success', classes: 5, methods: 12 },
        { id: 3, name: 'SP_UPDATE_PRODUCT', status: 'success', classes: 4, methods: 10 },
        { id: 4, name: 'SP_DELETE_PAYMENT', status: 'error', classes: 0, methods: 0 },
        { id: 5, name: 'SP_CALCULATE_TOTAL', status: 'success', classes: 3, methods: 6 },
        { id: 6, name: 'SP_GET_CUSTOMER_INFO', status: 'success', classes: 4, methods: 9 },
        { id: 7, name: 'SP_PROCESS_INVOICE', status: 'success', classes: 5, methods: 11 },
        { id: 8, name: 'SP_GENERATE_REPORT', status: 'success', classes: 6, methods: 14 }
    ];

    const tabs = [
        { id: 'sp', label: '원본 SP' },
        { id: 'controller', label: 'Controller' },
        { id: 'service', label: 'Service' },
        { id: 'repository', label: 'Repository' },
        { id: 'entity', label: 'Entity' }
    ];

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
                        <h3>변환 완료 SP</h3>
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
                            {activeTab === 'sp' && (
                                <div className="code-view">
                                    <pre className="code-block">{`CREATE PROCEDURE SP_GET_USER_LIST
AS
BEGIN
    SELECT 
        user_id,
        user_name,
        email,
        status
    FROM users
    WHERE status = 'active'
    ORDER BY user_name;
END`}</pre>
                                </div>
                            )}

                            {activeTab === 'controller' && (
                                <div className="code-view">
                                    <pre className="code-block">{`@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/list")
    public ResponseEntity<List<UserDTO>> getUserList() {
        List<UserDTO> users = userService.getActiveUsers();
        return ResponseEntity.ok(users);
    }
}`}</pre>
                                </div>
                            )}

                            {activeTab === 'service' && (
                                <div className="code-view">
                                    <pre className="code-block">{`@Service
@Transactional(readOnly = true)
public class UserService {
    
    private final UserRepository userRepository;
    
    public List<UserDTO> getActiveUsers() {
        return userRepository.findByStatus("active")
            .stream()
            .map(this::toDTO)
            .sorted(Comparator.comparing(UserDTO::getUserName))
            .toList();
    }
    
    private UserDTO toDTO(User user) {
        return new UserDTO(
            user.getUserId(),
            user.getUserName(),
            user.getEmail(),
            user.getStatus()
        );
    }
}`}</pre>
                                </div>
                            )}

                            {activeTab === 'repository' && (
                                <div className="code-view">
                                    <pre className="code-block">{`@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    List<User> findByStatus(String status);
    
    @Query("SELECT u FROM User u WHERE u.status = :status ORDER BY u.userName")
    List<User> findActiveUsersSorted(@Param("status") String status);
}`}</pre>
                                </div>
                            )}

                            {activeTab === 'entity' && (
                                <div className="code-view">
                                    <pre className="code-block">{`@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    @Column(nullable = false)
    private String userName;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String status;
    
    // Getters and Setters
}`}</pre>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>좌측에서 SP를 선택하세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Report;
