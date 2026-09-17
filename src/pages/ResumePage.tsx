import { resumeData } from "../data/resumeData";
import { Resume } from "../resume/Resume";

// /resume 라우트에서 렌더링되는 A4 인쇄용 이력서 페이지.
export function ResumePage() {
  return <Resume data={resumeData} />;
}
