import CodeBlock from "components/CodeBlock";
import Modal from "components/day01-modal/Modal";
import { modalCode } from "components/day01-modal/modalCode";
import { useState } from "react";

export default function Day01Demo() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCode = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <section className="mb-4">
        <h1 className="text-xl font-bold">Day 01. Modal Component</h1>
        <p>접근성을 고려한 기본 모달 컴포넌트</p>
      </section>
      <div className="flex">
        <div className="w-1/3 bg-amber-200 p-4 rounded-l-md">
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-1">📺 Preview</h2>
            <div className="flex justify-center items-center mt-10">
              <Modal />
            </div>
          </section>
        </div>
        <div className="w-2/3 bg-sky-200 p-4 rounded-r-md">
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-1">✅ 구현 포인트</h2>
            <p className="pl-2">
              - Esc 키로 닫기 <br />
              - Overlay 클릭 시 닫기 <br />
              - 모달 열릴 때 포커스 이동 <br />- 닫힐 때 트리거 버튼으로 포커스
              복귀
            </p>
          </section>
        </div>
      </div>
      <section className="mt-4">
        <button
          onClick={toggleCode}
          className="cursor-pointer bg-gray-900 text-white px-3 py-1 rounded mb-2 border-2 border-blue-500 hover:bg-blue-400 transition-colors duration-300 ease-in-out"
        >
          {isOpen ? "코드 닫기" : "코드 보기"}
        </button>
        {isOpen && <CodeBlock code={modalCode} language="tsx" />}
      </section>
    </>
  );
}
