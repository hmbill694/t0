import { Html } from "@elysiajs/html";
import MainLayout from "../layouts/main-layout";

export type GeneratedDocumentsProps = {
  files: string[];
};

export default function GeneratedDocuments(props: GeneratedDocumentsProps) {
  return (
    <MainLayout>
      <h1 class="text-3xl font-semibold mb-4">Your Generated Documents</h1>
      <ul>
        {props.files.map((ele) => (
          <li>
            <a href={`/public/out/${ele}`}>{ele}</a>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
}
