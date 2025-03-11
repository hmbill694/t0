import { Html } from '@elysiajs/html'

export default function Index() {
    return (
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="T0 Application Shell" />
        <title>T0 App Shell</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
    </head>
    <body class="bg-gray-100 min-h-screen flex flex-col">

        <nav class="bg-blue-500 text-white py-4 px-6 sticky top-0 z-10">
            <div class="container mx-auto flex items-center justify-between">
                <a href="#" class="text-xl font-semibold">T0</a>
                <div class="space-x-4">
                    <a href="#" class="hover:text-gray-200">Home</a>
                    <a href="#" class="hover:text-gray-200">About</a>
                    <a href="#" class="hover:text-gray-200">Services</a>
                    <a href="#" class="hover:text-gray-200">Contact</a>
                </div>
            </div>
        </nav>

        <main class="flex-grow py-8 px-6">
            <div class="container mx-auto">
                <h1 class="text-3xl font-semibold mb-4">Welcome to T0</h1>
                <form action="/api/v1/generate-document" method="post">
                    <div class="mb-4">
                        <label for="chat" class="block text-gray-700 text-sm font-bold mb-2">Chat:</label>
                        <textarea id="chat" name="chat" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Generate
                        </button>
                    </div>
                </form>
            </div>
        </main>

        <footer class="bg-gray-800 text-white py-4 px-6">
            <div class="container mx-auto text-center">
                <p>&copy; 2024 T0. All rights reserved.</p>
            </div>
        </footer>

    </body>
</html>
    )
}