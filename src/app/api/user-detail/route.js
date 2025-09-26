// app/api/user-detail/route.js
export async function GET(request) {
    // Get cookies from client request
    const cookieHeader = request.headers.get("cookie") || "";

    // Forward request to external API
    const res = await fetch("https://apitest.softvencefsd.xyz/api/user-detail", {
        method: "GET",
        headers: {
            Cookie: cookieHeader, // forward all cookies
        },
    });

    if (!res.ok) {
        return new Response("Failed to fetch user detail", { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
}