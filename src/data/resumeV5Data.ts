// ─────────────────────────────────────────────────────────────
// 국문 이력서 v5 (핵심만 압축한 서구식 포맷 · 볼드 강조 유지)
// 본문 안의 **텍스트**는 화면/인쇄에서 굵게 표시됩니다.
// ─────────────────────────────────────────────────────────────
import type { WSections, WesternResumeData } from "./westernResume";

export const defaultV5Sections: WSections = {
  summary: "", // 제목 없이 이름 아래 바로 소개 문단
  capabilities: "CORE COMPETENCIES", // v5에는 역량 항목이 없어 화면에 노출되지 않음
  experience: "EXPERIENCE",
  education: "EDUCATION",
  tools: "SKILLS",
  languages: "LANGUAGE",
};

export const resumeV5Data: WesternResumeData = {
  profile: {
    name: "박서영",
    location: "",
    title: "Product Manager  |  B2C · Platform · 0→1 Launch · Data-driven Product",
    contacts: [
      { label: "soy.xplr@gmail.com", href: "mailto:soy.xplr@gmail.com" },
      { label: "+82 10-2498-9969" },
      {
        label: "PORTFOLIO | soy-xplr.vercel.app",
        href: "https://soy-xplr.vercel.app",
        highlight: true,
      },
    ],
    summary: [
      "웹·앱·플랫폼에서 신규 서비스의 0→1 구축부터 대규모 서비스의 운영·고도화까지 경험한 Product Manager입니다.",
      "**MAU 170만 글로벌 UGC 플랫폼, 150만 MAU 모바일 앱, 누적 회원 40만 교육 서비스**를 경험했으며, 사용자 데이터와 운영 문제를 UX·정책·제품 개선으로 연결해 왔습니다.",
    ],
    capabilities: [],
  },
  sections: { ...defaultV5Sections },
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
            "사용자가 직접 게임을 제작하고 다른 사용자의 콘텐츠를 이용·거래하는 글로벌 UGC 플랫폼입니다. 프로젝트 초기부터 **국내 런칭 → 사용성 고도화 → 글로벌 확장 → 운영 안정화**까지 웹/플랫폼 영역의 제품 성장 과정에 참여했습니다.",
          groups: [
            {
              label: "서비스 구축·사용자 경험",
              bullets: [
                "공식 웹서비스를 컨셉 단계부터 테스트·소프트 런칭까지 기획하고, 검색·프로필·즐겨찾기 등 주요 콘텐츠 탐색 경험 설계",
                "사용자 데이터와 피드백을 기반으로 제작 리소스 검색 구조와 UX를 개선 → **검색 정확도 약 60%p 향상**",
              ],
            },
            {
              label: "글로벌 확장",
              bullets: [
                "공식 웹 영문화, 크리에이터 콘텐츠 번역, 국가·언어별 콘텐츠 노출 체계를 구축하고 미국 조직과 LQA·글로벌 품질관리 프로세스 운영",
              ],
            },
            {
              label: "플랫폼 정책·운영",
              bullets: [
                "재화 거래가 있는 서비스의 탈퇴 시 구매자 환불권·환불 가능 기간·정산 주기·데이터 보존 기준과 처리 로직을 법무·사업·개발과 설계 → **출시 이후 탈퇴 관련 CS 0건**",
                "점검·제재·배너·콘텐츠 관리 등을 운영자가 직접 처리할 수 있도록 백오피스를 구축하고 운영 사용성 개선",
              ],
            },
          ],
        },
        {
          name: "헬로메이플",
          role: "Web / Platform Product Manager",
          period: "2023.12 – 2026.02",
          meta: "웹/플랫폼 단독 PM · 누적 회원 40만",
          description:
            "초등학교 수업에서 학생들이 블록코딩으로 게임을 만드는 교육 서비스입니다. 웹/플랫폼 단독 PM으로 **0→1 구축 → 정식 출시 → 글로벌 확장 → 데이터 기반 전면 리뉴얼**까지 전체 로드맵을 담당했습니다.",
          groups: [
            {
              label: "0→1 구축·런칭",
              bullets: [
                "회원·계정, 공식 홈페이지, 운영 백오피스, GA/GTM 측정 환경까지 웹/플랫폼 기반을 0→1로 구축",
                "학교 이용 환경을 반영한 교사-학생 계정 및 인증 구조를 설계하고 개발·디자인·사업·운영·법무 조직을 조율해 **2024년 9월 온타임 출시**",
              ],
            },
            {
              label: "서비스·글로벌 확장",
              bullets: [
                "반복 운영 업무를 백오피스로 시스템화하고 영어·일본어 번역, 해외 회원가입, 국가별 콘텐츠 운영 체계를 구축해 **2025년 글로벌 시범 서비스 출시**",
              ],
            },
            {
              label: "데이터 기반 제품 재정의",
              bullets: [
                "GA/GTM 데이터를 통해 기존 홈페이지가 가입·소개 중심에 머물러 콘텐츠 탐색으로 이어지지 않는 문제를 확인하고, 서비스 역할을 **‘가입 안내’에서 ‘콘텐츠 발견 허브’로 재정의**",
                "IA·메인 UX를 전면 개편한 결과 **참여시간 +196.6%, 인당 페이지뷰 +17.5%, 콘텐츠 상세 조회 약 8배 증가**",
              ],
            },
          ],
        },
        {
          name: "공통 플랫폼·AI Workflow",
          role: "Product Manager",
          period: "2026 – 현재",
          description:
            "여러 서비스가 공통으로 사용하는 백엔드 플랫폼을 운영·개선하며, 생성형 AI를 활용한 업무 프로세스까지 담당 범위를 확장했습니다.",
          bullets: [
            "알림·휴대폰/이메일 인증·게시/댓글 등 공통 플랫폼의 운영·유지보수 및 기능 개선",
            "저장·API·배포 이슈 발생 시 로그와 개발 구조를 확인해 원인을 정의하고 재배포·API 가이드·운영 시스템 개선까지 진행",
            "반복적인 다국어 업무를 개선하기 위해 번역 정책·Diff·LQA·히스토리 구조를 설계하고 **Claude·Cursor·Vertex AI 기반 번역 Workflow 구축**",
          ],
        },
        {
          name: "NDC 공식 앱",
          role: "Mobile Product Manager",
          period: "2024.12 – 2025.06",
          meta: "단독 PM · 신규 모바일 서비스 0→1",
          description:
            "넥슨 개발자 콘퍼런스 현장 참가자를 위한 공식 앱입니다. 기존 웹사이트의 현장 사용 한계를 해결하기 위해 모바일 앱을 신규 제안하고 컨셉부터 출시·운영·데이터 분석까지 단독 담당했습니다.",
          bullets: [
            "기획·디자인·개발·QA·마켓 출시 전 과정을 리딩하고, 제한된 개발 일정에서 기존 웹 자산을 활용하기 위해 **WebView + Native 하이브리드 구조** 선택",
            "관심 세션 관리·푸시·행사장 혼잡도 등 현장 핵심 기능과 IA·사용자 Flow를 설계하고, Firebase Remote Config 기반 실시간 운영 구조 구축",
            "행사 일정에 맞춰 **온타임 출시 및 행사 기간 무장애 운영**",
            "Snowflake·Power BI 분석 결과 **참가자 대비 앱 사용률 20%, ‘내 세션 관리’ 2.5천 페이지뷰**를 확인하고 차년도 계정·개인화 기능을 후속 과제로 검토",
          ],
        },
        {
          name: "넥슨플레이",
          role: "Mobile Product Manager",
          period: "2022.12 – 2023.03",
          meta: "150만 MAU 모바일 앱",
          description:
            "넥슨 게임 이용자의 계정·보안·포인트·게임 정보를 제공하는 대규모 모바일 서비스를 운영·개선했습니다.",
          bullets: [
            "150만 MAU 규모 앱의 기능 개선·패치 매니징 및 사용자 행동·앱 리뷰·운영 지표 기반 UX 개선",
            "포인트박스 이용 과정에서 반복되던 사용자 혼선을 Flow와 정보 전달 UX 개선으로 해결 → **관련 CS 0건**",
            "Apple·Facebook 등 외부 플랫폼 정책 변화에 대응하고 마켓 심사·배포를 관리 → **담당 기간 검수 리젝 0건 및 주요 패치 무장애 운영**",
          ],
        },
        {
          name: "넥슨 그룹사 임직원 앱",
          role: "Mobile Product Manager",
          period: "2021.09 – 2023.05",
          meta: "임직원 5천 명 · 월간 활성률 89%",
          description:
            "근로시간·휴가·식당·사내 알림 등 임직원의 회사생활을 지원하는 모바일 서비스의 기능 기획·운영을 담당했습니다.",
          bullets: [
            "부서 검색·알림·휴가 신청 등 주요 기능을 기획하고 Firebase 이용지표와 CS를 기반으로 서비스 지속 개선",
            "식당 혼잡도를 사전에 확인하기 어렵다는 사용자 요구를 바탕으로 혼잡도·잔여 식수 기능을 기획 → **피크 시간대 식당탭 조회 +22%**",
            "임직원 5천 명 규모에서 **월간 활성률 89% 유지**, 주요 패치 무장애 운영",
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
        "대화형 AI 서비스 **카카오 i**의 사용자 발화 데이터를 분석하고 서비스 품질을 개선했습니다.",
      bullets: [
        "Kibana·Excel 기반 사용자 발화 검수 및 질문·오류 패턴 분석",
        "도메인별 ML 학습용 질의 데이터 생성 및 챗봇 스몰톡 시나리오 기획·배포",
      ],
    },
    {
      company: "SK텔레콤",
      role: "AI Service Planning",
      period: "2019.07 – 2020.01",
      summary: "대화형 AI 서비스 **NUGU**의 백과사전형 지식 서비스를 구축·운영했습니다.",
      bullets: [
        "음악·영화·지리 등 RDBMS 기반 지식 데이터 및 AI 학습용 질의 데이터 구축",
        "CBT·QA·런칭·운영에 참여하고 실제 사용자 질의를 기반으로 답변 품질 고도화",
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
  languages: ["일본어 비즈니스 레벨 · JLPT N1", "영어 비즈니스 레벨 · TOEIC 930"],
};
