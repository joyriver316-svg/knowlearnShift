import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png';

function Home() {
    const features = [
        {
            id: 'java',
            title: 'Java 현대화',
            subtitle: 'Java 1.6 → Java 21',
            description: '레거시 Java 1.6 코드를 최신 Java 21 기반의 현대적인 아키텍처로 자동 변환합니다.',
            icon: 'code',
            gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            features: [
                'Controller & Service 자동 생성',
                'Stream API 및 Record 활용',
                'Spring Boot 3.x 호환',
                '실시간 변환 모니터링'
            ]
        },
        {
            id: 'ui',
            title: 'UI 현대화',
            subtitle: 'Nexacro → React',
            description: 'Nexacro 기반 UI를 React + TypeScript 환경으로 자동 전환하여 현대적인 웹 애플리케이션을 구축합니다.',
            icon: 'palette',
            gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            features: [
                'React 컴포넌트 자동 생성',
                '상태 관리 코드 생성',
                'API 명세 자동 추출',
                'Mock 데이터 생성'
            ]
        },
        {
            id: 'logic',
            title: '로직 마이그레이션',
            subtitle: 'Stored Procedure → Java 21',
            description: 'DB Stored Procedure의 비즈니스 로직을 Java 기반 Layered Architecture로 이관합니다.',
            icon: 'refresh',
            gradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
            features: [
                'SP 로직 분석 및 변환',
                'Repository 패턴 적용',
                'Entity 자동 생성',
                'AI 모델 선택 가능'
            ]
        }
    ];

    return (
        <div className="home">
            <div className="container">
                <section className="hero">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="gradient-text">KNOWLEARN SHIFT</span>
                            <br />
                            AI 및 파서 기반 레거시 시스템 현대화
                        </h1>
                        <p className="hero-description">
                            최신 기술 스택으로 자동 변환하는 차세대 파서 및 AI 코드 변환 엔진
                        </p>

                        <h3 className="workflow-title">진행프로세스</h3>

                        <div className="hero-workflow">
                            <div className="hero-workflow-step">
                                <div className="hero-step-number">1</div>
                                <span>입력 설정</span>
                            </div>
                            <div className="hero-workflow-arrow">→</div>
                            <div className="hero-workflow-step">
                                <div className="hero-step-number">2</div>
                                <span>파서 / AI 변환</span>
                            </div>
                            <div className="hero-workflow-arrow">→</div>
                            <div className="hero-workflow-step">
                                <div className="hero-step-number">3</div>
                                <span>결과 확인</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <div className="features-grid">
                        {features.map((feature) => (
                            <Link
                                key={feature.id}
                                to={`/${feature.id}`}
                                className="feature-card"
                                style={{ '--card-gradient': feature.gradient }}
                            >
                                <div className="feature-icon">
                                    {feature.icon === 'code' && '{ }'}
                                    {feature.icon === 'palette' && '◨'}
                                    {feature.icon === 'refresh' && '⟲'}
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-subtitle">{feature.subtitle}</p>
                                <p className="feature-description">{feature.description}</p>
                                <ul className="feature-list">
                                    {feature.features.map((item, index) => (
                                        <li key={index}>
                                            <span className="checkmark">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="feature-cta">
                                    시작하기 →
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}

export default Home;
