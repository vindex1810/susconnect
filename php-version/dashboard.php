<?php
session_start();
require_once __DIR__ . '/includes/auth.php';

$auth = new Auth();
$user = $auth->requireAuth();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - SUS Connect</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-50">
    <header class="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/index.php" class="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        <span class="text-sm">Voltar</span>
                    </a>
                    <div class="w-px h-6 bg-blue-600"></div>
                    <img src="/assets/images/prefeitura_negativo.png" alt="Prefeitura de Dourados" class="h-10 w-auto">
                    <h1 class="text-xl font-bold">SUS Connect</h1>
                </div>

                <div class="flex items-center space-x-4">
                    <span class="text-sm">Olá, <?php echo htmlspecialchars($user['email']); ?></span>
                    <a href="/logout.php" class="flex items-center space-x-1 text-blue-200 hover:text-white transition-colors">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        <span class="text-sm">Sair</span>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-6 py-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-blue-900 mb-4">SUS Connect</h2>
            <p class="text-xl text-gray-600 mb-2">Área Interna</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="/diabetes-report.php" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                <div class="p-6">
                    <div class="flex items-center justify-center mb-4">
                        <div class="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="text-white" width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-lg font-bold text-blue-900 text-center mb-2">Atenção Especializada</h3>
                    <p class="text-sm text-gray-600 text-center leading-relaxed">Relatórios de Diabéticos</p>
                </div>
            </a>
        </div>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow p-6 text-center">
                <div class="text-3xl font-bold text-blue-600 mb-2">1,247</div>
                <div class="text-sm text-gray-600">Atendimentos Hoje</div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 text-center">
                <div class="text-3xl font-bold text-green-600 mb-2">89%</div>
                <div class="text-sm text-gray-600">Cobertura Populacional</div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 text-center">
                <div class="text-3xl font-bold text-orange-600 mb-2">156</div>
                <div class="text-sm text-gray-600">Equipes Ativas</div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 text-center">
                <div class="text-3xl font-bold text-purple-600 mb-2">23</div>
                <div class="text-sm text-gray-600">Alertas Pendentes</div>
            </div>
        </div>
    </main>

    <footer class="bg-blue-950 mt-20">
        <div class="container mx-auto px-4 py-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="flex items-start space-x-4 mb-4 md:mb-0">
                    <img src="/assets/images/sems-logo.png" alt="SEMS" class="h-12 w-auto">
                    <div class="text-left">
                        <p class="text-blue-200 text-sm">© 2025 SUS Connect - Sistema de Monitoramento da Saúde</p>
                        <p class="text-blue-300 text-xs mt-1">Prefeitura Municipal de Dourados/MS</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
