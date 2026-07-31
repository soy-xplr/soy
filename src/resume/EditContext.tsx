import { createContext, useContext } from "react";

// 편집 모드 여부를 하위 컴포넌트에 전달하는 컨텍스트.
// (실제 데이터 변경은 onChange 콜백으로 위에서 아래로 전달합니다.)
export const EditContext = createContext<{ editing: boolean }>({ editing: false });

export function useEditing() {
  return useContext(EditContext).editing;
}
