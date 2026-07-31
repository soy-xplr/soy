# 한국어 이력서 (A4 인쇄용 PDF)

브라우저에서 확인하고 Chrome에서 그대로 PDF로 출력할 수 있는 인쇄용 이력서입니다.
일반 반응형 웹 문서가 아니라, **각 A4 페이지(210mm × 297mm)의 콘텐츠를 직접 배치**하는
고정형 인쇄 문서로 구현되어 있습니다.

- 모든 텍스트가 HTML 텍스트라 **PDF에서 선택·검색**이 됩니다. (Canvas / 이미지 렌더링 아님)
- 화면 미리보기: 연한 회색 배경, A4 중앙 정렬, 페이지 간격 24px, 약한 그림자
- 인쇄: 회색 배경·그림자 제거, 확대·축소 없이 정확한 A4 출력

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 **http://localhost:5173/resume** 로 접속합니다.
(프로덕션 빌드 확인은 `npm run build && npm run preview` 후 `/resume`)

## Chrome에서 PDF로 저장하는 방법

1. `/resume` 페이지에서 상단의 **“PDF로 저장 / 인쇄”** 버튼을 누르거나 `Ctrl + P` (mac: `⌘ + P`)
2. **대상(Destination)** 을 **“PDF로 저장”** 으로 선택
3. **용지 크기**: A4
4. **여백(Margins)**: **없음(None)**  ← `@page { margin: 0 }` 와 페이지 내부 여백이 이미 적용되어 있음
5. **배율(Scale)**: **100%** (기본값)
6. **배경 그래픽(Background graphics)** 체크 (아이콘/성과 박스 배경 인쇄)
7. 저장

> 여백을 “기본값”으로 두면 페이지가 축소되어 4페이지째 빈 페이지가 생길 수 있습니다.
> 반드시 여백을 **없음**, 배율을 **100%** 로 두세요.

## 내용 수정

이력서 내용은 전부 [`src/data/resumeData.ts`](../data/resumeData.ts) 의 `resumeData` 객체에
분리되어 있습니다. **텍스트만 고치면** 이력서 전체가 바뀝니다.

```ts
export const resumeData = {
  profile: { name, contacts, introduction },
  projects: [ /* 프로젝트 */ ],
  experiences: [ /* 경력 */ ],
  education: [ /* 학력 */ ],
  skills: [ /* 기술 */ ],
};
```

### 페이지 나누기 조정

자동 페이지 분할에 의존하지 않고 페이지를 명시적으로 나눕니다.
프로젝트 개수가 바뀌면 [`src/resume/Resume.tsx`](./Resume.tsx) 상단의
`PROJECTS_PER_PAGE` 배열만 조정하세요. (예: `[1, 2]` → 1페이지에 1개, 2페이지에 2개)
한 페이지에 안 들어가는 프로젝트는 통째로 다음 페이지로 이동합니다.

## 컴포넌트 구조

| 컴포넌트 | 역할 |
| --- | --- |
| `Resume` | 전체 페이지 조립 · 페이지 분배 |
| `Page` | 하나의 A4 페이지 (210mm × 297mm, 내부 여백 16/15/16mm) |
| `Header` | 이름 + 연락처 |
| `ContactGrid` | 연락처 2열 그리드 (단색 아이콘) |
| `Introduction` | 자기소개 문단 |
| `Section` | 섹션 제목 + 본문 |
| `ProjectItem` | 아이콘 열 + 본문 열 2열 프로젝트 블록 |
| `ProjectBadge` | 프로젝트 제목 옆 회색 배지 |
| `HighlightBox` | 핵심 성과 (연회색 둥근 박스) |
| `BulletList` | 상세 업무 불릿 (중첩 들여쓰기) |
| `ExperienceItem` | 경력 항목 |
| `EducationItem` | 학력 항목 |
| `Skills` | 기술 스택 |

스타일은 외부 UI 라이브러리 없이 [`Resume.module.css`](./Resume.module.css) (CSS Module)로만
구현되어 있습니다.
