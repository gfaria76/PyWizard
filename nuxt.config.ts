// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,

    modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/eslint', '@vueuse/motion/nuxt', '@nuxtjs/supabase'],

    css: ['~/assets/css/main.css'],

    ui: {
        fonts: false,
    },

    // @nuxtjs/supabase lê SUPABASE_URL e SUPABASE_KEY do env automaticamente.
    // SUPABASE_SERVICE_ROLE_KEY é exposta via runtimeConfig (server-only).
    supabase: {
        redirect: false, // redirecionamento gerenciado manualmente em app/middleware/auth.global.ts
    },

    runtimeConfig: {
        // ── Supabase (server-only) ──────────────────────────────────────────
        supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',

        // ── Execução de código ──────────────────────────────────────────────
        // Piston é gratuito e suporta 80+ linguagens. Self-host: github.com/engineer-man/piston
        pistonUrl: process.env.PISTON_URL || 'https://emkc.org/api/v2/piston/execute',
        runTimeoutMs: Number(process.env.RUN_TIMEOUT_MS) || 8000,

        // ── IA ──────────────────────────────────────────────────────────────
        // Provider: 'deepseek' | 'ollama' | 'groq' | '' (vazio = desabilitado)
        aiProvider: process.env.AI_PROVIDER || '',
        deepseekApiKey: process.env.DEEPSEEK_API_KEY || '',
        groqApiKey: process.env.GROQ_API_KEY || '',
        ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
        ollamaModel: process.env.OLLAMA_MODEL || 'llama3.1:8b',
    },

    compatibilityDate: '2026-01-15',
})
