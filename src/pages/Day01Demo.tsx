import CodeBlock from "components/CodeBlock";
import Modal from "components/day01-modal/Modal";
import { modalCode } from "components/day01-modal/modalCode";

export default function Day01Demo() {
  return (
    <>
      <div className="text-xl font-bold mb-4">Day 01. Modal Component</div>
      <Modal />
      <div className="mt-4">
        <CodeBlock code={modalCode} language="tsx" />
      </div>
    </>
  );
}
