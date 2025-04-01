import { Html } from "@elysiajs/html";
import type { Children } from "@kitajs/html";

export type MainLayoutProps = {
    description?: string
    title?: string
}

export default function DocumentHead(props: MainLayoutProps) {
  return (
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={props.description} />
        <title>{props.title ?? "T0"}</title>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
      </head>
  );
}
