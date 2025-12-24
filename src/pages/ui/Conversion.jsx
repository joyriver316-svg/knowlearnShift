// Reusing Conversion styles from java/Conversion.css
import { useState } from 'react';
import '../java/Conversion.css';

function Conversion() {
    const [sourcePath, setSourcePath] = useState('');
    const [guidePath, setGuidePath] = useState('');
    const [outputPath, setOutputPath] = useState('');
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
                <h2>UI 변환 작업</h2>
                <p className="conversion-subtitle">Nexacro 화면 파일을 React 컴포넌트로 변환하세요</p>
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
                                    placeholder="C:\nexacro\screens"
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
                                    placeholder="C:\guides\react-standards"
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
                                    placeholder="C:\react\src\components"
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
                    <h3>변환 옵션</h3>
                    <div className="options-grid">
                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span>TypeScript 사용</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span>상태 관리 코드 생성</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span>API 명세 추출</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span>Mock 데이터 생성</span>
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
                            <span>처리 중: UserList.xfdl</span>
                            <span>25 / 250 화면</span>
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
