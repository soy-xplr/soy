// ─────────────────────────────────────────────────────────────
// 국문 이력서 v3 (서구식 포맷: 회사 → 프로젝트 → 성과 중심 불릿)
// 텍스트만 고치면 /resume-v3 전체가 바뀝니다.
// ─────────────────────────────────────────────────────────────
import type { WSections, WesternResumeData } from "./westernResume";

export const defaultV3Sections: WSections = {
  summary: "", // 제목 없이 이름 아래 바로 소개 문단
  capabilities: "CORE COMPETENCIES",
  experience: "EXPERIENCE",
  education: "EDUCATION",
  tools: "SKILLS",
  languages: "LANGUAGE",
};

export const resumeV3Data: WesternResumeData = {
  profile: {
    name: "박서영",
    location: "",
    title: "Product Manager  |  B2C · Platform · 0→1 Launch · Data-driven Product",
    contacts: [
      { label: "soy.xplr@gmail.com", href: "mailto:soy.xplr@gmail.com" },
      { label: "Portfolio: soy-xplr.vercel.app", href: "https://soy-xplr.vercel.app" },
    ],
    summary: [
      "웹·앱·플랫폼에서 신규 서비스 구축부터 출시, 운영, 고도화까지 End-to-End로 경험한 프로덕트 매니저입니다.",
      "MAU 170만·누적 가입자 700만 규모의 글로벌 UGC 플랫폼, 150만 MAU 모바일 앱, 누적 회원 40만 교육 플랫폼 등 다양한 규모의 제품을 경험했습니다. 대규모 서비스의 사용성을 지속적으로 개선하는 일과, 제품이 없는 상태에서 서비스 구조와 운영 기반을 0→1로 만드는 일을 모두 수행해 왔습니다.",
      "사용자 행동 데이터와 피드백, 운영 현장에서 발생하는 문제를 바탕으로 개선 과제를 정의하고 이를 UX·정책·운영 시스템으로 구체화하는 데 강점이 있습니다. 사업·개발·디자인·운영·법무 등 다양한 이해관계자의 요구사항을 조율하며 제품을 실제 출시 가능한 형태로 만드는 역할을 주로 맡아왔습니다.",
    ],
    capabilities: [
      {
        label: "Large-scale Product",
        description: "MAU 170만 글로벌 플랫폼, 150만 MAU 모바일 앱 등 대규모 사용자 서비스 기획·운영",
      },
      {
        label: "0→1 Product Launch",
        description: "서비스 컨셉·로드맵·정책·UX 정의부터 개발·QA·배포까지 End-to-End 경험",
      },
      {
        label: "Data-driven Improvement",
        description: "사용자 행동·운영 데이터 기반 문제 정의, 개선 과제 도출 및 성과 검증",
      },
      {
        label: "Platform & Policy",
        description: "회원·계정·인증·글로벌·운영 정책과 백오피스·운영 시스템 설계",
      },
      {
        label: "Product Analytics",
        description: "GA/GTM · Firebase · Snowflake · Power BI 기반 지표 설계 및 분석",
      },
      {
        label: "Cross-functional Leadership",
        description: "개발·디자인·사업·운영·법무·글로벌 조직 간 요구사항 조율 및 프로젝트 리딩",
      },
    ],
  },
  sections: { ...defaultV3Sections },
  experiences: [
    {
      company: "넥슨코리아 NEXON",
      role: "Product Manager",
      period: "2021.03 – 현재",
      projects: [
        {
          name: "메이플스토리 월드",
          role: "Web / Platform Product Manager",
          period: "2021.05 – 2024.04",
          meta: "MAU 170만 · 누적 가입자 700만 글로벌 UGC 플랫폼",
          description:
            "프로젝트 초기부터 CBT·국내 소프트 런칭·글로벌 확장·운영 고도화까지 참여하며 웹/플랫폼의 사용자 기능과 정책·운영 체계를 폭넓게 기획했습니다.",
          bullets: [
            "검색·프로필·즐겨찾기 등 크리에이터와 사용자의 콘텐츠 탐색 기능을 기획하고, 사용 데이터와 피드백을 기반으로 장기간 UX 개선",
            "원하는 제작 리소스를 정확하게 찾기 어려운 문제를 분석해 검색 구조와 UX를 개선하고 검색 정확도를 약 60%p 향상",
            "프로필을 단순 사용자 정보 화면에서 콘텐츠 발견 접점으로 확장하고, 검색한 리소스를 폴더 단위로 저장·관리할 수 있는 즐겨찾기 기능 신규 기획",
            "글로벌 출시 과정에서 공식 웹사이트 영문화, 크리에이터 콘텐츠 번역 기능, 국가·언어별 콘텐츠 노출 및 운영 구조를 설계해 다국가 서비스 기반 구축",
            "탈퇴 기능 부재로 CS를 통해 처리하던 사용자 문제를 해결하기 위해 환불·정산·개인정보·콘텐츠 데이터 보존 기준을 법무·사업·개발과 정의하고 서비스 Flow와 시간 단위 처리 로직으로 구현 → 출시 이후 관련 CS 0건",
            "점검·제재·배너·콘텐츠 관리 등 운영 조직이 개발 배포 없이 서비스를 관리할 수 있는 백오피스 기능을 구축해 플랫폼 운영 체계 고도화",
          ],
        },
        {
          name: "헬로메이플",
          role: "Web / Platform Product Manager",
          period: "2023.12 – 2026.02",
          meta: "웹/플랫폼 단독 PM · 누적 회원 40만",
          description:
            "메이플 IP 기반 블록코딩 교육 서비스의 웹/플랫폼 영역을 단독 담당하며 0→1 구축 → 정식 런칭 → 글로벌 시범 런칭 → 전면 리뉴얼까지 제품 전 생애주기를 리딩했습니다.",
          bullets: [
            "제품 초기 단계에서 웹/플랫폼 전체 스펙과 단계별 로드맵을 수립하고 회원 시스템·공식 홈페이지·운영 백오피스·다국어 체계·GA/GTM 측정 환경을 0→1로 구축",
            "교사와 학생이 연결되는 실제 학교 수업 환경을 반영해 사용자 유형·계정 구조·가입·인증 Flow를 설계하고 사업·개발·디자인·운영·법무 조직을 조율해 2024년 9월 정식 서비스 온타임 런칭",
            "콘텐츠·배너·공지·고객정보 조회·유저 관리·제재 등 운영 기능을 백오피스로 구축해 운영 조직의 개발 의존도를 낮추고 서비스 확장 기반 마련",
            "국내 서비스 확산 이후 영어·일본어 번역 프로세스와 해외 회원가입·국가별 콘텐츠 운영 체계를 구축해 2025년 글로벌 시범 서비스 출시",
            "서비스 성장 이후 기존 홈페이지가 가입·소개 중심에 머물러 콘텐츠 탐색이 어렵다는 문제를 GA/GTM 행동 데이터로 확인하고, 홈페이지 역할을 ‘가입 획득’에서 ‘콘텐츠 발견 허브’로 재정의",
            "콘텐츠 중심으로 IA와 메인 UX를 전면 개편한 결과 참여시간 +196.6%, 인당 페이지뷰 +17.5%, 콘텐츠 상세 조회 약 8배 증가",
          ],
        },
        {
          name: "NDC 공식 앱",
          role: "Mobile Product Manager",
          period: "2024.12 – 2025.06",
          meta: "단독 PM · 신규 모바일 서비스 0→1",
          description:
            "기존 웹사이트만으로는 현장에서 세션 검색·일정 변경 확인·관심 세션 관리·긴급 공지가 어렵다는 문제를 바탕으로 공식 모바일 앱을 제안하고, 컨셉부터 출시·라이브 운영·데이터 분석까지 단독 리딩했습니다.",
          bullets: [
            "한정된 개발 일정 안에서 기존 웹 자산을 최대한 활용하기 위해 WebView + Native 하이브리드 구조를 선택하고, 웹과 앱 전용 기능의 경계를 정의",
            "전체 IA·사용자 Flow·헤더·터치 인터랙션 등 공통 UX 규칙과 Android/iOS 권한·푸시·알림 정책을 설계해 디자인·개발 협업 기준 수립",
            "Firebase Remote Config를 활용해 혼잡도·공지·이벤트 정보를 앱 업데이트 없이 실시간 제어할 수 있도록 설계해 현장 운영 대응력 확보",
            "기획·디자인·개발·QA·마켓 심사·배포 전 과정을 리딩해 행사 일정에 맞춰 온타임 런칭 및 행사 기간 무장애 운영",
            "Snowflake 데이터를 Power BI 대시보드로 시각화해 사용자 행동과 기능별 이용 현황을 분석하고, 행사 참가자 대비 앱 사용률 20%, ‘내 세션 관리’ 2.5천 페이지뷰를 확인",
            "실제 이용 데이터를 근거로 차년도 계정 시스템 도입과 개인화 기능 확대를 검토하며 다음 제품 의사결정으로 연결",
          ],
        },
        {
          name: "넥슨플레이",
          role: "Mobile Product Manager",
          period: "2022.12 – 2023.03",
          meta: "150만 MAU 모바일 앱",
          description:
            "2022년 구글 앱스토어 게임앱 1위, 150만 MAU 규모 서비스에서 기능 개선·패치 매니징·플랫폼 정책 대응을 담당했습니다.",
          bullets: [
            "앱 리뷰·사용자 행동·운영 지표를 모니터링해 UX 개선 과제를 발굴하고 사업·광고·운영 조직의 요구사항을 제품 요구사항으로 구체화",
            "포인트박스 사용 과정에서 동작을 오인해 반복적으로 발생하던 문의를 분석하고 개봉 Flow와 정보 전달 UX를 재설계 → 개선 이후 관련 CS 0건 유지",
            "Apple·Facebook 등 Third-party 인증 및 플랫폼 정책 변경에 대응하고 심사 요건을 사전 반영해 담당 기간 검수 리젝 0건",
            "앱 패치 일정·QA·마켓 배포를 관리해 담당 기간 주요 업데이트를 온타임·무장애 배포",
          ],
        },
        {
          name: "넥슨 그룹사 임직원 앱",
          role: "Mobile Product Manager",
          period: "2021.09 – 2023.05",
          meta: "임직원 5천 명 · 월간 활성률 89%",
          description:
            "근로시간·휴가·식당·셔틀·사내 알림 등 일상적인 회사생활 기능을 제공하는 모바일 서비스의 기획·운영·지표 관리를 담당했습니다.",
          bullets: [
            "부서 검색·알림함·휴가 신청·생일 등 반복 이용 기능을 기획하고 Firebase 기반 이용지표와 CS를 토대로 지속 개선",
            "점심시간에 식당 혼잡도를 사전에 확인하기 어렵다는 사용자 요구를 반영해 혼잡도·잔여 식수 정보를 제공하는 기능을 기획 → 출시 후 피크 시간대 식당탭 조회 +22%",
            "푸시·배너를 활용해 다수 사내 프로젝트와 공지를 지원하며 앱을 임직원 커뮤니케이션 채널로 운영",
            "임직원 5천 명 규모에서 월간 활성률 89%를 유지하며 담당 기간 주요 패치를 무장애 운영",
          ],
        },
        {
          name: "공통 플랫폼·AI Workflow 기획 및 운영",
          period: "2026 – 현재",
          description:
            "서비스 기획 영역에서 공통 백엔드 플랫폼과 생성형 AI 기반 업무 프로세스까지 담당 범위를 확장했습니다.",
          bullets: [
            "알림·휴대폰/이메일 인증·게시/댓글 등 여러 서비스가 공통으로 사용하는 백엔드 플랫폼의 운영·유지보수 및 기능 개선",
            "운영 장애와 저장·API 이슈를 개발 구조까지 추적해 원인을 정의하고 재배포·가이드 수정 등 해결 과정 리딩",
            "반복적인 다국어 업무를 개선하기 위해 번역 정책·Diff·LQA·히스토리 구조를 설계하고 생성형 AI 기반 번역 Workflow 구축",
            "Claude·Cursor·Vertex AI를 활용해 기획·분석·문서화·운영 자동화의 생산성을 높이고 비개발 PM의 기술 문제 해결 범위를 확장",
          ],
        },
      ],
    },
    {
      groupLabel: "EARLIER EXPERIENCE",
      company: "카카오엔터프라이즈",
      role: "AI Service Planning Intern",
      period: "2020.02 – 2020.08",
      summary:
        "대화형 AI 서비스 카카오 i의 사용자 발화 데이터를 분석하고 서비스 품질을 개선했습니다. Kibana·Excel 기반 발화 검수와 도메인별 ML 학습용 질의 데이터 생성, 챗봇 스몰톡 시나리오 기획·배포를 담당했습니다.",
    },
    {
      company: "SK텔레콤",
      role: "AI Service Planning",
      period: "2019.07 – 2020.01",
      summary:
        "대화형 AI 서비스 NUGU의 백과사전형 지식 서비스를 구축·운영했습니다. RDBMS 기반 지식 데이터와 사용자 질의 데이터를 구축하고 CBT·QA·런칭·운영까지 참여했으며, 실제 사용자 질의를 기반으로 답변 품질을 지속 고도화했습니다.",
    },
  ],
  education: [
    {
      school: "이화여자대학교",
      degree: "국어국문학과 · 경영학과 학사",
      period: "2014.03 – 2020.02",
    },
    {
      school: "호세이대학교",
      degree: "경영학과 교환학생",
      period: "2018.09 – 2019.02",
    },
  ],
  tools: [
    {
      category: "Product & Collaboration",
      items: ["JIRA", "Confluence", "Figma", "Axure", "Slack"],
    },
    {
      category: "Data & Analytics",
      items: ["GA/GTM", "Firebase", "Snowflake", "Power BI", "Kibana", "Excel"],
    },
    { category: "AI & Productivity", items: ["Claude", "Cursor", "Vertex AI"] },
  ],
  languages: [
    "Japanese — Business Level · JLPT N1",
    "English — Business Level · TOEIC 930",
  ],
};
