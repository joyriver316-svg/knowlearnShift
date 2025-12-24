// Reusing Conversion styles
import { useState } from 'react';
import '../java/Conversion.css';

function Conversion() {
    const [sourcePath, setSourcePath] = useState('');
    const [guidePath, setGuidePath] = useState('');
    const [outputPath, setOutputPath] = useState('');
    const [aiModel, setAiModel] = useState('gpt4');
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleStartConversion = () => {
        setIsConverting(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsConverting(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    const handleBrowse = (type) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = true;
        input.directory = true;
        input.multiple = true;

        input.onchange = (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                const path = files[0].path || files[0].webkitRelativePath.split('/')[0];
                if (type === 'source') setSourcePath(path);
                else if (type === 'guide') setGuidePath(path);
                else if (type === 'output') setOutputPath(path);
            }
        };

        input.click();
    };

    return (
        <div className="conversion">
            <div className="conversion-header">
                <h2>로직 마이그레이션 작업</h2>
                <p className="conversion-subtitle">Stored Procedure를 Java 기반 Layered Architecture로 변환하세요</p>
            </div>

            <div className="conversion-form">
                <div className="settings-container">
                    <div className="settings-section">
                        <h3 className="section-title">Input 설정</h3>
                        <div className="form-group">
                            <label>소스 폴더</label>
                            <div className="input-with-button">
                                <input
                                    type="text"
                                    value={sourcePath}
                                    onChange={(e) => setSourcePath(e.target.value)}
                                    placeholder="C:\database\stored-procedures"
                                    className="form-input"
                                />
                                <button
                                    className="btn btn-browse"
                                    onClick={() => handleBrowse('source')}
                                    type="button"
                                >
                                    찾아보기
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>표준가이드 폴더</label>
                            <div className="input-with-button">
                                <input
                                    type="text"
                                    value={guidePath}
                                    onChange={(e) => setGuidePath(e.target.value)}
                                    placeholder="C:\references\java-layers"
                                    className="form-input"
                                />
                                <button
                                    className="btn btn-browse"
                                    onClick={() => handleBrowse('guide')}
                                    type="button"
                                >
                                    찾아보기
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h3 className="section-title">Output 설정</h3>
                        <div className="form-group">
                            <label>출력 폴더</label>
                            <div className="input-with-button">
                                <input
                                    type="text"
                                    value={outputPath}
                                    onChange={(e) => setOutputPath(e.target.value)}
                                    placeholder="C:\java\src\main\java"
                                    className="form-input"
                                />
                                <button
                                    className="btn btn-browse"
                                    onClick={() => handleBrowse('output')}
                                    type="button"
                                >
                                    찾아보기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>AI 모델 및 변환 옵션</h3>
                    <div className="form-group">
                        <label>AI 모델 선택</label>
                        <select
                            value={aiModel}
                            onChange={(e) => setAiModel(e.target.value)}
                            className="form-input"
                        >
                            <option value="gpt4">GPT-4</option>
                            <option value="claude">Claude 3.5 Sonnet</option>
                            <option value="gemini">Gemini Pro</option>
                        </select>
                    </div>
                    <div className="options-grid">
                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span>JPA Entity 생성</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span>Repository 패턴 적용</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span>Transaction 관리</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>QueryDSL 사용</span>
                        </label>
                    </div>
                </div>

                {isConverting && (
                    <div className="progress-section">
                        <div className="progress-header">
                            <span>변환 진행 중...</span>
                            <span className="progress-percentage">{progress}%</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="progress-stats">
                            <span>처리 중: SP_GET_USER_LIST</span>
                            <span>12 / 120 SP</span>
                        </div>
                    </div>
                )}

                <div className="form-actions">
                    <button
                        className="btn btn-primary btn-large"
                        onClick={handleStartConversion}
                        disabled={isConverting}
                    >
                        {isConverting ? '변환 중...' : '변환 시작'}
                    </button>
                    <button className="btn btn-secondary btn-large">
                        초기화
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Conversion;
