import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const powerBIUrls = {
  vigilancia: "https://app.powerbi.com/view?r=eyJrIjoiZjY2YTUwM2QtMWQyZS00MDQ2LWE5NDctMGRjYWFmZTU3YjQwIiwidCI6IjVkOGE4N2Q5LTZkODAtNDM5My05ZjNkLTUyOWE3MjU1MmQ3ZiJ9",
  repasses: "https://app.powerbi.com/view?r=eyJrIjoiNzRmODJmZDEtYzFkZS00MjkyLWEwMDYtNzRhNzJiMjAxZWMwIiwidCI6IjVkOGE4N2Q5LTZkODAtNDM5My05ZjNkLTUyOWE3MjU1MmQ3ZiJ9",
  atencao: "https://app.powerbi.com/view?r=eyJrIjoiYzIyZTdiOTMtN2QxMS00NDcyLWJkZDEtNjdkM2M0MjNlMDNmIiwidCI6IjVkOGE4N2Q5LTZkODAtNDM5My05ZjNkLTUyOWE3MjU1MmQ3ZiJ9"
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const reportType = url.searchParams.get("report");

    if (!reportType || !(reportType in powerBIUrls)) {
      return new Response(
        JSON.stringify({ error: "Tipo de relatório inválido" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const powerBIUrl = powerBIUrls[reportType as keyof typeof powerBIUrls];

    // HTML que faz redirect instantâneo para o Power BI
    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0; url=${powerBIUrl}">
    <title>Carregando Relatório - SUS Connect</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #111827;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: white;
        }
        .loading-container {
            text-align: center;
        }
        .spinner {
            border: 3px solid #374151;
            border-top: 3px solid #3b82f6;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="loading-container">
        <div class="spinner"></div>
        <div>Carregando relatório Power BI...</div>
    </div>
    
    <script>
        // Fallback caso o meta refresh não funcione
        setTimeout(() => {
            window.location.href = '${powerBIUrl}';
        }, 100);
    </script>
</body>
</html>
`;

    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html",
      },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao processar requisição" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
