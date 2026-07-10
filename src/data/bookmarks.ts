export type Bookmark = {
  id: string;
  slug: string;
  title: string;
  url: string;
  description: string;
  note: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  savedAt: string;
  featured?: boolean;
};

export const bookmarks: Bookmark[] = [
  // ── 웹/플랫폼 (대표 사례 포함) ─────────────────────────────────
  {
    id: "hellomaple-platform",
    slug: "hellomaple-platform",
    title: "헬로메이플 웹·플랫폼 0→1 구축 및 리뉴얼",
    url: "https://www.hellomaple.org",
    description: "누적 회원 40만 명 교육 플랫폼의 회원·정책·공식홈·백오피스를 단독 PM으로 구축",
    note: "2024년 정식 런칭부터 2026년 콘텐츠 탐색형 홈 개편까지 웹·플랫폼 전 생애주기를 리딩했습니다.",
    category: "웹/플랫폼",
    tags: ["0→1", "플랫폼PM", "교육서비스"],
    thumbnail: "/images/bookmarks/hellomaple-platform.jpg",
    savedAt: "2023–2026",
    featured: true,
  },
  {
    id: "maplestory-worlds-platform",
    slug: "maplestory-worlds-platform",
    title: "메이플스토리 월드 웹/플랫폼",
    url: "https://maplestoryworlds.nexon.com",
    description: "UGC 플랫폼의 포털웹 기능, 탈퇴 정책, 글로벌 대응, 운영툴 기획에 참여.",
    note: "검색/리소스/프로필 기능부터 법무 협업이 필요한 탈퇴 정책과 백오피스까지 구조화했습니다.",
    category: "웹/플랫폼",
    tags: ["플랫폼", "정책설계", "글로벌"],
    thumbnail: "/images/bookmarks/maplestory-worlds-platform.jpg",
    savedAt: "2022-2023",
    featured: true,
  },

  // ── 모바일 앱 ─────────────────────────────────────────────────
  {
    id: "ndc-app",
    slug: "ndc-app",
    title: "NDC 공식 앱 기획 및 런칭",
    url: "https://play.google.com/store/apps/details?id=com.nexon.ndc&hl=ko",
    description: "넥슨 개발자 컨퍼런스의 행사 정보를 제공하는 공식 지원 앱.",
    note: "하이브리드 앱 UX 기준, IA, 권한 정책, 데이터 대시보드까지 출시 전 과정을 주도했습니다.",
    category: "모바일 앱",
    tags: ["모바일앱", "런칭", "데이터"],
    thumbnail: "/images/bookmarks/ndc-app.jpg",
    savedAt: "2024-",
    featured: false,
  },
  {
    id: "nexon-employee-app",
    slug: "nexon-employee-app",
    title: "넥슨그룹사 임직원 앱",
    url: "https://example.com/nexon-employee-app",
    description: "근로시간, 휴가, 식당, 셔틀 등 사내 생활 기능을 제공하는 임직원 앱.",
    note: "기능 기획, 패치 매니징, Firebase 지표 관리, 사내 푸시/운영 지원을 담당했습니다.",
    category: "모바일 앱",
    tags: ["사내서비스", "운영", "Firebase"],
    thumbnail: "/images/bookmarks/nexon-employee-app.jpg",
    savedAt: "2021-2023",
    featured: false,
  },
  {
    id: "nexon-play",
    slug: "nexon-play",
    title: "넥슨플레이 앱 운영/개선",
    url: "https://example.com/nexon-play",
    description: "150만 MAU 규모의 넥슨 게임 유저 대상 모바일 앱 운영 및 개선.",
    note: "패치 매니징, 서드파티 인증 정책 대응, 사용자 행동 데이터 기반 UI/UX 개선을 진행했습니다.",
    category: "모바일 앱",
    tags: ["모바일앱", "운영개선", "정책대응"],
    thumbnail: "/images/bookmarks/nexon-play.jpg",
    savedAt: "2021-2023",
    featured: false,
  },

  // ── 바이브 코딩 (3개) ──────────────────────────────────────────
  {
    id: "portfolio-vibe-coding",
    slug: "portfolio-vibe-coding",
    title: "바이브코딩 포트폴리오",
    url: "https://github.com/soy-xplr/soy",
    description: "AI와 함께 기획부터 구현까지 빠르게 실험하며 만든 개인 포트폴리오 웹사이트.",
    note: "서비스 기획자의 포트폴리오를 직접 구현해보며 콘텐츠 구조, 편집 기능, 배포 흐름을 실험했습니다.",
    category: "바이브 코딩",
    tags: ["React", "AI협업", "Portfolio"],
    thumbnail: "/images/bookmarks/portfolio-vibe-coding.jpg",
    savedAt: "2026",
    featured: false,
  },
  {
    id: "vibe-coding-2",
    slug: "vibe-coding-2",
    title: "프로젝트 제목을 입력해주세요",
    url: "",
    description: "어떤 프로젝트인지 한 줄로 설명해주세요.",
    note: "어떤 걸 만들었는지, 어떤 걸 실험했는지 짧게 적어주세요.",
    category: "바이브 코딩",
    tags: [],
    thumbnail: "",
    savedAt: "2026",
    featured: false,
  },
  {
    id: "vibe-coding-3",
    slug: "vibe-coding-3",
    title: "프로젝트 제목을 입력해주세요",
    url: "",
    description: "어떤 프로젝트인지 한 줄로 설명해주세요.",
    note: "어떤 걸 만들었는지, 어떤 걸 실험했는지 짧게 적어주세요.",
    category: "바이브 코딩",
    tags: [],
    thumbnail: "",
    savedAt: "2026",
    featured: false,
  },

  // ── 사이드 프로젝트 (3개) ─────────────────────────────────────
  {
    id: "side-project-1",
    slug: "side-project-1",
    title: "프로젝트 제목을 입력해주세요",
    url: "",
    description: "어떤 프로젝트인지 한 줄로 설명해주세요.",
    note: "어떤 걸 만들었는지, 어떤 걸 배웠는지 짧게 적어주세요.",
    category: "사이드 프로젝트",
    tags: [],
    thumbnail: "",
    savedAt: "",
    featured: false,
  },
  {
    id: "side-project-2",
    slug: "side-project-2",
    title: "프로젝트 제목을 입력해주세요",
    url: "",
    description: "어떤 프로젝트인지 한 줄로 설명해주세요.",
    note: "어떤 걸 만들었는지, 어떤 걸 배웠는지 짧게 적어주세요.",
    category: "사이드 프로젝트",
    tags: [],
    thumbnail: "",
    savedAt: "",
    featured: false,
  },
  {
    id: "side-project-3",
    slug: "side-project-3",
    title: "프로젝트 제목을 입력해주세요",
    url: "",
    description: "어떤 프로젝트인지 한 줄로 설명해주세요.",
    note: "어떤 걸 만들었는지, 어떤 걸 배웠는지 짧게 적어주세요.",
    category: "사이드 프로젝트",
    tags: [],
    thumbnail: "",
    savedAt: "",
    featured: false,
  },
];

export const categories = ["전체", ...new Set(bookmarks.map((bookmark) => bookmark.category))];
