// Reusing Report styles from java/Report.css
import { useState } from 'react';
import '../java/Report.css';

function Report() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeTab, setActiveTab] = useState('screen');

    const convertedFiles = [
        { id: 1, name: 'UserList.xfdl', status: 'success', components: 8, apis: 3 },
        { id: 2, name: 'OrderForm.xfdl', status: 'success', components: 12, apis: 5 },
        { id: 3, name: 'Dashboard.xfdl', status: 'success', components: 15, apis: 8 },
        { id: 4, name: 'ProductGrid.xfdl', status: 'error', components: 0, apis: 0 },
        { id: 5, name: 'LoginPage.xfdl', status: 'success', components: 6, apis: 2 },
        { id: 6, name: 'CustomerForm.xfdl', status: 'success', components: 10, apis: 4 },
        { id: 7, name: 'InvoiceList.xfdl', status: 'success', components: 9, apis: 6 },
        { id: 8, name: 'ReportView.xfdl', status: 'success', components: 14, apis: 7 }
    ];

    const tabs = [
        { id: 'screen', label: '넥사크로 화면정보' },
        { id: 'interface', label: '넥사크로 인터페이스정보' },
        { id: 'overview', label: '화면개요' },
        { id: 'mock', label: 'Mock 데이터' },
        { id: 'api', label: 'API 명세' }
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
                        <h3>변환 완료 화면</h3>
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
                            {activeTab === 'screen' && (
                                <div className="code-view">
                                    <pre className="code-block">{`<?xml version="1.0" encoding="utf-8"?>
<FDL version="2.1">
  <Form id="UserList">
    <Layouts>
      <Layout>
        <Grid id="grd_list" taborder="0" binddataset="ds_list">
          <Columns>
            <Column size="80" band="left"/>
            <Column size="150"/>
            <Column size="100"/>
          </Columns>
        </Grid>
      </Layout>
    </Layouts>
  </Form>
</FDL>`}</pre>
                                </div>
                            )}

                            {activeTab === 'interface' && (
                                <div className="code-view">
                                    <pre className="code-block">{`Dataset: ds_list
Columns:
  - user_id (STRING)
  - user_name (STRING)
  - email (STRING)
  - status (STRING)

Service Bindings:
  - getUserList() → /api/users
  - saveUser() → /api/users/save
  - deleteUser() → /api/users/delete`}</pre>
                                </div>
                            )}

                            {activeTab === 'overview' && (
                                <div className="code-view">
                                    <div style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                        <p><strong>화면명:</strong> 사용자 목록 관리</p>
                                        <p><strong>주요 기능:</strong></p>
                                        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
                                            <li>사용자 목록 조회 및 표시</li>
                                            <li>사용자 정보 등록/수정/삭제</li>
                                            <li>검색 및 필터링 기능</li>
                                            <li>페이지네이션</li>
                                        </ul>
                                        <p style={{ marginTop: '1rem' }}><strong>사용 컴포넌트:</strong> Grid, Button, Input, Modal</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'mock' && (
                                <div className="code-view">
                                    <pre className="code-block">{`{
  "users": [
    {
      "user_id": "U001",
      "user_name": "김철수",
      "email": "kim@example.com",
      "status": "active"
    },
    {
      "user_id": "U002",
      "user_name": "이영희",
      "email": "lee@example.com",
      "status": "active"
    }
  ]
}`}</pre>
                                </div>
                            )}

                            {activeTab === 'api' && (
                                <div className="api-list">
                                    <div className="api-items">
                                        <div className="api-item">
                                            <span className="api-method get">GET</span>
                                            <span className="api-path">/api/users</span>
                                        </div>
                                        <div className="api-item">
                                            <span className="api-method post">POST</span>
                                            <span className="api-path">/api/users/save</span>
                                        </div>
                                        <div className="api-item">
                                            <span className="api-method delete">DELETE</span>
                                            <span className="api-path">/api/users/delete</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>좌측에서 화면을 선택하세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Report;
