# 방문자 로그 확인 가이드

이 사이트(`soy-xplr.vercel.app`)에는 방문자 정보를 남기는 **Vercel Edge Middleware**(`middleware.ts`)가 붙어 있습니다.
방문이 발생하면 Vercel 엣지에서 `[VISIT]` 로그 한 줄(JSON)이 남고, 이걸 **Vercel Logs**에서 확인합니다.

> 참고: 이 프로젝트는 Next.js가 아니라 Vite + React SPA라서 Next.js 미들웨어가 아닌
> 프레임워크 무관 Vercel Edge Middleware를 사용합니다. 동작·조회 방식은 동일합니다.

---

## 1. 로그가 어디에 쌓이나

- **위치**: Vercel 프로젝트의 **Runtime Logs** (대시보드 **Logs** / **Observability** 탭)
- **형식**: 방문 1건 = `[VISIT] {json}` 한 줄
- **사람 방문 예시**:
  ```
  [VISIT] {"timestamp":"2026-07-23T14:23:43.614Z","ip":"203.0.113.7","country":"KR","city":"Seoul","pathname":"/bookmarks/maplestory-worlds-platform","referer":"https://www.google.com/","userAgent":"Mozilla/5.0 (Macintosh) Safari/605.1"}
  ```
- **봇 방문 예시** (`isBot: true`가 추가됨):
  ```
  [VISIT] {"timestamp":"2026-07-23T14:23:43.616Z","ip":"66.249.66.1","country":"US","city":null,"pathname":"/","referer":null,"userAgent":"...Googlebot/2.1...","isBot":true}
  ```

---

## 2. 대시보드에서 보기 (가장 쉬움)

1. Vercel 프로젝트 접속 → **https://vercel.com/soyxplr-4015s-projects/soy-xplr**
2. 상단 **Logs** (또는 **Observability → Runtime Logs**) 탭 클릭
3. 검색창에 **`[VISIT]`** 입력 → 방문 로그만 필터링
4. 키워드를 더해 좁히기:
   - `[VISIT] KR` → 한국에서 온 방문
   - `[VISIT] /bookmarks` → 특정 페이지 방문
   - `[VISIT] isBot` → 봇 트래픽만
5. 로그 한 줄을 펼치면 전체 JSON 필드를 볼 수 있습니다.

---

## 3. CLI로 실시간 보기 (선택)

```bash
npm i -g vercel        # 최초 1회 설치
vercel login           # 최초 1회 로그인

# 실시간 스트리밍 (방문 발생 시 바로 찍힘)
vercel logs soy-xplr.vercel.app

# 방문 로그만 필터
vercel logs soy-xplr.vercel.app | grep "\[VISIT\]"
```

---

## 4. 각 필드 의미

| 필드 | 뜻 |
| --- | --- |
| `timestamp` | 접속 시각 (UTC ISO 8601) |
| `ip` | 클라이언트 IP (`x-forwarded-for`의 첫 번째 값) |
| `country` / `city` | 접속 국가·도시 (Vercel Geo 헤더 기반) |
| `pathname` | 방문한 페이지 경로 |
| `referer` | 유입 경로(직전 URL). `null`이면 직접 접속·북마크·앱 등 |
| `userAgent` | 브라우저·기기 정보 |
| `isBot` | `true`면 봇/크롤러(구글봇 등). **필드가 없으면 사람 방문** |

---

## 5. ⚠️ 로그 보존 기간 (중요)

Vercel 런타임 로그는 **영구 저장이 아니라 단기(라이브) 로그**입니다.

- **Hobby(무료) 플랜**: 보존 기간이 짧습니다(대략 최근 1시간 수준). 즉 **실시간·최근 확인용**이고,
  한참 전 방문 기록을 나중에 돌아보는 용도로는 부족합니다.

과거 이력까지 남기고 싶다면 아래 중 하나가 필요합니다.

- **Discord/Slack 웹훅** — 이미 코드에 들어 있습니다. 환경변수 `DISCORD_WEBHOOK_URL`만 넣으면
  방문마다 메시지로 영구 기록됩니다. (설정법은 6번)
- **Vercel Log Drains** (Pro 플랜) — 로그를 외부 저장소로 전송.
- **DB/구글시트 적재** — 미들웨어에서 외부 API로 방문 데이터를 보내 저장.

---

## 6. (원하면 나중에) Discord 알림 켜기

지금은 꺼져 있습니다(환경변수 미설정 시 자동으로 건너뜀). 켜고 싶으면:

1. Discord 채널 → **설정 → 연동 → 웹후크 → 새 웹후크** → **URL 복사**
2. Vercel 프로젝트 → **Settings → Environment Variables** →
   `DISCORD_WEBHOOK_URL` = 복사한 URL (Environment: **Production**)
3. **재배포** → 이후 방문마다 Discord 채널로 기록됩니다.

> 전송 실패는 요청 처리를 막지 않도록 코드에서 조용히 무시됩니다.

---

## 7. 참고 — 집계 통계가 필요하면

개별 IP보다 "얼마나 많이 / 어디서 왔나" 같은 **집계**가 필요하면
**Vercel Web Analytics**(프로젝트 → **Analytics**)가 개인정보 부담 없이
방문 수·유입 경로·인기 페이지를 보여줍니다.

- 이 미들웨어 로그 = **개별 방문 raw 데이터**(IP·경로 단위)
- Web Analytics = **집계 대시보드**(트렌드·순위)

둘은 상호 보완적입니다.

---

## 8. 개인정보 유의

이 로그는 방문자의 **IP·대략적 위치**를 포함합니다(개인정보). 필요 이상으로 오래 보관하지 말고,
공개 포트폴리오라면 개인정보 처리방침에 방문 로그 수집 사실을 밝혀 두는 것을 권장합니다.
수집을 멈추려면 `middleware.ts`를 삭제하거나 `config.matcher`를 비우고 재배포하면 됩니다.
