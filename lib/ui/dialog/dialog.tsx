import Html from "@elysiajs/html";

export type DialogProps = {
  dialogId: string;
  content: string;
};

function OpenDialogButton(props: DialogProps) {
  return (
    <button
      x-on:click={`$refs.${props.dialogId}.showModal()`}
      id={`${props.dialogId}-open-dialog-button`}
    >
      Open dialog
    </button>
  );
}

export default function Dialog(props: DialogProps) {
  return (
    <div x-data>
      <button
        class="btn btn-primary"
        x-on:click={`$refs.${props.dialogId}.showModal()`}
        id={`${props.dialogId}-open-dialog-button`}
      >
        Open dialog
      </button>
      <dialog x-ref={props.dialogId} class="m-auto card">
        <div class="card-body">
          <h2 class="card-title">Dialog Title</h2>
          <p>{props.content}</p>
          <div class="card-actions justify-end">
            <button
              x-on:click={`$refs.${props.dialogId}.close()`}
              id={`${props.dialogId}-shut-dialog-button`}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
