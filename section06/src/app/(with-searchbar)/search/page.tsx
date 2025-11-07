import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

// export const dynamic = "force-static";
// 무조건 static 페이지로 작동되도록 알아서 다 변경이 된다. 쿼리스트링은 undefinde

async function SearchResult({ q }: { q: string }) {
  await delay(1700);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // const { q } = await searchParams;
  return (
    <Suspense key={searchParams.q || ""} fallback={<div>로딩중...</div>}>
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  );
}
