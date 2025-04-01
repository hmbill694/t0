import { Html } from "@elysiajs/html";
import DocumentHead from "../ui/document-head/document-head";
import NavBar from "../ui/nav/nav";
import Dialog from "../ui/dialog/dialog";

export type GeneratedDocumentProps = {
  html: string;
};

const foo = { "@click.outside": "$refs.myDialog.close()" };

export default function GeneratedDocument(props: GeneratedDocumentProps) {

  const [Modal, OpenDialogButton] = Dialog({dialogId: "chat-drawer", content: "hello"})
  return (
    <html lang="en">
      <DocumentHead />
      <body class="bg-gray-100 min-h-screen flex flex-col" >
        <NavBar />
        <div class="flex flex-col flex-grow" >
          <iframe srcdoc={props.html} class="flex-1"></iframe>
          <div x-data>
            <button id="showDialog" x-on:click="$refs.myDialog.showModal()">
              Open dialog
            </button>
            <dialog x-ref="myDialog" class="m-auto">
                <h2>Dialog Title</h2>
                <p>This is the content of the dialog.</p>
                <button x-on:click="$refs.myDialog.close()" id="closeDialog">
                    Close
                </button>
            </dialog>
          </div>
        </div>
      </body>
    </html>
  );
}
