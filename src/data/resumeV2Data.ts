// ─────────────────────────────────────────────────────────────
// 국문 이력서 (서구식 포맷: 회사 → 프로젝트 → 소제목별 불릿)
// 텍스트만 고치면 /resume-v2 전체가 바뀝니다.
// ─────────────────────────────────────────────────────────────
import type { WSections, WesternResumeData } from "./westernResume";

export const defaultV2Sections: WSections = {
  summary: "", // 제목 없이 이름 아래 바로 소개 문단
  capabilities: "CORE COMPETENCIES",
  experience: "EXPERIENCE",
  education: "EDUCATION",
  tools: "SKILLS",
  languages: "LANGUAGE",
};

export const resumeV2Data: WesternResumeData = {
  profile: {
    name: "박서영",
    location: "",
    title:
      "Product Manager / Product Owner  |  B2C Product · 0→1 Launch · Data-driven Growth",
    contacts: [
      { label: "soy.xplr@gmail.com", href: "mailto:soy.xplr@gmail.com" },
      { label: "Portfolio: soy-xplr.vercel.app", href: "https://soy-xplr.vercel.app", highlight: true },
    ],
    summary: [
      "웹·앱·플랫폼 서비스를 기획하고 신규 구축부터 출시·운영·고도화까지 경험한 6년+ 프로덕트 매니저입니다.",
      "MAU 170만·누적 가입자 700만 규모의 글로벌 UGC 플랫폼, 150만 MAU 모바일 앱, 누적 회원 40만 교육 플랫폼 등 다양한 규모의 B2C 서비스를 경험했습니다. 컨셉과 로드맵 수립부터 상세 기획, 개발·디자인 협업, QA, 출시까지 제품 전 과정을 담당했으며, 출시 이후에는 사용자 행동 데이터와 피드백을 분석해 서비스 개선 과제로 연결해 왔습니다.",
      "특히 대규모 서비스의 지속적인 사용성 개선과 신규 서비스의 0→1 구축을 모두 경험했으며, 사업·개발·디자인·운영·법무 등 다양한 이해관계자의 요구사항을 하나의 제품 방향으로 구조화하고 실행하는 데 강점이 있습니다.",
    ],
    capabilities: [
      {
        label: "Large-scale B2C Product",
        description: "MAU 170만 글로벌 플랫폼, 150만 MAU 모바일 앱 등 대규모 사용자 서비스 기획·운영",
      },
      {
        label: "0→1 Product Launch",
        description: "서비스 컨셉·로드맵·정책·UX 정의부터 개발·QA·배포까지 End-to-End 리딩",
      },
      {
        label: "Data-driven Improvement",
        description: "사용자 행동·운영 데이터 기반 문제 정의, 개선 과제 도출 및 성과 검증",
      },
      {
        label: "Product Analytics",
        description: "GA/GTM · Firebase · Snowflake · Power BI 기반 서비스 지표 분석",
      },
      {
        label: "Cross-functional Leadership",
        description: "사업·개발·디자인·운영·법무·글로벌 조직 간 요구사항 조율 및 프로젝트 리딩",
      },
      {
        label: "AI-assisted Work",
        description: "생성형 AI를 활용한 리서치·기획·프로토타이핑 및 업무 프로세스 개선",
      },
    ],
  },
  sections: { ...defaultV2Sections },
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
          description:
            "MAU 170만, 누적 가입자 700만 규모의 글로벌 UGC 플랫폼에서 컨셉 단계부터 국내 소프트 런칭, 글로벌 확장, 운영 고도화까지 참여했습니다. 검색·프로필·즐겨찾기 등 사용자 탐색 경험부터 글로벌 운영·정책·백오피스까지 웹/플랫폼 영역을 폭넓게 기획했습니다.",
          groups: [
            {
              label: "Product & User Experience",
              bullets: [
                "사용자 데이터와 피드백을 분석해 검색·프로필·즐겨찾기 등 콘텐츠 탐색 과정의 문제를 정의하고 기능 개선",
                "리소스 검색 구조 및 UX 개선을 통해 검색 정확도 약 60%p 향상",
                "프로필 페이지를 단순 사용자 정보 영역에서 콘텐츠 탐색 접점으로 확장",
                "검색한 콘텐츠를 폴더 단위로 저장·관리할 수 있는 즐겨찾기 기능 신규 기획",
              ],
            },
            {
              label: "Launch & Global Expansion",
              bullets: [
                "프로젝트 초기부터 CBT·국내 소프트 런칭·글로벌 확장까지 제품 성장 단계에 참여",
                "글로벌 오픈을 위한 공식 웹사이트 영문화 및 번역 운영 체계 구축",
                "크리에이터 콘텐츠 번역 기능 및 국가별 콘텐츠 노출·운영 시스템 기획",
              ],
            },
            {
              label: "Policy & Operations",
              bullets: [
                "탈퇴 과정의 사용자·운영 문제를 분석하고 환불·정산·데이터 보존 기준을 반영한 서비스 Flow 재설계",
                "법무·사업·개발 조직과 협업해 거래 구조와 개인정보 정책을 서비스 기능으로 구체화",
                "점검·제재·콘텐츠 관리 등 운영 조직이 개발 의존 없이 서비스를 관리할 수 있는 백오피스 구축",
              ],
            },
            {
              label: "성과",
              variant: "impact",
              bullets: [
                "MAU 170만 / 누적 가입자 700만 규모 글로벌 플랫폼 성장에 기여",
                "검색 개선 후 검색 정확도 약 60%p 향상",
                "탈퇴 시스템 구축 후 관련 CS 0건",
              ],
            },
          ],
        },
        {
          name: "헬로메이플",
          role: "Web / Platform PO·PM · 웹/플랫폼 단독 PM",
          period: "2023.12 – 2026.02",
          description:
            "메이플 IP 기반 블록코딩 교육 서비스의 웹·플랫폼 영역을 단독 담당하며 0→1 구축 → 정식 런칭 → 글로벌 시범 런칭 → 전면 리뉴얼까지 제품 전 생애주기를 리딩했습니다.",
          groups: [
            {
              label: "0→1 Product & Roadmap",
              bullets: [
                "웹/플랫폼 전체 로드맵과 단계별 출시 계획 수립",
                "회원 시스템·공식 홈페이지·운영 백오피스·다국어 체계·GA/GTM 측정 환경을 0→1로 구축",
                "교사·학생 관계와 실제 학교 수업 환경을 반영해 사용자 유형별 가입·인증·이용 Flow 설계",
                "사업·개발·디자인·운영·법무 조직과 협업해 2024년 9월 정식 런칭 온타임 완수",
              ],
            },
            {
              label: "Global Expansion",
              bullets: [
                "영어·일본어 다국어 번역 프로세스 및 해외 회원가입 정책 구축",
                "국가·언어별 콘텐츠 노출과 운영 체계를 설계해 2025년 글로벌 시범 서비스 출시",
              ],
            },
            {
              label: "Data-driven Renewal",
              bullets: [
                "GA/GTM 사용자 행동 데이터를 기반으로 홈페이지의 역할을 ‘가입 획득 중심’에서 ‘콘텐츠 발견 허브’로 재정의",
                "콘텐츠 탐색 중심으로 IA와 메인 UX를 전면 재구성하고 2026년 2월 리뉴얼",
              ],
            },
            {
              label: "성과",
              variant: "impact",
              bullets: [
                "전국 초등학교 대상 서비스 확산 및 누적 회원 40만 명",
                "리뉴얼 후 참여시간 +196.6%",
                "인당 페이지뷰 +17.5%",
                "콘텐츠 상세 조회 약 8배 증가",
                "글로벌 시범 서비스 출시",
              ],
            },
          ],
        },
        {
          name: "NDC 공식 앱",
          role: "Mobile Product Manager · 단독 PM",
          period: "2024.12 – 2025.06",
          description:
            "기존 웹 중심 서비스의 현장 이용 한계를 해결하기 위해 넥슨 개발자 콘퍼런스 공식 모바일 앱을 제안하고, 컨셉 수립부터 상세 기획·마켓 배포·라이브 운영·데이터 분석까지 단독 리딩했습니다.",
          groups: [
            {
              label: "Product Strategy & Launch",
              bullets: [
                "제한된 개발 일정과 기존 웹 자산을 고려해 WebView + Native 하이브리드 구조를 제품 전략으로 결정",
                "IA·사용자 Flow·공통 UX 원칙·Android/iOS 권한 및 알림 정책 정의",
                "기획·디자인·개발·QA·마켓 심사·배포 전 과정 리딩",
                "행사 일정에 맞춰 온타임 출시 및 행사 기간 무장애 운영",
              ],
            },
            {
              label: "Operation & Data",
              bullets: [
                "Firebase Remote Config 기반으로 혼잡도·공지·이벤트 정보를 앱 업데이트 없이 실시간 제어할 수 있는 운영 구조 구축",
                "Snowflake 데이터와 Power BI 대시보드로 사용자 행동 및 주요 기능 이용 현황 분석",
                "핵심 기능 이용 데이터를 근거로 차년도 계정 시스템 도입 검토 및 개선 우선순위 수립",
              ],
            },
            {
              label: "성과",
              variant: "impact",
              bullets: [
                "행사 참가자 대비 앱 사용률 20%",
                "핵심 기능 ‘내 세션 관리’ 2.5천 페이지뷰",
                "출시 이후 실제 사용 데이터를 차년도 제품 의사결정 근거로 활용",
              ],
            },
          ],
        },
        {
          name: "넥슨플레이",
          role: "Mobile App Product Manager",
          period: "2022.12 – 2023.03",
          description:
            "150만 MAU, 2022년 구글 앱스토어 게임앱 1위 규모 모바일 서비스의 패치 매니징과 사용자 경험 개선을 담당했습니다.",
          groups: [
            {
              bullets: [
                "앱 리뷰·사용자 행동·운영 지표를 모니터링하고 UI/UX 개선 과제 발굴",
                "사업·광고·운영 조직의 요구사항을 수집해 제품 개선안과 개발 요구사항으로 구체화",
                "포인트박스 이용 과정의 사용자 혼선을 분석하고 개봉 Flow 재설계",
                "Apple·Facebook 등 Third-party 정책 변화 및 인증 정책 대응",
                "분기 내 주요 앱 패치 온타임 진행",
              ],
            },
            {
              label: "성과",
              variant: "impact",
              bullets: [
                "150만 MAU 규모 서비스 안정적 운영",
                "포인트박스 UX 개선 후 관련 CS 0건",
                "Apple·Facebook 검수 리젝 0건",
              ],
            },
          ],
        },
        {
          name: "넥슨 그룹사 임직원 앱",
          role: "Mobile Product Manager",
          period: "2021.09 – 2023.05",
          description:
            "그룹사 임직원 5천 명이 사용하는 모바일 서비스의 기능 기획·운영·데이터 관리를 담당했습니다.",
          groups: [
            {
              bullets: [
                "Firebase 기반 서비스 지표와 사용자 요구를 분석해 기능 개선 과제 도출",
                "식당 혼잡도·잔여 식수 정보를 한 화면에서 확인할 수 있도록 사용자 경험 개선",
                "알림함·부서 검색·휴가 신청 등 일상 사용 빈도가 높은 기능 지속 고도화",
                "사내 서비스 운영·CS·푸시·배너 및 앱 패치 관리",
              ],
            },
            {
              label: "성과",
              variant: "impact",
              bullets: [
                "임직원 5천 명 대상 서비스 월간 활성률 89% 유지",
                "식당 혼잡도 기능 도입 후 점심 피크 시간대 식당탭 조회 +22%",
                "담당 기간 주요 패치 무장애 운영",
              ],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "EARLIER EXPERIENCE",
      company: "카카오엔터프라이즈",
      role: "AI Service Planning Intern",
      period: "2020.02 – 2020.08",
      bullets: [
        "대화형 AI 서비스 카카오 i의 사용자 발화 데이터 분석 및 품질 관리",
        "도메인별 ML 학습용 질의 데이터 생성",
        "챗봇 스몰톡 시나리오 기획 및 배포",
        "Kibana·Excel 기반 사용자 발화 및 운영 데이터 분석",
      ],
    },
    {
      company: "SK텔레콤",
      role: "AI Service Planning",
      period: "2019.07 – 2020.01",
      bullets: [
        "대화형 AI 서비스 NUGU의 백과사전형 지식 서비스 구축·운영",
        "음악·영화·지리 등 도메인의 RDBMS 지식 데이터 구축",
        "사용자 질의 데이터 생성 및 CBT·QA·런칭·운영",
        "실제 사용자 질의와 답변 품질을 기반으로 서비스 지속 고도화",
      ],
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
    { category: "Product", items: ["JIRA", "Confluence", "Figma", "Axure"] },
    {
      category: "Data & Analytics",
      items: ["GA/GTM", "Snowflake", "Power BI", "Firebase", "Kibana", "Excel"],
    },
    { category: "AI & Productivity", items: ["Claude", "Cursor", "Vertex AI"] },
  ],
  languages: [
    "Japanese — Business Level · JLPT N1",
    "English — Business Level · TOEIC 930",
  ],
};
