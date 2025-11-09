import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review-action";

// 서버 액션을 만들면 자동으로 api가 하나 생성이 됨, 폼태그에서 실행할때 api가 자동으로 실행
export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form className={style.form_container} action={createReviewAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
