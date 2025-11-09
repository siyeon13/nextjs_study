"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    //  console.log(response.status);

    /*  // 1. 특정 주소의 해당하는 페이지만 재검증
    revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    revalidatePath(`/book/[id]`, "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지를 재검증
    revalidatePath("/(with-searchbar)", "layout");

    // 4. 모든 데이터 재검증
    revalidatePath("/", "layout"); */

    // 5. 태그 기준, 데이터 캐시 재검증.  -> 지금은 리뷰만 재검증하면 되기 때문에 제일 효율적이라 이것만 남겨둠.
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };

    // 서버 컴포넌트에서만 호출가능, 경로에 해당하는 페이지 전체가 재생성 되기 떄문에 캐시가 무효화가 됨, 페이지 자체를 캐싱하는 풀라우트캐시도 삭제됨
    // revalidatePath(`/book/${bookId}`); // revalidatePath : 넥스트 서버측에게 페이지를 다시 생성하도록 요청해서 서버 액션의 결과를 바로 화면에 나타나게 함
  } catch (err) {
    //console.log(err);
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다 : ${err}`,
    };
  }

  // console.log("server action called");
  // console.log(formData);
}
