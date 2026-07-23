import { next, type RequestContext } from "@vercel/edge";

/**
 * 방문자 로깅용 Vercel Edge Middleware.
 *
 * 이 프로젝트는 Next.js가 아니라 Vite + React SPA이므로, Next.js 미들웨어
 * (`next/server`) 대신 프레임워크 무관 **Vercel Edge Middleware**를 사용합니다.
 * Vercel에 배포되면 매칭된 요청마다 엣지에서 실행되어 방문 정보를 남깁니다.
 *
 * - 수집: 클라이언트 IP(x-forwarded-for 첫 값), 국가/도시(x-vercel-ip-*),
 *   경로, referer, user-agent, 접속 시각(ISO)
 * - `[VISIT]` 프리픽스 + 한 줄 JSON을 console.log → Vercel Logs에서 필터 검색
 * - user-agent에 bot/crawler/spider가 있으면 isBot: true 표시(제외하진 않음)
 * - DISCORD_WEBHOOK_URL 환경변수가 있으면 Discord로도 전송(실패는 삼킴)
 */

export const config = {
  // 정적 자원(_next/*, /assets·/images·/fonts, 확장자 파일 등)은 제외하고
  // 실제 페이지 요청만 매칭. 경로에 점(.)이 있으면 정적 파일로 보고 제외.
  matcher: [
    "/((?!_next/static|_next/image|assets/|images/|fonts/|.*\\..*).*)",
  ],
};

const BOT_RE = /bot|crawler|spider/i;

type VisitLog = {
  timestamp: string;
  ip: string | null;
  country: string | null;
  city: string | null;
  pathname: string;
  referer: string | null;
  userAgent: string | null;
  isBot?: true;
};

const decodeHeader = (value: string | null): string | null => {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export default function middleware(
  request: Request,
  context: RequestContext,
): Response {
  const { headers } = request;
  const { pathname } = new URL(request.url);

  const forwardedFor = headers.get("x-forwarded-for");
  const userAgent = headers.get("user-agent");

  const visit: VisitLog = {
    timestamp: new Date().toISOString(),
    ip: forwardedFor ? forwardedFor.split(",")[0].trim() : null,
    country: headers.get("x-vercel-ip-country"),
    city: decodeHeader(headers.get("x-vercel-ip-city")),
    pathname,
    referer: headers.get("referer"),
    userAgent,
  };

  if (userAgent && BOT_RE.test(userAgent)) {
    visit.isBot = true;
  }

  // (2) Vercel Logs에서 "[VISIT]"로 필터링 가능한 한 줄 JSON
  console.log(`[VISIT] ${JSON.stringify(visit)}`);

  // (6) DISCORD_WEBHOOK_URL이 설정된 경우에만 Discord로 전송.
  //     전송은 백그라운드(waitUntil)로 돌리고, 실패해도 요청 처리를 막지 않도록 삼킵니다.
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    context.waitUntil(sendToDiscord(webhookUrl, visit).catch(() => {}));
  }

  return next();
}

async function sendToDiscord(
  webhookUrl: string,
  visit: VisitLog,
): Promise<void> {
  const flag =
    visit.country && /^[A-Za-z]{2}$/.test(visit.country)
      ? String.fromCodePoint(
          ...[...visit.country.toUpperCase()].map(
            (c) => 0x1f1e6 - 65 + c.charCodeAt(0),
          ),
        )
      : "🏳️";

  const content =
    `${flag} **[VISIT]** \`${visit.pathname}\`${visit.isBot ? " 🤖 bot" : ""}\n` +
    `> IP: ${visit.ip ?? "-"} · ${visit.country ?? "-"} / ${visit.city ?? "-"}\n` +
    `> UA: ${(visit.userAgent ?? "-").slice(0, 200)}\n` +
    `> ref: ${visit.referer ?? "-"} · ${visit.timestamp}`;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    // Discord 메시지 길이 제한(2000자) 방어
    body: JSON.stringify({ content: content.slice(0, 1900) }),
  });
}
