"use client";

import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review-action";
import { useActionState, useEffect } from "react"; // 로딩 상태 설정, 중복 클릭 방지

// 서버 액션을 만들면 자동으로 api가 하나 생성이 됨, 폼태그에서 실행할때 api가 자동으로 실행
export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
