export type DetailSection = {
  title: string;
  body: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
};

export type SubProjectTextBlock = {
  type: "text";
  text: string;
};

export type SubProjectImageBlock = {
  type: "image";
  url: string;
  alt?: string;
  caption?: string;
};

export type SubProjectContentBlock = SubProjectTextBlock | SubProjectImageBlock;

export type SubProject = {
  slug?: string;
  title: string;
  summary: string;
  tags: string[];
  period: string;
  body: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  /**
   * 본문을 텍스트/이미지 블록 단위로 자유롭게 구성하기 위한 필드.
   * 비어있거나 없으면 기존 body + imageUrl 조합을 자동으로 마이그레이션해서 보여줍니다.
   */
  contentBlocks?: SubProjectContentBlock[];
};

export type BookmarkDetailContent = {
  intro: string;
  imageLabel: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  sections: DetailSection[];
  subProjects?: SubProject[];
};

export const defaultBookmarkDetails: Record<string, BookmarkDetailContent> = {
  "hellomaple-platform": {
    intro:
      "누적 40만 회원을 보유한 블록코딩 교육 서비스이자, 웹/플랫폼 영역을 단독 담당한 대표 프로젝트입니다.",
    imageLabel: "헬로메이플 웹/플랫폼 대표 이미지",
    coverImageUrl: "/images/projects/hellomaple/cover.png",
    coverImageAlt: "헬로메이플 웹/플랫폼 대표 이미지",
    sections: [
      {
        title: "프로젝트 개요",
        body: "헬로메이플은 전국 초등학교 수업에서 사용되는 블록코딩 교육 서비스입니다.\n웹/플랫폼 영역의 PO/PM으로 공식 홈페이지, 백오피스, 회원 시스템, 운영툴, 글로벌 대응까지 전체 기획과 매니징을 맡았습니다.",
        imageUrl: "",
        imageAlt: "",
      },
      {
        title: "핵심 기여",
        body: "24년 9월 정식 런칭 목표에 맞춰 웹/플랫폼 전체 스펙을 정의하고 개발 일정을 조율했습니다.\n교사와 학생의 관계를 반영한 계정 정책, 3중 로그인 세션 연동, 공식 홈페이지 리뉴얼, 백오피스와 운영툴 구축을 리딩했습니다.\n이후 1여년 간 라이브 서비스를 담당하며 이벤트 및 운영관리를 이끌었고, 사업 성장에 따른 웹 리뉴얼 프로젝트를 맡아 26년 2월 신규 공식홈페이지, 브랜딩 사이트를 오픈했습니다.\n",
        imageUrl: "/images/projects/hellomaple/section-2.png",
        imageAlt: "헬로메이플 핵심 기여 이미지",
      },
      {
        title: "성과",
        body: "전국 초등학교 대상 서비스 확산과 누적 회원 40만 달성에 기여했습니다.\n플랫폼 PM으로서 디렉터 회의에서 직접 주기적으로 플랫폼 영역의 비전을 공유하고, 전체 로드맵을 직접 수립하며 구현까지 이어갔습니다.",
        imageUrl: "/images/projects/hellomaple/section-3.png",
        imageAlt: "헬로메이플 성과 이미지",
      },
    ],
    subProjects: [
      {
        slug: "account-policy",
        title: "회원 시스템 및 계정 정책",
        summary: "교사와 학생 관계를 반영한 교육 플랫폼 계정 구조 설계",
        tags: ["계정정책", "인증Flow", "법무협업"],
        period: "2024",
        body: "헬로메이플은 초등학교 수업에서 사용할 목적으로 만든 서비스였습니다. 그런데 초기 CBT 단계에서 학교 인터넷이 헬로메이플을 '유해 사이트'로 분류해 차단하는 문제가 생겼고, 이 일을 계기로 자체 도메인의 공식 홈페이지와 학교 환경에 맞는 자체 계정 시스템이 필요하다는 점이 분명해졌습니다.",
        thumbnailUrl: "/images/projects/hellomaple/account-policy-thumb.png",
        thumbnailAlt: "헬로메이플 회원가입 UI",
        imageUrl: "/images/projects/hellomaple/account-policy.png",
        imageAlt: "헬로메이플 계정 정책 화면",
        imageCaption: "",
        contentBlocks: [
          {
            type: "text",
            text: "헬로메이플은 초등학교 수업에서 사용할 목적으로 만든 서비스였습니다. 그런데 초기 CBT(비공개 시범 운영) 단계에서 학교 인터넷이 헬로메이플을 '유해 사이트'로 분류해서 차단해버리는 문제가 생겼습니다. 학교에서 쓰라고 만든 교육 서비스가 정작 학교에서 막히는 상황이었습니다. 이 일을 계기로 넥슨과 분리된 자체 도메인의 공식 홈페이지와, 학교 환경에 맞는 자체 계정 시스템이 필요하다는 점이 분명해졌습니다.",
          },
          {
            type: "image",
            url: "/images/projects/hellomaple/account-policy/slide-01-background.png",
            alt: "초기 CBT에서 발견한 학교 환경 차단 문제",
            caption: "초기 CBT에서 발견한 학교 환경 차단 문제",
          },
          {
            type: "text",
            text: "문제를 두 갈래로 나누어 정의했습니다. 첫째, 교육 서비스에 맞는 회원 구조를 새로 설계해야 했습니다. 학생, 교사, 일반 사용자가 쓰는 기능과 모아야 할 정보가 모두 달랐기 때문입니다. 둘째, 학생 계정을 어떻게 만들고 관리할지 정해야 했습니다. 수업이 매끄럽게 진행되도록 교사가 계정을 미리 발급해주되, 학생이 직접 약관에 동의하도록 만들어 계정을 사용하는 주체가 누구인지 법적으로 명확하게 하고자 했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/hellomaple/account-policy/slide-02-problems.png",
            alt: "핵심 과제 두 가지 정의",
            caption: "회원 구조 설계와 학생 계정 관리, 두 가지를 핵심 과제로 잡았습니다",
          },
          {
            type: "text",
            text: "먼저 회원을 일반, 선생님, 학생 세 가지 타입으로 나누었습니다. 각 타입마다 할 수 있는 일이 다르고 모아야 할 개인정보도 다르게 정의했습니다. 권한이 큰 선생님 계정은 14세 이상의 휴대폰 본인인증을 받도록 했고, 학생 계정은 최소한의 정보만 받도록 가볍게 만들었습니다. 일반 계정은 14세 미만일 경우 부모님 동의를 받도록 했습니다. 이 모든 결정은 법무, 개인정보, 보안 부서와 미리 협의해서 정한 기준입니다.",
          },
          {
            type: "image",
            url: "/images/projects/hellomaple/account-policy/slide-04-member-types.png",
            alt: "회원 타입별 비교표",
            caption: "선생님, 학생, 일반 — 세 가지 회원 타입의 비교표",
          },
          {
            type: "text",
            text: "학생이 일반적인 회원가입 절차를 거치게 하면 수업 흐름이 끊기고, 어린 학생들에게는 부담스러운 과정이 될 수 있었습니다. 그래서 선생님이 수업 전에 백오피스에서 학급을 만들고 학생 계정을 한꺼번에 발급한 뒤, ID와 임시 비밀번호를 학생들에게 나눠주는 흐름으로 설계했습니다. 학생은 수업 당일 임시 정보로 로그인한 다음, 직접 약관에 동의하고 비밀번호를 새로 설정한 후 서비스를 사용할 수 있습니다. 비밀번호 설정과 약관 동의는 반드시 학생 본인이 하도록 만들어, 그 계정을 사용하는 주체가 누구인지 법적으로 명확하게 하고자 했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/hellomaple/account-policy/slide-05-student-flow.png",
            alt: "학생 계정 발급 7단계 플로우",
            caption: "교사 사전 준비(1~3단계)와 학생 당일 진행(4~7단계)을 분리한 7단계 플로우",
          },
          {
            type: "text",
            text: "기능을 만들기 전에 법무, 개인정보, 보안 부서와 여러 차례 함께 회의했습니다. 약관을 어느 시점에 보여줄지, 계정 타입별로 어떤 정보까지 모아도 되는지, 연령에 따라 어떤 인증 방식을 쓸지, 보안 규칙은 어디까지 적용할지 — 이 모든 기준을 사전에 합의했습니다. 또한 운영 담당자가 학생 계정을 조회할 수 있도록 별도의 백오피스도 따로 만들었습니다. 이렇게 정책 단계에서 충분히 다듬어두면 나중에 발생할 법적 리스크를 미리 막을 수 있습니다.",
          },
          {
            type: "image",
            url: "/images/projects/hellomaple/account-policy/slide-06-legal-review.png",
            alt: "법무·정책 검토 4개 영역",
            caption: "약관, 수집정보, 연령별 인증, 보안 운영 — 네 가지 축으로 정책을 정리했습니다",
          },
          {
            type: "text",
            text: "법적으로 꼭 필요한 절차들이 사용자 경험을 해치지 않도록 화면을 세심하게 설계했습니다. 선생님 회원가입에서는 PASS 기반의 휴대폰 인증으로 14세 이상 여부를 빠르게 확인할 수 있게 했고, 학생은 첫 로그인 시 약관 동의와 비밀번호 변경만 거치면 바로 수업에 들어갈 수 있도록 했습니다. 아이디와 비밀번호 찾기 화면도 계정 타입에 따라 다른 옵션을 제공해 사용자가 헷갈리지 않게 했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/hellomaple/account-policy/slide-07-uiux.png",
            alt: "컴플라이언스를 반영한 UI 화면",
            caption: "회원가입, 첫 로그인, ID 찾기 — 세 가지 핵심 화면",
          },
          {
            type: "text",
            text: "이 회원 정책 설계 덕분에 학교 환경에서도 차단 없이 안정적으로 서비스가 운영되었습니다. 학생들은 수업 당일 회원가입 절차 없이 바로 서비스에 접속해 수업이 빠르게 진행됐고, 개인정보와 보안 요구사항을 모두 충족해 운영 중 법적 이슈가 발생하지 않았습니다. 결과적으로 전국 초등학교를 대상으로 서비스 운영을 시작해 26년 초 기준 누적 회원 40만 명을 달성했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/hellomaple/account-policy/slide-08-results.png",
            alt: "서비스 적용 결과 및 성과",
            caption: "안정적 운영, 교육 환경 최적화, 법적 리스크 최소화 — 세 가지 성과",
          },
        ],
      },
      {
        slug: "official-site-renewal",
        title: "공식 홈페이지 리뉴얼",
        summary: "월드 콘텐츠 중심으로 서비스 소개와 탐색 흐름을 재구성",
        tags: ["공식홈", "리뉴얼", "PM"],
        period: "2026.02",
        body: "정식 서비스 이후 변화한 콘텐츠와 사용 맥락에 맞춰 공식 홈페이지 구조를 개편했습니다.\n월드 콘텐츠 중심의 정보 구조를 잡고, 일정 내 오픈을 목표로 디자인·개발·QA 흐름을 관리했습니다.",
        thumbnailUrl: "",
        thumbnailAlt: "",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },
    ],
  },
  "ndc-app": {
    intro: "넥슨 개발자 컨퍼런스 NDC의 공식 지원 앱을 기획하고 런칭한 모바일 앱 프로젝트입니다.",
    imageLabel: "NDC 공식 앱 대표 이미지",
    sections: [
      {
        title: "프로젝트 개요",
        body: "오프라인 행사 환경에서 참가자가 세션, 공지, 행사 정보를 쉽고 빠르게 확인할 수 있도록 설계한 공식 앱입니다.\n기획, 디자인, 개발, QA, 배포까지 전 과정을 주도했습니다.",
      },
      {
        title: "핵심 기여",
        body: "하이브리드 앱 UX 동작 기준, 제스처별 동작 방식, 메시지 노출 원칙, 페이지 간 부모·자식 관계를 문서화했습니다.\nSnowflake와 Power BI 기반 대시보드를 구축해 차기 버전 고도화 우선순위도 도출했습니다.",
      },
      {
        title: "성과",
        body: "오프라인 행사 환경에서 액티브 유저 1,100명을 확보했습니다.\n앱의 현장 사용 맥락을 기준으로 정보 접근성과 운영 효율을 함께 고려했습니다.",
      },
    ],
  },
  "maplestory-worlds-platform": {
    intro: "UGC 플랫폼 메이플스토리 월드의 웹/플랫폼 기능과 정책, 운영 시스템을 기획한 프로젝트입니다.",
    imageLabel: "메이플스토리 월드 웹/플랫폼 대표 이미지",
    sections: [
      {
        title: "프로젝트 개요",
        body: "유저 간 재화 거래가 가능한 UGC 플랫폼의 웹/플랫폼 영역 기획에 참여했습니다.\n포털웹 신규 기능, 서비스 탈퇴 정책, 글로벌 대응, 백오피스 기능을 폭넓게 다뤘습니다.",
      },
      {
        title: "핵심 기여",
        body: "홈/프로필 배경 꾸미기, 리소스 검색 개선, 즐겨찾기 폴더, 친구 초대 이벤트, 월드 점검 기능을 기획했습니다.\n탈퇴 기능 부재로 인한 CS 구조를 시스템으로 전환하고, 환불 권리와 데이터 보존 기준을 법무와 함께 설계했습니다.",
      },
      {
        title: "성과",
        body: "탈퇴 관련 CS 문의 0건을 달성했습니다.\n운영 이슈를 단기 대응이 아니라 정책과 시스템 구조로 해결한 사례입니다.",
      },
    ],
    subProjects: [
      {
        slug: "search-improvement",
        title: "검색 기능 개선",
        summary: "리소스·월드·유저를 더 빠르게 찾을 수 있도록 검색 경험을 다듬은 작업",
        tags: ["검색UX", "정보구조", "사용성"],
        period: "2023",
        body: "메이플스토리 월드에서 크리에이터들이 게임을 만들 때 가장 많이 쓰는 기능 중 하나가 리소스 검색입니다. CBT 이후 데이터를 분석하고 개선 방향을 제안해 검색 품질과 탐색 경험을 함께 끌어올렸습니다.",
        thumbnailUrl: "",
        thumbnailAlt: "",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
        contentBlocks: [
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/search/search-ui-screenshot.png",
            alt: "MSW 리소스 검색 화면",
            caption: "카테고리 필터와 썸네일 그리드로 구성된 MSW 리소스 검색 화면",
          },
          {
            type: "text",
            text: "CBT가 끝난 후 사용자 설문을 분석했을 때, 리소스 검색 기능이 불편하다는 응답이 눈에 띄게 많았습니다. 이미지, 텍스트, 사운드 등 다양한 리소스를 검색해서 게임을 제작하는 크리에이터들에게 검색은 필수 도구인데, 그 경험이 반복적인 불편함을 낳고 있었습니다. 단순한 데이터 오류가 아니라 구조적인 문제라는 판단에서 개선을 시작했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/search/slide-01-background.png",
            alt: "배경 및 문제 — 검색 기능 불편 응답 다수",
            caption: "CBT 종료 후 사용자 설문에서 리소스 검색 불편이 반복적인 문제로 확인됐습니다",
          },
          {
            type: "text",
            text: "CBT 기간 동안 쌓인 검색 데이터를 직접 뽑아서 분석했습니다. 상위 검색어로 재검색했을 때 같은 이미지가 여러 개 중복으로 노출되거나, '슬라임'을 검색했는데 '나무상자'가 결과에 뜨는 식의 태그 오염이 곳곳에 있었습니다. 기간 내 검색량이 28만 회에 달할 만큼 수요는 충분했기 때문에, 데이터 정제와 UX 개선이라는 두 방향으로 과제를 정의하고 상위에 개선 방향을 제안했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/search/slide-02-problems.png",
            alt: "핵심 과제 정의 — 데이터 정제와 UX 개선",
            caption: "검색 데이터 정제 필요성과 탐색 경험 개선, 두 가지를 핵심 과제로 잡았습니다",
          },
          {
            type: "text",
            text: "검색 품질을 높이기 위해 세 가지를 정비했습니다. 먼저 리소스와 관련 없거나 오탐을 유발하는 노이즈 태그를 식별해 일괄 삭제했습니다. 'worldmap', 'object' 같은 무의미한 범용 키워드들이 검색 결과를 오염시키고 있었습니다. 다음으로 동일한 리소스임에도 여러 이름으로 등록된 중복 썸네일을 이미지 해시 비교로 자동 필터링해서 대표 이미지 하나만 남겼습니다. 마지막으로 단순 텍스트 매칭이 아니라 유저의 검색 의도에 맞는 결과가 상단에 오도록 정확도(Accuracy) 기준 정렬 가중치를 최신순(Recency)보다 높게 조정했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/search/slide-03a-search-quality.png",
            alt: "해결방안A — 검색 품질 개선 세 가지",
            caption: "노이즈 태그 정비, 중복 썸네일 제거, 검색 의도 우선 노출 — 세 가지로 검색 데이터 품질을 높였습니다",
          },
          {
            type: "text",
            text: "데이터 개선과 함께 검색 화면 자체도 다시 설계했습니다. 기존 화면은 리스트형 레이아웃에 썸네일이 작아서 리소스를 한눈에 파악하기 어려웠습니다. 개선 후에는 썸네일을 크게 키운 그리드 레이아웃으로 바꾸고, 카테고리·필터를 사이드 패널로 분리해 검색과 탐색을 동시에 할 수 있게 했습니다. 반응형 레이아웃도 적용해서 화면 크기에 따라 그리드 열 수가 자연스럽게 바뀌도록 했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/search/slide-03b-uxui.png",
            alt: "해결방안B — 검색 UI/UX 개선 전후 비교",
            caption: "리스트형에서 썸네일 강조 그리드로, 사이드 패널 추가로 탐색 효율을 끌어올렸습니다",
          },
          {
            type: "text",
            text: "개선 후 유저 피드백이 직접 들어왔습니다. '검색 기능 업데이트 후에 게임 제작 속도가 월등히 빨라졌다', '검색이 편리해졌다'는 반응이 확인됐습니다. 데이터를 직접 분석해서 문제를 정의하고 개선 방향을 잡은 덕분에, 검색 품질과 탐색 경험을 두 가지 모두 실질적으로 개선한 작업이 되었습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/search/slide-04-results.png",
            alt: "성과 및 유저 피드백",
            caption: "검색 품질 향상과 빠른 탐색 경험 — 실제 유저 피드백으로 효과를 확인했습니다",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/search/slide-05-appendix.png",
            alt: "검색 개선 기획 산출물 — 기획서 와이어프레임",
            caption: "기획서와 와이어프레임으로 정리한 검색 개선 산출물",
          },
        ],
      },
      {
        slug: "account-withdrawal",
        title: "서비스 탈퇴 기능 기획",
        summary: "환불 권리와 데이터 보존 기준을 법무와 함께 설계한 탈퇴 시스템",
        tags: ["탈퇴Flow", "법무협업", "정책설계"],
        period: "2023",
        body: "메이플스토리 월드는 크리에이터가 만든 콘텐츠를 다른 유저가 구매해서 즐기는 UGC 플랫폼입니다. 그래서 한 사용자의 탈퇴가 단순히 그 사람의 문제로 끝나지 않고 플랫폼 전체에 영향을 미쳤습니다. 탈퇴 계정의 데이터를 어떻게 처리할지, 환불 이슈는 어떻게 풀지 같이 고려한 로직 설계가 필요했습니다.",
        thumbnailUrl: "",
        thumbnailAlt: "",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
        contentBlocks: [
          {
            type: "text",
            text: "메이플스토리 월드는 크리에이터가 만든 콘텐츠를 다른 유저가 구매해서 즐기는 UGC 플랫폼입니다. 그래서 한 사용자가 탈퇴하면 그 사람만의 문제로 끝나지 않고, 그 사람이 만든 콘텐츠를 산 다른 유저들에게도 영향이 갑니다. 탈퇴한 계정의 데이터를 어떻게 처리할지, 이미 콘텐츠를 산 구매자들에게 환불은 어떻게 해줄지 같이 고려한 로직 설계가 필요했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/delete_account/slide-01-background.png",
            alt: "UGC 플랫폼에서 탈퇴가 미치는 영향",
            caption: "크리에이터·구매자·콘텐츠가 연결된 구조라, 한 사용자의 탈퇴가 플랫폼 전반에 영향을 미쳤습니다",
          },
          {
            type: "text",
            text: "문제를 두 갈래로 나누어 정의했습니다. 첫째, 크리에이터가 탈퇴하면 그동안 만든 저작물과 정산 받지 못한 수익을 어떻게 처리할지 기준이 필요했습니다. 둘째, 크리에이터가 탈퇴해버리면 그 콘텐츠를 산 구매자들이 환불을 받지 못하는 문제가 생기지 않도록 환불 방안을 함께 마련해야 했습니다. 이 두 가지가 탈퇴 시 가장 큰 문제였기 때문에 이를 해결하기 위한 로직을 세웠습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/delete_account/slide-02-problems.png",
            alt: "핵심 과제 두 가지 정의",
            caption: "크리에이터의 저작물·수익 처리와 구매자 환불 방안, 두 가지를 핵심 과제로 잡았습니다",
          },
          {
            type: "text",
            text: "먼저 탈퇴 후 데이터를 어떻게 처리할지 정리했습니다. 정산받지 못한 수익금이 남아있거나 거래 데이터가 있는 경우에는 회사 회계 처리 기준에 맞춰 일정 기간 동안 데이터를 보관하도록 했습니다. 탈퇴한 크리에이터의 콘텐츠는 더 이상 노출되지 않도록 비노출 처리하고, 댓글이나 글은 작성자가 'Unknown'으로 표시되도록 익명화했습니다. 또한 탈퇴한 사람이 다시 가입하더라도 이전 계정의 구매 내역이나 활동 데이터와는 연결되지 않도록 식별자를 분리해서, 새로 시작하는 계정으로 다룰 수 있게 했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/delete_account/slide-03a-data-handling.png",
            alt: "탈퇴 후 데이터 처리 로직 설계",
            caption: "수익금 보관, 콘텐츠 비노출·익명화, 재가입 식별자 분리 — 세 가지 기준으로 데이터 처리 방향을 정했습니다",
          },
          {
            type: "text",
            text: "다음으로 판매자가 탈퇴하더라도 구매자가 환불을 받을 수 있도록 별도의 로직을 만들었습니다. 판매자가 탈퇴 신청을 하면 그 판매자의 상품에 '환불요청' 버튼이 자동으로 노출되고, 구매자는 판매자를 거치지 않고도 환불 가능 기간 안에 직접 환불을 요청할 수 있게 했습니다. 또한 탈퇴 유예 기간과 수익금 정산 기간을 모두 고려해 30일 이내에 탈퇴를 취소할 수 있는 안전장치를 두었습니다. 마지막으로 서비스 탈퇴, 계정 탈퇴, 즉시 탈퇴 등 케이스별로 의미와 처리 방식을 다르게 정의해서, 운영 중 헷갈리지 않도록 기준을 명확히 했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/delete_account/slide-03b-refund-logic.png",
            alt: "판매자 탈퇴 시 구매자의 환불 로직 설계",
            caption: "구매상품에 환불요청 버튼 노출, 유예·정산 기간 반영, 케이스별 탈퇴 정의 — 세 단계로 환불 로직을 설계했습니다",
          },
          {
            type: "text",
            text: "기능을 만들기 전에 사업, 법무, 개인정보 정책 부서와 함께 약관을 정비하고 컴플라이언스 검토를 진행했습니다. 저작물과 수익금 문제를 고려해 탈퇴 신청 후 7일 이내에 다시 로그인하면 탈퇴를 취소할 수 있는 유예 기간을 두었습니다. 개인정보는 유저의 탈퇴가 확정된 후 30일 이내에 모두 삭제되도록 설계했고, 판매자가 탈퇴하더라도 구매자는 기존 환불 정책에 따라 구매 후 7일 이내에 환불을 받을 수 있도록 보장했습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/delete_account/slide-04-legal-review.png",
            alt: "법무·정책 검토 결과",
            caption: "탈퇴 유예 7일, 개인정보 파기 30일, 환불 보장 7일 — 세 가지 기준으로 컴플라이언스를 정리했습니다",
          },
          {
            type: "text",
            text: "이렇게 설계한 결과, 크리에이터가 탈퇴하더라도 구매자가 환불을 받을 수 있는 권리가 보장되었고, 탈퇴 후 데이터 처리 기준이 명확해졌습니다. 운영 측면에서도 엣지 케이스를 미리 정의해두었기 때문에 CS 부담이 크게 줄어들었습니다. 결과적으로 탈퇴와 관련된 CS 문의가 발생하지 않았고, 단순히 한 명의 탈퇴 처리가 아니라 사용자·콘텐츠·데이터 관계까지 함께 고려하는 플랫폼 정책으로 발전시킬 수 있었습니다.",
          },
          {
            type: "image",
            url: "/images/projects/maplestoryworlds/delete_account/slide-05-results.png",
            alt: "서비스 적용 결과 및 성과",
            caption: "구매자 권리 보호, 데이터 처리 기준 수립, 운영 리스크 축소 — 세 가지 성과로 이어졌습니다",
          },
        ],
      },
      {
        slug: "global-backoffice",
        title: "글로벌 운영 백오피스 구축",
        summary: "글로벌 운영 효율을 높이기 위한 백오피스 기능 정의와 구축",
        tags: ["백오피스", "글로벌운영", "운영툴"],
        period: "2023~2024",
        body: "여기에 글로벌 운영 백오피스 구축의 배경, 기능 정의, 결과를 자유롭게 적어주세요.",
        thumbnailUrl: "",
        thumbnailAlt: "",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },
      {
        slug: "event-pages",
        title: "이벤트 페이지 구축",
        summary: "정기·비정기 이벤트를 빠르게 띄울 수 있는 페이지 시스템",
        tags: ["이벤트", "운영효율", "콘텐츠관리"],
        period: "2023",
        body: "여기에 이벤트 페이지 구축의 배경, 시스템 구조, 결과를 자유롭게 적어주세요.",
        thumbnailUrl: "",
        thumbnailAlt: "",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },
      {
        slug: "home-profile-customization",
        title: "홈/프로필 배경 꾸미기",
        summary: "유저가 자기만의 홈과 프로필을 꾸밀 수 있도록 만든 개인화 기능",
        tags: ["개인화", "유저참여", "UX"],
        period: "2023",
        body: "여기에 홈/프로필 배경 꾸미기의 배경, 기획 의도, 결과를 자유롭게 적어주세요.",
        thumbnailUrl: "",
        thumbnailAlt: "",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },
      {
        slug: "favorites-folder",
        title: "즐겨찾기 폴더",
        summary: "유저가 좋아하는 월드를 폴더로 정리할 수 있도록 한 기능",
        tags: ["즐겨찾기", "정리", "UX"],
        period: "2023",
        body: "여기에 즐겨찾기 폴더의 배경, 기획 의도, 결과를 자유롭게 적어주세요.",
        thumbnailUrl: "",
        thumbnailAlt: "",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },
      {
        slug: "friend-invite-event",
        title: "친구 초대 이벤트",
        summary: "친구를 메이플스토리 월드로 초대하는 그로스 이벤트 기획",
        tags: ["이벤트", "그로스", "바이럴"],
        period: "2023",
        body: "여기에 친구 초대 이벤트의 배경, 기획 의도, 결과를 자유롭게 적어주세요.",
        thumbnailUrl: "",
        thumbnailAlt: "",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },
      {
        slug: "world-maintenance",
        title: "월드 점검 기능",
        summary: "운영자가 월드를 점검하고 사용자에게 안내할 수 있도록 한 기능",
        tags: ["운영", "점검", "안정성"],
        period: "2024",
        body: "여기에 월드 점검 기능의 배경, 기획 의도, 결과를 자유롭게 적어주세요.",
        thumbnailUrl: "",
        thumbnailAlt: "",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },
    ],
  },
  "nexon-employee-app": {
    intro: "넥슨그룹사 임직원의 회사 생활을 지원하는 생활밀착형 앱 서비스의 기획과 운영을 담당했습니다.",
    imageLabel: "넥슨그룹사 임직원 앱 대표 이미지",
    sections: [
      {
        title: "프로젝트 개요",
        body: "근로시간 관리, 휴가 신청, 식당, 셔틀, 경조사 지원 등 임직원에게 필요한 기능을 제공하는 앱입니다.\n서비스 기획과 운영, 패치 매니징을 함께 맡았습니다.",
      },
      {
        title: "핵심 기여",
        body: "부서 검색, 알림, 생일 축하, 경조사 QR 링크, 식당 혼잡도, 휴가 정보 노출과 신청 기능을 기획했습니다.\nFirebase 기반 지표 관리와 CS 대응, 사내 테스트와 교육 푸시 발송도 수행했습니다.",
      },
    ],
  },
  "nexon-play": {
    intro: "넥슨 게임 유저의 안전하고 편리한 게임 생활을 지원하는 모바일 앱의 운영과 개선을 담당했습니다.",
    imageLabel: "넥슨플레이 앱 대표 이미지",
    sections: [
      {
        title: "프로젝트 개요",
        body: "150만 MAU 규모의 모바일 앱에서 기능 개선과 패치 매니징을 담당했습니다.\n서비스 운영, 정책 대응, 사용자 행동 데이터 기반 개선을 함께 진행했습니다.",
      },
      {
        title: "핵심 기여",
        body: "Apple, Facebook 등 서드파티 인증 정책 변화에 대응했습니다.\n앱 리뷰와 운영 지표를 모니터링하고, 사용자 행동 데이터를 기반으로 UI/UX 개선 방향을 도출했습니다.",
      },
    ],
  },
  "nexon-internal-services": {
    intro: "입사 초기 다수의 신규 사내 서비스 기획 과제에 참여하며 0-1 기획의 기본기를 쌓았습니다.",
    imageLabel: "넥슨 사내 신규 서비스 대표 이미지",
    sections: [
      {
        title: "프로젝트 개요",
        body: "MOD 포털웹, 넥슨포인트앱, 모바일게임 현금영수증 조회 페이지 등 다양한 신규 기획 과제에 참여했습니다.\n초기 컨셉과 화면 구조를 잡고 디자인·개발·QA 팔로업을 진행했습니다.",
      },
      {
        title: "핵심 기여",
        body: "포털 홈과 프로필 초기 컨셉, 로그인 전후 화면, 다운로드 리뉴얼 버전, 페이앱 레퍼런스 기반 포인트앱 화면을 기획했습니다.\n작은 과제에서도 사용자 흐름과 운영 가능성을 함께 고려했습니다.",
      },
    ],
  },
  "ai-service-content": {
    intro: "대화형 AI 서비스의 답변 품질을 높이기 위한 데이터 운영과 콘텐츠 기획을 경험했습니다.",
    imageLabel: "AI 대화형 서비스 대표 이미지",
    sections: [
      {
        title: "프로젝트 개요",
        body: "카카오 i와 NUGU에서 사용자 발화 데이터, 질의문, 백과 콘텐츠를 구축하고 운영했습니다.\nAI가 사용자에게 더 자연스럽고 정확하게 답변하기 위한 기반 데이터를 다뤘습니다.",
      },
      {
        title: "핵심 기여",
        body: "Kibana와 Excel을 활용해 사용자 발화 데이터를 검수하고, 도메인별 질의문과 스몰톡 시나리오를 기획했습니다.\nRDBMS 기반 백과 정보를 구축하고 CBT, QA, 런칭, 운영 고도화까지 참여했습니다.",
      },
    ],
  },
  "portfolio-vibe-coding": {
    intro: "AI와 함께 기획부터 구현까지 빠르게 실험하며 만든 개인 포트폴리오 웹사이트입니다.",
    imageLabel: "바이브코딩 포트폴리오 대표 이미지",
    sections: [
      {
        title: "프로젝트 개요",
        body: "서비스 기획자 포트폴리오를 직접 웹사이트로 구현하며, 이력서보다 더 입체적으로 프로젝트 맥락을 보여주는 방식을 실험했습니다.\nVite, React, TypeScript 기반으로 카드형 프로젝트 목록과 편집 가능한 상세 페이지를 구성했습니다.",
      },
      {
        title: "실험한 것",
        body: "AI와 대화하며 PRD, 디자인 방향, 콘텐츠 구조, 편집 모드, 이미지 업로드 흐름을 빠르게 구체화했습니다.\n서비스 기획자가 직접 구현을 경험하면서 개발 범위와 사용자 경험 사이의 균형을 더 선명하게 이해하는 과정이었습니다.",
      },
    ],
  },
};

export const createBlankDetailContent = (): BookmarkDetailContent => ({
  intro: "",
  imageLabel: "이미지 자리",
  coverImageUrl: "",
  coverImageAlt: "",
  sections: [
    {
      title: "새 섹션",
      body: "여기에 내용을 적어주세요.",
      imageUrl: "",
      imageAlt: "",
      imageCaption: "",
    },
  ],
  subProjects: [],
});
