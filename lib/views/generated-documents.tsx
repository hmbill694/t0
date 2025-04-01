import { Html } from "@elysiajs/html";
import MainLayout from "../layouts/main-layout";
import type { SelectPage } from "../db/schema";

export type GeneratedDocumentsProps = {
  files: SelectPage[];
};

export default function GeneratedDocuments(props: GeneratedDocumentsProps) {
  return (
    <MainLayout>
      <h1 class="text-3xl font-semibold mb-4">Your Generated Documents</h1>
      <ul>
        {props.files.map((ele) => (
          <li>
            <a href={`/generated-doc/${ele.projectId}/${ele.id}`}>{ele.name}</a>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
}
