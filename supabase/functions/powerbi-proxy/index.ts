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

    return new Response(
      JSON.stringify({ url: powerBIUrl }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
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
