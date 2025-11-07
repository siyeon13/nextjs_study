import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

//export const dynamic = ''
// 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정
//1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제로 static 페이지로 설정 (설정하면 안되는 이유 -> 빌드 오류)

export default function Home() {
  // 서버컴포넌트 -> 브라우저에서 실행 안됨

  async function AllBooks() {
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

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
