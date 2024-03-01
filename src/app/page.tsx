import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">Choose a Demo</h1>
      <ul className="list-disc">
        <li><Link className="underline decoration-sky-600 hover:decoration-blue-400" href="/hash-colors">Hash Colors</Link></li>
      </ul>
    </main>
  );
}
