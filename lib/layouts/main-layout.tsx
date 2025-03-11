import { Html } from "@elysiajs/html";
import NavBar from "../ui/nav/nav";
import type { Children } from "@kitajs/html";

export type MainLayoutProps = {
    children: Children
    title?: string
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="T0 Application Shell" />
        <title>{props.title ?? "T0"}</title>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body class="bg-gray-100 min-h-screen flex flex-col">
        <NavBar />

        <main class="flex-grow py-8 px-6">
          <div class="container mx-auto">
            {props.children}
          </div>
        </main>

        <footer class="bg-gray-800 text-white py-4 px-6">
          <div class="container mx-auto text-center">
            <p>&copy; 2024 T0. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
