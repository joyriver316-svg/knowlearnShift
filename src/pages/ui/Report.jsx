import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../java/Report.css';
import '../java/Dashboard.css';
import { getJobs } from '../../utils/jobStorage';

function Report() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeTab, setActiveTab] = useState('preview');
    const [isMockOn, setIsMockOn] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const location = useLocation();

    useEffect(() => {
        const loadedJobs = getJobs('ui');
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
        { id: 'preview', label: 'PreView' },
        { id: 'document', label: 'Document' },
        { id: 'mock', label: 'Mock' },
        { id: 'api', label: 'API' },
        { id: 'screen', label: 'Screen' },
        { id: 'nxfdl', label: 'NXFDL' },
        { id: 'nxmls', label: 'NXMLs' }
    ];

    const sampleNexacroScreen = `<!-- NXFDL Source -->
<FDL version="2.1">
  <Form id="customerList" width="1280" height="720" titletext="Customer List">
    <Layouts>
      <Layout height="720" width="1280">
        <Grid id="grd_customers" taborder="0" left="20" top="80" right="20" bottom="20" binddataset="ds_customers">
          <Formats>
            <Format id="default">
              <Columns>
                <Column size="80"/>
                <Column size="150"/>
                <Column size="200"/>
              </Columns>
              <Rows>
                <Row size="24" band="head"/>
                <Row size="24"/>
              </Rows>
              <Band id="head">
                <Cell text="ID"/>
                <Cell col="1" text="Name"/>
                <Cell col="2" text="Email"/>
              </Band>
              <Band id="body">
                <Cell text="bind:cust_id"/>
                <Cell col="1" text="bind:cust_name"/>
                <Cell col="2" text="bind:email"/>
              </Band>
            </Format>
          </Formats>
        </Grid>
      </Layout>
    </Layouts>
  </Form>
</FDL>`;

    const sampleNexacroInterface = `<!-- NXMLs Interface Definition -->
<Interfaces>
    <Interface id="SVC_SEARCH_CUST" type="Http" url="/api/customers">
        <Input>
            <Dataset id="ds_cond" type="QueryString">
                <Column id="keyword" type="STRING"/>
                <Column id="page" type="INT"/>
            </Dataset>
        </Input>
        <Output>
            <Dataset id="ds_customers">
                <Column id="cust_id" type="STRING"/>
                <Column id="cust_name" type="STRING"/>
                <Column id="email" type="STRING"/>
                <Column id="phone" type="STRING"/>
            </Dataset>
        </Output>
    </Interface>
</Interfaces>`;

    const sampleOverview = `[Screen Document]
# Customer Management Screen

## Overview
This screen provides functionality to search, view, and manage customer information.

## Main Features
1. **Search**: Filter customers by name or ID.
2. **List View**: Display customer details in a grid.
3. **Export**: Support Excel export of the customer list.
4. **CRUD**: Context menu support for Edit/Delete operations.

## Navigation
Menu > Sales > Customer Management`;

    const sampleMock = `{
    "ds_customers": [
        { "cust_id": "CUST001", "cust_name": "John Doe", "email": "john@example.com", "phone": "010-1234-5678" },
        { "cust_id": "CUST002", "cust_name": "Jane Smith", "email": "jane@example.com", "phone": "010-9876-5432" },
        { "cust_id": "CUST003", "cust_name": "Alice Johnson", "email": "alice@company.com", "phone": "010-5555-7777" }
    ]
}`;

    const sampleApiSpec = [
        { method: 'GET', path: '/api/v1/customers', desc: 'Get Customer List', params: 'keyword, page, size' },
        { method: 'POST', path: '/api/v1/customers', desc: 'Register Customer', params: 'CustomerDto' },
        { method: 'PUT', path: '/api/v1/customers/{id}', desc: 'Update Customer', params: 'id, CustomerDto' },
        { method: 'DELETE', path: '/api/v1/customers/{id}', desc: 'Delete Customer', params: 'id' }
    ];

    const sampleParserInfo = `{
    "screen_metadata": {
        "id": "customerList.xfdl",
        "resolution": { "width": 1280, "height": 720 },
        "component_count": {
            "Grid": 1,
            "Button": 4,
            "Static": 8,
            "Div": 2
        }
    },
    "binding_analysis": {
        "ds_customers": ["grd_customers", "div_detail.form.edt_name"]
    },
    "script_analysis": {
        "functions": ["fn_search", "fn_save", "fn_excel_export"],
        "event_handlers": 5
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

    const renderContent = () => {
        if (!selectedFile) {
            return (
                <div className="no-selection">
                    <p>파일을 선택하여 상세 내용을 확인하세요</p>
                </div>
            );
        }

        if (activeTab === 'preview') {
            const previewData = [
                { id: 'CUST001', name: 'John Doe', email: 'john@example.com', phone: '010-1234-5678' },
                { id: 'CUST002', name: 'Jane Smith', email: 'jane@example.com', phone: '010-9876-5432' },
                { id: 'CUST003', name: 'Alice Johnson', email: 'alice@company.com', phone: '010-5555-7777' }
            ];

            return (
                <div className="preview-container" style={{ padding: '20px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: '600', color: '#1e293b' }}>Customer List Preview</h3>

                    {/* Mock Search Area */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Search:</span>
                            <input type="text" placeholder="Name or ID" style={{ padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.9rem' }} />
                            <button style={{ padding: '6px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>Search</button>
                        </div>
                    </div>

                    {/* Mock Grid */}
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {previewData.map(cust => (
                                <tr key={cust.id}>
                                    <td>{cust.id}</td>
                                    <td>{cust.name}</td>
                                    <td>{cust.email}</td>
                                    <td>{cust.phone}</td>
                                    <td>
                                        <button style={{ padding: '4px 8px', fontSize: '0.8rem', marginRight: '5px', background: '#e0e7ff', color: '#4338ca', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                        <button style={{ padding: '4px 8px', fontSize: '0.8rem', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (activeTab === 'document') {
            return (
                <div className="code-viewer">
                    <pre className="code-content" style={{ whiteSpace: 'pre-wrap', fontFamily: 'sans-serif' }}>
                        {sampleOverview}
                    </pre>
                </div>
            );
        }

        if (activeTab === 'api') {
            return (
                <div className="api-list-view">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Method</th>
                                <th>API Path</th>
                                <th>Description</th>
                                <th>Parameters</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleApiSpec.map((api, idx) => (
                                <tr key={idx}>
                                    <td><span className={`badge ${api.method === 'GET' ? 'internal' : 'external'}`}>{api.method}</span></td>
                                    <td>{api.path}</td>
                                    <td>{api.desc}</td>
                                    <td>{api.params}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        let content = '';
        if (activeTab === 'mock') content = sampleMock;
        else if (activeTab === 'screen') content = sampleParserInfo;
        else if (activeTab === 'nxfdl') content = sampleNexacroScreen;
        else if (activeTab === 'nxmls') content = sampleNexacroInterface;

        return (
            <div className="code-viewer">
                <pre className="code-content">
                    <code>{content}</code>
                </pre>
            </div>
        );
    };

    if (!selectedJob) {
        return (
            <div className="report">
                <div className="report-header">
                    <h2>UI 변환 결과 보고서</h2>
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
                    <div className="report-tabs" style={{ marginLeft: '12px', alignSelf: 'flex-start', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                            onClick={() => setIsMockOn(!isMockOn)}
                            style={{
                                padding: '4px 10px',
                                borderRadius: '20px',
                                border: '1px solid',
                                borderColor: isMockOn ? '#10b981' : '#cbd5e1',
                                background: isMockOn ? '#ecfdf5' : '#f1f5f9',
                                color: isMockOn ? '#059669' : '#64748b',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                height: '32px'
                            }}
                        >
                            <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: isMockOn ? '#10b981' : '#94a3b8',
                                display: 'inline-block'
                            }}></span>
                            {isMockOn ? 'Mock ON' : 'Mock OFF'}
                        </button>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{ padding: '6px 12px', whiteSpace: 'nowrap', fontSize: '0.85rem' }}
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
