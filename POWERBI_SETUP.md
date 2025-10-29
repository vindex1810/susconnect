# Configuração dos Links do Power BI

## Problema Identificado

Os links do Power BI não estão funcionando porque a Edge Function `powerbi-proxy` precisa ser implantada no Supabase.

## Solução

### 1. Deploy da Edge Function

A Edge Function `powerbi-proxy` foi criada em `supabase/functions/powerbi-proxy/index.ts`. Para fazer o deploy:

```bash
supabase functions deploy powerbi-proxy
```

### 2. Configurar URLs Reais do Power BI

Atualmente, as URLs no arquivo `supabase/functions/powerbi-proxy/index.ts` são de exemplo. Você precisa substituí-las pelas URLs reais dos seus relatórios do Power BI:

1. Acesse seu workspace no Power BI
2. Para cada relatório (Vigilância, Repasses, Atenção Primária):
   - Clique em "Compartilhar" > "Publicar na Web"
   - Copie o link gerado
3. Atualize as URLs no objeto `powerBIUrls` no arquivo da função

Exemplo:
```typescript
const powerBIUrls = {
  vigilancia: "SUA_URL_DO_POWER_BI_AQUI",
  repasses: "SUA_URL_DO_POWER_BI_AQUI",
  atencao: "SUA_URL_DO_POWER_BI_AQUI"
};
```

### 3. Redeploy após Atualizar URLs

Após atualizar as URLs, faça o redeploy:

```bash
supabase functions deploy powerbi-proxy
```

## Como Testar

Após o deploy:

1. Faça login no sistema
2. Na página inicial, clique em qualquer um dos cards:
   - Atenção Primária
   - Vigilância em Saúde
   - Repasses Financeiros
3. O relatório correspondente do Power BI deve carregar em tela cheia

## Nota Importante

A Edge Function está configurada com autenticação (`verify_jwt: true`), o que significa que apenas usuários autenticados podem acessar os relatórios.
