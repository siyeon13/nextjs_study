import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

//export const dynamic = ''
// 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정
//1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제로 static 페이지로 설정 (설정하면 안되는 이유 -> 빌드 오류)

async function AllBooks() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    //{ cache: "no-store" } // 캐싱되지 않는다
    { cache: "force-cache" } // 캐싱되지 않는다
  );
  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const allBooks: BookData[] = await response.json();
  console.log("section05: allBooks");
  console.log(allBooks);

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic";
// 무조건 dynamic 페이지로 작동되도록 알아서 다 변경이 된다.

export default function Home() {
  // 서버컴포넌트 -> 브라우저에서 실행 안됨

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
