import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const powerBIUrls = {
  vigilancia: "https://app.powerbi.com/view?r=eyJrIjoiZTcwZjY5ZDAtMzA5YS00MWIyLTg3ZjAtOTAwZDY1YzYxNmQ5IiwidCI6IjdhNjI3NmU5LTM0NzgtNGM0NS04YjM2LWY0YjNlN2NlYzQ5OSJ9",
  repasses: "https://app.powerbi.com/view?r=eyJrIjoiZTcwZjY5ZDAtMzA5YS00MWIyLTg3ZjAtOTAwZDY1YzYxNmQ5IiwidCI6IjdhNjI3NmU5LTM0NzgtNGM0NS04YjM2LWY0YjNlN2NlYzQ5OSJ9",
  atencao: "https://app.powerbi.com/view?r=eyJrIjoiZTcwZjY5ZDAtMzA5YS00MWIyLTg3ZjAtOTAwZDY1YzYxNmQ5IiwidCI6IjdhNjI3NmU5LTM0NzgtNGM0NS04YjM2LWY0YjNlN2NlYzQ5OSJ9"
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
