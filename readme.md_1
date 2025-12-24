[과업지시서] AI 기반 레거시 시스템 현대화 자동 변환 솔루션 개발
1. 프로젝트 개요
프로젝트명: 아모레퍼시픽 차세대 전환을 위한 AI 자동 코드 변환 엔진 개발

주요 목적: * 20년 이상 노후화된 Java 1.6 소스를 Java 21로 현대화.

Nexacro UI를 React(TypeScript) 환경으로 자동 전환.

Stored Procedure(SP)를 Java 기반의 Layered Architecture로 로직 이관.

핵심 스택: Java 21, Spring Boot 3.x, React, TypeScript, LLM(AI Coding).

2. 공통 시스템 요구사항
모든 기능 모듈은 아래의 공통 UI/UX 흐름을 따릅니다.

2.1 입출력 관리 (File I/O)
경로 설정: 사용자가 로컬 또는 서버의 Input 폴더와 Output 폴더를 직접 선택할 수 있는 인터페이스 제공.

가이드 참조: 변환 시 표준 가이드(Standard Guide) 및 공통 모듈(Store, Types)이 담긴 참조 폴더를 AI가 컨텍스트로 학습하도록 설계.

2.2 실시간 모니터링 및 대시보드
프로그레스 바: 변환 시작 시 0% ~ 100%까지의 진행률을 실시간 시각화.

상태 요약: 총 대상 건수, 성공 건수, 에러(Fail) 건수를 대시보드 형태로 상단 배치.

3. 기능별 세부 요구사항
기능 1: Java Modernization (1.6 → 21)
입력: Java 1.6 소스 폴더, 표준 변환 가이드 폴더.

출력: Java 21 기반의 Controller.java, Service.java.

결과 보고서(Report View):

좌측: 변환 완료된 소스 파일 리스트(Table).

우측 상세 탭:

원소스: 변환 전 Java 1.6 코드.

변환소스: 변환 후 Java 21 코드.

호출 API: 해당 소스에서 호출하는 외부/내부 API 목록.

파라미터: 메서드별 입출력 파라미터 분석 리포트.

기능 2: UI Modernization (Nexacro → React)
입력: Nexacro 소스 폴더, React 표준(useStore.ts, types.ts) 폴더.

출력: React 기반 UI 컴포넌트 및 상태 관리 코드.

결과 보고서(Report View):

좌측: 화면 파일 리스트.

우측 상세 탭: 

넥사크로 화면정보: 원본 XML/스크립트 구조.

넥사크로 인터페이스정보: Dataset 및 서비스 바인딩 정보.

화면개요: AI가 요약한 화면의 주요 기능 설명.

Mock(샘플데이터): 테스트를 위한 JSON 샘플 데이터 자동 생성.

API 명세: UI와 연동될 백엔드 엔드포인트 정보.

파서용 화면정보: 파싱 과정에서 추출된 메타데이터.

기능 3: Logic Migration (SP → Java 21)
입력: Stored Procedure(SQL) 파일.

참조 정보: 기존 Service.java, Mapper.xml, Repository.java (순차적 문맥 파악).

변환 모델: 사용자가 특정 AI 모델(GPT-4, Claude 3.5, Gemini 등)을 선택 가능.

출력: * Controller.java (API 엔드포인트)

Service.java (비즈니스 로직)

Repository.java (DB 접근 계층)

Entity.java (데이터 객체)

4. 수행 순서 및 개발 가이드라인
전처리 단계: Input 폴더 내의 소스를 분석하여 변환 우선순위 및 의존성을 파악합니다.

AI 프롬프트 엔지니어링: * Java 1.6의 구문(Vector, Hashtable 등)을 최신 Java 21(Stream, Record, Sealed Class 등)로 변경하는 전용 프롬프트를 구성합니다.

제공된 Service, Mapper 정보를 바탕으로 SP의 SQL 로직을 Java Stream 및 JPA/MyBatis 로직으로 재구성합니다.

검증 로직: 변환된 소스가 문법적으로 올바른지 확인하는 Linter 기능을 포함합니다.

결과 시각화: 변환 전후의 코드를 비교(Diff)할 수 있는 뷰어를 보고서 메뉴에 통합합니다.

5. 최종 산출물
변환 솔루션 설치 파일 및 소스 코드.

AI 프롬프트 최적화 가이드북.

사용자 매뉴얼 (설정 및 결과 보고서 해석 방법).

- 프론트는 React jsx로 해줘
- 백엔드는 목업으로 처리해줘. 
- 솔루션 느낌이 나도록 동일하게 위의 3기능을 선택하고 들어가면 좌측 메뉴에 기능별 "대시보드", "변환관리", "결과보고서" 동일하게 버튼을 만들어서 각 버튼을 눌렀을때 위의 기능들이 구성 되었으면 해
- 결과보고서를 선택하면 중앙에 선택된 소스 목록이 보이고 우측에 위에 지정된 결과들이 탭구조 선택할 수 있게 해줘. 
