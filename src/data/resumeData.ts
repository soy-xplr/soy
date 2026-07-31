// ─────────────────────────────────────────────────────────────
// 이력서 콘텐츠 데이터
// 이 객체의 텍스트만 수정하면 이력서 전체가 바뀝니다.
// (컴포넌트/스타일은 건드릴 필요가 없습니다.)
// ─────────────────────────────────────────────────────────────

export type ContactType = "phone" | "email" | "blog" | "github";

export type Contact = {
  type: ContactType;
  label: string;
  href?: string;
};

// 불릿은 문자열이거나, 하위 불릿을 가진 노드일 수 있습니다.
export type BulletNode = string | { text: string; children?: BulletNode[] };

export type ProjectItemData = {
  title: string;
  badge?: string;
  summary: string;
  period: string;
  icon?: string; // 아이콘 영역에 표시할 짧은 텍스트(예: "AI")
  iconColors?: [string, string]; // 아이콘 배경 그라디언트 색
  iconImage?: string; // 아이콘 자리에 넣을 업로드 이미지(data URL). 있으면 이미지 우선
  highlights?: string[]; // 핵심 성과 (연한 회색 박스)
  bullets?: BulletNode[]; // 상세 업무
};

export type ExperienceData = {
  company: string;
  role: string;
  period: string;
  summary?: string;
  bullets?: BulletNode[];
};

export type EducationData = {
  school: string;
  degree: string;
  period: string;
  note?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ResumeData = {
  profile: {
    name: string;
    tagline?: string;
    contacts: Contact[];
    introduction: string[];
  };
  projects: ProjectItemData[];
  experiences: ExperienceData[];
  education: EducationData[];
  skills: SkillGroup[];
};

export const resumeData: ResumeData = {
  profile: {
    name: "정다빈",
    contacts: [
      { type: "phone", label: "010 - 9296 - 9602" },
      { type: "blog", label: "davin.log", href: "https://davin.log" },
      { type: "email", label: "davinnn.dev@gmail.com", href: "mailto:davinnn.dev@gmail.com" },
      { type: "github", label: "davindev", href: "https://github.com/davindev" },
    ],
    introduction: [
      "시각디자인을 전공하고 프론트엔드 엔지니어로 6년간 근무하며, 사용자 관점의 요구사항을 정의하고 이를 제품 화면으로 구현하는 역량을 키웠습니다. 최근 실무에서 LLM 기반 제품 개발에 참여하며 AI 기술을 서비스화하는 과정을 경험했습니다. 이 과정에서 AI 제품의 유지 경험과 가치는 화면 구현뿐만 아니라, 백엔드의 데이터 파이프라인 설계가 연계되어야 완성된다는 점을 체감했습니다. 이러한 경험을 바탕으로, 사용자 관점에서 AI 기능을 직접 설계하고 이를 실제 서비스 가치로 연결하는 엔지니어로 성장하고자 합니다.",
    ],
  },

  projects: [
    {
      title: "AI 키노쌤",
      badge: "회사 프로젝트",
      summary: "LLM 기반 알림장·공지사항을 자동 생성하는 대화형 서비스",
      period: "2025.11 - 2026.05",
      icon: "AI",
      iconColors: ["#5b8def", "#a879f0"],
      highlights: [
        "10개 어린이집 대상 약 2주간의 베타 운영 기간 내 누적 382건의 초안 생성",
        "초안 수신자의 63%가 실제 발송에 이르는 채택률 검증",
      ],
      bullets: [
        {
          text: "멀티스텝 LLM의 스트리밍 응답 시각화를 위한 클라이언트 상태 머신 설계",
          children: [
            "의도 분류 및 단계별 초안 생성이 순차적으로 일어나는 백엔드 플래너 환경에 맞춰, 전체 생성 사이클을 단계별(대기 → 로딩 → 스트리밍 → 완료/오류/중단) 상태 머신으로 모델링하여 구조화",
            "누적 스트리밍 텍스트와 각 단계별 진행 상태 메타데이터를 분리 관리하고, requestAnimationFrame을 통해 토큰 단위 렌더링을 프레임에 병합하여 끊김 없는 타이핑 UI 구현",
          ],
        },
        {
          text: "SSE(Server-Sent Events) 기반 응답 스트림의 재연결·중단 처리",
          children: [
            "네트워크 단절 시 마지막 수신 지점부터 이어받는 재연결 로직과, 사용자가 생성을 취소하면 AbortController로 스트림을 즉시 종료하는 흐름을 구현",
          ],
        },
        "프롬프트 입력 · 초안 검토 · 발송 확정으로 이어지는 3단계 워크플로우를 하나의 대화형 화면으로 통합해 담당 교사의 평균 작성 시간을 단축",
      ],
    },
    {
      title: "원내 커뮤니케이션 대시보드",
      badge: "회사 프로젝트",
      summary: "어린이집–학부모 간 알림장/공지 발송 현황을 집계하는 운영 대시보드",
      period: "2025.03 - 2025.10",
      icon: "DB",
      iconColors: ["#20a4a4", "#3ec6a0"],
      highlights: [
        "원장·교사용 리포트 화면을 도입해 주간 발송 현황 확인 소요 시간을 대폭 단축",
      ],
      bullets: [
        {
          text: "대량 데이터 테이블의 렌더링 성능 최적화",
          children: [
            "수천 건의 발송 로그를 다루는 테이블에 가상 스크롤(virtualization)을 적용해 초기 렌더링 시간과 메모리 사용량을 절감",
            "필터·정렬·검색 상태를 URL 쿼리와 동기화하여 새로고침·공유 시에도 동일한 뷰가 유지되도록 설계",
          ],
        },
        "디자인 시스템 토큰(색상·타이포·간격)을 CSS 변수로 정리하여 다크 모드와 인쇄용 리포트 뷰를 동일 컴포넌트로 대응",
      ],
    },
    {
      title: "디자인 시스템 · 컴포넌트 라이브러리",
      badge: "사내 공통",
      summary: "여러 제품에서 공유하는 React 컴포넌트 라이브러리 구축 및 문서화",
      period: "2024.05 - 2025.02",
      icon: "UI",
      iconColors: ["#f0913e", "#f0c93e"],
      highlights: [
        "공통 컴포넌트 40여 종을 표준화하여 신규 화면 개발 리드타임을 단축",
      ],
      bullets: [
        "접근성(WAI-ARIA) 가이드에 맞춰 키보드 내비게이션·포커스 트랩을 기본 제공하는 폼/모달 컴포넌트 구현",
        "Storybook 기반 문서와 시각 회귀 테스트를 연동해 컴포넌트 변경 시 UI 회귀를 자동 감지",
      ],
    },
  ],

  experiences: [
    {
      company: "휴먼스케이프",
      role: "프론트엔드 엔지니어",
      period: "2022.01 - 재직 중",
      summary: "교육 도메인 SaaS 제품의 웹 프론트엔드 설계·개발·운영을 담당",
      bullets: [
        "React · TypeScript 기반 SPA의 아키텍처 설계 및 상태 관리 전략 수립",
        "LLM 기반 신규 기능의 프론트엔드 리드로 참여하여 기획–디자인–백엔드 간 스펙을 조율",
      ],
    },
    {
      company: "브랜디",
      role: "프론트엔드 개발자",
      period: "2020.03 - 2021.12",
      summary: "커머스 웹/모바일 화면 개발 및 UI 성능 개선",
      bullets: [
        "상품 상세·장바구니·결제 플로우의 프론트엔드 개발 및 Core Web Vitals 개선",
        "레거시 jQuery 화면을 React 컴포넌트로 점진적으로 마이그레이션",
      ],
    },
  ],

  education: [
    {
      school: "홍익대학교",
      degree: "시각디자인 학사",
      period: "2013.03 - 2019.02",
      note: "UX/UI 및 인터랙션 디자인 전공",
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: ["TypeScript", "React", "Next.js", "Zustand", "React Query", "Vite"],
    },
    {
      category: "Styling",
      items: ["CSS Modules", "Tailwind CSS", "Emotion", "디자인 시스템"],
    },
    {
      category: "AI / Data",
      items: ["LLM 연동", "SSE 스트리밍", "프롬프트 설계", "데이터 시각화"],
    },
    {
      category: "Tooling",
      items: ["Git", "Storybook", "Vitest", "Playwright", "Figma"],
    },
  ],
};
