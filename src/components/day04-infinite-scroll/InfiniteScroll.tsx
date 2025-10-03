import { useCallback, useEffect, useRef, useState } from "react";

interface IData {
  id: number;
  text: string;
}

async function fetchItem(page: number): Promise<IData[]> {
  const data = new Array(10).fill(0).map((_, i) => ({
    id: page * 10 + i + 1,
    text: `아이템 ${page * 10 + i + 1}`,
  }));

  return data;
}

export default function InfiniteScroll() {
  const [data, setData] = useState<IData[]>([]);
  const [nextPage, setNextPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const inFlightRef = useRef(false);

  const loadData = useCallback(async () => {
    if (isLoading || !hasNext || inFlightRef.current) return;
    inFlightRef.current = true;
    setIsLoading(true);

    try {
      const newPage = await fetchItem(nextPage);
      setData((prev) => [...prev, ...newPage]);
      if (nextPage >= 4) {
        setHasNext(false);
      } else {
        setNextPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      inFlightRef.current = false;
    }
  }, [hasNext, isLoading, nextPage]);

  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return; // 이미 한 번 실행했으면 스킵
    didInitRef.current = true;
    loadData();
  }, [loadData]);

  useEffect(() => {
    const rootEl = containerRef.current;
    const targetEl = sentinelRef.current;
    if (!rootEl || !targetEl || !hasNext) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadData();
        }
      },
      {
        root: rootEl,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(targetEl);

    return () => observer.disconnect();
  }, [hasNext, loadData]);

  return (
    <div
      ref={containerRef}
      className="border rounded-md border-gray-700 px-4 py-2.5 h-[350px] overflow-y-auto"
    >
      <ul>
        {data.map((item, i) => (
          <li
            key={`${item.id}_${i}`}
            className="border-b border-b-pink-500 p-2"
          >
            {item.text}
          </li>
        ))}
      </ul>
      {hasNext && <div ref={sentinelRef} className="h-0.5"></div>}
      {isLoading && <div>불러오는 중...</div>}
      {!hasNext && <div>더 이상 데이터가 없습니다.</div>}
    </div>
  );
}

/* 
동작 흐름:
데이터를 불러오는 요소에 스크롤이 도착함: IntersectionObserver 사용해서 이벤트를 등록 
-> 데이터를 불러오는 함수가 실행됨: 데이터를 fetch하고 fetch해 온 데이터를 state에 저장
-> 불러온 데이터가 화면에 나타남: UI 그리기
*/
