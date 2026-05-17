<!-- Python Arcane: Ranking of Sages (Leaderboard) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Ranking of Sages - Python Arcane</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&amp;family=Hanken+Grotesk:wght@400&amp;family=JetBrains+Mono:wght@500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#ffffff",
                        "tertiary-fixed": "#ffdfa0",
                        "surface-variant": "#2d3449",
                        "primary-container": "#00fbfb",
                        "inverse-surface": "#dae2fd",
                        "error": "#ffb4ab",
                        "on-error-container": "#ffdad6",
                        "surface": "#0b1326",
                        "surface-container-highest": "#2d3449",
                        "secondary-container": "#7701d0",
                        "surface-container-low": "#131b2e",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-error": "#690005",
                        "secondary-fixed-dim": "#dcb8ff",
                        "on-secondary-fixed-variant": "#6700b5",
                        "on-tertiary-fixed": "#261a00",
                        "on-primary-container": "#007070",
                        "on-primary": "#003737",
                        "surface-dim": "#0b1326",
                        "tertiary-container": "#ffdfa0",
                        "secondary": "#dcb8ff",
                        "on-tertiary-container": "#815f00",
                        "surface-container": "#171f33",
                        "on-tertiary": "#402d00",
                        "secondary-fixed": "#efdbff",
                        "surface-bright": "#31394d",
                        "primary-fixed-dim": "#00dddd",
                        "error-container": "#93000a",
                        "primary-fixed": "#00fbfb",
                        "surface-container-high": "#222a3d",
                        "on-secondary-fixed": "#2c0051",
                        "inverse-on-surface": "#283044",
                        "on-background": "#dae2fd",
                        "tertiary-fixed-dim": "#fbbc00",
                        "outline": "#839493",
                        "on-primary-fixed": "#002020",
                        "on-secondary-container": "#dcb7ff",
                        "on-surface": "#dae2fd",
                        "inverse-primary": "#006a6a",
                        "surface-container-lowest": "#060e20",
                        "tertiary": "#ffffff",
                        "surface-tint": "#00dddd",
                        "on-primary-fixed-variant": "#004f4f",
                        "background": "#0b1326",
                        "on-surface-variant": "#b9cac9",
                        "on-secondary": "#480081",
                        "outline-variant": "#3a4a49"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "4px",
                        "margin-mobile": "16px",
                        "hud-padding": "12px",
                        "gutter": "24px",
                        "margin-desktop": "48px"
                    },
                    "fontFamily": {
                        "headline-md": ["Space Grotesk"],
                        "display-lg": ["Space Grotesk"],
                        "headline-sm": ["Space Grotesk"],
                        "body-lg": ["Hanken Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "label-caps": ["JetBrains Mono"]
                    },
                    "fontSize": {
                        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "code-md": ["14px", { "lineHeight": "20px", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen font-body-md overflow-x-hidden selection:bg-primary-container/30 selection:text-primary-fixed">
<!-- TopAppBar from JSON -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-container-low dark:bg-surface-container-low border-b border-outline-variant/30 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
<div class="font-display-lg text-display-lg text-primary-fixed tracking-tighter drop-shadow-[0_0_8px_rgba(0,251,251,0.6)]">
            PYTHON ARCANE
        </div>
<nav class="hidden md:flex gap-6">
<a class="text-on-surface-variant font-medium hover:text-primary-fixed-dim transition-colors duration-300" href="#">Level 12</a>
<a class="text-on-surface-variant font-medium hover:text-primary-fixed-dim transition-colors duration-300" href="#">Quest: Binary Serpent</a>
</nav>
<div class="flex items-center gap-4">
<button class="text-primary-fixed dark:text-primary-fixed-dim scale-98 active:opacity-80 transition-transform hover:text-primary-fixed-dim transition-colors duration-300">
<span class="material-symbols-outlined">favorite</span>
</button>
<button class="text-primary-fixed dark:text-primary-fixed-dim scale-98 active:opacity-80 transition-transform hover:text-primary-fixed-dim transition-colors duration-300">
<span class="material-symbols-outlined">bolt</span>
</button>
<button class="text-primary-fixed dark:text-primary-fixed-dim scale-98 active:opacity-80 transition-transform hover:text-primary-fixed-dim transition-colors duration-300">
<span class="material-symbols-outlined">payments</span>
</button>
</div>
</header>
<!-- SideNavBar from JSON -->
<aside class="fixed left-0 top-16 bottom-0 w-64 z-40 flex flex-col pt-8 bg-surface-container-lowest dark:bg-surface-container-lowest border-r border-outline-variant/20 bg-opacity-80 backdrop-blur-md hidden md:flex">
<div class="px-6 mb-8 flex flex-col items-center">
<div class="w-16 h-16 rounded-full bg-surface-container-high border-2 border-secondary mb-4 overflow-hidden relative">
<img alt="Archmage Avatar" class="object-cover w-full h-full" data-alt="A portrait of a futuristic wizard wearing a sleek, dark cyberpunk hood with subtle neon violet accents glowing around the edges. The wizard's face is partially obscured by shadows, revealing glowing cyan eyes that reflect a high-tech magical interface. The background is a blurred, dark grimoire environment with floating holographic code snippets. The overall aesthetic is mysterious, powerful, and deeply rooted in a dark sci-fi fantasy world." src="https://lh3.googleusercontent.com/aida-public/AB6AXuATntPhQQkRUB0piNTHji3qFikDpO35LwH_qMTMqM1kvxIddKy9Ov5PldjQOcMOWu3dwhoNUFprOLO1JwZuWgBg3as4Ikc4L5Hk5f_41BXt8T_tRmSxtHjDlqQBEGV-Vyr7S1aDpLB7hRsKJb_swaRjU389ViGrNG3njqJRTCjQVNk3Q8oWU0OKCBKi-fIOmPDb0hPZNs_7tnQMuPTot4xX-N9CiUQD6rmQ4SJiAsm0xOZMwnYd1UbCzmK4KzHw-zPexnnc4OpUKnuT"/>
</div>
<div class="font-headline-sm text-headline-sm text-secondary tracking-widest text-center">Master Syntax</div>
<div class="font-label-caps text-label-caps text-secondary dark:text-secondary-fixed mt-1 opacity-80 text-center">Level 12 Apprentice</div>
</div>
<nav class="flex-1 flex flex-col gap-2">
<a class="flex items-center gap-3 text-on-surface-variant p-3 opacity-60 hover:opacity-100 hover:bg-surface-variant/40 hover:text-on-surface transition-all duration-200 active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">auto_stories</span>
<span class="font-label-caps text-label-caps">Grimório</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant p-3 opacity-60 hover:opacity-100 hover:bg-surface-variant/40 hover:text-on-surface transition-all duration-200 active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">auto_fix_high</span>
<span class="font-label-caps text-label-caps">Trilha</span>
</a>
<a class="flex items-center gap-3 bg-secondary-container/20 text-secondary border-l-4 border-secondary p-3 shadow-[inset_0_0_12px_rgba(119,1,208,0.4)] active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">swords</span>
<span class="font-label-caps text-label-caps">Arena</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant p-3 opacity-60 hover:opacity-100 hover:bg-surface-variant/40 hover:text-on-surface transition-all duration-200 active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">pest_control</span>
<span class="font-label-caps text-label-caps">Bestiário</span>
</a>
</nav>
</aside>
<!-- Main Content Area -->
<main class="md:ml-64 pt-16 min-h-screen flex flex-col">
<!-- HUD Elements -->
<div class="absolute top-20 left-4 md:left-[272px] z-30 flex flex-col gap-2 pointer-events-none">
<div class="flex items-center gap-2">
<span class="font-code-md text-code-md text-error w-8 text-right drop-shadow-[0_0_4px_rgba(255,180,171,0.5)]">HP</span>
<div class="h-2 w-32 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/30">
<div class="h-full w-[80%] bg-gradient-to-r from-error-container to-error"></div>
</div>
</div>
<div class="flex items-center gap-2">
<span class="font-code-md text-code-md text-primary-fixed w-8 text-right drop-shadow-[0_0_4px_rgba(0,251,251,0.5)]">MP</span>
<div class="h-2 w-32 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/30">
<div class="h-full w-[45%] bg-gradient-to-r from-inverse-primary to-primary-fixed animate-pulse"></div>
</div>
</div>
</div>
<div class="absolute top-20 right-4 md:right-8 z-30 flex items-center gap-4 pointer-events-none">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary-fixed-dim drop-shadow-[0_0_4px_rgba(251,188,0,0.5)]">toll</span>
<span class="font-code-md text-code-md text-tertiary-fixed-dim drop-shadow-[0_0_4px_rgba(251,188,0,0.5)]">1,240</span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary drop-shadow-[0_0_4px_rgba(220,184,255,0.5)]">stars</span>
<span class="font-code-md text-code-md text-secondary drop-shadow-[0_0_4px_rgba(220,184,255,0.5)]">Level 12</span>
</div>
</div>
<!-- XP Bar -->
<div class="absolute top-16 left-0 w-full h-[2px] z-40 bg-surface-container">
<div class="h-full bg-tertiary-fixed-dim w-[65%] shadow-[0_0_8px_rgba(251,188,0,0.8)]"></div>
</div>
<div class="flex-1 p-gutter max-w-[1200px] w-full mx-auto mt-8">
<!-- Header Section -->
<div class="mb-12 text-center">
<h1 class="font-display-lg text-display-lg text-secondary tracking-tighter mb-4 drop-shadow-[0_0_12px_rgba(119,1,208,0.5)]">Ranking of Sages</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">The eternal hall of fame. Behold the Grandmasters who have woven the most complex spells in the Arcane Universe.</p>
<!-- Tabs -->
<div class="flex justify-center mt-8 gap-4">
<button class="px-6 py-2 bg-secondary-container/20 border border-secondary text-secondary font-label-caps text-label-caps rounded uppercase shadow-[inset_0_0_12px_rgba(119,1,208,0.4)] backdrop-blur-md">Global Ranking</button>
<button class="px-6 py-2 bg-surface-container border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps rounded uppercase hover:bg-surface-variant/40 hover:text-on-surface transition-colors">Guild Ranking</button>
</div>
</div>
<!-- Top 3 Pedestals -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-16 mt-16 px-4">
<!-- Rank 2 -->
<div class="flex flex-col items-center order-2 md:order-1 relative">
<div class="absolute -top-16 text-on-surface-variant opacity-20 font-display-lg text-[120px] font-bold leading-none select-none z-0">2</div>
<div class="w-24 h-24 rounded-full border-4 border-surface-variant overflow-hidden mb-4 relative z-10 shadow-[0_0_15px_rgba(45,52,73,0.5)] bg-surface">
<img alt="Player 2" class="w-full h-full object-cover" data-alt="A portrait of a wise cyber-mage with glowing digital tattoos on their face, set against a dark void. They wear an intricate midnight blue cloak woven with glowing silver threads. The lighting is dramatic, casting deep shadows while highlighting the cybernetic augments near their eyes. The mood is calm and calculating." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAScpIgVwCIHrskppUgDPLKJ5g1qoXxS-Hv5kfPT_110ObjMdGk_97ucHOUGzab7t0_noaurbCd4dNRWg9-sjHXXlck5Pm2iY8bz5RaWJY21n7oAKrr97tC5Eg1oB5mGI7QOCr031hnrrHfhvky2HI6ruyd1nZaQhXLbGy6pLrwmrrSrlgkeOkav02txlxRz64cB8bj3KRmVegHcpl9epakgeeTZCV3rCIs4W3E8t_4ezpvfd5p88KCWMz14FH6stQDlkSS1yCG9Udk"/>
</div>
<div class="bg-surface-container-high/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-4 w-full text-center relative z-10">
<div class="font-headline-sm text-headline-sm text-on-surface mb-1">NullPointer</div>
<div class="font-code-md text-code-md text-secondary mb-2">Grandmaster</div>
<div class="font-label-caps text-label-caps text-tertiary-fixed-dim">98,420 XP</div>
</div>
<div class="w-full h-32 bg-surface-container-lowest border-t border-x border-outline-variant/20 mt-4 rounded-t-lg relative overflow-hidden flex justify-center items-center opacity-80">
<div class="absolute inset-0 bg-gradient-to-t from-surface-variant/20 to-transparent"></div>
<span class="font-display-lg text-[48px] text-surface-variant font-bold">II</span>
</div>
</div>
<!-- Rank 1 -->
<div class="flex flex-col items-center order-1 md:order-2 relative -mt-12">
<div class="absolute -top-20 text-tertiary-fixed-dim opacity-20 font-display-lg text-[160px] font-bold leading-none select-none z-0">1</div>
<div class="absolute -top-10 z-20 material-symbols-outlined text-tertiary-fixed-dim text-4xl drop-shadow-[0_0_10px_rgba(251,188,0,0.8)]" style="font-variation-settings: 'FILL' 1;">workspace_premium</div>
<div class="w-32 h-32 rounded-full border-4 border-tertiary-fixed-dim overflow-hidden mb-4 relative z-10 shadow-[0_0_30px_rgba(251,188,0,0.4)] bg-surface">
<img alt="Player 1" class="w-full h-full object-cover" data-alt="A portrait of the ultimate tech-sorcerer, wearing a highly advanced dark obsidian helmet with an opaque cyan visor. Ethereal golden data streams orbit around their head like a digital halo. The background is pitch black, broken only by the intense, glowing gold and cyan lighting reflecting off the armor. The aesthetic is incredibly powerful and mysterious." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpF98w3yFl1cmSfNIFqlI9dSn0XW69XGbk61DftY3oGY1PaIqFaSn5cA7sds1QpcHFai-_QrG5Lt3ZgBMH9_V539QhDm5q5S8_3TaYB9SV2PdrUZbDmHpuh323JFTcCJ2fsPmNgHvifAR7gV7eIhixPsnv69AMppwHP9_l_TjyHGDaAmQuP8MpW7EyGri69wD2T6NQCN-sJx_p7CSFUGcqf7K4XEWJ4uCV0SUYx7pxbKGQl6phFLB3tnGrP_6IDsj8vJgkhovFuItb"/>
</div>
<div class="bg-surface-container-highest/90 backdrop-blur-xl border border-tertiary-fixed-dim/50 rounded-xl p-6 w-full text-center relative z-10 shadow-[inset_0_0_20px_rgba(251,188,0,0.1)]">
<div class="font-headline-sm text-headline-sm text-primary mb-1 drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">ByteWeaver</div>
<div class="font-code-md text-code-md text-secondary mb-2 drop-shadow-[0_0_4px_rgba(220,184,255,0.5)]">Arch-Grandmaster</div>
<div class="font-label-caps text-label-caps text-tertiary-fixed-dim text-lg">112,050 XP</div>
</div>
<div class="w-full h-40 bg-surface-container-lowest border-t-2 border-x border-tertiary-fixed-dim/30 mt-4 rounded-t-xl relative overflow-hidden flex justify-center items-center shadow-[0_-10px_30px_rgba(251,188,0,0.1)]">
<div class="absolute inset-0 bg-gradient-to-t from-tertiary-fixed-dim/10 to-transparent"></div>
<span class="font-display-lg text-[64px] text-tertiary-fixed-dim/30 font-bold">I</span>
</div>
</div>
<!-- Rank 3 -->
<div class="flex flex-col items-center order-3 md:order-3 relative">
<div class="absolute -top-16 text-on-surface-variant opacity-20 font-display-lg text-[120px] font-bold leading-none select-none z-0">3</div>
<div class="w-24 h-24 rounded-full border-4 border-surface-variant overflow-hidden mb-4 relative z-10 shadow-[0_0_15px_rgba(45,52,73,0.5)] bg-surface">
<img alt="Player 3" class="w-full h-full object-cover" data-alt="A portrait of a fierce female spell-coder, sporting short, sharp dark hair and glowing violet cybernetic implants on her neck. She wears a minimalist, dark gray high-collared jacket. Soft, cool cyan light illuminates one side of her face, while deep purple shadows fall on the other. The setting is a dark, sleek laboratory environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpJBiOh0Hh7pK4GqZq5V9X1aMKoMWyNIxcWwBct-te_Cu6yUtoYlXFLQfkjqGCwI3Iofm_hgude6o6D2sRyMbhNlC4s7HnbSAufUic8xiiT2p9LGXrvk916RhcI7ZgBw7GWcWxu2E3cs_a_f233j9BPthANvARQr_QxwHn7JV-UMuqOI325YjGWrYvtEK4jY1OWH_IJqIPm23CHWMEM46fppOE9w9b1Ni3DgLtZfTyQaeJXOFlIQuLpzbDb2jTZExe4ELO6cM5tQC6"/>
</div>
<div class="bg-surface-container-high/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-4 w-full text-center relative z-10">
<div class="font-headline-sm text-headline-sm text-on-surface mb-1">LoopCrafter</div>
<div class="font-code-md text-code-md text-secondary mb-2">Grandmaster</div>
<div class="font-label-caps text-label-caps text-tertiary-fixed-dim">94,100 XP</div>
</div>
<div class="w-full h-24 bg-surface-container-lowest border-t border-x border-outline-variant/20 mt-4 rounded-t-lg relative overflow-hidden flex justify-center items-center opacity-80">
<div class="absolute inset-0 bg-gradient-to-t from-surface-variant/20 to-transparent"></div>
<span class="font-display-lg text-[40px] text-surface-variant font-bold">III</span>
</div>
</div>
</div>
<!-- List Ranking -->
<div class="bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl overflow-hidden mb-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
<!-- List Header -->
<div class="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/30 bg-surface-container/50 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
<div class="col-span-1 text-center">Rank</div>
<div class="col-span-4 md:col-span-5">Mage Name</div>
<div class="col-span-2 text-center hidden md:block">Level</div>
<div class="col-span-3 md:col-span-2 text-right">Total XP</div>
<div class="col-span-4 md:col-span-2 text-center">Badges</div>
</div>
<!-- List Items -->
<div class="flex flex-col">
<!-- Item 4 -->
<div class="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/10 items-center hover:bg-surface-variant/20 transition-colors group">
<div class="col-span-1 font-code-md text-code-md text-on-surface-variant text-center">4</div>
<div class="col-span-4 md:col-span-5 flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-variant overflow-hidden flex-shrink-0">
<img alt="Player 4" class="w-full h-full object-cover" data-alt="A small avatar portrait of a mysterious tech user in a dark grey hood, face obscured by shadow. A faint cyan glow outlines their silhouette against a pitch-black background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn8h3Hhd9adDmM9ZOTKSwuTzRXZHAHlJ-RACFjAgS036aWMu5etaUtU_8k_Q_iMTfvF36ZQD1CCaa9WYEv6_G2kvFy4GnZDJnJbltrXoamZkic-pKMSxZN53E10mn8RK6GC7Y7BMMzSEzkln1woQ55OtBNvpF2qTSZPcWOm-0okkxNuMYiP5jwCzVLhmIS5ODKjURSZxKPBuYbF23mvvR03Wt4KJGbZj7aVH9HM-FKUOhwAemGSzDppZ4bEaIj5kHPh4MRzIgbMqMX"/>
</div>
<span class="font-body-lg text-body-lg text-on-surface group-hover:text-primary-fixed transition-colors">VoidCaller</span>
</div>
<div class="col-span-2 text-center font-code-md text-code-md text-secondary hidden md:block">Lvl 98</div>
<div class="col-span-3 md:col-span-2 text-right font-code-md text-code-md text-tertiary-fixed-dim">89,200</div>
<div class="col-span-4 md:col-span-2 flex justify-center gap-1 text-secondary">
<span class="material-symbols-outlined text-sm">local_fire_department</span>
<span class="material-symbols-outlined text-sm">bolt</span>
<span class="material-symbols-outlined text-sm opacity-30">ac_unit</span>
</div>
</div>
<!-- Item 5 -->
<div class="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/10 items-center hover:bg-surface-variant/20 transition-colors group">
<div class="col-span-1 font-code-md text-code-md text-on-surface-variant text-center">5</div>
<div class="col-span-4 md:col-span-5 flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-variant overflow-hidden flex-shrink-0">
<img alt="Player 5" class="w-full h-full object-cover" data-alt="A small avatar portrait of a female user with bright silver hair and glowing cyan eyes, wearing a dark turtleneck. The background is a deep, dark obsidian texture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlSFnV0ZRJ801yt2OlMTCT0AXVle5qLKdn6fC4WTNbtULTQ2WDSrNBGSSxvxDEkCaE-vpZWx4dyfmR2-5WtGyAT-nvUwJDxv-b-iUsu74P6qZdxgMauIUBwGFY6hpQ8b6hqiBZGIhHFSfLi5shoXBzKVWwByGHLTft-VJt3Dld40fv4mWZgMV4VFQzm5Ks5xgDchXUXPZb8zirrMHYuzqA26dgP06ZLJz8bQyeLohhM3yrGlB6vbHiB9YUf571r54OHxczlOKq6qAP"/>
</div>
<span class="font-body-lg text-body-lg text-on-surface group-hover:text-primary-fixed transition-colors">SyntaxSorceress</span>
</div>
<div class="col-span-2 text-center font-code-md text-code-md text-secondary hidden md:block">Lvl 95</div>
<div class="col-span-3 md:col-span-2 text-right font-code-md text-code-md text-tertiary-fixed-dim">85,450</div>
<div class="col-span-4 md:col-span-2 flex justify-center gap-1 text-secondary">
<span class="material-symbols-outlined text-sm">auto_awesome</span>
<span class="material-symbols-outlined text-sm opacity-30">bolt</span>
<span class="material-symbols-outlined text-sm opacity-30">ac_unit</span>
</div>
</div>
<!-- ... Gap ... -->
<div class="p-4 text-center text-outline-variant">
<span class="material-symbols-outlined">more_vert</span>
</div>
<!-- Current User Highlight (Rank 12) -->
<div class="grid grid-cols-12 gap-4 p-4 border border-secondary bg-secondary-container/10 items-center shadow-[inset_0_0_20px_rgba(119,1,208,0.2)] group relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary shadow-[0_0_10px_rgba(220,184,255,0.8)]"></div>
<div class="col-span-1 font-code-md text-code-md text-secondary text-center font-bold">12</div>
<div class="col-span-4 md:col-span-5 flex items-center gap-3">
<div class="w-10 h-10 rounded-full border-2 border-secondary bg-surface-variant overflow-hidden flex-shrink-0 relative">
<img alt="Current User" class="w-full h-full object-cover" data-alt="A portrait of a futuristic wizard wearing a sleek, dark cyberpunk hood with subtle neon violet accents glowing around the edges. The wizard's face is partially obscured by shadows, revealing glowing cyan eyes that reflect a high-tech magical interface. The background is a blurred, dark grimoire environment with floating holographic code snippets. The overall aesthetic is mysterious, powerful, and deeply rooted in a dark sci-fi fantasy world." src="https://lh3.googleusercontent.com/aida-public/AB6AXuALp_v1GVkthqOyCJrOnmsOG77DYSD3EX0CrolHkFW2ZaUZWlBuDmP-R1wAmEY3mUBvNIrrRijOI5JnnTOcNIf0o9LhWzZdCfKSEqj1EEnjeIxeMaMwlaKmKJLLuGX7dI3qGFin63oT5CkCZnW7V07wcIUSwiFeJoe72-86q5l6YlfH71vhyzvG75Z36qssOuwiP1EnV2ueIkInySwsnULg_gqxrCFPF9G4mbjwsrCkzy7HiBo0yRh9qT6ehx_iAVDFnxdFgP9GdSGO"/>
</div>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm text-secondary drop-shadow-[0_0_4px_rgba(220,184,255,0.5)]">Master Syntax</span>
<span class="font-label-caps text-label-caps text-on-surface-variant">Archmage (You)</span>
</div>
</div>
<div class="col-span-2 text-center font-code-md text-code-md text-secondary font-bold hidden md:block">Lvl 82</div>
<div class="col-span-3 md:col-span-2 text-right font-code-md text-code-md text-tertiary-fixed-dim font-bold">64,300</div>
<div class="col-span-4 md:col-span-2 flex justify-center gap-1 text-secondary drop-shadow-[0_0_4px_rgba(220,184,255,0.6)]">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="material-symbols-outlined text-sm">menu_book</span>
<span class="material-symbols-outlined text-sm">code</span>
</div>
</div>
<!-- Item 13 -->
<div class="grid grid-cols-12 gap-4 p-4 border-t border-outline-variant/10 items-center hover:bg-surface-variant/20 transition-colors group">
<div class="col-span-1 font-code-md text-code-md text-on-surface-variant text-center">13</div>
<div class="col-span-4 md:col-span-5 flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-variant overflow-hidden flex-shrink-0">
<img alt="Player 13" class="w-full h-full object-cover" data-alt="A small avatar portrait of a generic tech user in a dimly lit server room. Dark shadows obscure features, minimal cool blue lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp7AMIzUsqtAET3oeuCt4bGJq1UnR4zbiGbwFdoIKMBvMB4ORetAurN-bFxgDBzEC8n9vwTLx1G3Al3b0DnHs4Npfun11G0gwNoS38oweVUZ8oruY3__W5Hh0yqE1lH4b1YaxZEV_uDcRUrDA3LYY7Jld2pg8HRoqIV7rEjPWZkQ6OyvOU02eJZLy4tdjGxXSkodT2e2dkQzaXJWH4PBfOjg6repvFjM_AlZzudVhaTfnOopLNCe2j4T9HqWfLB-XrAEF1rQsQ-E8D"/>
</div>
<span class="font-body-lg text-body-lg text-on-surface group-hover:text-primary-fixed transition-colors">CodeAlchemist</span>
</div>
<div class="col-span-2 text-center font-code-md text-code-md text-secondary hidden md:block">Lvl 81</div>
<div class="col-span-3 md:col-span-2 text-right font-code-md text-code-md text-tertiary-fixed-dim">63,900</div>
<div class="col-span-4 md:col-span-2 flex justify-center gap-1 text-secondary">
<span class="material-symbols-outlined text-sm">science</span>
<span class="material-symbols-outlined text-sm opacity-30">bolt</span>
<span class="material-symbols-outlined text-sm opacity-30">ac_unit</span>
</div>
</div>
</div>
</div>
<!-- Pagination/Action -->
<div class="flex justify-center mb-16">
<button class="px-8 py-3 bg-surface-container-high border border-outline-variant/30 text-primary-fixed font-label-caps text-label-caps rounded flex items-center gap-2 hover:bg-surface-variant/50 hover:shadow-[0_0_15px_rgba(0,251,251,0.2)] transition-all">
                    Load More Sages
                    <span class="material-symbols-outlined text-sm">expand_more</span>
</button>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Reliquary of Power (Inventory) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Reliquary of Power - PYTHON ARCANE</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&amp;family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&amp;family=Space+Grotesk:wght@300..700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "primary": "#ffffff",
                      "tertiary-fixed": "#ffdfa0",
                      "surface-variant": "#2d3449",
                      "primary-container": "#00fbfb",
                      "inverse-surface": "#dae2fd",
                      "error": "#ffb4ab",
                      "on-error-container": "#ffdad6",
                      "surface": "#0b1326",
                      "surface-container-highest": "#2d3449",
                      "secondary-container": "#7701d0",
                      "surface-container-low": "#131b2e",
                      "on-tertiary-fixed-variant": "#5c4300",
                      "on-error": "#690005",
                      "secondary-fixed-dim": "#dcb8ff",
                      "on-secondary-fixed-variant": "#6700b5",
                      "on-tertiary-fixed": "#261a00",
                      "on-primary-container": "#007070",
                      "on-primary": "#003737",
                      "surface-dim": "#0b1326",
                      "tertiary-container": "#ffdfa0",
                      "secondary": "#dcb8ff",
                      "on-tertiary-container": "#815f00",
                      "surface-container": "#171f33",
                      "on-tertiary": "#402d00",
                      "secondary-fixed": "#efdbff",
                      "surface-bright": "#31394d",
                      "primary-fixed-dim": "#00dddd",
                      "error-container": "#93000a",
                      "primary-fixed": "#00fbfb",
                      "surface-container-high": "#222a3d",
                      "on-secondary-fixed": "#2c0051",
                      "inverse-on-surface": "#283044",
                      "on-background": "#dae2fd",
                      "tertiary-fixed-dim": "#fbbc00",
                      "outline": "#839493",
                      "on-primary-fixed": "#002020",
                      "on-secondary-container": "#dcb7ff",
                      "on-surface": "#dae2fd",
                      "inverse-primary": "#006a6a",
                      "surface-container-lowest": "#060e20",
                      "tertiary": "#ffffff",
                      "surface-tint": "#00dddd",
                      "on-primary-fixed-variant": "#004f4f",
                      "background": "#0b1326",
                      "on-surface-variant": "#b9cac9",
                      "on-secondary": "#480081",
                      "outline-variant": "#3a4a49"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "unit": "4px",
                      "margin-mobile": "16px",
                      "hud-padding": "12px",
                      "gutter": "24px",
                      "margin-desktop": "48px"
              },
              "fontFamily": {
                      "headline-md": [
                              "Space Grotesk"
                      ],
                      "display-lg": [
                              "Space Grotesk"
                      ],
                      "headline-sm": [
                              "Space Grotesk"
                      ],
                      "body-lg": [
                              "Hanken Grotesk"
                      ],
                      "code-md": [
                              "JetBrains Mono"
                      ],
                      "body-md": [
                              "Hanken Grotesk"
                      ],
                      "label-caps": [
                              "JetBrains Mono"
                      ]
              },
              "fontSize": {
                      "headline-md": [
                              "32px",
                              {
                                      "lineHeight": "40px",
                                      "fontWeight": "600"
                              }
                      ],
                      "display-lg": [
                              "48px",
                              {
                                      "lineHeight": "56px",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "700"
                              }
                      ],
                      "headline-sm": [
                              "24px",
                              {
                                      "lineHeight": "32px",
                                      "fontWeight": "600"
                              }
                      ],
                      "body-lg": [
                              "18px",
                              {
                                      "lineHeight": "28px",
                                      "fontWeight": "400"
                              }
                      ],
                      "code-md": [
                              "14px",
                              {
                                      "lineHeight": "20px",
                                      "fontWeight": "500"
                              }
                      ],
                      "body-md": [
                              "16px",
                              {
                                      "lineHeight": "24px",
                                      "fontWeight": "400"
                              }
                      ],
                      "label-caps": [
                              "12px",
                              {
                                      "lineHeight": "16px",
                                      "letterSpacing": "0.1em",
                                      "fontWeight": "700"
                              }
                      ]
              }
            }
          }
        }
      </script>
<style>
        body {
            background-color: #020617; /* Base void color */
            color: theme('colors.on-surface');
        }
        .glass-panel {
            background-color: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
        }
        .hud-bar-hp {
            background: linear-gradient(90deg, theme('colors.error-container'), theme('colors.error'));
        }
        .hud-bar-mana {
            background: linear-gradient(90deg, theme('colors.primary-fixed-dim'), theme('colors.primary-fixed'));
        }
      </style>
</head>
<body class="font-body-md text-body-md min-h-screen overflow-x-hidden flex">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-container-low dark:bg-surface-container-low border-b border-outline-variant/30 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
<div class="font-display-lg text-display-lg text-primary-fixed tracking-tighter drop-shadow-[0_0_8px_rgba(0,251,251,0.6)]">
            PYTHON ARCANE
        </div>
<nav class="hidden md:flex gap-6 h-full items-end">
<a class="text-on-surface-variant font-medium hover:text-primary-fixed-dim transition-colors duration-300 pb-1" href="#">
                Level 12
            </a>
<a class="text-on-surface-variant font-medium hover:text-primary-fixed-dim transition-colors duration-300 pb-1" href="#">
                Quest: Binary Serpent
            </a>
<a class="text-primary-fixed font-bold border-b-2 border-primary-fixed pb-1 hover:text-primary-fixed-dim transition-colors duration-300" href="#">
                Reliquary of Power
            </a>
</nav>
<div class="flex items-center gap-4 text-primary-fixed dark:text-primary-fixed-dim">
<button class="scale-98 active:opacity-80 transition-transform hover:text-primary-fixed-dim duration-300">
<span class="material-symbols-outlined">favorite</span>
</button>
<button class="scale-98 active:opacity-80 transition-transform hover:text-primary-fixed-dim duration-300">
<span class="material-symbols-outlined">bolt</span>
</button>
<button class="scale-98 active:opacity-80 transition-transform hover:text-primary-fixed-dim duration-300">
<span class="material-symbols-outlined">payments</span>
</button>
</div>
</header>
<!-- SideNavBar -->
<aside class="fixed left-0 top-16 bottom-0 w-64 z-40 flex flex-col pt-8 bg-surface-container-lowest dark:bg-surface-container-lowest border-r border-outline-variant/20 bg-opacity-80 backdrop-blur-md">
<div class="px-6 mb-8 flex flex-col items-center">
<div class="w-20 h-20 rounded-full border-2 border-secondary p-1 mb-4 relative shadow-[0_0_15px_rgba(119,1,208,0.3)]">
<img alt="Archmage Avatar" class="w-full h-full object-cover rounded-full" data-alt="A highly detailed portrait of a cyberpunk wizard in a dark, neon-lit environment. The character is wearing futuristic robes with glowing cyan and violet circuitry patterns. The mood is mysterious and powerful, typical of an advanced Arcane Digitalis aesthetic. Soft, directional light highlights the metallic elements of their gear." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhRAgD_SoYDiAIwCb3HwFOhA2FOY-bMs6yypXX-3ib2eryCRHdYsud_Sd6oEhVdvoMpVsXI--nXxJaSCknB78OlQghybdJDA85HoX1Mll9zUT4E2oR0RSHbDZcbqX5XYaj3RXkM8wygqjrUtHq7h02GrQmPQWO9ff8PKeto_oJYkdyt4rhYabyPkRBhJt7aPxKNdGADLxiyZ5tSj6RB70fkswuVmeXpsZ00r9eoMIPmoiVT8ndrD35T3mYyYogHifDrpxIamksG4iZ"/>
</div>
<h2 class="font-headline-sm text-headline-sm text-secondary tracking-widest text-center">Master Syntax</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Level 42 Archmage</p>
</div>
<nav class="flex-1 flex flex-col gap-2">
<a class="flex items-center gap-3 text-on-surface-variant p-3 opacity-60 hover:opacity-100 hover:bg-surface-variant/40 hover:text-on-surface transition-all duration-200 active:translate-x-1" href="#">
<span class="material-symbols-outlined">auto_stories</span>
<span class="font-body-md text-body-md">Grimório</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant p-3 opacity-60 hover:opacity-100 hover:bg-surface-variant/40 hover:text-on-surface transition-all duration-200 active:translate-x-1" href="#">
<span class="material-symbols-outlined">auto_fix_high</span>
<span class="font-body-md text-body-md">Trilha</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant p-3 opacity-60 hover:opacity-100 hover:bg-surface-variant/40 hover:text-on-surface transition-all duration-200 active:translate-x-1" href="#">
<span class="material-symbols-outlined">swords</span>
<span class="font-body-md text-body-md">Arena</span>
</a>
<a class="flex items-center gap-3 bg-secondary-container/20 text-secondary border-l-4 border-secondary p-3 shadow-[inset_0_0_12px_rgba(119,1,208,0.4)] active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">pest_control</span>
<span class="font-body-md text-body-md">Bestiário</span>
</a>
</nav>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 mt-16 p-gutter flex-1 relative min-h-screen">
<!-- XP Bar (Top Edge) -->
<div class="absolute top-0 left-0 right-0 h-1 bg-surface-variant">
<div class="h-full bg-tertiary-fixed-dim w-3/4 shadow-[0_0_8px_rgba(251,188,0,0.8)]"></div>
</div>
<!-- HUD Layer (Absolute positioning) -->
<div class="absolute top-gutter left-gutter flex flex-col gap-unit w-64">
<!-- HP Bar -->
<div class="flex items-center gap-2">
<span class="font-label-caps text-label-caps text-on-surface-variant w-8">HP</span>
<div class="flex-1 h-3 bg-surface-container-high rounded overflow-hidden border border-outline-variant/30">
<div class="h-full hud-bar-hp w-[85%]"></div>
</div>
</div>
<!-- Mana Bar -->
<div class="flex items-center gap-2">
<span class="font-label-caps text-label-caps text-on-surface-variant w-8">MP</span>
<div class="flex-1 h-3 bg-surface-container-high rounded overflow-hidden border border-outline-variant/30">
<div class="h-full hud-bar-mana w-[40%] animate-pulse"></div>
</div>
</div>
</div>
<div class="absolute top-gutter right-gutter flex gap-6 text-right">
<div>
<div class="font-label-caps text-label-caps text-on-surface-variant">Golden Syntax</div>
<div class="font-code-md text-code-md text-tertiary-fixed-dim drop-shadow-[0_0_5px_rgba(251,188,0,0.5)]">14,250</div>
</div>
<div>
<div class="font-label-caps text-label-caps text-on-surface-variant">Next Level</div>
<div class="font-code-md text-code-md text-on-surface">8,400 XP</div>
</div>
</div>
<!-- Central Content Container -->
<div class="max-w-[1200px] mx-auto mt-24 flex gap-gutter">
<!-- Left Sidebar: Equipped Spells -->
<div class="w-1/3 flex flex-col gap-6">
<div class="glass-panel p-6 rounded-lg border border-outline-variant/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
<h3 class="font-headline-sm text-headline-sm text-primary mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-secondary">flash_on</span>
                        Equipped Spells
                    </h3>
<div class="flex flex-col gap-4">
<!-- Spell Card -->
<div class="bg-surface-container-highest/50 p-4 rounded border border-secondary/20 hover:border-secondary/50 transition-colors group cursor-pointer">
<div class="flex justify-between items-start mb-2">
<h4 class="font-code-md text-code-md text-secondary group-hover:text-secondary-fixed transition-colors">def cast_fireball():</h4>
<span class="font-label-caps text-label-caps text-primary-fixed bg-primary-fixed/10 px-2 py-1 rounded">50 MP</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">Deals high AoE damage to syntax errors.</p>
</div>
<!-- Spell Card -->
<div class="bg-surface-container-highest/50 p-4 rounded border border-primary-container/20 hover:border-primary-container/50 transition-colors group cursor-pointer">
<div class="flex justify-between items-start mb-2">
<h4 class="font-code-md text-code-md text-primary-fixed group-hover:text-primary-fixed-dim transition-colors">import os.shield</h4>
<span class="font-label-caps text-label-caps text-primary-fixed bg-primary-fixed/10 px-2 py-1 rounded">25 MP</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">Creates a barrier against untrusted inputs.</p>
</div>
</div>
</div>
<!-- Player Stats Card -->
<div class="glass-panel p-6 rounded-lg border border-outline-variant/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
<h3 class="font-headline-sm text-headline-sm text-primary mb-4">Player Status</h3>
<div class="grid grid-cols-2 gap-4">
<div class="bg-surface-container/50 p-3 rounded border border-outline-variant/10 text-center">
<div class="font-label-caps text-label-caps text-on-surface-variant mb-1">Intelligence</div>
<div class="font-headline-md text-headline-md text-primary">85</div>
</div>
<div class="bg-surface-container/50 p-3 rounded border border-outline-variant/10 text-center">
<div class="font-label-caps text-label-caps text-on-surface-variant mb-1">Wisdom</div>
<div class="font-headline-md text-headline-md text-secondary">62</div>
</div>
</div>
</div>
</div>
<!-- Right Main Area: Reliquary Grid -->
<div class="w-2/3 glass-panel p-8 rounded-xl border border-primary-fixed/20 shadow-[inset_0_0_30px_rgba(0,251,251,0.05)] relative overflow-hidden">
<!-- Decorative background elements -->
<div class="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/5 rounded-full blur-[100px] pointer-events-none"></div>
<div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
<div class="flex justify-between items-end mb-8 border-b border-outline-variant/20 pb-4 relative z-10">
<div>
<h1 class="font-display-lg text-display-lg text-primary tracking-tight">Reliquary of Power</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">Manage your artifacts and arcane items.</p>
</div>
<div class="flex gap-2">
<button class="p-2 bg-surface-container rounded border border-outline-variant/30 text-on-surface hover:text-primary-fixed transition-colors">
<span class="material-symbols-outlined">filter_list</span>
</button>
<button class="p-2 bg-surface-container rounded border border-outline-variant/30 text-on-surface hover:text-primary-fixed transition-colors">
<span class="material-symbols-outlined">sort</span>
</button>
</div>
</div>
<!-- Bento Grid for Items -->
<div class="grid grid-cols-3 gap-6 relative z-10">
<!-- Item 1: fstring-pro -->
<div class="aspect-square bg-surface-container-highest rounded-lg border border-tertiary-fixed-dim/30 p-4 flex flex-col items-center justify-center gap-4 hover:shadow-[0_0_20px_rgba(251,188,0,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden">
<div class="absolute inset-0 bg-tertiary-fixed-dim/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="w-16 h-16 rounded-full border border-tertiary-fixed-dim/50 flex items-center justify-center text-tertiary-fixed-dim drop-shadow-[0_0_8px_rgba(251,188,0,0.6)] group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">code_blocks</span>
</div>
<div class="text-center relative z-10">
<h3 class="font-code-md text-code-md text-primary mb-1">fstring-pro</h3>
<span class="font-label-caps text-label-caps text-tertiary-fixed-dim">Superpower</span>
</div>
</div>
<!-- Item 2: regra-clara -->
<div class="aspect-square bg-surface-container-highest rounded-lg border border-secondary/30 p-4 flex flex-col items-center justify-center gap-4 hover:shadow-[0_0_20px_rgba(220,184,255,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden shadow-[inset_0_0_15px_rgba(119,1,208,0.2)]">
<div class="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="w-16 h-16 rounded-full border border-secondary/50 flex items-center justify-center text-secondary drop-shadow-[0_0_8px_rgba(220,184,255,0.6)] group-hover:scale-110 transition-transform relative">
<!-- Runic pulse effect simulation via box shadow -->
<div class="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(220,184,255,0.5)] animate-pulse"></div>
<span class="material-symbols-outlined text-4xl relative z-10" style="font-variation-settings: 'FILL' 1;">rule</span>
</div>
<div class="text-center relative z-10">
<h3 class="font-code-md text-code-md text-primary mb-1">regra-clara</h3>
<span class="font-label-caps text-label-caps text-secondary">Superpower</span>
</div>
</div>
<!-- Item 3: Mana Crystal -->
<div class="aspect-square bg-surface-container-highest rounded-lg border border-primary-fixed/30 p-4 flex flex-col items-center justify-center gap-4 hover:shadow-[0_0_20px_rgba(0,251,251,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden">
<div class="absolute inset-0 bg-primary-fixed/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="w-16 h-16 rounded-full border border-primary-fixed/50 flex items-center justify-center text-primary-fixed drop-shadow-[0_0_8px_rgba(0,251,251,0.6)] group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">diamond</span>
</div>
<div class="text-center relative z-10">
<h3 class="font-code-md text-code-md text-primary mb-1">Mana Crystal</h3>
<span class="font-label-caps text-label-caps text-primary-fixed">Consumable</span>
</div>
<div class="absolute top-2 right-2 bg-surface-variant text-on-surface-variant font-code-md text-xs px-2 py-0.5 rounded">x12</div>
</div>
<!-- Item 4: Empty Slot -->
<div class="aspect-square bg-surface-container/30 rounded-lg border border-outline-variant/20 border-dashed p-4 flex items-center justify-center opacity-50 hover:opacity-100 hover:border-outline-variant/50 transition-all duration-300 cursor-pointer">
<span class="material-symbols-outlined text-on-surface-variant text-4xl">add</span>
</div>
<!-- Item 5: Empty Slot -->
<div class="aspect-square bg-surface-container/30 rounded-lg border border-outline-variant/20 border-dashed p-4 flex items-center justify-center opacity-50 hover:opacity-100 hover:border-outline-variant/50 transition-all duration-300 cursor-pointer">
<span class="material-symbols-outlined text-on-surface-variant text-4xl">add</span>
</div>
<!-- Item 6: Empty Slot -->
<div class="aspect-square bg-surface-container/30 rounded-lg border border-outline-variant/20 border-dashed p-4 flex items-center justify-center opacity-50 hover:opacity-100 hover:border-outline-variant/50 transition-all duration-300 cursor-pointer">
<span class="material-symbols-outlined text-on-surface-variant text-4xl">add</span>
</div>
</div>
<!-- Oracle Console (Lower area of Reliquary) -->
<div class="mt-8 bg-[#0a0a0a] border border-outline-variant/30 rounded p-4 font-code-md text-code-md shadow-inner">
<div class="flex items-center gap-2 mb-2 text-outline">
<span class="material-symbols-outlined text-sm">terminal</span>
<span>Oracle Console v4.2</span>
</div>
<div class="text-primary-fixed-dim">
                        &gt; Scanning inventory slots...<br/>
                        &gt; 3 active artifacts detected.<br/>
                        &gt; System optimal. Mana reserves acceptable.<br/>
<span class="text-primary mt-2 inline-block">_</span>
</div>
</div>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: The Grimoire (Library) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Grimoire - Python Arcane</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&amp;family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&amp;family=Space+Grotesk:wght@300..700&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        /* HUD Grid background */
        body {
            background-image: 
                linear-gradient(to right, rgba(0, 251, 251, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 251, 251, 0.03) 1px, transparent 1px);
            background-size: 24px 24px;
        }
        /* Custom scrollbar for grimoire */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0b1326; 
        }
        ::-webkit-scrollbar-thumb {
            background: #2d3449; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #00dddd; 
        }
    </style>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-fixed": "#002020",
                        "on-primary": "#003737",
                        "tertiary-container": "#ffdfa0",
                        "on-surface": "#dae2fd",
                        "secondary-fixed-dim": "#dcb8ff",
                        "secondary-container": "#7701d0",
                        "inverse-on-surface": "#283044",
                        "surface-dim": "#0b1326",
                        "tertiary-fixed": "#ffdfa0",
                        "surface-bright": "#31394d",
                        "surface-container-highest": "#2d3449",
                        "tertiary-fixed-dim": "#fbbc00",
                        "on-tertiary-fixed": "#261a00",
                        "error-container": "#93000a",
                        "on-secondary": "#480081",
                        "primary-container": "#00fbfb",
                        "on-secondary-fixed": "#2c0051",
                        "on-tertiary": "#402d00",
                        "on-tertiary-container": "#815f00",
                        "surface-variant": "#2d3449",
                        "primary": "#ffffff",
                        "surface-tint": "#00dddd",
                        "secondary-fixed": "#efdbff",
                        "on-error": "#690005",
                        "primary-fixed-dim": "#00dddd",
                        "on-primary-container": "#007070",
                        "background": "#0b1326",
                        "surface-container-high": "#222a3d",
                        "primary-fixed": "#00fbfb",
                        "outline-variant": "#3a4a49",
                        "on-secondary-container": "#dcb7ff",
                        "secondary": "#dcb8ff",
                        "error": "#ffb4ab",
                        "tertiary": "#ffffff",
                        "surface": "#0b1326",
                        "surface-container": "#171f33",
                        "inverse-surface": "#dae2fd",
                        "inverse-primary": "#006a6a",
                        "surface-container-lowest": "#060e20",
                        "on-surface-variant": "#b9cac9",
                        "on-secondary-fixed-variant": "#6700b5",
                        "outline": "#839493",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-background": "#dae2fd",
                        "on-primary-fixed-variant": "#004f4f",
                        "surface-container-low": "#131b2e",
                        "on-error-container": "#ffdad6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "4px",
                        "margin-desktop": "48px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "hud-padding": "12px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-caps": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "headline-sm": ["Space Grotesk"],
                        "body-lg": ["Hanken Grotesk"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700"}],
                        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "code-md": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen overflow-hidden flex selection:bg-primary-container selection:text-on-primary-container">
<!-- XP Tracker (HUD) -->
<div class="fixed top-0 left-0 w-full h-[2px] bg-surface-container-highest z-[60]">
<div class="h-full bg-tertiary-fixed-dim w-1/3 drop-shadow-[0_0_8px_rgba(251,188,0,0.8)]"></div>
</div>
<!-- TopAppBar -->
<nav class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-[48px] h-16 bg-surface/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] mt-[2px]">
<!-- Brand -->
<div class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)] flex items-center gap-3">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
            Python Arcane
        </div>
<!-- Trailing Actions -->
<div class="flex items-center gap-6">
<!-- HP/Mana pseudo HUD in header -->
<div class="hidden lg:flex items-center gap-4 mr-8 border-r border-outline-variant/50 pr-8">
<div class="flex flex-col gap-1 w-32">
<div class="flex justify-between font-label-caps text-[10px] text-error">
<span>HP</span><span>100/100</span>
</div>
<div class="h-2 bg-surface-container-highest rounded-full overflow-hidden border border-error/20">
<div class="h-full bg-gradient-to-r from-error-container to-error w-full"></div>
</div>
</div>
<div class="flex flex-col gap-1 w-32">
<div class="flex justify-between font-label-caps text-[10px] text-primary-container drop-shadow-[0_0_5px_rgba(0,251,251,0.5)]">
<span>MP</span><span>85/120</span>
</div>
<div class="h-2 bg-surface-container-highest rounded-full overflow-hidden border border-primary-container/20">
<div class="h-full bg-gradient-to-r from-inverse-primary to-primary-container w-[70%]"></div>
</div>
</div>
</div>
<!-- Icons from JSON -->
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300 relative group">
<span class="material-symbols-outlined" data-icon="bolt">bolt</span>
<span class="absolute inset-0 bg-primary-container/20 rounded-full scale-0 group-hover:scale-150 transition-transform blur-md"></span>
</button>
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300 relative group">
<span class="material-symbols-outlined" data-icon="auto_fix_high">auto_fix_high</span>
</button>
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300 flex items-center gap-2 group">
<span class="material-symbols-outlined text-tertiary-fixed-dim drop-shadow-[0_0_5px_rgba(251,188,0,0.5)]" data-icon="monetization_on">monetization_on</span>
<span class="font-label-caps text-label-caps text-tertiary-fixed-dim">450G</span>
</button>
</div>
</nav>
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full pt-20 flex flex-col space-y-4 bg-surface-container/90 backdrop-blur-md w-64 border-r border-secondary-container/30 shadow-xl z-40 mt-[2px]">
<!-- Header/Avatar -->
<div class="px-6 py-4 mb-4 border-b border-outline-variant/30 flex items-center gap-4">
<div class="w-12 h-12 rounded-full border-2 border-secondary-container bg-surface-container-highest flex items-center justify-center overflow-hidden relative shadow-[0_0_15px_rgba(119,1,208,0.4)]">
<img alt="Archmage Avatar" class="w-full h-full object-cover opacity-80" data-alt="A macro photograph of a glowing, fractured amethyst crystal core inside a futuristic metallic housing. The crystal emits a deep violet luminescence against the dark obsidian metal. The lighting highlights the sharp, geometric facets of the gemstone, creating a sense of ancient magic housed in modern technology. The aesthetic is dark, premium, and mysterious." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW6U5J2NjTUzdX6-k7si8YtfJVJSEsrahWOClOns-a2TU9yZd5EeTZwIQHhYmiyeCvGK5DM5yk4PG_Q6AER9On5wyiVl3XM48gsKiv8g6M7dDSLsoGM-yuwH-NY68zlhkX8MaIYE1j5M2igmM1gRFM4wI-4f-LwwNMqHGL1aGic8lbRxKVGVReNEWDH5JLQ3Aa9JsCcyqfkD0OLoh6Srz1kafmKbe3m3fQC_ucJrVkA84zC4NoxJou1Z4V9f_K8lJdGsKvwtZAzsJ-"/>
<div class="absolute inset-0 bg-secondary-container/20 mix-blend-overlay"></div>
</div>
<div>
<h2 class="font-headline-sm text-headline-sm text-secondary">Archmage</h2>
<p class="font-label-caps text-[10px] text-on-surface-variant tracking-wider">Level 42 Pythonista</p>
</div>
</div>
<!-- Navigation Links -->
<nav class="flex-1 flex flex-col gap-2 px-0">
<!-- Active: Grimoire -->
<a class="flex items-center gap-4 bg-secondary-container/20 text-primary-container border-l-4 border-primary-container py-3 px-6 shadow-[inset_0_0_15px_rgba(0,251,251,0.2)] group relative overflow-hidden" href="#">
<div class="absolute inset-0 bg-gradient-to-r from-primary-container/10 to-transparent w-1/2 opacity-50"></div>
<span class="material-symbols-outlined drop-shadow-[0_0_8px_rgba(0,251,251,0.8)] z-10" data-icon="auto_stories">auto_stories</span>
<span class="font-label-caps text-label-caps z-10">Grimoire</span>
</a>
<!-- Inactive -->
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200 border-l-4 border-transparent group" href="#">
<span class="material-symbols-outlined group-hover:text-tertiary-fixed-dim transition-colors" data-icon="explore">explore</span>
<span class="font-label-caps text-label-caps">Trail</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200 border-l-4 border-transparent group" href="#">
<span class="material-symbols-outlined group-hover:text-error transition-colors" data-icon="swords">swords</span>
<span class="font-label-caps text-label-caps">Arena</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200 border-l-4 border-transparent group" href="#">
<span class="material-symbols-outlined group-hover:text-secondary-fixed transition-colors" data-icon="pets">pets</span>
<span class="font-label-caps text-label-caps">Bestiary</span>
</a>
</nav>
<!-- CTA -->
<div class="p-6 mt-auto">
<button class="w-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm py-3 rounded border border-primary-container/50 hover:bg-surface-tint hover:shadow-[0_0_20px_rgba(0,251,251,0.4)] transition-all flex items-center justify-center gap-2 group">
<span class="material-symbols-outlined group-hover:animate-pulse" style="font-variation-settings: 'FILL' 1;">flare</span>
                Cast Spell
            </button>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 pt-24 pb-12 px-[48px] h-screen w-full overflow-y-auto relative z-10 flex flex-col">
<!-- Header Section -->
<header class="mb-10 flex items-end justify-between border-b border-outline-variant/40 pb-6 relative">
<div class="absolute bottom-[-1px] left-0 w-32 h-[1px] bg-primary-container drop-shadow-[0_0_5px_rgba(0,251,251,1)]"></div>
<div>
<h1 class="font-display-lg text-display-lg text-primary drop-shadow-md mb-2 flex items-center gap-4">
<span class="material-symbols-outlined text-4xl text-secondary drop-shadow-[0_0_15px_rgba(119,1,208,0.8)]" style="font-variation-settings: 'FILL' 1;">menu_book</span>
                    Arcane Grimoire
                </h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Your repository of mastered incantations, logical constructs, and foundational hexes. Select a discipline to review your spellcraft.</p>
</div>
<!-- Oracle Console Mini-View (Atmospheric) -->
<div class="hidden xl:flex bg-surface-container-lowest border border-outline-variant/30 rounded p-4 w-72 h-24 relative overflow-hidden group">
<div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-container/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="font-code-md text-[12px] leading-tight text-on-surface-variant opacity-80">
<span class="text-secondary-container">import</span> aether<br/>
<span class="text-primary-container">system.scan</span>(grimoire_db)<br/>
                    &gt; 3 disciplines active<br/>
                    &gt; awaiting input <span class="animate-pulse text-primary-container">_</span>
</div>
</div>
</header>
<!-- Discipline Tabs (Holographic Tech Style) -->
<div class="flex gap-4 mb-8">
<button class="px-6 py-2 rounded-t-lg bg-surface-container-high border-t border-l border-r border-primary-container/50 text-primary-container font-label-caps text-label-caps shadow-[inset_0_4px_10px_rgba(0,251,251,0.1)] relative overflow-hidden">
<div class="absolute inset-0 bg-primary-container/10 mix-blend-screen"></div>
                Variables &amp; Types
            </button>
<button class="px-6 py-2 rounded-t-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container hover:text-primary transition-colors">
                Mathematical Hexes
            </button>
<button class="px-6 py-2 rounded-t-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container hover:text-primary transition-colors">
                Conditionals (Gates)
            </button>
</div>
<!-- Spell Cards Bento Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 content-start pb-20">
<!-- Card 1: Initialization -->
<div class="bg-[#0f172a]/80 backdrop-blur-[12px] rounded-lg border border-secondary-container/30 p-6 relative overflow-hidden group hover:border-primary-container/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,251,251,0.1)] flex flex-col h-full col-span-1 md:col-span-2 xl:col-span-1">
<!-- Inner Glow -->
<div class="absolute -top-20 -right-20 w-48 h-48 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/15 transition-all pointer-events-none"></div>
<div class="flex justify-between items-start mb-4 z-10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant/50">
<span class="material-symbols-outlined text-primary-container text-sm">data_object</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary group-hover:text-primary-container transition-colors">Declare String</h3>
</div>
<div class="bg-surface-container-lowest px-3 py-1 rounded-full border border-secondary/20">
<span class="font-label-caps text-[10px] text-secondary tracking-widest drop-shadow-[0_0_5px_rgba(220,184,255,0.5)]">5 MP</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-6 flex-1 z-10">
                    Binds a sequence of ethereal characters to a designated symbolic rune. Essential for storing true names and incantations.
                </p>
<div class="bg-[#060e20] p-4 rounded-md border border-[#3a4a49]/50 relative group-hover:border-[#00fbfb]/30 transition-colors z-10">
<div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
<span class="material-symbols-outlined text-on-surface-variant text-sm hover:text-primary">content_copy</span>
</div>
<pre class="font-code-md text-code-md"><code class="text-on-surface"><span class="text-secondary-fixed-dim">spell_name</span> = <span class="text-tertiary-fixed">"Fireball"</span>
<span class="text-secondary-fixed-dim">target</span> = <span class="text-tertiary-fixed">"Goblin_01"</span></code></pre>
</div>
</div>
<!-- Card 2: Integers -->
<div class="bg-[#0f172a]/80 backdrop-blur-[12px] rounded-lg border border-secondary-container/30 p-6 relative overflow-hidden group hover:border-primary-container/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,251,251,0.1)] flex flex-col h-full">
<div class="absolute -top-20 -right-20 w-48 h-48 bg-tertiary-fixed-dim/5 rounded-full blur-3xl group-hover:bg-tertiary-fixed-dim/10 transition-all pointer-events-none"></div>
<div class="flex justify-between items-start mb-4 z-10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant/50">
<span class="material-symbols-outlined text-tertiary-fixed-dim text-sm">tag</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary group-hover:text-tertiary-fixed-dim transition-colors">Manifest Integer</h3>
</div>
<div class="bg-surface-container-lowest px-3 py-1 rounded-full border border-secondary/20">
<span class="font-label-caps text-[10px] text-secondary tracking-widest">2 MP</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-6 flex-1 z-10">
                    Conjures a solid, whole numerical value. Used for counting elemental charges or tracking entity health points.
                </p>
<div class="bg-[#060e20] p-4 rounded-md border border-[#3a4a49]/50 relative group-hover:border-[#00fbfb]/30 transition-colors z-10">
<pre class="font-code-md text-code-md"><code class="text-on-surface"><span class="text-secondary-fixed-dim">mana_crystals</span> = <span class="text-[#00dddd]">42</span>
<span class="text-secondary-fixed-dim">damage_multiplier</span> = <span class="text-[#00dddd]">3</span></code></pre>
</div>
</div>
<!-- Card 3: Floats -->
<div class="bg-[#0f172a]/80 backdrop-blur-[12px] rounded-lg border border-secondary-container/30 p-6 relative overflow-hidden group hover:border-primary-container/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,251,251,0.1)] flex flex-col h-full">
<div class="absolute -top-20 -right-20 w-48 h-48 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/15 transition-all pointer-events-none"></div>
<div class="flex justify-between items-start mb-4 z-10">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant/50">
<span class="material-symbols-outlined text-primary-container text-sm">water_drop</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary group-hover:text-primary-container transition-colors">Fluid Float</h3>
</div>
<div class="bg-surface-container-lowest px-3 py-1 rounded-full border border-secondary/20">
<span class="font-label-caps text-[10px] text-secondary tracking-widest">3 MP</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-6 flex-1 z-10">
                    A numerical value with ethereal precision (decimals). Crucial for calculating precise alchemical ratios or trajectory angles.
                </p>
<div class="bg-[#060e20] p-4 rounded-md border border-[#3a4a49]/50 relative group-hover:border-[#00fbfb]/30 transition-colors z-10">
<pre class="font-code-md text-code-md"><code class="text-on-surface"><span class="text-secondary-fixed-dim">potion_potency</span> = <span class="text-[#00dddd]">99.9</span>
<span class="text-secondary-fixed-dim">pi_rune</span> = <span class="text-[#00dddd]">3.14159</span></code></pre>
</div>
</div>
<!-- Card 4: Booleans (Wide Span) -->
<div class="bg-[#0f172a]/80 backdrop-blur-[12px] rounded-lg border border-secondary-container/30 p-6 relative overflow-hidden group hover:border-primary-container/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,251,251,0.1)] flex flex-col md:flex-row gap-6 h-full col-span-1 md:col-span-2 xl:col-span-3">
<div class="absolute inset-0 bg-gradient-to-br from-secondary-container/5 to-transparent pointer-events-none"></div>
<div class="flex-1 z-10 flex flex-col">
<div class="flex justify-between items-start mb-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant/50">
<span class="material-symbols-outlined text-secondary text-sm">toggle_on</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary group-hover:text-secondary-fixed transition-colors">Binary State (Boolean)</h3>
</div>
<div class="bg-surface-container-lowest px-3 py-1 rounded-full border border-secondary/20">
<span class="font-label-caps text-[10px] text-secondary tracking-widest">1 MP</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-6">
                        The fundamental dichotomy of the Arcane logic gates. A state of absolute truth or absolute falsehood. Determines if a magical ward is active, or if a target is vanquished.
                    </p>
</div>
<div class="flex-1 bg-[#060e20] p-4 rounded-md border border-[#3a4a49]/50 relative group-hover:border-[#00fbfb]/30 transition-colors z-10 flex items-center">
<pre class="font-code-md text-code-md w-full"><code class="text-on-surface"><span class="text-on-surface-variant"># The ward is currently active</span>
<span class="text-secondary-fixed-dim">is_shield_up</span> = <span class="text-secondary-fixed font-bold">True</span>

<span class="text-on-surface-variant"># The enemy still stands</span>
<span class="text-secondary-fixed-dim">is_defeated</span> = <span class="text-secondary-fixed font-bold">False</span></code></pre>
</div>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Tower of Trials (Final Exam) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Battle Arena - Final Exam</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=Hanken+Grotesk:wght@400;500;700&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-fixed": "#002020",
                        "on-primary": "#003737",
                        "tertiary-container": "#ffdfa0",
                        "on-surface": "#dae2fd",
                        "secondary-fixed-dim": "#dcb8ff",
                        "secondary-container": "#7701d0",
                        "inverse-on-surface": "#283044",
                        "surface-dim": "#0b1326",
                        "tertiary-fixed": "#ffdfa0",
                        "surface-bright": "#31394d",
                        "surface-container-highest": "#2d3449",
                        "tertiary-fixed-dim": "#fbbc00",
                        "on-tertiary-fixed": "#261a00",
                        "error-container": "#93000a",
                        "on-secondary": "#480081",
                        "primary-container": "#00fbfb",
                        "on-secondary-fixed": "#2c0051",
                        "on-tertiary": "#402d00",
                        "on-tertiary-container": "#815f00",
                        "surface-variant": "#2d3449",
                        "primary": "#ffffff",
                        "surface-tint": "#00dddd",
                        "secondary-fixed": "#efdbff",
                        "on-error": "#690005",
                        "primary-fixed-dim": "#00dddd",
                        "on-primary-container": "#007070",
                        "background": "#0b1326",
                        "surface-container-high": "#222a3d",
                        "primary-fixed": "#00fbfb",
                        "outline-variant": "#3a4a49",
                        "on-secondary-container": "#dcb7ff",
                        "secondary": "#dcb8ff",
                        "error": "#ffb4ab",
                        "tertiary": "#ffffff",
                        "surface": "#0b1326",
                        "surface-container": "#171f33",
                        "inverse-surface": "#dae2fd",
                        "inverse-primary": "#006a6a",
                        "surface-container-lowest": "#060e20",
                        "on-surface-variant": "#b9cac9",
                        "on-secondary-fixed-variant": "#6700b5",
                        "outline": "#839493",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-background": "#dae2fd",
                        "on-primary-fixed-variant": "#004f4f",
                        "surface-container-low": "#131b2e",
                        "on-error-container": "#ffdad6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "4px",
                        "margin-desktop": "48px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "hud-padding": "12px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-caps": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "headline-sm": ["Space Grotesk"],
                        "body-lg": ["Hanken Grotesk"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700"}],
                        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "code-md": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}]
                    }
                }
            }
        }
    </script>
<style>
        body { background-color: #020617; } /* Void background */
        
        /* Subtle Red Alert Aesthetic */
        .tower-of-trials-bg {
            background: radial-gradient(circle at center, rgba(147, 0, 10, 0.15) 0%, rgba(2, 6, 23, 1) 70%);
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: -1;
            pointer-events: none;
        }

        .glass-panel {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 251, 251, 0.2);
            box-shadow: inset 0 0 10px rgba(0, 251, 251, 0.05);
        }

        .glass-panel-alert {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 180, 171, 0.3); /* error color */
            box-shadow: inset 0 0 15px rgba(255, 180, 171, 0.1);
        }

        .neon-text-primary {
            text-shadow: 0 0 8px rgba(0, 251, 251, 0.6);
        }

        .neon-text-error {
            text-shadow: 0 0 8px rgba(255, 180, 171, 0.6);
        }
        
        /* Scrollbar styling for code editor */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0b1326; 
        }
        ::-webkit-scrollbar-thumb {
            background: #2d3449; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #3a4a49; 
        }
    </style>
</head>
<body class="text-on-surface min-h-screen relative overflow-hidden font-body-md selection:bg-primary-container selection:text-on-primary-container">
<!-- Subtle Red Alert Background -->
<div class="tower-of-trials-bg"></div>
<!-- HUD Elements (Pinned) -->
<!-- XP/Progress Tracker Top -->
<div class="fixed top-0 left-0 w-full h-1 bg-surface-container-lowest z-50">
<div class="h-full bg-error shadow-[0_0_10px_rgba(255,180,171,0.8)]" style="width: 10%;"></div>
</div>
<!-- TopAppBar -->
<nav class="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
<div class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)] flex items-center gap-2">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">swords</span>
            Python Arcane
        </div>
<div class="flex items-center gap-4 text-on-surface-variant font-label-caps text-label-caps">
<span class="material-symbols-outlined hover:text-primary-container transition-colors duration-300 cursor-pointer">bolt</span>
<span class="material-symbols-outlined hover:text-primary-container transition-colors duration-300 cursor-pointer">auto_fix_high</span>
<span class="material-symbols-outlined hover:text-primary-container transition-colors duration-300 cursor-pointer">monetization_on</span>
</div>
</nav>
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full pt-20 flex flex-col space-y-4 bg-surface-container/90 backdrop-blur-md docked left-0 h-full w-64 border-r border-secondary-container/30 shadow-xl z-30 font-body-md text-body-md">
<!-- User Info -->
<div class="px-6 pb-4 border-b border-secondary-container/30">
<div class="flex items-center gap-3 mb-2">
<div class="w-10 h-10 rounded-full bg-secondary-container/50 border border-secondary flex items-center justify-center overflow-hidden">
<span class="material-symbols-outlined text-secondary">face</span>
</div>
<div>
<div class="font-headline-sm text-headline-sm text-secondary text-sm">Archmage</div>
<div class="font-label-caps text-label-caps text-on-surface-variant text-xs opacity-70">Level 42 Pythonista</div>
</div>
</div>
<button class="w-full mt-2 bg-secondary-container hover:bg-secondary text-primary font-label-caps text-label-caps py-2 rounded transition-colors duration-200">
                Cast Spell
            </button>
</div>
<!-- Navigation Links -->
<nav class="flex-1 flex flex-col">
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200 font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">auto_stories</span> Grimoire
            </a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200 font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">explore</span> Trail
            </a>
<!-- Active State -->
<a class="flex items-center gap-4 bg-secondary-container/20 text-primary-container border-l-4 border-primary-container py-3 px-6 shadow-[inset_0_0_15px_rgba(0,251,251,0.2)] font-label-caps text-label-caps transition-transform duration-200 translate-x-1" href="#">
<span class="material-symbols-outlined">swords</span> Arena
            </a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200 font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">pets</span> Bestiary
            </a>
</nav>
</aside>
<!-- Main Content Area (Fixed Grid Layout) -->
<main class="ml-64 pt-24 px-gutter pb-gutter h-screen overflow-hidden flex gap-gutter max-w-[1400px] mx-auto">
<!-- Left Column: Exam Context & Rules -->
<div class="w-1/3 flex flex-col gap-gutter h-full">
<!-- Alert / Status Panel -->
<div class="glass-panel-alert rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden border border-error/50">
<div class="absolute inset-0 bg-error/5 animate-pulse"></div>
<span class="material-symbols-outlined text-display-lg text-error mb-2 relative z-10" style="font-variation-settings: 'FILL' 1;">warning</span>
<h1 class="font-headline-md text-headline-md text-error neon-text-error relative z-10 uppercase text-center mb-1">Final Exam</h1>
<h2 class="font-headline-sm text-headline-sm text-on-error-container relative z-10 text-center">O Analista Regulatório</h2>
</div>
<!-- Timer & Progress -->
<div class="glass-panel rounded-xl p-6 flex flex-col gap-4">
<div class="flex justify-between items-center border-b border-outline-variant/50 pb-4">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary-container">timer</span>
<span class="font-code-md text-code-md text-on-surface">Time Remaining</span>
</div>
<span class="font-display-lg text-headline-md text-primary-container neon-text-primary">01:29:45</span>
</div>
<div class="flex justify-between items-center pt-2">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary-fixed-dim">task_alt</span>
<span class="font-code-md text-code-md text-on-surface">Progress</span>
</div>
<span class="font-headline-sm text-headline-sm text-tertiary-fixed-dim">2 / 20</span>
</div>
<!-- Mini Progress Bar -->
<div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden mt-1">
<div class="h-full bg-tertiary-fixed-dim w-[10%]"></div>
</div>
</div>
<!-- Strict Rules Grimoire Card -->
<div class="glass-panel rounded-xl p-6 flex-1 flex flex-col relative">
<!-- Chamfer effect top right -->
<div class="absolute top-0 right-0 w-8 h-8 bg-background border-l border-b border-primary-container/20" style="clip-path: polygon(100% 0, 0 0, 100% 100%);"></div>
<div class="flex items-center gap-2 mb-6">
<span class="material-symbols-outlined text-error">gavel</span>
<h3 class="font-headline-sm text-headline-sm text-error">Strict Rules</h3>
</div>
<ul class="space-y-4 font-body-md text-body-md text-on-surface-variant flex-1">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-error mt-0.5" style="font-size: 18px;">block</span>
<span><strong>No lists allowed.</strong> You must process data as it flows.</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-error mt-0.5" style="font-size: 18px;">block</span>
<span><strong>No loops (for/while).</strong> Embrace recursion or functional maps.</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-error mt-0.5" style="font-size: 18px;">block</span>
<span><strong>No `def` keywords.</strong> Lambda functions only for this trial.</span>
</li>
</ul>
<!-- Reward -->
<div class="mt-4 p-4 rounded bg-tertiary-fixed-dim/10 border border-tertiary-fixed-dim/30 flex items-center justify-between">
<div>
<span class="font-label-caps text-label-caps text-tertiary-fixed-dim block mb-1">Completion Reward</span>
<span class="font-code-md text-code-md text-tertiary-fixed">'regra-clara' Superpower</span>
</div>
<span class="material-symbols-outlined text-tertiary-fixed-dim text-3xl" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
</div>
</div>
<!-- Right Column: The Battle Editor -->
<div class="w-2/3 flex flex-col h-full glass-panel rounded-xl border-primary-container/30 overflow-hidden relative group">
<!-- Target Crosshair Overlay (Hover intent) -->
<div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary-container/20 rounded-full flex items-center justify-center">
<div class="w-1/2 h-[1px] bg-primary-container/40 absolute left-0"></div>
<div class="w-1/2 h-[1px] bg-primary-container/40 absolute right-0"></div>
<div class="w-[1px] h-1/2 bg-primary-container/40 absolute top-0"></div>
<div class="w-[1px] h-1/2 bg-primary-container/40 absolute bottom-0"></div>
<div class="w-2 h-2 bg-primary-container rounded-full animate-pulse shadow-[0_0_10px_rgba(0,251,251,0.8)]"></div>
</div>
</div>
<!-- Editor Header -->
<div class="h-12 bg-surface-container-highest border-b border-primary-container/20 flex items-center justify-between px-4 z-30">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary-container" style="font-size: 18px;">code</span>
<span class="font-code-md text-code-md text-on-surface">document_13_parser.py</span>
</div>
<div class="font-label-caps text-label-caps text-error animate-pulse flex items-center gap-2">
<span class="material-symbols-outlined" style="font-size: 16px;">bug_report</span> Target Engaged
                </div>
</div>
<!-- Code Area -->
<div class="flex-1 bg-surface-dim p-4 overflow-auto font-code-md text-code-md text-on-surface-variant z-10 relative">
<!-- Line Numbers & Code (Static Mock) -->
<div class="flex">
<div class="w-8 text-right pr-4 text-outline-variant select-none">
                        1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11
                    </div>
<div class="flex-1 pl-2">
<span class="text-secondary-fixed-dim"># Question 3: Extract regulatory entity without 'def'</span><br/>
<br/>
<span class="text-tertiary-fixed-dim">extract_entity</span> = <span class="text-primary-container">lambda</span> doc: (<br/>
                            doc.get(<span class="text-error">'metadata'</span>, {}).get(<span class="text-error">'agency'</span>, <span class="text-error">'UNKNOWN'</span>)<br/>
                        )<br/>
<br/>
<span class="text-secondary-fixed-dim"># TODO: Process full document text under strict rules</span><br/>
<span class="text-tertiary-fixed-dim">process_text</span> = <span class="text-primary-container">lambda</span> txt: <span class="animate-pulse border-r-2 border-primary-container pr-1 bg-primary-container/20">_</span>
</div>
</div>
</div>
<!-- Editor Actions / Oracle Console Input -->
<div class="bg-surface-container h-16 border-t border-primary-container/20 flex items-center justify-between px-6 z-30">
<div class="font-code-md text-code-md text-on-surface-variant flex items-center gap-2">
<span class="text-primary-container">~</span> <span class="text-tertiary-fixed-dim">$</span> Waiting for cast...
                </div>
<button class="bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-label-caps text-label-caps px-6 py-2 rounded shadow-[0_0_15px_rgba(0,251,251,0.4)] hover:shadow-[0_0_25px_rgba(0,251,251,0.8)] transition-all duration-300 flex items-center gap-2">
<span class="material-symbols-outlined" style="font-size: 18px;">send</span> Cast Execute
                </button>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Bestiary of Bugs -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Python Arcane - Bestiary</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;700&amp;family=Hanken+Grotesk:wght@400;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-fixed": "#002020",
                        "on-primary": "#003737",
                        "tertiary-container": "#ffdfa0",
                        "on-surface": "#dae2fd",
                        "secondary-fixed-dim": "#dcb8ff",
                        "secondary-container": "#7701d0",
                        "inverse-on-surface": "#283044",
                        "surface-dim": "#0b1326",
                        "tertiary-fixed": "#ffdfa0",
                        "surface-bright": "#31394d",
                        "surface-container-highest": "#2d3449",
                        "tertiary-fixed-dim": "#fbbc00",
                        "on-tertiary-fixed": "#261a00",
                        "error-container": "#93000a",
                        "on-secondary": "#480081",
                        "primary-container": "#00fbfb",
                        "on-secondary-fixed": "#2c0051",
                        "on-tertiary": "#402d00",
                        "on-tertiary-container": "#815f00",
                        "surface-variant": "#2d3449",
                        "primary": "#ffffff",
                        "surface-tint": "#00dddd",
                        "secondary-fixed": "#efdbff",
                        "on-error": "#690005",
                        "primary-fixed-dim": "#00dddd",
                        "on-primary-container": "#007070",
                        "background": "#0b1326",
                        "surface-container-high": "#222a3d",
                        "primary-fixed": "#00fbfb",
                        "outline-variant": "#3a4a49",
                        "on-secondary-container": "#dcb7ff",
                        "secondary": "#dcb8ff",
                        "error": "#ffb4ab",
                        "tertiary": "#ffffff",
                        "surface": "#0b1326",
                        "surface-container": "#171f33",
                        "inverse-surface": "#dae2fd",
                        "inverse-primary": "#006a6a",
                        "surface-container-lowest": "#060e20",
                        "on-surface-variant": "#b9cac9",
                        "on-secondary-fixed-variant": "#6700b5",
                        "outline": "#839493",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-background": "#dae2fd",
                        "on-primary-fixed-variant": "#004f4f",
                        "surface-container-low": "#131b2e",
                        "on-error-container": "#ffdad6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "4px",
                        "margin-desktop": "48px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "hud-padding": "12px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-caps": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "headline-sm": ["Space Grotesk"],
                        "body-lg": ["Hanken Grotesk"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }],
                        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "code-md": ["14px", { "lineHeight": "20px", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
<style>
        body { background-color: #020617; } /* Level 0 Void */
        .glass-panel {
            background-color: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 251, 251, 0.2);
        }
        .active-glow {
            box-shadow: inset 0 0 10px rgba(0, 251, 251, 0.5);
        }
        .text-glow {
            text-shadow: 0 0 10px rgba(0, 251, 251, 0.6);
        }
        .error-glow {
            box-shadow: inset 0 0 10px rgba(255, 180, 171, 0.5);
            border-color: rgba(255, 180, 171, 0.5);
        }
    </style>
</head>
<body class="text-on-surface bg-background antialiased min-h-screen">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
<div class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]">
            Python Arcane
        </div>
<div class="flex items-center gap-4 text-primary-container">
<span class="material-symbols-outlined hover:text-primary-container transition-colors duration-300 cursor-pointer" data-icon="bolt">bolt</span>
<span class="material-symbols-outlined hover:text-primary-container transition-colors duration-300 cursor-pointer" data-icon="auto_fix_high">auto_fix_high</span>
<span class="material-symbols-outlined hover:text-primary-container transition-colors duration-300 cursor-pointer" data-icon="monetization_on">monetization_on</span>
</div>
</header>
<!-- SideNavBar -->
<nav class="fixed left-0 top-0 h-full pt-20 flex flex-col space-y-4 bg-surface-container/90 backdrop-blur-md border-r border-secondary-container/30 shadow-xl docked left-0 h-full w-64 hidden md:flex">
<!-- Header Info -->
<div class="px-6 pb-6 border-b border-secondary-container/30">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-variant overflow-hidden border border-secondary-container">
<img alt="Archmage Avatar" class="w-full h-full object-cover" data-alt="A futuristic portrait of a cyber-mage avatar. Deep dark obsidian aesthetic with glowing cyan and violet runic accents. The face is partially obscured by a sleek, translucent dark visor reflecting streams of code. Professional lighting, high contrast, mysterious yet authoritative mood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ7eLSqLXYXLOy8FqKxRuzj4he042PlEGLMqUg5TP3NbBwHSWRddy9rwFjUMb6iaoJqbtRYESJsBjAzvY4l-Q2zOrCC4zlBgt0BLZfXOuPdi5wI5dpNCGRC4Vkn3EfCEfUTLvHfMzrzyDgNL1FVAIlLFYKOU1CBRtHSDJ0zPfzDsqTGTLg3Jy0vc3yXxOzdSj_NJfyyR-iaOpAgzZZEEWSUCxAGDCyLg4iuV2eqREDo1Pm2uG8qcklNIwRJw49J5eRypGGnw8BIh8l"/>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-secondary">Archmage</h3>
<p class="font-label-caps text-label-caps text-on-surface-variant">Level 42 Pythonista</p>
</div>
</div>
</div>
<!-- Nav Items -->
<div class="flex-1 overflow-y-auto pt-4">
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200 font-body-md text-body-md" href="#">
<span class="material-symbols-outlined" data-icon="auto_stories">auto_stories</span>
                Grimoire
            </a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200 font-body-md text-body-md" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
                Trail
            </a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200 font-body-md text-body-md" href="#">
<span class="material-symbols-outlined" data-icon="swords">swords</span>
                Arena
            </a>
<!-- Active Item: Bestiary -->
<a class="flex items-center gap-4 bg-secondary-container/20 text-primary-container border-l-4 border-primary-container py-3 px-6 shadow-[inset_0_0_15px_rgba(0,251,251,0.2)] font-body-md text-body-md" href="#">
<span class="material-symbols-outlined text-glow" data-icon="pets">pets</span>
                Bestiary
            </a>
</div>
<div class="p-6">
<button class="w-full py-3 px-4 bg-primary-container text-on-primary-fixed font-label-caps text-label-caps rounded-DEFAULT shadow-[0_0_15px_rgba(0,251,251,0.4)] hover:shadow-[0_0_25px_rgba(0,251,251,0.6)] transition-all">
                Cast Spell
            </button>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="md:ml-64 pt-24 px-margin-mobile md:px-margin-desktop pb-24 max-w-[1200px] mx-auto min-h-screen">
<!-- Header -->
<div class="mb-12 flex justify-between items-end border-b border-outline-variant pb-6">
<div>
<h1 class="font-display-lg text-display-lg text-primary text-glow mb-2">Bestiary of Bugs</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">A compendium of defeated syntax horrors and logic demons. Study their weaknesses to master the Arcane Arts of Python.</p>
</div>
<div class="hidden lg:flex gap-4 font-label-caps text-label-caps text-secondary">
<span class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-container" data-icon="bug_report">bug_report</span> Defeated: 42</span>
<span class="flex items-center gap-2"><span class="material-symbols-outlined text-tertiary-container" data-icon="stars">stars</span> Lore Unlocked: 85%</span>
</div>
</div>
<!-- Bento Grid Gallery -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
<!-- Bug Card 1 -->
<div class="glass-panel rounded-lg overflow-hidden flex flex-col group relative">
<div class="absolute top-4 right-4 bg-error/20 text-error px-2 py-1 rounded font-label-caps text-label-caps border border-error/30 z-10">DEFEATED</div>
<div class="h-48 bg-surface-container-highest relative overflow-hidden flex items-center justify-center border-b border-outline-variant">
<img alt="Syntax Goblin" class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" data-alt="A monstrous glitchy green digital goblin creature emerging from a sea of broken green matrix-like code. Dark obsidian background, ominous glow, cyberpunk fantasy aesthetic. The creature looks menacing but trapped in a glass display. High definition texture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWymd8efi4R9ysi3aTrZALZtytOi8e9zcNm5bXQ36-kepfuhI3j4OdpVrIYJ9NauJ96IYv0PlgbeFgrVCYRgs1pUrCD36p2hLW3tyTE37q0aqLAiXlKRDXIeesy1paBrHNce711KcYv-jLY-PEFOgqL3FX7xYEo4nOQNrD82u80o4vEWdZ2Rv3Kk72I5lJtQ7RdSKKipoFECgaUmHQe0X6l5AYjoQNGdxM0IRAPC62MSoyy8puxQGsafMRDifPfT9kxMOxXZQKmS_G"/>
<span class="material-symbols-outlined text-[80px] text-error drop-shadow-[0_0_15px_rgba(255,180,171,0.8)] relative z-10" data-icon="pest_control">pest_control</span>
</div>
<div class="p-6 flex-1 flex flex-col">
<h3 class="font-headline-sm text-headline-sm text-primary mb-1">Syntax Goblin</h3>
<p class="font-code-md text-code-md text-on-surface-variant mb-4">Class: IndentationError</p>
<div class="space-y-3 mb-6 flex-1">
<div class="flex justify-between items-center border-b border-surface-variant pb-2">
<span class="font-label-caps text-label-caps text-on-surface-variant">HP / Danger</span>
<div class="flex gap-1">
<div class="w-8 h-2 bg-error rounded-full"></div>
<div class="w-8 h-2 bg-surface-variant rounded-full"></div>
<div class="w-8 h-2 bg-surface-variant rounded-full"></div>
</div>
</div>
<div class="flex justify-between items-center border-b border-surface-variant pb-2">
<span class="font-label-caps text-label-caps text-on-surface-variant">Attack</span>
<span class="font-body-md text-body-md text-error">Unexpected indent</span>
</div>
<div class="flex justify-between items-center">
<span class="font-label-caps text-label-caps text-on-surface-variant">Weakness</span>
<span class="font-code-md text-code-md text-primary-container bg-primary-container/10 px-2 py-1 rounded">Tab Consistency</span>
</div>
</div>
<div class="bg-surface-container-low p-4 rounded border border-outline-variant/50">
<p class="font-label-caps text-label-caps text-secondary mb-2">Arcane Insight:</p>
<p class="font-body-md text-body-md text-on-surface">Goblins thrive in chaos. Aligning your magical seals (4 spaces) perfectly banishes them instantly.</p>
</div>
</div>
</div>
<!-- Bug Card 2 -->
<div class="glass-panel rounded-lg overflow-hidden flex flex-col group relative">
<div class="absolute top-4 right-4 bg-error/20 text-error px-2 py-1 rounded font-label-caps text-label-caps border border-error/30 z-10">DEFEATED</div>
<div class="h-48 bg-surface-container-highest relative overflow-hidden flex items-center justify-center border-b border-outline-variant">
<img alt="Null Wraith" class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" data-alt="A ghostly, semi-transparent purple wraith figure made of static and floating digital particles. Dark void background, ethereal violet glow, cyberpunk fantasy aesthetic. The spirit looks hollow and empty, representing a null value. High definition texture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj136xV9iAZwV88YAHWxnXm-L0ItfmBHFiy6Qc57x2Kvsu-QDFh_zLc0t1dobj4njEvj_pt0S0fMqpoHDhyyWWUw85ZcAz49wji0j9ILYFUI7L8hzFhkjkZQB1mKzI7bpSrKrhIq7MW7SsgLEIXacuCPYHcMieWnlchF8WRHifssOY5U5BSBxz9qRbWRnDHjuzry3gS3MgAmZl-vXV_7GKL5Rcs7m0hRLN20zkseKS1vLvBmvrxQnPzk4q2gt915vfZdBtuqdBv1VX"/>
<span class="material-symbols-outlined text-[80px] text-secondary drop-shadow-[0_0_15px_rgba(220,184,255,0.8)] relative z-10" data-icon="water_drop">water_drop</span>
</div>
<div class="p-6 flex-1 flex flex-col">
<h3 class="font-headline-sm text-headline-sm text-primary mb-1">Null Wraith</h3>
<p class="font-code-md text-code-md text-on-surface-variant mb-4">Class: TypeError (NoneType)</p>
<div class="space-y-3 mb-6 flex-1">
<div class="flex justify-between items-center border-b border-surface-variant pb-2">
<span class="font-label-caps text-label-caps text-on-surface-variant">HP / Danger</span>
<div class="flex gap-1">
<div class="w-8 h-2 bg-error rounded-full"></div>
<div class="w-8 h-2 bg-error rounded-full"></div>
<div class="w-8 h-2 bg-surface-variant rounded-full"></div>
</div>
</div>
<div class="flex justify-between items-center border-b border-surface-variant pb-2">
<span class="font-label-caps text-label-caps text-on-surface-variant">Attack</span>
<span class="font-body-md text-body-md text-error">Unsubscriptable object</span>
</div>
<div class="flex justify-between items-center">
<span class="font-label-caps text-label-caps text-on-surface-variant">Weakness</span>
<span class="font-code-md text-code-md text-primary-container bg-primary-container/10 px-2 py-1 rounded">print() Inspection</span>
</div>
</div>
<div class="bg-surface-container-low p-4 rounded border border-outline-variant/50">
<p class="font-label-caps text-label-caps text-secondary mb-2">Arcane Insight:</p>
<p class="font-body-md text-body-md text-on-surface">The Wraith hides its true emptiness. Cast the 'print()' spell to reveal its non-existence before interacting.</p>
</div>
</div>
</div>
<!-- Bug Card 3 - Elite -->
<div class="glass-panel rounded-lg overflow-hidden flex flex-col group relative border-tertiary-container/50 shadow-[0_0_20px_rgba(255,223,160,0.1)]">
<div class="absolute top-4 right-4 bg-tertiary-container/20 text-tertiary-container px-2 py-1 rounded font-label-caps text-label-caps border border-tertiary-container/50 z-10 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]" data-icon="star">star</span> ELITE DEFEATED
                </div>
<div class="h-48 bg-surface-container-highest relative overflow-hidden flex items-center justify-center border-b border-tertiary-container/30">
<img alt="Infinite Loop Ouroboros" class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" data-alt="A mechanical, glowing golden snake eating its own tail, creating an infinity symbol. Dark sci-fi laboratory background, intense warm amber lighting, cyberpunk fantasy aesthetic. Sparks flying from the looping mechanism. High definition texture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtdRpI5ntAOd2NNGLUk5MNhO3F2wFh_DcaCmWB9BR7nQ30dD5fNI6ouW7Mx65NffJ0n597QOH_9GcFoh3gIPFmyWU8AMGvc1D1I8_kDjQuQUeJFwWb552L0uWmTGawk_kQlhWzKhNxHT_viqf-AMKKO7xdBHkOwN_89O3z0iLA4CtDV8bron2gW_CIvVbwZSJLTf-ArkAj5F-6acTXUcYYhIOOexSopMGMqsb9SzGjp9oN0DR3ZLYXYS4EIzuH4Hln01Q_EWMnqVg9"/>
<span class="material-symbols-outlined text-[80px] text-tertiary-container drop-shadow-[0_0_15px_rgba(255,223,160,0.8)] relative z-10" data-icon="all_inclusive">all_inclusive</span>
</div>
<div class="p-6 flex-1 flex flex-col">
<h3 class="font-headline-sm text-headline-sm text-tertiary-container mb-1">Looping Ouroboros</h3>
<p class="font-code-md text-code-md text-on-surface-variant mb-4">Class: Logic Error (While True)</p>
<div class="space-y-3 mb-6 flex-1">
<div class="flex justify-between items-center border-b border-surface-variant pb-2">
<span class="font-label-caps text-label-caps text-on-surface-variant">HP / Danger</span>
<div class="flex gap-1">
<div class="w-8 h-2 bg-error rounded-full"></div>
<div class="w-8 h-2 bg-error rounded-full"></div>
<div class="w-8 h-2 bg-error rounded-full"></div>
</div>
</div>
<div class="flex justify-between items-center border-b border-surface-variant pb-2">
<span class="font-label-caps text-label-caps text-on-surface-variant">Attack</span>
<span class="font-body-md text-body-md text-error">Memory Exhaustion</span>
</div>
<div class="flex justify-between items-center">
<span class="font-label-caps text-label-caps text-on-surface-variant">Weakness</span>
<span class="font-code-md text-code-md text-tertiary-container bg-tertiary-container/10 px-2 py-1 rounded">break statement</span>
</div>
</div>
<div class="bg-surface-container-low p-4 rounded border border-tertiary-container/30 relative overflow-hidden">
<div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iI2ZmZGZhMCIvPjwvc3ZnPg==')]"></div>
<p class="font-label-caps text-label-caps text-tertiary-container mb-2 relative z-10">Arcane Insight:</p>
<p class="font-body-md text-body-md text-on-surface relative z-10">A beast that consumes time itself. You must plant a definitive 'break' or update its counter logic to sever the loop.</p>
</div>
</div>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Guild Expedition (Group Arena) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Python Arcane - Expedition Battle Arena</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono:wght@400;500;700&amp;family=Hanken+Grotesk:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-fixed": "#002020",
                        "on-primary": "#003737",
                        "tertiary-container": "#ffdfa0",
                        "on-surface": "#dae2fd",
                        "secondary-fixed-dim": "#dcb8ff",
                        "secondary-container": "#7701d0",
                        "inverse-on-surface": "#283044",
                        "surface-dim": "#0b1326",
                        "tertiary-fixed": "#ffdfa0",
                        "surface-bright": "#31394d",
                        "surface-container-highest": "#2d3449",
                        "tertiary-fixed-dim": "#fbbc00",
                        "on-tertiary-fixed": "#261a00",
                        "error-container": "#93000a",
                        "on-secondary": "#480081",
                        "primary-container": "#00fbfb",
                        "on-secondary-fixed": "#2c0051",
                        "on-tertiary": "#402d00",
                        "on-tertiary-container": "#815f00",
                        "surface-variant": "#2d3449",
                        "primary": "#ffffff",
                        "surface-tint": "#00dddd",
                        "secondary-fixed": "#efdbff",
                        "on-error": "#690005",
                        "primary-fixed-dim": "#00dddd",
                        "on-primary-container": "#007070",
                        "background": "#0b1326",
                        "surface-container-high": "#222a3d",
                        "primary-fixed": "#00fbfb",
                        "outline-variant": "#3a4a49",
                        "on-secondary-container": "#dcb7ff",
                        "secondary": "#dcb8ff",
                        "error": "#ffb4ab",
                        "tertiary": "#ffffff",
                        "surface": "#0b1326",
                        "surface-container": "#171f33",
                        "inverse-surface": "#dae2fd",
                        "inverse-primary": "#006a6a",
                        "surface-container-lowest": "#060e20",
                        "on-surface-variant": "#b9cac9",
                        "on-secondary-fixed-variant": "#6700b5",
                        "outline": "#839493",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-background": "#dae2fd",
                        "on-primary-fixed-variant": "#004f4f",
                        "surface-container-low": "#131b2e",
                        "on-error-container": "#ffdad6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "4px",
                        "margin-desktop": "48px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "hud-padding": "12px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-caps": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "headline-sm": ["Space Grotesk"],
                        "body-lg": ["Hanken Grotesk"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }],
                        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "code-md": ["14px", { "lineHeight": "20px", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
<style>
        .glitch-anim {
            animation: glitch 1.5s linear infinite;
        }
        @keyframes glitch {
            2%, 64% { transform: translate(2px,0) skew(0deg); }
            4%, 60% { transform: translate(-2px,0) skew(0deg); }
            62% { transform: translate(0,0) skew(5deg); }
        }
        .typewriter-cursor {
            animation: blink 1s step-end infinite;
        }
        @keyframes blink {
            50% { opacity: 0; }
        }
        
        /* Custom scrollbar for HUD panels */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(11, 19, 38, 0.5); }
        ::-webkit-scrollbar-thumb { background: rgba(0, 251, 251, 0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0, 251, 251, 0.5); }
    </style>
</head>
<body class="bg-background text-on-surface font-body-md min-h-screen relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
<!-- HUD Level 0 Void Pattern -->
<div class="fixed inset-0 pointer-events-none z-[-1] opacity-20" style="background-image: radial-gradient(circle at 2px 2px, rgba(0, 251, 251, 0.15) 1px, transparent 0); background-size: 32px 32px;"></div>
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
<div class="flex items-center gap-4">
<span class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]">Python Arcane</span>
</div>
<div class="hidden">hidden search bar logic</div>
<div class="flex items-center gap-6">
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300 active:scale-95 active:opacity-80">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">bolt</span>
</button>
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300 active:scale-95 active:opacity-80">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">auto_fix_high</span>
</button>
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300 active:scale-95 active:opacity-80">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">monetization_on</span>
</button>
<div class="h-8 w-8 rounded-full bg-secondary-container/50 border border-secondary p-0.5 ml-2 shadow-[0_0_15px_rgba(119,1,208,0.4)]">
<img alt="Avatar" class="w-full h-full rounded-full object-cover grayscale opacity-80" data-alt="A stylized, low-poly digital portrait of a cyber-wizard character, featuring glowing neon violet eyes and sharp, angular dark robes, set against a completely black background. The mood is mysterious and technologically advanced." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFhi8eSx_ioTLeeWYU4ISGjiHaGt91XnqVmekZ41pOyf0hz9_DWGHdtW94kEj9h_Eilw47cUma4xmj4BHJRKqLI_O0XQsxS395XoGz2JxpoxvpJH06eRTdSVUHKP6MMg3tHWAetdTyTyyY4B5NeXuVy2n04DvAJRv858vZEczvF4xy1QWoXHyz0fbMOuObFVMXdF9kn7C2D6VJJ0jwMnc8B8RG-COA97smfxCNZkEzqlsU7Fgwd-3_3W0VP2oKkePb4L5cvM2P97aC"/>
</div>
</div>
</header>
<!-- SideNavBar -->
<nav class="fixed left-0 top-0 h-full pt-20 flex flex-col space-y-4 bg-surface-container/90 backdrop-blur-md w-64 border-r border-secondary-container/30 shadow-xl z-40">
<div class="px-6 pb-6 border-b border-surface-container-highest/50 flex flex-col items-center">
<h2 class="font-headline-sm text-headline-sm text-secondary drop-shadow-[0_0_5px_rgba(220,184,255,0.4)]">Archmage</h2>
<p class="font-label-caps text-label-caps text-on-surface-variant mt-1">Level 42 Pythonista</p>
</div>
<div class="flex-1 overflow-y-auto py-4 space-y-2">
<!-- Grimoire (Inactive) -->
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">auto_stories</span>
<span class="font-label-caps text-label-caps">Grimoire</span>
</a>
<!-- Trail (Inactive) -->
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">explore</span>
<span class="font-label-caps text-label-caps">Trail</span>
</a>
<!-- Arena (Active) -->
<a class="flex items-center gap-4 bg-secondary-container/20 text-primary-container border-l-4 border-primary-container py-3 px-6 shadow-[inset_0_0_15px_rgba(0,251,251,0.2)] transition-transform active:translate-x-1" href="#">
<span class="material-symbols-outlined text-primary-container" style="font-variation-settings: 'FILL' 1;">swords</span>
<span class="font-label-caps text-label-caps text-primary-container">Arena</span>
<div class="ml-auto w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_5px_#00fbfb] animate-pulse"></div>
</a>
<!-- Bestiary (Inactive) -->
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">pets</span>
<span class="font-label-caps text-label-caps">Bestiary</span>
</a>
</div>
<div class="p-6">
<button class="w-full py-3 px-4 bg-secondary-container/80 hover:bg-secondary-container text-primary font-label-caps text-label-caps uppercase tracking-widest border border-secondary/50 rounded-DEFAULT shadow-[0_0_15px_rgba(119,1,208,0.4)] hover:shadow-[0_0_25px_rgba(119,1,208,0.6)] transition-all duration-300">
                Cast Spell
            </button>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="ml-64 pt-16 min-h-screen flex p-gutter gap-gutter max-w-[1600px] mx-auto">
<!-- Left Column: Raid Status & Roster (Level 1 Panel) -->
<aside class="w-80 flex flex-col gap-4">
<!-- Active Quest Card -->
<div class="bg-surface-container-highest/80 backdrop-blur-md border border-secondary-container/40 p-5 rounded-lg relative overflow-hidden group">
<div class="absolute inset-0 bg-gradient-to-br from-secondary-container/10 to-transparent opacity-50"></div>
<!-- Neon top accent -->
<div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
<p class="font-label-caps text-label-caps text-secondary mb-2 flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">flag</span> Active Expedition
                </p>
<h3 class="font-headline-sm text-headline-sm text-primary mb-1">Oficina de Relatórios</h3>
<p class="font-code-md text-code-md text-primary-container/80 mb-4">[DOCUMENT_12]</p>
<div class="bg-surface-dim/80 border border-tertiary-container/30 rounded p-3 flex flex-col items-center justify-center shadow-[inset_0_0_10px_rgba(255,223,160,0.1)]">
<p class="font-label-caps text-label-caps text-on-surface-variant mb-1">Time Remaining</p>
<div class="font-display-lg text-display-lg text-tertiary-container drop-shadow-[0_0_12px_rgba(255,223,160,0.5)] tracking-tight">
                        45:00
                    </div>
</div>
</div>
<!-- Party Roster -->
<div class="flex-1 bg-surface-container/80 backdrop-blur-md border border-outline-variant/30 rounded-lg p-5 flex flex-col">
<div class="flex justify-between items-end mb-4 border-b border-surface-container-highest pb-2">
<h4 class="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span class="material-symbols-outlined text-primary-container">group</span> Raid Party
                    </h4>
<span class="font-label-caps text-label-caps text-on-surface-variant">5/5 Connected</span>
</div>
<div class="flex flex-col gap-3">
<!-- Player 1 (Self) -->
<div class="relative p-3 rounded bg-surface-variant/50 border border-primary-container/30 shadow-[inset_0_0_8px_rgba(0,251,251,0.1)]">
<div class="absolute left-0 top-0 h-full w-[3px] bg-primary-container rounded-l"></div>
<div class="flex items-center gap-3 mb-2">
<div class="w-8 h-8 rounded bg-background border border-primary-container/50 flex items-center justify-center">
<span class="material-symbols-outlined text-[18px] text-primary-container">edit_document</span>
</div>
<div class="flex-1">
<p class="font-body-md text-body-md text-primary leading-tight">Archmage <span class="text-primary-container/70 text-[12px]">(You)</span></p>
<p class="font-label-caps text-label-caps text-primary-container text-[10px]">Escriba</p>
</div>
</div>
<!-- HP/MP Bars -->
<div class="flex flex-col gap-1">
<div class="flex items-center gap-2">
<span class="text-[10px] font-label-caps text-error w-4">HP</span>
<div class="flex-1 h-1.5 bg-background rounded-full overflow-hidden flex gap-[1px]">
<div class="h-full bg-error w-full shadow-[0_0_5px_#ffb4ab]"></div>
</div>
</div>
<div class="flex items-center gap-2">
<span class="text-[10px] font-label-caps text-primary-container w-4">MP</span>
<div class="flex-1 h-1.5 bg-background rounded-full overflow-hidden flex gap-[1px]">
<div class="h-full bg-primary-container w-[80%] shadow-[0_0_5px_#00fbfb]"></div>
</div>
</div>
</div>
</div>
<!-- Player 2 -->
<div class="relative p-3 rounded bg-surface-container-highest/30 border border-transparent hover:border-outline-variant/50 transition-colors">
<div class="flex items-center gap-3 mb-2">
<div class="w-8 h-8 rounded bg-background border border-outline-variant flex items-center justify-center">
<span class="material-symbols-outlined text-[18px] text-secondary">account_tree</span>
</div>
<div class="flex-1">
<p class="font-body-md text-body-md text-on-surface leading-tight">NullPointer</p>
<p class="font-label-caps text-label-caps text-secondary text-[10px]">Guardião da Lógica</p>
</div>
</div>
<!-- HP/MP Bars -->
<div class="flex flex-col gap-1">
<div class="flex items-center gap-2">
<span class="text-[10px] font-label-caps text-error w-4">HP</span>
<div class="flex-1 h-1.5 bg-background rounded-full overflow-hidden flex gap-[1px]">
<div class="h-full bg-error w-[90%]"></div>
</div>
</div>
<div class="flex items-center gap-2">
<span class="text-[10px] font-label-caps text-primary-container w-4">MP</span>
<div class="flex-1 h-1.5 bg-background rounded-full overflow-hidden flex gap-[1px]">
<div class="h-full bg-primary-container w-[45%]"></div>
</div>
</div>
</div>
</div>
<!-- Player 3 -->
<div class="relative p-3 rounded bg-surface-container-highest/30 border border-transparent hover:border-outline-variant/50 transition-colors">
<div class="flex items-center gap-3 mb-2">
<div class="w-8 h-8 rounded bg-background border border-outline-variant flex items-center justify-center">
<span class="material-symbols-outlined text-[18px] text-tertiary-container">database</span>
</div>
<div class="flex-1">
<p class="font-body-md text-body-md text-on-surface leading-tight">QueryMaster</p>
<p class="font-label-caps text-label-caps text-tertiary-container text-[10px]">Mago dos Dados</p>
</div>
</div>
<!-- HP/MP Bars -->
<div class="flex flex-col gap-1">
<div class="flex items-center gap-2">
<span class="text-[10px] font-label-caps text-error w-4">HP</span>
<div class="flex-1 h-1.5 bg-background rounded-full overflow-hidden flex gap-[1px]">
<div class="h-full bg-error/40 w-[30%] animate-pulse"></div>
</div>
</div>
<div class="flex items-center gap-2">
<span class="text-[10px] font-label-caps text-primary-container w-4">MP</span>
<div class="flex-1 h-1.5 bg-background rounded-full overflow-hidden flex gap-[1px]">
<div class="h-full bg-primary-container w-[100%]"></div>
</div>
</div>
</div>
</div>
</div>
<!-- Group Ranking Snippet -->
<div class="mt-auto pt-4 border-t border-surface-container-highest">
<p class="font-label-caps text-label-caps text-on-surface-variant mb-2 flex justify-between">
<span>Guild Rank</span>
<span class="text-primary-container">#12 Global</span>
</p>
<div class="h-2 w-full bg-surface-dim rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-secondary to-primary-container w-[75%]"></div>
</div>
</div>
</div>
</aside>
<!-- Right Column: Battle Arena Canvas -->
<section class="flex-1 flex flex-col gap-6 relative">
<!-- Enemy/Challenge HUD (Level 2 Active Element) -->
<div class="bg-surface-dim border border-error/30 rounded-lg p-6 relative overflow-hidden shadow-[inset_0_0_30px_rgba(255,180,171,0.05)]">
<!-- Glitch background effect -->
<div class="absolute -right-10 -top-10 w-48 h-48 bg-error/10 rounded-full blur-3xl mix-blend-screen"></div>
<div class="flex justify-between items-start mb-4 relative z-10">
<div>
<div class="flex items-center gap-2 mb-1">
<span class="material-symbols-outlined text-error glitch-anim">bug_report</span>
<h2 class="font-headline-md text-headline-md text-error drop-shadow-[0_0_8px_rgba(255,180,171,0.5)] uppercase tracking-wider">Corrupted Dependency</h2>
</div>
<p class="font-code-md text-code-md text-on-surface-variant">Class: Level 5 Syntax Demon</p>
</div>
<div class="bg-error-container/30 border border-error/50 px-3 py-1 rounded font-label-caps text-label-caps text-error">
                        PHASE 2 / 3
                    </div>
</div>
<!-- Boss HP Bar -->
<div class="relative w-full h-4 bg-background border border-error/20 rounded-[2px] p-[1px] overflow-hidden">
<!-- Segment markers -->
<div class="absolute inset-0 z-10 flex justify-between pointer-events-none">
<div class="w-[1px] h-full bg-background/80 ml-[25%]"></div>
<div class="w-[1px] h-full bg-background/80 ml-[50%]"></div>
<div class="w-[1px] h-full bg-background/80 ml-[75%]"></div>
</div>
<div class="h-full bg-gradient-to-r from-error-container via-error to-error w-[68%] relative">
<div class="absolute right-0 top-0 w-8 h-full bg-white/30 blur-[2px]"></div>
</div>
</div>
<div class="flex justify-between mt-1 px-1">
<span class="font-label-caps text-[10px] text-error/70">ERR_NULL_REFERENCE</span>
<span class="font-code-md text-[12px] text-error">68.4% Integrity</span>
</div>
</div>
<!-- Oracle Console / Editor area -->
<div class="flex-1 flex flex-col rounded-lg bg-[#0d1117] border border-outline-variant/30 overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
<!-- Editor Header -->
<div class="bg-surface-container-highest px-4 py-2 border-b border-outline-variant/30 flex justify-between items-center">
<div class="flex gap-2">
<div class="px-3 py-1 bg-surface-dim border-t border-primary-container text-primary-container font-code-md text-[12px] rounded-t flex items-center gap-2">
<span class="material-symbols-outlined text-[14px]">description</span> report_generator.py
                        </div>
<div class="px-3 py-1 text-on-surface-variant font-code-md text-[12px] hover:bg-surface-dim/50 cursor-pointer rounded-t flex items-center gap-2">
<span class="material-symbols-outlined text-[14px]">table_chart</span> data_model.py
                        </div>
</div>
<div class="flex items-center gap-3">
<span class="flex h-2 w-2 relative">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
</span>
<span class="font-label-caps text-[10px] text-primary-container">Live Sync</span>
</div>
</div>
<!-- Editor Body -->
<div class="flex-1 p-4 font-code-md text-code-md text-on-surface overflow-y-auto relative grid grid-cols-[40px_1fr] gap-4">
<!-- Line Numbers -->
<div class="text-right text-on-surface-variant/40 select-none flex flex-col gap-1">
<span>42</span>
<span>43</span>
<span>44</span>
<span>45</span>
<span>46</span>
<span>47</span>
<span>48</span>
<span>49</span>
<span>50</span>
</div>
<!-- Code Content -->
<div class="flex flex-col gap-1 text-[#c9d1d9]">
<div><span class="text-[#ff7b72]">def</span> <span class="text-[#d2a8ff]">compile_guild_report</span>(data_source: <span class="text-[#79c0ff]">str</span>) -&gt; <span class="text-[#79c0ff]">dict</span>:</div>
<div class="pl-4 text-[#8b949e]">"""</div>
<div class="pl-4 text-[#8b949e]">Compiles the expedition data from DOCUMENT_12.</div>
<div class="pl-4 text-[#8b949e]">WARNING: Integrity compromised by null references.</div>
<div class="pl-4 text-[#8b949e]">"""</div>
<div class="pl-4">raw_data = database.fetch(data_source)</div>
<div class="pl-4 mt-2 bg-error/10 border border-error/30 p-1 -ml-1 rounded relative">
<div class="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 text-error">
<span class="material-symbols-outlined text-[14px]">close</span>
</div>
<span class="text-[#8b949e]"># Guardião da Lógica needs to validate this structure</span><br/>
                            processed_metrics = raw_data.get(<span class="text-[#a5d6ff]">'expedition_metrics'</span>).aggregate()<br/>
<span class="text-error border-b border-error border-dashed">return processed_metrics</span>
</div>
<div class="pl-4 mt-2">
<span class="text-[#ff7b72]">if</span> <span class="text-[#79c0ff]">not</span> raw_data: <span class="typewriter-cursor text-primary-container font-bold">_</span>
</div>
</div>
<!-- Targeting Crosshair (Overlay effect as per guidelines) -->
<div class="absolute right-[20%] top-[40%] w-32 h-32 pointer-events-none opacity-30 flex items-center justify-center">
<div class="w-full h-[1px] bg-primary-container absolute"></div>
<div class="h-full w-[1px] bg-primary-container absolute"></div>
<div class="w-16 h-16 border border-primary-container rounded-full absolute"></div>
</div>
</div>
</div>
<!-- Action Bar (Level 3 Overlays style) -->
<div class="flex justify-between items-center bg-surface/90 border border-primary-container/20 p-4 rounded-lg backdrop-blur-md">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-surface-dim border border-outline-variant flex items-center justify-center relative">
<span class="material-symbols-outlined text-on-surface-variant">mic_off</span>
<div class="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border border-background"></div>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-[10px] text-on-surface-variant">Team Comms</span>
<span class="font-code-md text-[12px] text-error">Muted</span>
</div>
</div>
<div class="flex gap-4">
<button class="px-6 py-2 border border-outline-variant text-on-surface hover:bg-surface-variant rounded font-label-caps text-label-caps transition-colors">
                        Consult Grimoire
                    </button>
<button class="px-8 py-2 bg-primary-container text-[#000000] font-label-caps text-label-caps font-bold rounded shadow-[0_0_15px_rgba(0,251,251,0.4)] hover:shadow-[0_0_25px_rgba(0,251,251,0.8)] hover:bg-white transition-all duration-300 relative overflow-hidden group">
<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
<span class="relative z-10 flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">publish</span>
                            EXECUTE COMPILE
                        </span>
</button>
</div>
</div>
</section>
</main>
</body></html>

<!-- Python Arcane: Guardian Trail (Arena) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Battle Arena - Guardian Trail I: Forja dos Cálculos</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;700&amp;family=Space+Grotesk:wght@400;600;700&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-primary-fixed": "#002020",
                    "on-primary": "#003737",
                    "tertiary-container": "#ffdfa0",
                    "on-surface": "#dae2fd",
                    "secondary-fixed-dim": "#dcb8ff",
                    "secondary-container": "#7701d0",
                    "inverse-on-surface": "#283044",
                    "surface-dim": "#0b1326",
                    "tertiary-fixed": "#ffdfa0",
                    "surface-bright": "#31394d",
                    "surface-container-highest": "#2d3449",
                    "tertiary-fixed-dim": "#fbbc00",
                    "on-tertiary-fixed": "#261a00",
                    "error-container": "#93000a",
                    "on-secondary": "#480081",
                    "primary-container": "#00fbfb",
                    "on-secondary-fixed": "#2c0051",
                    "on-tertiary": "#402d00",
                    "on-tertiary-container": "#815f00",
                    "surface-variant": "#2d3449",
                    "primary": "#ffffff",
                    "surface-tint": "#00dddd",
                    "secondary-fixed": "#efdbff",
                    "on-error": "#690005",
                    "primary-fixed-dim": "#00dddd",
                    "on-primary-container": "#007070",
                    "background": "#0b1326",
                    "surface-container-high": "#222a3d",
                    "primary-fixed": "#00fbfb",
                    "outline-variant": "#3a4a49",
                    "on-secondary-container": "#dcb7ff",
                    "secondary": "#dcb8ff",
                    "error": "#ffb4ab",
                    "tertiary": "#ffffff",
                    "surface": "#0b1326",
                    "surface-container": "#171f33",
                    "inverse-surface": "#dae2fd",
                    "inverse-primary": "#006a6a",
                    "surface-container-lowest": "#060e20",
                    "on-surface-variant": "#b9cac9",
                    "on-secondary-fixed-variant": "#6700b5",
                    "outline": "#839493",
                    "on-tertiary-fixed-variant": "#5c4300",
                    "on-background": "#dae2fd",
                    "on-primary-fixed-variant": "#004f4f",
                    "surface-container-low": "#131b2e",
                    "on-error-container": "#ffdad6"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "unit": "4px",
                    "margin-desktop": "48px",
                    "margin-mobile": "16px",
                    "gutter": "24px",
                    "hud-padding": "12px"
            },
            "fontFamily": {
                    "display-lg": ["Space Grotesk"],
                    "label-caps": ["JetBrains Mono"],
                    "headline-md": ["Space Grotesk"],
                    "code-md": ["JetBrains Mono"],
                    "body-md": ["Hanken Grotesk"],
                    "headline-sm": ["Space Grotesk"],
                    "body-lg": ["Hanken Grotesk"]
            },
            "fontSize": {
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700"}],
                    "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                    "code-md": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}]
            }
          }
        }
      }
    </script>
<style>
        /* Custom scrollbar for inner panels to match the glassy theme */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3a4a49; border-radius: 9999px; }
        ::-webkit-scrollbar-thumb:hover { background: #00fbfb; }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen flex overflow-hidden font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container">
<!-- HUD: XP Tracker (Level 3 Elevation concept) -->
<div class="fixed top-0 left-0 w-full h-[2px] bg-surface-container-highest z-[60]">
<div class="h-full bg-tertiary-fixed-dim shadow-[0_0_8px_#fbbc00] w-1/3"></div>
</div>
<!-- TopAppBar (from JSON) -->
<header class="bg-surface/80 backdrop-blur-xl text-primary-container border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16">
<div class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]">Python Arcane</div>
<!-- HUD: Mana/HP visual representation -->
<div class="hidden md:flex items-center gap-2 mr-auto ml-12">
<span class="material-symbols-outlined text-error text-[18px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
<div class="flex gap-[2px]">
<div class="w-6 h-2 bg-error shadow-[0_0_5px_#ffb4ab]"></div>
<div class="w-6 h-2 bg-error shadow-[0_0_5px_#ffb4ab]"></div>
<div class="w-6 h-2 bg-error shadow-[0_0_5px_#ffb4ab]"></div>
</div>
<span class="material-symbols-outlined text-primary-container text-[18px] ml-4" style="font-variation-settings: 'FILL' 1;">water_drop</span>
<div class="flex gap-[2px]">
<div class="w-6 h-2 bg-primary-container shadow-[0_0_5px_#00fbfb]"></div>
<div class="w-6 h-2 bg-primary-container shadow-[0_0_5px_#00fbfb]"></div>
<div class="w-6 h-2 bg-surface-container-highest border border-primary-container/30"></div>
</div>
</div>
<div class="flex items-center gap-4">
<button class="hover:text-primary transition-colors duration-300 p-2 rounded-full hover:bg-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined">bolt</span>
</button>
<button class="hover:text-primary transition-colors duration-300 p-2 rounded-full hover:bg-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined">auto_fix_high</span>
</button>
<button class="hover:text-primary transition-colors duration-300 p-2 rounded-full hover:bg-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined">monetization_on</span>
</button>
</div>
</header>
<!-- SideNavBar (from JSON) -->
<aside class="bg-surface-container/90 backdrop-blur-md text-secondary border-r border-secondary-container/30 shadow-xl fixed left-0 top-0 h-full pt-20 flex flex-col space-y-4 w-64 z-40">
<!-- Avatar Section -->
<div class="px-6 pb-6 border-b border-surface-variant flex flex-col items-center">
<div class="w-16 h-16 rounded-full border-2 border-secondary-container p-1 mb-3 relative group cursor-pointer">
<div class="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(119,1,208,0.5)]"></div>
<!-- Placeholder for Avatar -->
<div class="w-full h-full rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
<span class="material-symbols-outlined text-secondary text-3xl">account_circle</span>
</div>
</div>
<h2 class="font-headline-sm text-headline-sm text-secondary text-center">Archmage</h2>
<p class="font-label-caps text-label-caps text-on-surface-variant text-center mt-1">Level 42 Pythonista</p>
<button class="mt-4 w-full bg-secondary-container/20 border border-secondary-container text-secondary hover:bg-secondary-container hover:text-primary transition-all duration-300 py-2 rounded font-label-caps text-label-caps shadow-[0_0_10px_rgba(119,1,208,0.2)]">Cast Spell</button>
</div>
<!-- Navigation Tabs -->
<nav class="flex-1 overflow-y-auto font-body-md text-body-md">
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">auto_stories</span>
<span>Grimoire</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">explore</span>
<span>Trail</span>
</a>
<!-- ACTIVE TAB: Arena -->
<a class="flex items-center gap-4 bg-secondary-container/20 text-primary-container border-l-4 border-primary-container py-3 px-6 shadow-[inset_0_0_15px_rgba(0,251,251,0.2)]" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">swords</span>
<span class="font-bold">Arena</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">pets</span>
<span>Bestiary</span>
</a>
</nav>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 pt-16 flex-1 h-screen overflow-hidden flex flex-col p-gutter gap-gutter relative">
<!-- Decorative Grid Background (Level 0 Void) -->
<div class="absolute inset-0 pointer-events-none opacity-5" style="background-image: radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0); background-size: 24px 24px;"></div>
<!-- Arena Header Area -->
<div class="flex justify-between items-end z-10 shrink-0">
<div>
<p class="font-label-caps text-label-caps text-secondary tracking-widest mb-2 flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">school</span>
                    GUARDIAN TRAIL I: FORJA DOS CÁLCULOS
                </p>
<h1 class="font-display-lg text-display-lg text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Prova 1: Desafio acumulativo 1</h1>
</div>
<div class="flex gap-4">
<div class="bg-surface-container-highest border border-tertiary-fixed-dim/50 rounded px-4 py-2 flex flex-col items-center justify-center shadow-[inset_0_0_10px_rgba(251,188,0,0.1)]">
<span class="font-label-caps text-label-caps text-on-surface-variant">REWARD</span>
<span class="font-code-md text-code-md text-tertiary-fixed-dim font-bold">120 XP</span>
</div>
<div class="bg-surface-container-highest border border-primary-container/30 rounded px-4 py-2 flex flex-col items-center justify-center">
<span class="font-label-caps text-label-caps text-on-surface-variant">STATUS</span>
<span class="font-code-md text-code-md text-primary-container flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">policy</span> Autojudge
                    </span>
</div>
</div>
</div>
<!-- Arena Workstation Layout -->
<div class="flex-1 grid grid-cols-12 gap-gutter min-h-0 z-10">
<!-- Left Column: The Accumulative Challenges (Grimoire Sidebar Style) -->
<div class="col-span-4 flex flex-col gap-4 bg-surface-container/60 backdrop-blur-md border border-outline-variant/50 rounded-lg p-4 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
<div class="flex items-center justify-between pb-2 border-b border-surface-variant shrink-0">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Target Objectives</h3>
<span class="font-code-md text-code-md text-on-surface-variant">10 Steps</span>
</div>
<div class="flex-1 overflow-y-auto pr-2 flex flex-col gap-3">
<!-- Completed Step -->
<div class="bg-surface-container-highest border border-primary-container/40 rounded p-3 relative overflow-hidden opacity-70">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
<div class="flex items-start justify-between">
<span class="font-code-md text-code-md text-primary-container line-through">01. Declare var `a` = 15</span>
<span class="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
</div>
</div>
<!-- Active Step (Level 2 Elevation) -->
<div class="bg-surface-container border border-primary-container rounded p-3 relative overflow-hidden shadow-[inset_0_0_12px_rgba(0,251,251,0.15)] group">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary-container shadow-[0_0_8px_#00fbfb]"></div>
<div class="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-container/20 rounded animate-pulse"></div>
<div class="flex flex-col gap-1 relative z-10">
<div class="flex justify-between items-center">
<span class="font-code-md text-code-md text-primary">02. Declare var `b` = 27.5</span>
<span class="font-label-caps text-label-caps text-secondary px-2 py-0.5 bg-secondary-container/20 rounded">ACTIVE</span>
</div>
<p class="text-sm text-on-surface-variant">Initialize a floating point variable.</p>
</div>
</div>
<!-- Upcoming Steps -->
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded p-3 hover:border-outline-variant transition-colors">
<span class="font-code-md text-code-md text-on-surface-variant">03. Calculate `sum_ab` = a + b</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded p-3 hover:border-outline-variant transition-colors">
<span class="font-code-md text-code-md text-on-surface-variant">04. Declare var `c` = 10</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded p-3 hover:border-outline-variant transition-colors">
<span class="font-code-md text-code-md text-on-surface-variant">05. Calculate `diff` = sum_ab - c</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded p-3 hover:border-outline-variant transition-colors">
<span class="font-code-md text-code-md text-on-surface-variant">06. Multiply `result` = diff * 2</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded p-3 hover:border-outline-variant transition-colors">
<span class="font-code-md text-code-md text-on-surface-variant">07. Exponentiate `power` = result ** 2</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded p-3 hover:border-outline-variant transition-colors">
<span class="font-code-md text-code-md text-on-surface-variant">08. Floor divide `final` = power // 3</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded p-3 hover:border-outline-variant transition-colors">
<span class="font-code-md text-code-md text-on-surface-variant">09. Find remainder `mod` = final % 5</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded p-3 hover:border-outline-variant transition-colors">
<span class="font-code-md text-code-md text-on-surface-variant">10. Print output format string</span>
</div>
</div>
</div>
<!-- Right Column: Code Editor & Oracle Console -->
<div class="col-span-8 flex flex-col gap-4 min-h-0">
<!-- Code Editor Panel -->
<div class="flex-1 bg-[#0d1117] border border-outline-variant rounded-lg flex flex-col overflow-hidden shadow-2xl relative">
<!-- Editor Header -->
<div class="bg-surface-container flex items-center px-4 py-2 border-b border-outline-variant shrink-0 gap-4">
<div class="flex gap-1.5">
<div class="w-3 h-3 rounded-full bg-error/80"></div>
<div class="w-3 h-3 rounded-full bg-tertiary-fixed-dim/80"></div>
<div class="w-3 h-3 rounded-full bg-primary-container/80"></div>
</div>
<div class="flex items-center gap-2 bg-[#0d1117] px-4 py-1.5 rounded-t-md border-t border-x border-outline-variant -mb-[9px] mt-1 z-10">
<span class="material-symbols-outlined text-secondary text-[16px]">code</span>
<span class="font-code-md text-code-md text-on-surface">forja.py</span>
</div>
</div>
<!-- Editor Canvas with Crosshair concept -->
<div class="flex-1 flex overflow-hidden relative group cursor-text">
<!-- Line Numbers -->
<div class="bg-surface-container-lowest w-12 shrink-0 py-4 flex flex-col items-end pr-3 font-code-md text-code-md text-outline select-none border-r border-outline-variant/30">
<span>1</span>
<span class="text-primary-container opacity-80">2</span>
<span>3</span>
<span>4</span>
<span>5</span>
</div>
<!-- Code Area -->
<div class="flex-1 bg-transparent p-4 font-code-md text-code-md text-on-surface whitespace-pre overflow-y-auto leading-relaxed relative">
<!-- Simulated active line highlight (crosshair concept) -->
<div class="absolute left-0 top-[38px] w-full h-[28px] bg-primary-container/5 border-y border-primary-container/10 pointer-events-none"></div>
<div><span class="text-secondary-fixed-dim"># Desafio acumulativo 1 - Inicialização</span></div>
<div class="relative z-10">a = <span class="text-tertiary-fixed-dim">15</span></div>
<div class="relative z-10"><span class="animate-pulse bg-primary-container/20 w-2 h-4 inline-block align-middle mr-1"></span><span class="opacity-50"># Declare var `b` here</span></div>
<div></div>
<div></div>
</div>
<!-- Floating Action inside editor -->
<button class="absolute bottom-4 right-4 bg-primary-container text-on-primary-container hover:bg-primary-fixed border border-primary-fixed-dim shadow-[0_0_15px_rgba(0,251,251,0.4)] px-6 py-2 rounded font-label-caps text-label-caps flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
<span class="material-symbols-outlined text-[18px]">play_arrow</span>
                            CAST CODE
                        </button>
</div>
</div>
<!-- Oracle Console Panel -->
<div class="h-48 bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col overflow-hidden shrink-0">
<div class="bg-surface-container-high px-4 py-1.5 border-b border-outline-variant/50 flex justify-between items-center">
<span class="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
<span class="material-symbols-outlined text-[14px]">terminal</span> ORACLE CONSOLE
                        </span>
<button class="text-outline hover:text-primary-container"><span class="material-symbols-outlined text-[16px]">delete</span></button>
</div>
<div class="flex-1 p-4 font-code-md text-code-md text-outline-variant overflow-y-auto flex flex-col gap-1">
<div class="text-on-surface-variant">&gt; System: Arena Environment Initialized.</div>
<div class="text-on-surface-variant">&gt; Autojudge is watching. Multi-variable operations locked.</div>
<div class="text-primary-container">&gt; [Step 1] Passed. `a` verified as integer.</div>
<div class="flex items-center text-secondary">
<span class="mr-2">&gt;</span>
<span>_</span>
</div>
</div>
</div>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Boss Marathon (Arena) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Boss Marathon Arena - Python Arcane</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;700&amp;family=Hanken+Grotesk:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "on-primary-fixed": "#002020",
                      "on-primary": "#003737",
                      "tertiary-container": "#ffdfa0",
                      "on-surface": "#dae2fd",
                      "secondary-fixed-dim": "#dcb8ff",
                      "secondary-container": "#7701d0",
                      "inverse-on-surface": "#283044",
                      "surface-dim": "#0b1326",
                      "tertiary-fixed": "#ffdfa0",
                      "surface-bright": "#31394d",
                      "surface-container-highest": "#2d3449",
                      "tertiary-fixed-dim": "#fbbc00",
                      "on-tertiary-fixed": "#261a00",
                      "error-container": "#93000a",
                      "on-secondary": "#480081",
                      "primary-container": "#00fbfb",
                      "on-secondary-fixed": "#2c0051",
                      "on-tertiary": "#402d00",
                      "on-tertiary-container": "#815f00",
                      "surface-variant": "#2d3449",
                      "primary": "#ffffff",
                      "surface-tint": "#00dddd",
                      "secondary-fixed": "#efdbff",
                      "on-error": "#690005",
                      "primary-fixed-dim": "#00dddd",
                      "on-primary-container": "#007070",
                      "background": "#0b1326",
                      "surface-container-high": "#222a3d",
                      "primary-fixed": "#00fbfb",
                      "outline-variant": "#3a4a49",
                      "on-secondary-container": "#dcb7ff",
                      "secondary": "#dcb8ff",
                      "error": "#ffb4ab",
                      "tertiary": "#ffffff",
                      "surface": "#0b1326",
                      "surface-container": "#171f33",
                      "inverse-surface": "#dae2fd",
                      "inverse-primary": "#006a6a",
                      "surface-container-lowest": "#060e20",
                      "on-surface-variant": "#b9cac9",
                      "on-secondary-fixed-variant": "#6700b5",
                      "outline": "#839493",
                      "on-tertiary-fixed-variant": "#5c4300",
                      "on-background": "#dae2fd",
                      "on-primary-fixed-variant": "#004f4f",
                      "surface-container-low": "#131b2e",
                      "on-error-container": "#ffdad6"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "unit": "4px",
                      "margin-desktop": "48px",
                      "margin-mobile": "16px",
                      "gutter": "24px",
                      "hud-padding": "12px"
              },
              "fontFamily": {
                      "display-lg": [
                              "Space Grotesk"
                      ],
                      "label-caps": [
                              "JetBrains Mono"
                      ],
                      "headline-md": [
                              "Space Grotesk"
                      ],
                      "code-md": [
                              "JetBrains Mono"
                      ],
                      "body-md": [
                              "Hanken Grotesk"
                      ],
                      "headline-sm": [
                              "Space Grotesk"
                      ],
                      "body-lg": [
                              "Hanken Grotesk"
                      ]
              },
              "fontSize": {
                      "display-lg": [
                              "48px",
                              {
                                      "lineHeight": "56px",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "700"
                              }
                      ],
                      "label-caps": [
                              "12px",
                              {
                                      "lineHeight": "16px",
                                      "letterSpacing": "0.1em",
                                      "fontWeight": "700"
                              }
                      ],
                      "headline-md": [
                              "32px",
                              {
                                      "lineHeight": "40px",
                                      "fontWeight": "600"
                              }
                      ],
                      "code-md": [
                              "14px",
                              {
                                      "lineHeight": "20px",
                                      "fontWeight": "500"
                              }
                      ],
                      "body-md": [
                              "16px",
                              {
                                      "lineHeight": "24px",
                                      "fontWeight": "400"
                              }
                      ],
                      "headline-sm": [
                              "24px",
                              {
                                      "lineHeight": "32px",
                                      "fontWeight": "600"
                              }
                      ],
                      "body-lg": [
                              "18px",
                              {
                                      "lineHeight": "28px",
                                      "fontWeight": "400"
                              }
                      ]
              }
      },
          },
        }
      </script>
<style>
        .glitch-layer { position: relative; }
        .glitch-layer::before, .glitch-layer::after {
            content: attr(data-text);
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: #0b1326;
        }
        .glitch-layer::before {
            left: 2px;
            text-shadow: -1px 0 #00fbfb;
            clip: rect(24px, 550px, 90px, 0);
        }
        .glitch-layer::after {
            left: -2px;
            text-shadow: -1px 0 #ffb4ab;
            clip: rect(85px, 550px, 140px, 0);
        }
        .glow-border {
            box-shadow: 0 0 10px rgba(0,251,251,0.2), inset 0 0 10px rgba(0,251,251,0.1);
        }
        .glow-text {
            text-shadow: 0 0 8px rgba(0,251,251,0.6);
        }
        .glow-text-danger {
            text-shadow: 0 0 8px rgba(255,180,171,0.6);
        }
        .hud-panel {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(0, 251, 251, 0.2);
            backdrop-filter: blur(12px);
        }
      </style>
</head>
<body class="bg-background text-on-surface min-h-screen overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
<!-- XP Tracker (HUD Top Edge) -->
<div class="fixed top-0 left-0 w-full h-1 bg-surface-container-highest z-[100]">
<div class="h-full bg-tertiary-fixed-dim w-3/4 shadow-[0_0_8px_rgba(251,188,0,0.8)]"></div>
</div>
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] mt-1 hidden md:flex">
<div class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]">
            Python Arcane
        </div>
<div class="flex items-center gap-6">
<span class="material-symbols-outlined text-primary-container hover:text-primary-container transition-colors duration-300 cursor-pointer" data-weight="fill" style="font-variation-settings: 'FILL' 1;">bolt</span>
<span class="material-symbols-outlined text-primary-container hover:text-primary-container transition-colors duration-300 cursor-pointer" data-weight="fill" style="font-variation-settings: 'FILL' 1;">auto_fix_high</span>
<span class="material-symbols-outlined text-primary-container hover:text-primary-container transition-colors duration-300 cursor-pointer" data-weight="fill" style="font-variation-settings: 'FILL' 1;">monetization_on</span>
</div>
</header>
<!-- SideNavBar -->
<nav class="fixed left-0 top-0 h-full pt-20 flex flex-col space-y-4 bg-surface-container/90 backdrop-blur-md border-r border-secondary-container/30 shadow-xl docked left-0 h-full w-64 z-40 hidden md:flex">
<div class="px-6 pb-6 border-b border-secondary-container/30 flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-secondary-container/50 border border-secondary flex items-center justify-center overflow-hidden">
<img alt="Archmage Avatar" class="w-full h-full object-cover" data-alt="A highly detailed portrait of a mystical Archmage avatar in a dark, high-tech arcane setting. The character wears a digital visor emitting a soft cyan glow, blending fantasy wizardry with cyberpunk aesthetics. The lighting is moody, with deep obsidian blacks contrasted by striking violet and cyan neon accents. The style is 3D rendered, hyper-realistic, and polished." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA67lLHNRpiCKGlM8GO77b0q7YlYPBARqxJTOpY-ynftBk8Mi2bg4lzzK7jruXno0tf2ZqyBiogjwRi0hoO7qRzigybKcWox5PYFXvfrHX0Y9tqlbVfuhrgbP6dGocPUSzZXi_9XIJtzhf5M0EQsBDnIgocBYS6f86weuEOKySg_Jja2KxEJMCoERwSHl6a5HGXjCSrbmE7rIw0e7tZCjxSaWqp4EKWy5GoYl30-txawZvvzJGWcIezXkLxUQlnq9MPupnPlfsaMh_K"/>
</div>
<div>
<div class="font-headline-sm text-headline-sm text-secondary">Archmage</div>
<div class="font-label-caps text-label-caps text-on-surface-variant">Level 42 Pythonista</div>
</div>
</div>
<div class="flex-1 py-4">
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">auto_stories</span>
<span class="font-label-caps text-label-caps">Grimoire</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">explore</span>
<span class="font-label-caps text-label-caps">Trail</span>
</a>
<a class="flex items-center gap-4 bg-secondary-container/20 text-primary-container border-l-4 border-primary-container py-3 px-6 shadow-[inset_0_0_15px_rgba(0,251,251,0.2)] translate-x-1" href="#">
<span class="material-symbols-outlined glow-text">swords</span>
<span class="font-label-caps text-label-caps glow-text">Arena</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">pets</span>
<span class="font-label-caps text-label-caps">Bestiary</span>
</a>
</div>
<div class="p-6">
<button class="w-full bg-secondary-container text-primary font-label-caps text-label-caps py-3 rounded border border-secondary hover:shadow-[0_0_15px_rgba(119,1,208,0.6)] transition-all">
                Cast Spell
            </button>
</div>
</nav>
<!-- Main Arena Layout -->
<main class="md:ml-64 pt-20 px-gutter pb-gutter min-h-screen relative flex gap-gutter">
<!-- Left Column: Boss Status & Timer -->
<div class="w-full lg:w-1/3 flex flex-col gap-6">
<!-- Phase Timer Panel -->
<div class="hud-panel rounded-xl p-6 relative overflow-hidden group">
<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-50"></div>
<h2 class="font-label-caps text-label-caps text-primary-container mb-2 uppercase tracking-widest flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">timer</span> Arena Timer
                </h2>
<div class="font-display-lg text-display-lg text-primary glow-text text-center my-4 font-mono">
                    1:45:00
                </div>
<div class="flex justify-between items-center text-sm">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps text-on-surface-variant">Warm-up Phase</span>
<span class="font-code-md text-code-md text-on-surface opacity-50 line-through">15m 00s</span>
</div>
<div class="flex flex-col text-right">
<span class="font-label-caps text-label-caps text-primary-container glow-text">Official Marathon</span>
<span class="font-code-md text-code-md text-primary-container">Active</span>
</div>
</div>
</div>
<!-- Boss Target Panel -->
<div class="hud-panel rounded-xl p-6 relative flex-1 flex flex-col">
<h2 class="font-label-caps text-label-caps text-error mb-4 uppercase tracking-widest flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">skull</span> Current Target
                </h2>
<div class="relative w-full aspect-square mb-6 border border-error-container/50 bg-surface-container-lowest flex items-center justify-center overflow-hidden rounded group">
<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-error/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<img alt="O Analista de Dados Brutos Boss" class="w-full h-full object-cover mix-blend-luminosity opacity-80" data-alt="A menacing digital avatar representing 'The Raw Data Analyst' boss in a cyberpunk fantasy setting. The figure is composed of swirling green and red binary code and harsh geometric fragments against an obsidian void background. The lighting is dramatic, casting eerie shadows and highlighting the chaotic data streams. The overall mood is intense and intimidating, reflecting a high-stakes technical challenge." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0tOZ43H-J0GCMrvi0JeyH8BIUBF-RPFkDI4si7EayX-lGOa6AFGHSBCyrKVMwww4q2xtL5DBIyAj4D6-Jh25urLeinFJmxNb0dDzBaGoJEBXnjn3NpWSqFYwC_m9BcK6SS3Vaq7AiT3RfublnrfVEQvUqeSihfI1cj5IxWB7Wc81L__2AxmKWADgh5aGUK7krk9dLFpYxI9YcOfML5OeGKl3C9jvxmw95VHPvRj2sQsolYUdylmuDsTPu25zHaf0UWBFeLowznthW"/>
<div class="absolute bottom-4 left-4 right-4 bg-surface-container-highest/90 p-3 border-l-2 border-error backdrop-blur-md">
<h3 class="font-headline-sm text-headline-sm text-error glow-text-danger glitch-layer" data-text="O Analista de Dados Brutos">O Analista de Dados Brutos</h3>
<p class="font-code-md text-code-md text-on-surface-variant mt-1">Class: Corrupted Data Construct</p>
</div>
</div>
<!-- HP Bar -->
<div class="mt-auto">
<div class="flex justify-between font-label-caps text-label-caps mb-2">
<span class="text-error">Boss HP</span>
<span class="text-error font-mono">10000 / 10000</span>
</div>
<div class="h-4 bg-surface-container-highest border border-error/30 rounded-sm overflow-hidden flex">
<div class="h-full w-full bg-gradient-to-r from-error-container to-error shadow-[0_0_10px_rgba(255,180,171,0.5)]"></div>
</div>
</div>
</div>
<!-- Potential Loot -->
<div class="hud-panel rounded-xl p-6 border-l-2 border-tertiary-fixed-dim">
<h2 class="font-label-caps text-label-caps text-tertiary-fixed-dim mb-4 uppercase tracking-widest flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">diamond</span> Potential Loot
                </h2>
<div class="flex items-center gap-4 bg-surface-container/50 p-3 rounded border border-tertiary-fixed-dim/20 hover:border-tertiary-fixed-dim/60 transition-colors">
<div class="w-10 h-10 rounded bg-tertiary-container/20 border border-tertiary-fixed-dim flex items-center justify-center shadow-[inset_0_0_10px_rgba(251,188,0,0.2)]">
<span class="material-symbols-outlined text-tertiary-fixed-dim">code</span>
</div>
<div>
<div class="font-code-md text-code-md text-tertiary-fixed-dim">fstring-pro Superpower</div>
<div class="font-body-md text-[12px] text-on-surface-variant">Unlocks advanced string formatting abilities.</div>
</div>
</div>
</div>
</div>
<!-- Right Column: Gauntlet & Hall of Fame -->
<div class="w-full lg:w-2/3 flex flex-col gap-6">
<!-- Gauntlet of Challenges -->
<div class="hud-panel rounded-xl p-6 flex-1">
<div class="flex justify-between items-center mb-6">
<h2 class="font-headline-md text-headline-md text-primary-container glow-text flex items-center gap-3">
<span class="material-symbols-outlined text-[32px]">view_timeline</span>
                        Gauntlet of Challenges
                    </h2>
<span class="font-label-caps text-label-caps bg-primary-container/10 text-primary-container px-3 py-1 rounded-full border border-primary-container/30">Maratona Prática I</span>
</div>
<div class="space-y-4">
<!-- Mission 1: Active -->
<div class="bg-surface-variant/50 border border-primary-container p-5 rounded-lg flex items-start gap-5 glow-border relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary-container shadow-[0_0_10px_#00fbfb]"></div>
<div class="w-12 h-12 rounded bg-primary-container/20 flex items-center justify-center shrink-0 border border-primary-container">
<span class="font-code-md text-code-md text-primary-container font-bold">M1</span>
</div>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-primary">Data Cleansing Ritual</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Purify the corrupted dataset using standard spells.</p>
<div class="mt-4 flex gap-3">
<span class="font-label-caps text-label-caps bg-surface-container px-2 py-1 rounded text-on-surface-variant border border-outline-variant">Difficulty: Easy</span>
<span class="font-label-caps text-label-caps bg-surface-container px-2 py-1 rounded text-primary-container border border-primary-container/30">Reward: 100 XP</span>
</div>
</div>
<button class="bg-primary-container text-on-primary-container font-label-caps text-label-caps px-6 py-3 rounded hover:bg-primary-fixed-dim hover:shadow-[0_0_15px_rgba(0,251,251,0.8)] transition-all h-fit self-center">
                            Cast Now
                        </button>
</div>
<!-- Mission 2: Locked -->
<div class="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-lg flex items-start gap-5 opacity-70">
<div class="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant">
<span class="material-symbols-outlined text-outline">lock</span>
</div>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface">The Pivot Paradox</h3>
<p class="font-body-md text-body-md text-outline mt-1">Restructure the data flow to expose hidden truths.</p>
</div>
</div>
<!-- Mission 3: Locked -->
<div class="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-lg flex items-start gap-5 opacity-70">
<div class="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant">
<span class="material-symbols-outlined text-outline">lock</span>
</div>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Regex Incantation</h3>
<p class="font-body-md text-body-md text-outline mt-1">Extract specific patterns from the void.</p>
</div>
</div>
<!-- Mission 4: Locked -->
<div class="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-lg flex items-start gap-5 opacity-70">
<div class="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant">
<span class="material-symbols-outlined text-outline">lock</span>
</div>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Join the Fragments</h3>
<p class="font-body-md text-body-md text-outline mt-1">Merge disparate data tables into a unified source.</p>
</div>
</div>
<!-- Mission 5: Locked -->
<div class="bg-surface-container-lowest border border-error/20 p-5 rounded-lg flex items-start gap-5 opacity-70 relative overflow-hidden">
<div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAxODAsIDE3MSwgMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
<div class="w-12 h-12 rounded bg-error-container/20 flex items-center justify-center shrink-0 border border-error/50">
<span class="material-symbols-outlined text-error">skull</span>
</div>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-error">The Final Aggregation</h3>
<p class="font-body-md text-body-md text-error/70 mt-1">Face the Analyst directly. Compile the ultimate report.</p>
</div>
</div>
</div>
</div>
<!-- Hall of Fame -->
<div class="hud-panel rounded-xl p-6">
<h2 class="font-label-caps text-label-caps text-secondary mb-4 uppercase tracking-widest flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">military_tech</span> Hall of Fame (Live Ranking)
                </h2>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="border-b border-outline-variant/30 font-label-caps text-label-caps text-on-surface-variant">
<th class="pb-3 px-4 w-16">Rank</th>
<th class="pb-3 px-4">Mage</th>
<th class="pb-3 px-4 text-right">Damage Dealt</th>
<th class="pb-3 px-4 text-right">Time</th>
</tr>
</thead>
<tbody class="font-code-md text-code-md">
<tr class="border-b border-outline-variant/10 bg-secondary-container/10">
<td class="py-3 px-4 text-tertiary-fixed-dim glow-text">1st</td>
<td class="py-3 px-4 text-primary">CyberWizard99</td>
<td class="py-3 px-4 text-right text-error">4,250</td>
<td class="py-3 px-4 text-right text-on-surface-variant">45m 12s</td>
</tr>
<tr class="border-b border-outline-variant/10">
<td class="py-3 px-4 text-on-surface-variant">2nd</td>
<td class="py-3 px-4 text-primary">DataDruid</td>
<td class="py-3 px-4 text-right text-error">3,800</td>
<td class="py-3 px-4 text-right text-on-surface-variant">48m 05s</td>
</tr>
<tr class="border-b border-outline-variant/10">
<td class="py-3 px-4 text-on-surface-variant">3rd</td>
<td class="py-3 px-4 text-primary">ByteSorceress</td>
<td class="py-3 px-4 text-right text-error">3,120</td>
<td class="py-3 px-4 text-right text-on-surface-variant">51m 30s</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Apprentice Trail (Arena) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Python Arcane - Battle Arena</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;700&amp;family=Hanken+Grotesk:wght@400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-fixed": "#002020",
                        "on-primary": "#003737",
                        "tertiary-container": "#ffdfa0",
                        "on-surface": "#dae2fd",
                        "secondary-fixed-dim": "#dcb8ff",
                        "secondary-container": "#7701d0",
                        "inverse-on-surface": "#283044",
                        "surface-dim": "#0b1326",
                        "tertiary-fixed": "#ffdfa0",
                        "surface-bright": "#31394d",
                        "surface-container-highest": "#2d3449",
                        "tertiary-fixed-dim": "#fbbc00",
                        "on-tertiary-fixed": "#261a00",
                        "error-container": "#93000a",
                        "on-secondary": "#480081",
                        "primary-container": "#00fbfb",
                        "on-secondary-fixed": "#2c0051",
                        "on-tertiary": "#402d00",
                        "on-tertiary-container": "#815f00",
                        "surface-variant": "#2d3449",
                        "primary": "#ffffff",
                        "surface-tint": "#00dddd",
                        "secondary-fixed": "#efdbff",
                        "on-error": "#690005",
                        "primary-fixed-dim": "#00dddd",
                        "on-primary-container": "#007070",
                        "background": "#0b1326",
                        "surface-container-high": "#222a3d",
                        "primary-fixed": "#00fbfb",
                        "outline-variant": "#3a4a49",
                        "on-secondary-container": "#dcb7ff",
                        "secondary": "#dcb8ff",
                        "error": "#ffb4ab",
                        "tertiary": "#ffffff",
                        "surface": "#0b1326",
                        "surface-container": "#171f33",
                        "inverse-surface": "#dae2fd",
                        "inverse-primary": "#006a6a",
                        "surface-container-lowest": "#060e20",
                        "on-surface-variant": "#b9cac9",
                        "on-secondary-fixed-variant": "#6700b5",
                        "outline": "#839493",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-background": "#dae2fd",
                        "on-primary-fixed-variant": "#004f4f",
                        "surface-container-low": "#131b2e",
                        "on-error-container": "#ffdad6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "4px",
                        "margin-desktop": "48px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "hud-padding": "12px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-caps": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "headline-sm": ["Space Grotesk"],
                        "body-lg": ["Hanken Grotesk"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }],
                        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "code-md": ["14px", { "lineHeight": "20px", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
<style>
        body { background-color: #020617; } /* Level 0 Void override */
    </style>
</head>
<body class="bg-background text-on-background min-h-screen flex font-body-md">
<!-- SideNavBar (Suppressed due to specific Battle Arena focus, but we'll include a modified version as the Challenge Sidebar per instructions) -->
<aside class="fixed left-0 top-0 h-full w-80 bg-surface-container/90 backdrop-blur-md border-r border-secondary-container/30 shadow-xl flex flex-col z-40 pt-6 px-6 pb-6 overflow-y-auto">
<!-- Brand/Header (Replacing typical nav with challenge info) -->
<div class="mb-8">
<h1 class="font-headline-sm text-headline-sm text-secondary mb-2">Python Arcane</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant">Apprentice Trail I: Cofres da Memória</p>
</div>
<div class="flex-1 space-y-8">
<!-- Runa Info -->
<div class="bg-surface-dim/80 border border-primary-container/20 rounded-xl p-4 shadow-[inset_0_0_10px_rgba(0,251,251,0.1)] relative overflow-hidden">
<div class="absolute -right-4 -top-4 w-16 h-16 bg-primary-container/10 rounded-full blur-xl"></div>
<h2 class="font-headline-sm text-headline-sm text-primary-container mb-2">Runa 1: Registro do Herói</h2>
<div class="flex items-center gap-2 mb-4 text-tertiary-container">
<span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="font-label-caps text-label-caps">Reward: 70 XP</span>
</div>
<div class="space-y-2">
<h3 class="font-label-caps text-label-caps text-on-surface-variant">Objective</h3>
<p class="font-body-md text-body-md text-on-surface">Declare variables to store the hero's name and level, then print them.</p>
</div>
</div>
<!-- Test Cases -->
<div class="space-y-4">
<h3 class="font-label-caps text-label-caps text-primary-container border-b border-primary-container/20 pb-2">Test Cases</h3>
<div class="bg-surface-container-highest rounded-lg p-3 border border-outline-variant/50">
<div class="flex justify-between items-center mb-2">
<span class="font-label-caps text-label-caps text-on-surface-variant">Input</span>
<span class="font-code-md text-code-md text-outline">sem entrada</span>
</div>
<div class="border-t border-outline-variant/30 pt-2">
<span class="font-label-caps text-label-caps text-on-surface-variant block mb-1">Expected Output</span>
<code class="font-code-md text-code-md text-secondary block bg-surface-lowest p-2 rounded">Nome: Ayla<br/>Nível: 1</code>
</div>
</div>
</div>
</div>
<!-- No Time Limit Indicator -->
<div class="mt-auto pt-6 border-t border-outline-variant/30 flex items-center justify-center gap-2 text-on-surface-variant">
<span class="material-symbols-outlined">hourglass_disabled</span>
<span class="font-label-caps text-label-caps">No Time Limit</span>
</div>
</aside>
<!-- Main Content Area -->
<main class="ml-80 flex-1 h-screen flex flex-col relative">
<!-- TopAppBar (Simplified for Arena) -->
<header class="h-16 border-b border-primary-container/20 bg-surface/80 backdrop-blur-xl flex items-center justify-between px-margin-desktop z-30 relative shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
<div class="flex items-center gap-4">
<span class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]">Arena</span>
</div>
<div class="flex gap-4">
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300">
<span class="material-symbols-outlined">bolt</span>
</button>
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300">
<span class="material-symbols-outlined">auto_fix_high</span>
</button>
</div>
</header>
<!-- Editor Canvas -->
<div class="flex-1 p-gutter bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-container/50 via-surface/80 to-background flex flex-col relative">
<!-- Target Reticle Overlay (Decorative) -->
<div class="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
<div class="w-[800px] h-[800px] border border-primary-container rounded-full flex items-center justify-center">
<div class="w-[600px] h-[600px] border border-secondary-container rounded-full"></div>
</div>
</div>
<!-- Editor Container -->
<div class="flex-1 bg-[#0F172A]/80 backdrop-blur-xl border border-primary-container/20 rounded-xl flex flex-col overflow-hidden shadow-[inset_0_0_20px_rgba(0,251,251,0.05)] relative z-10">
<!-- Editor Tab/Header -->
<div class="h-10 bg-surface-container-highest border-b border-outline-variant/50 flex items-center px-4">
<span class="font-code-md text-code-md text-primary-container flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">code</span>
                        runa_1.py
                    </span>
</div>
<!-- Code Area -->
<div class="flex-1 p-4 font-code-md text-code-md text-on-surface relative">
<div class="absolute left-0 top-0 bottom-0 w-12 bg-surface-container-lowest/50 border-r border-outline-variant/30 flex flex-col items-center pt-4 text-on-surface-variant/50 select-none">
<span>1</span>
<span>2</span>
<span>3</span>
<span>4</span>
<span>5</span>
</div>
<div class="ml-10 pl-4 pt-0 outline-none" contenteditable="true" spellcheck="false">
<span class="text-outline-variant"># Declare the hero's attributes here</span><br/>
<br/>
<span class="text-primary-container animate-pulse">_</span>
</div>
</div>
</div>
<!-- Action Area -->
<div class="h-24 mt-gutter flex items-center justify-end z-10">
<button class="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-8 py-4 rounded-lg flex items-center gap-3 shadow-[0_0_15px_rgba(0,251,251,0.4)] hover:shadow-[0_0_25px_rgba(0,251,251,0.8)] hover:scale-[1.02] transition-all duration-300">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
                    Cast Spell
                </button>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Adventure Trail (Arena) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Battle Arena - Python Arcane</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;700&amp;family=Hanken+Grotesk:wght@400;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-fixed": "#002020",
                        "on-primary": "#003737",
                        "tertiary-container": "#ffdfa0",
                        "on-surface": "#dae2fd",
                        "secondary-fixed-dim": "#dcb8ff",
                        "secondary-container": "#7701d0",
                        "inverse-on-surface": "#283044",
                        "surface-dim": "#0b1326",
                        "tertiary-fixed": "#ffdfa0",
                        "surface-bright": "#31394d",
                        "surface-container-highest": "#2d3449",
                        "tertiary-fixed-dim": "#fbbc00",
                        "on-tertiary-fixed": "#261a00",
                        "error-container": "#93000a",
                        "on-secondary": "#480081",
                        "primary-container": "#00fbfb",
                        "on-secondary-fixed": "#2c0051",
                        "on-tertiary": "#402d00",
                        "on-tertiary-container": "#815f00",
                        "surface-variant": "#2d3449",
                        "primary": "#ffffff",
                        "surface-tint": "#00dddd",
                        "secondary-fixed": "#efdbff",
                        "on-error": "#690005",
                        "primary-fixed-dim": "#00dddd",
                        "on-primary-container": "#007070",
                        "background": "#0b1326",
                        "surface-container-high": "#222a3d",
                        "primary-fixed": "#00fbfb",
                        "outline-variant": "#3a4a49",
                        "on-secondary-container": "#dcb7ff",
                        "secondary": "#dcb8ff",
                        "error": "#ffb4ab",
                        "tertiary": "#ffffff",
                        "surface": "#0b1326",
                        "surface-container": "#171f33",
                        "inverse-surface": "#dae2fd",
                        "inverse-primary": "#006a6a",
                        "surface-container-lowest": "#060e20",
                        "on-surface-variant": "#b9cac9",
                        "on-secondary-fixed-variant": "#6700b5",
                        "outline": "#839493",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-background": "#dae2fd",
                        "on-primary-fixed-variant": "#004f4f",
                        "surface-container-low": "#131b2e",
                        "on-error-container": "#ffdad6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "4px",
                        "margin-desktop": "48px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "hud-padding": "12px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-caps": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "headline-sm": ["Space Grotesk"],
                        "body-lg": ["Hanken Grotesk"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }],
                        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "code-md": ["14px", { "lineHeight": "20px", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
<style>
        body { background-color: #020617; } /* Level 0 Void */
        .level-1-panel { background-color: rgba(15, 23, 42, 0.8); border: 1px solid rgba(0, 251, 251, 0.2); }
        .level-2-active { backdrop-filter: blur(12px); box-shadow: inset 0 0 10px rgba(0, 251, 251, 0.4); }
        .neon-text-primary { text-shadow: 0 0 10px rgba(0, 251, 251, 0.6); }
        .neon-border-primary { box-shadow: 0 0 10px rgba(0, 251, 251, 0.4); border-color: rgba(0, 251, 251, 1); }
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
    </style>
</head>
<body class="text-on-surface font-body-md min-h-screen overflow-x-hidden pt-16 pl-64">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
<div class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)] ml-64">Python Arcane</div>
<div class="hidden flex-1 justify-center items-center">
<!-- Search bar hidden as per JSON -->
</div>
<div class="flex items-center gap-6">
<span class="material-symbols-outlined text-primary-container hover:text-primary-container transition-colors duration-300 cursor-pointer text-[24px]">bolt</span>
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary-container transition-colors duration-300 cursor-pointer text-[24px]">auto_fix_high</span>
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary-container transition-colors duration-300 cursor-pointer text-[24px]">monetization_on</span>
</div>
<!-- HUD Elements Absolute Positioned within Header Context -->
<div class="absolute top-hud-padding right-hud-padding flex gap-4 items-center">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">stars</span>
<span class="font-label-caps text-label-caps text-tertiary-fixed-dim">90 XP</span>
</div>
</div>
</header>
<!-- SideNavBar -->
<nav class="fixed left-0 top-0 h-full pt-20 flex flex-col space-y-4 bg-surface-container/90 backdrop-blur-md w-64 border-r border-secondary-container/30 shadow-xl z-40">
<div class="flex flex-col items-center mb-8 px-6">
<div class="w-16 h-16 rounded-full bg-surface-variant mb-4 overflow-hidden border border-secondary-container/50 flex justify-center items-center">
<span class="material-symbols-outlined text-secondary text-[32px]">face</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-secondary">Archmage</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Level 42 Pythonista</p>
</div>
<div class="flex flex-col w-full">
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined text-[20px]">auto_stories</span>
<span class="font-label-caps text-label-caps">Grimoire</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined text-[20px]">explore</span>
<span class="font-label-caps text-label-caps">Trail</span>
</a>
<!-- Arena is ACTIVE -->
<a class="flex items-center gap-4 bg-secondary-container/20 text-primary-container border-l-4 border-primary-container py-3 px-6 shadow-[inset_0_0_15px_rgba(0,251,251,0.2)]" href="#">
<span class="material-symbols-outlined text-[20px]">swords</span>
<span class="font-label-caps text-label-caps">Arena</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined text-[20px]">pets</span>
<span class="font-label-caps text-label-caps">Bestiary</span>
</a>
</div>
<div class="mt-auto p-6 w-full">
<button class="w-full bg-primary-container text-on-primary-container font-label-caps text-label-caps py-3 rounded hover:shadow-[0_0_15px_rgba(0,251,251,0.6)] transition-all">
                Cast Spell
            </button>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="p-gutter grid grid-cols-12 gap-gutter max-w-[1400px] mx-auto min-h-[calc(100vh-64px)]">
<!-- Top XP Tracker (HUD element) -->
<div class="fixed top-0 left-0 w-full h-[2px] bg-surface-variant z-[60]">
<div class="h-full bg-tertiary-fixed-dim w-[45%] shadow-[0_0_10px_rgba(251,188,0,0.8)]"></div>
</div>
<!-- Problem Statement Sidebar -->
<aside class="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
<div class="level-1-panel rounded-lg p-6 flex flex-col gap-4">
<div class="flex justify-between items-start">
<div>
<span class="font-label-caps text-label-caps text-secondary-fixed mb-2 block">Adventure Trail I</span>
<h1 class="font-headline-sm text-headline-sm text-primary">Lanterna 1: Cadastro do Mercado</h1>
</div>
<div class="bg-surface-container-high rounded px-3 py-1 border border-tertiary-container/30 flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary-fixed text-[16px]">emoji_events</span>
<span class="font-label-caps text-label-caps text-tertiary-fixed">90 PT</span>
</div>
</div>
<div class="font-body-md text-body-md text-on-surface-variant space-y-4">
<p>A vila de Lanternas precisa organizar seu mercado. Crie um programa de cadastro de itens básicos.</p>
<p>Declare as seguintes variáveis e atribua valores a elas baseadas no exemplo:</p>
<ul class="list-disc pl-5 space-y-1 text-on-surface">
<li><code class="font-code-md text-code-md text-primary-container bg-surface-container px-1 py-0.5 rounded">product</code> (texto)</li>
<li><code class="font-code-md text-code-md text-primary-container bg-surface-container px-1 py-0.5 rounded">price</code> (número flutuante)</li>
<li><code class="font-code-md text-code-md text-primary-container bg-surface-container px-1 py-0.5 rounded">stock</code> (número inteiro)</li>
</ul>
</div>
<div class="bg-surface-container rounded p-4 border border-outline-variant/30 mt-4">
<h3 class="font-label-caps text-label-caps text-on-surface-variant mb-2">Exemplo de Entrada (Mental)</h3>
<div class="font-code-md text-code-md text-on-surface bg-surface-dim p-2 rounded">Nenhuma entrada necessária. Defina no código.</div>
<h3 class="font-label-caps text-label-caps text-on-surface-variant mb-2 mt-4">Saída Esperada</h3>
<div class="font-code-md text-code-md text-on-surface bg-surface-dim p-2 rounded whitespace-pre-wrap">Produto: Poção de Vida
Preço: 15.5
Estoque: 10</div>
</div>
<div class="flex items-center gap-2 text-on-surface-variant mt-2">
<span class="material-symbols-outlined text-[16px]">schedule</span>
<span class="font-label-caps text-label-caps">No time limit. Home-practice focus.</span>
</div>
</div>
</aside>
<!-- Code Editor Area -->
<section class="col-span-12 lg:col-span-8 flex flex-col gap-gutter h-full">
<!-- Editor Glass Panel -->
<div class="level-1-panel rounded-lg flex flex-col flex-grow overflow-hidden relative group">
<!-- Target Overlay (appears on hover theoretically, keeping it visible for UI purposes with low opacity) -->
<div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[linear-gradient(rgba(0,251,251,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,251,251,0.2)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
<div class="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-outline-variant/50">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary-container text-[18px]">code_blocks</span>
<span class="font-label-caps text-label-caps text-on-surface">spell_book.py</span>
</div>
<div class="flex gap-2">
<button class="w-3 h-3 rounded-full bg-error-container hover:bg-error transition-colors"></button>
<button class="w-3 h-3 rounded-full bg-tertiary-fixed-dim hover:bg-tertiary-fixed transition-colors"></button>
<button class="w-3 h-3 rounded-full bg-primary-container hover:bg-primary transition-colors"></button>
</div>
</div>
<div class="flex-grow bg-[#0f111a] p-4 font-code-md text-code-md text-on-surface relative overflow-auto">
<div class="absolute left-0 top-0 bottom-0 w-12 bg-surface-container-highest/30 border-r border-outline-variant/20 flex flex-col items-center py-4 text-on-surface-variant/50 select-none">
<span>1</span>
<span>2</span>
<span>3</span>
<span>4</span>
<span>5</span>
<span>6</span>
<span>7</span>
<span>8</span>
<span>9</span>
</div>
<div class="ml-10">
<pre class="m-0"><span class="text-on-surface-variant italic"># Defina as variáveis do mercado aqui</span>
<span class="text-secondary-fixed">product</span> = <span class="text-tertiary-container">"Poção de Vida"</span>
<span class="text-secondary-fixed">price</span> = <span class="text-primary-container">15.5</span>
<span class="text-secondary-fixed">stock</span> = <span class="text-primary-container">10</span>

<span class="text-on-surface-variant italic"># Exibe os resultados (Não altere)</span>
<span class="text-secondary-container">print</span>(<span class="text-tertiary-container">f"Produto: {</span><span class="text-secondary-fixed">product</span><span class="text-tertiary-container">}"</span>)
<span class="text-secondary-container">print</span>(<span class="text-tertiary-container">f"Preço: {</span><span class="text-secondary-fixed">price</span><span class="text-tertiary-container">}"</span>)
<span class="text-secondary-container">print</span>(<span class="text-tertiary-container">f"Estoque: {</span><span class="text-secondary-fixed">stock</span><span class="text-tertiary-container">}"</span>)<span class="text-primary-container cursor-blink">_</span></pre>
</div>
</div>
<!-- Action Bar -->
<div class="bg-surface-container-high px-4 py-3 flex justify-end gap-4 border-t border-outline-variant/50">
<button class="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface px-4 py-2 transition-colors border border-outline-variant/50 rounded flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">bug_report</span>
                        Debug
                    </button>
<button class="bg-primary-container text-on-primary-container font-label-caps text-label-caps px-6 py-2 rounded hover:shadow-[0_0_15px_rgba(0,251,251,0.6)] transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">play_arrow</span>
                        Execute Cast
                    </button>
</div>
</div>
<!-- Oracle Console (Output) -->
<div class="level-1-panel rounded-lg h-48 flex flex-col overflow-hidden">
<div class="bg-surface-container-highest/80 px-4 py-1 flex items-center gap-2 border-b border-outline-variant/30">
<span class="material-symbols-outlined text-secondary-fixed text-[16px]">terminal</span>
<span class="font-label-caps text-label-caps text-secondary-fixed">Oracle Console</span>
</div>
<div class="p-4 font-code-md text-code-md text-on-surface flex-grow bg-[#000000]/40 overflow-auto">
<div class="opacity-50 italic text-sm mb-2">Awaiting compilation...</div>
</div>
</div>
</section>
</main>
</body></html>

<!-- Python Arcane: Multiverse Hub -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Multiverse Hub - Python Arcane</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;700&amp;family=Hanken+Grotesk:wght@400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-fixed": "#002020",
                        "on-primary": "#003737",
                        "tertiary-container": "#ffdfa0",
                        "on-surface": "#dae2fd",
                        "secondary-fixed-dim": "#dcb8ff",
                        "secondary-container": "#7701d0",
                        "inverse-on-surface": "#283044",
                        "surface-dim": "#0b1326",
                        "tertiary-fixed": "#ffdfa0",
                        "surface-bright": "#31394d",
                        "surface-container-highest": "#2d3449",
                        "tertiary-fixed-dim": "#fbbc00",
                        "on-tertiary-fixed": "#261a00",
                        "error-container": "#93000a",
                        "on-secondary": "#480081",
                        "primary-container": "#00fbfb",
                        "on-secondary-fixed": "#2c0051",
                        "on-tertiary": "#402d00",
                        "on-tertiary-container": "#815f00",
                        "surface-variant": "#2d3449",
                        "primary": "#ffffff",
                        "surface-tint": "#00dddd",
                        "secondary-fixed": "#efdbff",
                        "on-error": "#690005",
                        "primary-fixed-dim": "#00dddd",
                        "on-primary-container": "#007070",
                        "background": "#0b1326",
                        "surface-container-high": "#222a3d",
                        "primary-fixed": "#00fbfb",
                        "outline-variant": "#3a4a49",
                        "on-secondary-container": "#dcb7ff",
                        "secondary": "#dcb8ff",
                        "error": "#ffb4ab",
                        "tertiary": "#ffffff",
                        "surface": "#0b1326",
                        "surface-container": "#171f33",
                        "inverse-surface": "#dae2fd",
                        "inverse-primary": "#006a6a",
                        "surface-container-lowest": "#060e20",
                        "on-surface-variant": "#b9cac9",
                        "on-secondary-fixed-variant": "#6700b5",
                        "outline": "#839493",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-background": "#dae2fd",
                        "on-primary-fixed-variant": "#004f4f",
                        "surface-container-low": "#131b2e",
                        "on-error-container": "#ffdad6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "4px",
                        "margin-desktop": "48px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "hud-padding": "12px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-caps": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "headline-sm": ["Space Grotesk"],
                        "body-lg": ["Hanken Grotesk"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700"}],
                        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "code-md": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}]
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .material-symbols-outlined.fill-icon {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen font-body-md overflow-x-hidden">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
<div class="flex items-center gap-4">
<span class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]">Python Arcane</span>
</div>
<div class="flex items-center gap-4">
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300">
<span class="material-symbols-outlined">bolt</span>
</button>
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300">
<span class="material-symbols-outlined">auto_fix_high</span>
</button>
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300">
<span class="material-symbols-outlined">monetization_on</span>
</button>
</div>
</header>
<!-- SideNavBar -->
<nav class="hidden md:flex fixed left-0 top-0 h-full pt-20 flex-col space-y-4 bg-surface-container/90 backdrop-blur-md w-64 border-r border-secondary-container/30 shadow-xl z-40">
<div class="px-6 pb-6 border-b border-secondary-container/30">
<div class="flex items-center gap-4 mb-2">
<div class="w-12 h-12 rounded-full bg-secondary-container/50 border border-primary-container overflow-hidden">
<img alt="Archmage Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxNZgAoD9QD0ZlPKJICPdxLoPev5xspKFtTljpjIV1w_UHekoGGgauRzBArEJJqkd_eQ2n_uOZBMqhvyCYQhL51cmG3u9fIBsVbYEWfTuGuGXNns0aY7tsvER6c_ZNpPUNi2q3AwINycoGUXL-m0dSrNtrCB4pAOPkTlzRKmRtl2sb-EsFUn83IFqmCdcl1hfnq8U1dl5GQiBn3wPh9FIPV5n-vNXrz5TCo98wkWVorywS3GloLNdrBMbossq_pO2R50HHTb72EnBd"/>
</div>
<div>
<div class="font-headline-sm text-headline-sm text-secondary">Archmage</div>
<div class="font-label-caps text-label-caps text-on-surface-variant">Level 42 Pythonista</div>
</div>
</div>
<button class="w-full mt-4 bg-primary-container text-on-primary-container font-label-caps text-label-caps py-2 rounded font-bold hover:bg-surface-tint transition-colors shadow-[0_0_10px_rgba(0,251,251,0.4)]">
                Cast Spell
            </button>
</div>
<div class="flex-1 overflow-y-auto pt-4">
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">auto_stories</span>
<span class="font-body-md text-body-md">Grimoire</span>
</a>
<a class="flex items-center gap-4 bg-secondary-container/20 text-primary-container border-l-4 border-primary-container py-3 px-6 shadow-[inset_0_0_15px_rgba(0,251,251,0.2)]" href="#">
<span class="material-symbols-outlined">explore</span>
<span class="font-body-md text-body-md">Trail</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">swords</span>
<span class="font-body-md text-body-md">Arena</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">pets</span>
<span class="font-body-md text-body-md">Bestiary</span>
</a>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="md:ml-64 pt-20 px-margin-mobile md:px-margin-desktop pb-margin-desktop min-h-screen relative">
<!-- Background Cosmic Image -->
<div class="absolute inset-0 z-[-1] opacity-20 pointer-events-none" data-alt="A sprawling, cosmic view of a dark nebula with swirling clouds of deep violet and cyan stardust. Scattered across the void are glowing, ethereal constellations that faintly resemble geometric runes and code structures. The lighting is mysterious and cinematic, dominated by deep shadows and vibrant, magical neon accents. The overall style perfectly captures the fusion of dark, arcane fantasy and futuristic technical interfaces." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8rbj326Wwz8KKYOaKXFFlHzdhH_DF5jz9B_oBhb-xnNFw8oMbH_ldjF97nwEWy6v0hPEe4cBvsdEOu6hV9PKkFA_RSz3LiapfqDdX8Y8uIUpF9rdOgt6rqXrb1xidEkp4MmM_wp8QDT-MeuBm4qsDJVnISmG5yfv5CcozHeZxAhCFVArgmWdKBKxpr5ZIBLilKbbvhkBD5qdKhyhrWF2fuuJv5XEOm-0pPxaEM7rRispeZFxZKP_OQNDNIHgbI-WuV6R9YN7aQt5B'); background-size: cover; background-position: center;"></div>
<div class="max-w-[1200px] mx-auto pt-8">
<!-- Page Header -->
<div class="mb-12">
<h1 class="font-display-lg text-display-lg text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-2">Multiverse Hub</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Select your next realm of mastery. Each world holds ancient Pythonic secrets waiting to be compiled.</p>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
<!-- Left Column: Map/Worlds -->
<div class="lg:col-span-8 relative min-h-[600px] bg-surface-container-low/80 backdrop-blur-xl border border-secondary-container/20 rounded-xl p-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
<!-- SVG Path Connectors (Simulated with absolute divs for visual flow) -->
<svg class="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveaspectratio="none">
<path d="M 150 150 Q 300 100 450 250 T 700 350" fill="transparent" stroke="var(--tw-colors-primary-container)" stroke-dasharray="5,5" stroke-width="2"></path>
<path d="M 450 250 Q 500 450 300 500" fill="transparent" stroke="var(--tw-colors-on-surface-variant)" stroke-dasharray="5,5" stroke-width="2"></path>
</svg>
<!-- World Nodes -->
<!-- Node 1: Unlocked, Completed -->
<div class="absolute top-[10%] left-[10%] group cursor-pointer">
<div class="relative w-24 h-24 rounded-full bg-surface-container border border-primary-container shadow-[0_0_20px_rgba(0,251,251,0.3)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
<span class="material-symbols-outlined text-primary-container text-4xl fill-icon drop-shadow-[0_0_8px_rgba(0,251,251,0.8)]">token</span>
<div class="absolute -bottom-8 whitespace-nowrap text-center">
<div class="font-label-caps text-label-caps text-primary-container">Syntax Sanctuary</div>
</div>
</div>
</div>
<!-- Node 2: Unlocked, Active -->
<div class="absolute top-[30%] left-[45%] group cursor-pointer z-10">
<div class="relative w-32 h-32 rounded-full bg-surface-container border-2 border-secondary shadow-[0_0_30px_rgba(220,184,255,0.4),inset_0_0_20px_rgba(119,1,208,0.5)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 animate-pulse">
<span class="material-symbols-outlined text-secondary text-5xl fill-icon drop-shadow-[0_0_12px_rgba(220,184,255,0.8)]">public</span>
<!-- Runic Ring -->
<div class="absolute inset-[-10px] border border-secondary/50 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
<div class="absolute -bottom-10 whitespace-nowrap text-center bg-surface-container-high/90 px-3 py-1 rounded border border-secondary-container/50 backdrop-blur-md">
<div class="font-label-caps text-label-caps text-secondary">Loops Labyrinth</div>
<div class="font-code-md text-code-md text-tertiary-fixed-dim text-[10px]">Active Quest</div>
</div>
</div>
</div>
<!-- Node 3: Locked -->
<div class="absolute top-[50%] right-[15%] group cursor-not-allowed opacity-50 grayscale">
<div class="relative w-24 h-24 rounded-full bg-surface-container border border-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant text-4xl">lock</span>
<div class="absolute -bottom-8 whitespace-nowrap text-center">
<div class="font-label-caps text-label-caps text-on-surface-variant">Functions Forge</div>
</div>
</div>
</div>
<!-- Node 4: Locked -->
<div class="absolute bottom-[15%] left-[30%] group cursor-not-allowed opacity-50 grayscale">
<div class="relative w-20 h-20 rounded-full bg-surface-container border border-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant text-3xl">lock</span>
<div class="absolute -bottom-8 whitespace-nowrap text-center">
<div class="font-label-caps text-label-caps text-on-surface-variant">Class Citadel</div>
</div>
</div>
</div>
</div>
<!-- Right Column: Status & Quests -->
<div class="lg:col-span-4 flex flex-col gap-6">
<!-- Player Status Card -->
<div class="bg-surface-container-high/80 backdrop-blur-xl border border-secondary-container/30 rounded-xl p-6 relative overflow-hidden">
<div class="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
<h2 class="font-headline-sm text-headline-sm text-primary mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-secondary">person</span>
                            Vitals
                        </h2>
<div class="space-y-4">
<!-- HP -->
<div>
<div class="flex justify-between mb-1">
<span class="font-label-caps text-label-caps text-error">HP</span>
<span class="font-code-md text-code-md text-error">850/1000</span>
</div>
<div class="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-error to-[#ff5c5c] rounded-full" style="width: 85%;"></div>
</div>
</div>
<!-- Mana -->
<div>
<div class="flex justify-between mb-1">
<span class="font-label-caps text-label-caps text-primary-container">Mana</span>
<span class="font-code-md text-code-md text-primary-container">420/500</span>
</div>
<div class="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-surface-tint to-primary-container rounded-full" style="width: 84%;"></div>
</div>
</div>
<!-- Resources -->
<div class="flex justify-between mt-6 pt-4 border-t border-outline-variant/30">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary-fixed-dim">monetization_on</span>
<span class="font-code-md text-code-md text-tertiary-container">1,240 G</span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary">star</span>
<span class="font-code-md text-code-md text-secondary">Lv. 42</span>
</div>
</div>
</div>
</div>
<!-- Active Quest Card -->
<div class="bg-surface-container/90 backdrop-blur-xl border border-primary-container/20 rounded-xl p-6 relative">
<div class="absolute -left-[1px] top-4 bottom-4 w-1 bg-primary-container rounded-r-full shadow-[0_0_10px_rgba(0,251,251,0.5)]"></div>
<div class="flex justify-between items-start mb-4">
<h2 class="font-headline-sm text-headline-sm text-primary">Active Quest</h2>
<span class="bg-secondary-container/30 text-secondary border border-secondary/30 px-2 py-1 rounded font-label-caps text-label-caps text-[10px]">IN PROGRESS</span>
</div>
<h3 class="font-headline-md text-headline-md text-primary-container mb-2 text-xl">The While Loop Enigma</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                            Escape the infinite cycle of the Labyrinth by correctly defining an exit condition. Beware of off-by-one demons.
                        </p>
<div class="bg-surface-container-lowest p-3 rounded border border-outline-variant/30 mb-6 font-code-md text-code-md text-on-surface text-sm">
<span class="text-secondary">while</span> <span class="text-tertiary-container">not</span> escaped:
                            <br/>    <span class="text-on-surface-variant"># TODO: Find exit</span>
</div>
<button class="w-full bg-primary-container text-on-primary-container font-label-caps text-label-caps py-3 rounded font-bold hover:bg-surface-tint transition-all shadow-[0_0_15px_rgba(0,251,251,0.3)] hover:shadow-[0_0_25px_rgba(0,251,251,0.6)] flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-sm">play_arrow</span>
                            Resume Cast
                        </button>
</div>
</div>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Scroll of Wisdom (Lesson) -->
<!DOCTYPE html>

<html class="dark" lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Scroll of Wisdom - Variáveis e Tipos Básicos</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;700&amp;family=Hanken+Grotesk:wght@400;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-fixed": "#002020",
                        "on-primary": "#003737",
                        "tertiary-container": "#ffdfa0",
                        "on-surface": "#dae2fd",
                        "secondary-fixed-dim": "#dcb8ff",
                        "secondary-container": "#7701d0",
                        "inverse-on-surface": "#283044",
                        "surface-dim": "#0b1326",
                        "tertiary-fixed": "#ffdfa0",
                        "surface-bright": "#31394d",
                        "surface-container-highest": "#2d3449",
                        "tertiary-fixed-dim": "#fbbc00",
                        "on-tertiary-fixed": "#261a00",
                        "error-container": "#93000a",
                        "on-secondary": "#480081",
                        "primary-container": "#00fbfb",
                        "on-secondary-fixed": "#2c0051",
                        "on-tertiary": "#402d00",
                        "on-tertiary-container": "#815f00",
                        "surface-variant": "#2d3449",
                        "primary": "#ffffff",
                        "surface-tint": "#00dddd",
                        "secondary-fixed": "#efdbff",
                        "on-error": "#690005",
                        "primary-fixed-dim": "#00dddd",
                        "on-primary-container": "#007070",
                        "background": "#0b1326",
                        "surface-container-high": "#222a3d",
                        "primary-fixed": "#00fbfb",
                        "outline-variant": "#3a4a49",
                        "on-secondary-container": "#dcb7ff",
                        "secondary": "#dcb8ff",
                        "error": "#ffb4ab",
                        "tertiary": "#ffffff",
                        "surface": "#0b1326",
                        "surface-container": "#171f33",
                        "inverse-surface": "#dae2fd",
                        "inverse-primary": "#006a6a",
                        "surface-container-lowest": "#060e20",
                        "on-surface-variant": "#b9cac9",
                        "on-secondary-fixed-variant": "#6700b5",
                        "outline": "#839493",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-background": "#dae2fd",
                        "on-primary-fixed-variant": "#004f4f",
                        "surface-container-low": "#131b2e",
                        "on-error-container": "#ffdad6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "4px",
                        "margin-desktop": "48px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "hud-padding": "12px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-caps": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "headline-sm": ["Space Grotesk"],
                        "body-lg": ["Hanken Grotesk"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }],
                        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "code-md": ["14px", { "lineHeight": "20px", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-background min-h-screen selection:bg-primary-container/30 selection:text-primary">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
<div class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]">Python Arcane</div>
<div class="flex items-center gap-6">
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300 active:scale-95 active:opacity-80">
<span class="material-symbols-outlined">bolt</span>
</button>
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300 active:scale-95 active:opacity-80">
<span class="material-symbols-outlined">auto_fix_high</span>
</button>
<button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300 active:scale-95 active:opacity-80">
<span class="material-symbols-outlined">monetization_on</span>
</button>
</div>
</header>
<!-- SideNavBar -->
<nav class="hidden md:flex fixed left-0 top-0 h-full pt-20 flex-col space-y-4 docked left-0 h-full w-64 bg-surface-container/90 backdrop-blur-md border-r border-secondary-container/30 shadow-xl z-40">
<div class="px-6 mb-8 flex items-center gap-4">
<div class="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary-container">
<img alt="Archmage Avatar" class="w-full h-full object-cover" data-alt="A futuristic fantasy portrait of an archmage user avatar. The character is illuminated by soft, glowing cyan and violet neon lights against a dark obsidian background. They wear modern tech-wear robes with glowing arcane runes stitched into the fabric. The overall style is a blend of cyberpunk and high fantasy, maintaining a moody, cinematic aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYelrWrw65EDWMK0P6MmNV3lKGAStfSij35Eivy8Fb3Jj7sG2p41K91L6ZNXmfUmcRC4K5dUkrQp4jKpW8v5AkokURw4Ie_B2xfxlN-X_IyrGmOcLKa0PWPHXcF3gc_Nea1-P4G0HHgJGPM-L6K6dvMiOX0S_1Y3qjeURYlb9RNMmyfM9e8mgWATrqnctKkho6nlb39NBQSPBVyu24mXY8sHxlf-TkO5BMIEUQit6dvFYZTT-aI2YLc745ij6sg8Bbq-6w92zN7nPd"/>
</div>
<div>
<div class="font-body-md text-body-md text-primary font-bold">Archmage</div>
<div class="font-label-caps text-label-caps text-on-surface-variant">Level 42 Pythonista</div>
</div>
</div>
<a class="flex items-center gap-4 bg-secondary-container/20 text-primary-container border-l-4 border-primary-container py-3 px-6 shadow-[inset_0_0_15px_rgba(0,251,251,0.2)] hover:bg-surface-variant hover:text-primary transition-all duration-200 active:translate-x-1" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
<span class="font-label-caps text-label-caps">Grimoire</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">explore</span>
<span class="font-label-caps text-label-caps">Trail</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">swords</span>
<span class="font-label-caps text-label-caps">Arena</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant py-3 px-6 opacity-70 hover:bg-surface-variant hover:text-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">pets</span>
<span class="font-label-caps text-label-caps">Bestiary</span>
</a>
<div class="mt-auto p-6">
<button class="w-full bg-secondary-container/30 text-secondary border border-secondary/50 font-label-caps text-label-caps py-3 rounded hover:bg-secondary-container hover:shadow-[0_0_15px_rgba(119,1,208,0.5)] transition-all duration-300">
                Cast Spell
            </button>
</div>
</nav>
<!-- Main Content Grid -->
<main class="pt-24 pb-12 px-margin-mobile md:px-margin-desktop md:ml-64 max-w-[1200px] mx-auto min-h-screen flex flex-col gap-gutter">
<!-- Lesson Header -->
<div class="flex flex-col gap-2">
<div class="font-label-caps text-label-caps text-secondary tracking-widest">AULA 01</div>
<h1 class="font-display-lg text-display-lg text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Variáveis e Tipos Básicos</h1>
</div>
<!-- The Array Ritual (Video Player) -->
<div class="relative w-full aspect-video bg-surface-container-highest rounded-lg border border-outline-variant/30 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] group">
<div class="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent z-10 opacity-60"></div>
<img alt="Video Thumbnail" class="w-full h-full object-cover" data-alt="A glowing, abstract digital representation of computer memory and variables. The scene shows luminous cyan and magenta boxes floating in a dark, obsidian void, connected by thin, pulsing lines of data. The lighting is dramatic and moody, reflecting a cyberpunk arcane aesthetic. The overall image evokes a sense of deep technical magic and structured information." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-33p6hjd0ssHlz6LK9Cm_1JrNG_yVpWyimqIXTBrhgTD-r5rroEB-v6b5J0y-6i8Tq8912O0xEiWFDdaejTgNsGA9gd_ETXwR4aK5YHt3HuKU_dTtcejJ7cyqhczym8CyC1xrDJ8Cdyem16SldghtwFGP5kSW0AaXXkmIA_IC1adZJDfNgcFNctx_M_MFVU9OAKGDBva8GMGbKsd2v8DXqhEfoAHRkUFYX4mqQ2OLDcrk1hrxuoynvJOwvuhG-DrV0AUdQgfCZwqy"/>
<div class="absolute inset-0 z-20 flex items-center justify-center">
<button class="w-20 h-20 rounded-full bg-primary-container/20 border-2 border-primary-container text-primary-container flex items-center justify-center backdrop-blur-md hover:bg-primary-container/40 hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(0,251,251,0.4)]">
<span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</button>
</div>
<div class="absolute bottom-0 left-0 w-full p-6 z-20 flex justify-between items-end">
<div>
<h2 class="font-headline-sm text-headline-sm text-primary mb-1">The Array Ritual</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Conjurando espaço na memória arcana.</p>
</div>
<div class="font-label-caps text-label-caps text-primary-container bg-surface-dim/80 px-3 py-1 rounded backdrop-blur border border-primary-container/30">
                    12:45
                </div>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter mt-4">
<!-- Scroll of Wisdom (Lesson Text) -->
<div class="lg:col-span-2 bg-surface-container/60 backdrop-blur-md rounded-xl border border-secondary-container/20 p-8 shadow-lg">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-secondary text-3xl">menu_book</span>
<h3 class="font-headline-md text-headline-md text-secondary drop-shadow-[0_0_10px_rgba(119,1,208,0.3)]">Scroll of Wisdom</h3>
</div>
<div class="prose prose-invert max-w-none font-body-lg text-body-lg text-on-surface space-y-6 leading-relaxed">
<p>No vasto vazio da memória de um computador, o mago invoca <strong>Variáveis</strong> para reter a essência da informação. Uma variável é como um frasco arcano: ela guarda um valor que pode ser inspecionado, manipulado ou transformado durante o feitiço (programa).</p>
<p>Ao conjurar uma variável, você deve nomeá-la. Em Python, o ato de criação é simultâneo à atribuição de poder. O sinal de igualdade (<code>=</code>) não significa igualdade matemática, mas sim uma <em>transferência de energia</em> da direita para a esquerda.</p>
<div class="bg-surface-container-highest p-4 rounded-lg border-l-2 border-primary-container my-6">
<h4 class="font-headline-sm text-headline-sm text-primary-container mb-2">Os Tipos Fundamentais</h4>
<ul class="list-none space-y-3 font-body-md text-body-md">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary-container text-sm mt-1">diamond</span>
<span><strong>Integer (int):</strong> A runa dos números inteiros, perfeita para contagens exatas de poções ou iterações de laços.</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-secondary text-sm mt-1">water_drop</span>
<span><strong>Float (float):</strong> A essência fluida dos números decimais, necessária para cálculos de precisão alquímica.</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary-container text-sm mt-1">match_word</span>
<span><strong>String (str):</strong> Fios de texto tecidos juntos. Encantamentos verbais que o programa deve recitar.</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-error text-sm mt-1">toggle_on</span>
<span><strong>Boolean (bool):</strong> A dualidade absoluta. Verdadeiro (True) ou Falso (False), a base de toda lógica condicional.</span>
</li>
</ul>
</div>
</div>
</div>
<!-- Mini-Oracle & Runa Quiz Column -->
<div class="flex flex-col gap-gutter">
<!-- Mini-Oracle (Code Snippet) -->
<div class="bg-[#0b1326] rounded-xl border border-primary-container/20 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.6)] relative group">
<div class="absolute inset-0 bg-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
<div class="flex items-center justify-between px-4 py-2 bg-surface-container-highest border-b border-outline-variant/30">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary-container text-sm">terminal</span>
<span class="font-label-caps text-label-caps text-on-surface-variant">MINI-ORACLE</span>
</div>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-sm">content_copy</span>
</button>
</div>
<div class="p-4 font-code-md text-code-md text-on-surface bg-[#060e20]">
<pre class="m-0"><code class="language-python"><span class="text-secondary-fixed-dim"># Invocando as variáveis</span>
nome_mago = <span class="text-tertiary-container">"Merlin"</span>
nivel = <span class="text-primary-container">42</span>
mana = <span class="text-primary-container">150.5</span>
em_combate = <span class="text-error">False</span>

<span class="text-secondary-fixed-dim"># Revelando a essência</span>
<span class="text-inverse-primary">print</span>(<span class="text-tertiary-container">f"O mago </span><span class="text-primary">{</span>nome_mago<span class="text-primary">}</span><span class="text-tertiary-container"> despertou."</span>)
<span class="text-inverse-primary">print</span>(<span class="text-tertiary-container">f"Poder Mágico: </span><span class="text-primary">{</span>mana<span class="text-primary">}</span><span class="text-tertiary-container"> MP"</span>)
</code><span class="animate-pulse text-primary-container">_</span></pre>
</div>
</div>
<!-- Runa de Conhecimento (Quiz Section) -->
<div class="bg-surface-container-highest/80 backdrop-blur rounded-xl border border-tertiary-container/30 p-6 relative overflow-hidden">
<!-- Subtle glow effect behind the quiz -->
<div class="absolute top-0 right-0 w-32 h-32 bg-tertiary-container/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
<div class="flex items-center gap-2 mb-4 relative z-10">
<span class="material-symbols-outlined text-tertiary-container">psychology_alt</span>
<h3 class="font-headline-sm text-headline-sm text-tertiary-container">Runa de Conhecimento</h3>
</div>
<p class="font-body-md text-body-md text-on-surface mb-6 relative z-10">Qual tipo de variável seria melhor utilizado para armazenar a quantidade de ouro no seu inventário?</p>
<div class="space-y-3 relative z-10">
<button class="w-full text-left px-4 py-3 rounded border border-outline-variant hover:border-tertiary-container hover:bg-surface-container transition-colors font-code-md text-code-md text-on-surface-variant hover:text-tertiary-container group flex items-center justify-between">
<span>String (str)</span>
<span class="material-symbols-outlined text-tertiary-container opacity-0 group-hover:opacity-100 transition-opacity">radio_button_unchecked</span>
</button>
<button class="w-full text-left px-4 py-3 rounded border border-tertiary-container bg-tertiary-container/10 font-code-md text-code-md text-tertiary-container flex items-center justify-between shadow-[inset_0_0_10px_rgba(255,223,160,0.1)]">
<span>Integer (int)</span>
<span class="material-symbols-outlined text-tertiary-container" style="font-variation-settings: 'FILL' 1;">radio_button_checked</span>
</button>
<button class="w-full text-left px-4 py-3 rounded border border-outline-variant hover:border-tertiary-container hover:bg-surface-container transition-colors font-code-md text-code-md text-on-surface-variant hover:text-tertiary-container group flex items-center justify-between">
<span>Boolean (bool)</span>
<span class="material-symbols-outlined text-tertiary-container opacity-0 group-hover:opacity-100 transition-opacity">radio_button_unchecked</span>
</button>
</div>
<div class="mt-6 pt-4 border-t border-outline-variant/30 flex justify-end relative z-10">
<button class="bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps px-6 py-2 rounded hover:bg-tertiary-fixed transition-colors shadow-[0_0_15px_rgba(255,223,160,0.3)]">
                            Selo de Aprovação
                        </button>
</div>
</div>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Mission Control (Scheduling) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Arcane Coder - Mission Control</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&amp;family=JetBrains+Mono:wght@500&amp;family=Inter:wght@400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-surface": "#0d1c2e",
                        "on-tertiary": "#ffffff",
                        "outline": "#7e7386",
                        "outline-variant": "#cfc2d7",
                        "on-secondary-fixed-variant": "#004f4f",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed": "#191c1e",
                        "surface-container-lowest": "#ffffff",
                        "primary-fixed-dim": "#dcb8ff",
                        "on-secondary-fixed": "#002020",
                        "secondary-fixed": "#00fbfb",
                        "on-background": "#0d1c2e",
                        "primary-fixed": "#efdbff",
                        "on-error": "#ffffff",
                        "surface-dim": "#ccdbf3",
                        "secondary": "#006a6a",
                        "tertiary-fixed-dim": "#c4c7c9",
                        "error": "#ba1a1a",
                        "surface-container-high": "#dce9ff",
                        "surface-tint": "#8422dd",
                        "background": "#f8f9ff",
                        "surface-container": "#e6eeff",
                        "surface-container-highest": "#d5e3fc",
                        "on-primary": "#ffffff",
                        "on-tertiary-fixed-variant": "#444749",
                        "on-secondary": "#ffffff",
                        "tertiary-container": "#505355",
                        "tertiary-fixed": "#e0e3e5",
                        "on-primary-fixed": "#2b0052",
                        "on-primary-fixed-variant": "#6700b5",
                        "surface-container-low": "#eff4ff",
                        "on-surface-variant": "#4c4354",
                        "on-tertiary-container": "#c4c7c9",
                        "inverse-surface": "#233144",
                        "primary": "#57009b",
                        "surface-bright": "#f8f9ff",
                        "primary-container": "#7701d0",
                        "inverse-primary": "#dcb8ff",
                        "secondary-fixed-dim": "#00dddd",
                        "on-primary-container": "#dbb8ff",
                        "on-error-container": "#93000a",
                        "on-secondary-container": "#006e6e",
                        "surface-variant": "#d5e3fc",
                        "error-container": "#ffdad6",
                        "tertiary": "#393c3e",
                        "secondary-container": "#00f8f8",
                        "inverse-on-surface": "#eaf1ff"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "margin": "32px",
                        "md": "16px",
                        "lg": "24px",
                        "xs": "4px",
                        "base": "4px",
                        "gutter": "24px",
                        "xl": "40px",
                        "sm": "8px",
                        "container-max-width": "1440px",
                        "hud-padding": "24px",
                        "margin-desktop": "32px",
                        "margin-mobile": "16px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-md": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "body-md": ["Inter"],
                        "headline-lg-mobile": ["Space Grotesk"],
                        "headline-lg": ["Space Grotesk"],
                        "label-sm": ["JetBrains Mono"],
                        "body-lg": ["Inter"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "500" }],
                        "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
                        "headline-lg-mobile": ["24px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "headline-lg": ["32px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "500" }],
                        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
<style>
        .arcane-accent {
            position: relative;
        }
        .arcane-accent::before {
            content: '';
            position: absolute;
            left: -1px;
            top: 10%;
            height: 80%;
            width: 2px;
            background-color: theme('colors.secondary');
            border-radius: 2px;
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen flex flex-col md:flex-row">
<!-- TopNavBar (Mobile Only) -->
<nav class="md:hidden flex justify-between items-center w-full px-margin-mobile h-16 bg-background/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_0_15px_rgba(0,221,221,0.1)] fixed top-0 z-40">
<div class="text-headline-md font-headline-md font-bold text-primary-fixed-dim tracking-tighter">Arcane Coder</div>
<div class="flex gap-4 text-primary-fixed-dim">
<span class="material-symbols-outlined hover:text-primary transition-colors duration-300">notifications</span>
<span class="material-symbols-outlined hover:text-primary transition-colors duration-300">history_edu</span>
<img alt="Archmage Profile" class="w-8 h-8 rounded-full border border-primary/30" data-alt="A small, circular portrait of a distinguished scholar with subtle glowing effects around the edges, suitable for an avatar in a clean, high-tech magical interface. The lighting is bright and clear, matching a modern light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH5PK2xfCuX6TZu1VM_V-nbtlKxifj3IuxDwaRQDSPxUUzO0ELi_GAl-R0264IisrBqSxoEIwDl8MyFhhusntMacVJBVZU_C4pXNlJ8HTjB4IoIfkaOk5wVNyPpuCD9U92gDb82IwaIzsyFTSdzjymKkRQecRavigoSi_cx7vASACPDB0L27FsVPfAXHpPI4OwzAcJGoJSotYVaGNQOHPiSVqNWWCyfoNwMDF11ssX9DQnFhXxwo--qGLH61xOJn0t0ROb-m1LusxB"/>
</div>
</nav>
<!-- SideNavBar (Desktop Only) -->
<aside class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant/30 py-hud-padding z-40">
<div class="px-margin mb-8 flex items-center gap-4">
<img alt="Professor Avatar" class="w-12 h-12 rounded-full border-2 border-primary" data-alt="A highly detailed portrait of a senior academic figure, exuding calm authority. The character wears minimalist, modern robes with subtle geometric cyan patterns. The background is a crisp, off-white laboratory setting with bright, high-key lighting. The overall style is modern corporate meets high fantasy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9TrtRjmQZlSUE25FEKiwS78U4cWjqZk5O_3N7zIz4Fqrfa1yGwJhqGQ9CxZ4seF6zbgUQHcAn9RolTTIQNTmB_kTewh0J8xg-A4rajVmj5F0l-l-9I1CU_Rl7rMWqi4zgPl5hVF1uxdStQ3zdryBjkDJQq9J0Ne4ftvjJrFadKsg-dB1KSWA9YOBkYZADHHmLR3Ak_yW5m9V7BMXq1wsTw8mvB9CCBMiD_gjwM3zv8HuEUl-J-Nei0cXx6RXshsyRYYGJ2Duuk3g4"/>
<div>
<h2 class="text-headline-sm font-headline-sm text-secondary-fixed">Master's Sanctum</h2>
<p class="font-label-sm text-label-sm text-on-surface-variant">Arch-Instructor Level 99</p>
</div>
</div>
<nav class="flex-1 flex flex-col gap-2 font-label-caps text-label-caps text-on-surface-variant">
<a class="flex items-center gap-3 p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">dashboard</span> Dashboard
            </a>
<a class="flex items-center gap-3 p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">monitoring</span> Class Stats
            </a>
<a class="flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-lg p-3 mx-2 shadow-[inset_0_0_10px_rgba(119,1,208,0.3)]" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">swords</span> Mission Control
            </a>
<a class="flex items-center gap-3 p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">menu_book</span> Gradebook
            </a>
<a class="flex items-center gap-3 p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">settings</span> Settings
            </a>
</nav>
<div class="px-margin mt-auto mb-4">
<button class="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary-container transition-colors shadow-sm">Cast Global Event</button>
</div>
<div class="flex flex-col gap-2 font-label-caps text-label-caps text-on-surface-variant border-t border-outline-variant/30 pt-4">
<a class="flex items-center gap-3 p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">help</span> Support
            </a>
<a class="flex items-center gap-3 p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">logout</span> Log Out
            </a>
</div>
</aside>
<!-- Main Content -->
<main class="flex-1 md:ml-64 pt-20 md:pt-8 px-margin-mobile md:px-margin-desktop pb-24 md:pb-8 max-w-container-max-width mx-auto w-full">
<header class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 class="font-headline-lg text-headline-lg md:text-display-lg font-display-lg text-on-surface">Mission Control</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mt-2">Orchestrate trials and monitor student advancement.</p>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-on-surface border border-outline-variant rounded-md hover:bg-surface-variant transition-colors font-label-md text-label-md">
<span class="material-symbols-outlined">calendar_month</span> Calendar View
                </button>
<button class="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-md hover:bg-primary-container transition-colors shadow-sm font-label-md text-label-md">
<span class="material-symbols-outlined">add</span> Create Mission
                </button>
</div>
</header>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
<!-- Active & Scheduled Missions (Main Column) -->
<div class="lg:col-span-8 flex flex-col gap-6">
<!-- Mission Card 1 -->
<article class="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-6 shadow-sm hover:shadow-[0_8px_15px_rgba(87,0,155,0.05)] hover:border-outline transition-all arcane-accent">
<div class="flex flex-col md:flex-row justify-between gap-4 mb-4">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded text-primary font-medium tracking-wide">BOSS ENCOUNTER</span>
<span class="font-label-sm text-label-sm bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">timer</span> 1h 30m
                                </span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface">Official Marathon</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Comprehensive test of all major spell algorithms learned this semester.</p>
</div>
<div class="flex flex-col items-end">
<span class="font-label-md text-label-md text-secondary flex items-center gap-1">
<span class="material-symbols-outlined text-[18px]">verified</span> Ativo
                            </span>
<div class="mt-2 text-right">
<p class="font-label-sm text-label-sm text-on-surface-variant">Rewards Multiplier</p>
<p class="font-headline-md text-headline-md text-primary">2.5x</p>
</div>
</div>
</div>
<div class="border-t border-outline-variant/30 pt-4 flex flex-wrap gap-3 mt-4 items-center justify-between">
<div class="flex items-center gap-2">
<div class="flex -space-x-2">
<img alt="Student 1" class="w-8 h-8 rounded-full border-2 border-surface-container-lowest" data-alt="A small circular portrait of a young student in a modern minimalist setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkdJ0a1vM6wjwvHU8fJtrnbxEvRy5nv4eZixuUVxAkEq01kIq1eNYZUQW2N6EKbrW_lU1XTAQbIay0J5AQkc_AqNPfT2PaK2T77otCAGZIClTLtKO4xBcPQDN-1dyNMtpLFknkm0BSwTaLD5lhXwZqswK5i6SnthkuFO_DBI5jmga_6bj2_FvJ9N9BbjixOe2qNVaQ9MyB0b8NVgYGk1PgOIH76u5XvcH6dqrtUUps1_-5qiYcJqY3UgVgowocImQu2PmbwQPAVhLK"/>
<img alt="Student 2" class="w-8 h-8 rounded-full border-2 border-surface-container-lowest" data-alt="A small circular portrait of a focused student in a clean, brightly lit environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTK7ERilj2j5nfCmMSv_oGpUMHh-4ZLWa4jGITeDnWoy3t1Nl8JnTM-q_KCF8Z3Ta6zmSddCEPZLs3oBQtsvyxm28igB4BtTNlWFalDNLns-KEGIgclleQ0y0QEcuQZbO-w6SkN8B3KfYkX0ul-BkZHLsbm_UVGbAwb56V_9KUUHISAhHEUhWsao0woFb4qGUG356gg09c21ASv6sCoNH246Ejw86Mc-0YeK-7Ki2Dty33JjEWTeezAuO20ySh4Hpl1qTDItqyRrmQ"/>
<div class="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm text-on-surface-variant">+42</div>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant ml-2">Engaged currently</span>
</div>
<div class="flex gap-2">
<button class="px-4 py-2 border border-outline-variant text-on-surface font-label-md text-label-md rounded hover:bg-surface-variant transition-colors">Config</button>
<button class="px-4 py-2 bg-error-container text-on-error-container font-label-md text-label-md rounded hover:bg-error hover:text-on-error transition-colors">Encerrar</button>
</div>
</div>
</article>
<!-- Mission Card 2 -->
<article class="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-6 shadow-sm hover:shadow-[0_8px_15px_rgba(87,0,155,0.05)] hover:border-outline transition-all opacity-80">
<div class="flex flex-col md:flex-row justify-between gap-4 mb-4">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded text-primary font-medium tracking-wide">TOWER OF TRIALS</span>
<span class="font-label-sm text-label-sm bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">timer</span> 3h 00m
                                </span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface text-on-surface-variant">Final Exam</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">The ultimate gauntlet. Requires mastery of deep recursive structures.</p>
</div>
<div class="flex flex-col items-end">
<span class="font-label-md text-label-md text-outline flex items-center gap-1">
<span class="material-symbols-outlined text-[18px]">lock</span> Bloqueado
                            </span>
<div class="mt-2 text-right">
<p class="font-label-sm text-label-sm text-on-surface-variant">Rewards Multiplier</p>
<p class="font-headline-md text-headline-md text-on-surface-variant">5.0x</p>
</div>
</div>
</div>
<div class="border-t border-outline-variant/30 pt-4 flex flex-wrap gap-3 mt-4 items-center justify-end">
<button class="px-4 py-2 border border-secondary text-secondary font-label-md text-label-md rounded hover:bg-secondary/5 transition-colors">Agendar</button>
<button class="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-primary-container transition-colors shadow-sm">Liberar Agora</button>
</div>
</article>
</div>
<!-- Sidebar Controls (Right Column) -->
<div class="lg:col-span-4 flex flex-col gap-6">
<!-- Quick Config Widget -->
<div class="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-6 shadow-sm">
<h3 class="font-headline-md text-headline-md text-on-surface mb-4 border-b border-outline-variant/30 pb-2">Global Mission Config</h3>
<div class="flex flex-col gap-4">
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-1">Default Time Limit</label>
<div class="flex items-center border border-outline-variant rounded bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-secondary/20 transition-all overflow-hidden">
<span class="material-symbols-outlined text-on-surface-variant pl-3">schedule</span>
<input class="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body-md py-2 px-3" type="text" value="1h 30m"/>
</div>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-1">Base Reward Multiplier</label>
<div class="flex items-center gap-2">
<input class="w-full accent-primary" max="5" min="1" step="0.5" type="range" value="1.5"/>
<span class="font-label-md text-label-md text-on-surface min-w-[3ch]">1.5x</span>
</div>
</div>
</div>
</div>
<!-- Recent Activity Widget -->
<div class="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-6 shadow-sm">
<h3 class="font-headline-md text-headline-md text-on-surface mb-4 border-b border-outline-variant/30 pb-2">Recent Status</h3>
<ul class="flex flex-col gap-3">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-secondary mt-1 text-[20px]">check_circle</span>
<div>
<p class="font-body-md text-body-md text-on-surface">Midterm Project <span class="font-label-sm text-label-sm text-on-surface-variant ml-2 bg-surface-container px-1 rounded">Concluído</span></p>
<p class="font-label-sm text-label-sm text-on-surface-variant">48/50 students completed successfully.</p>
</div>
</li>
</ul>
</div>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-margin-mobile pb-safe bg-background/90 backdrop-blur-2xl border-t border-primary/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] z-50 h-20 rounded-t-xl">
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined mb-1">map</span> Quests
        </a>
<a class="flex flex-col items-center justify-center bg-primary-container/20 text-primary-fixed rounded-xl px-6 py-1 border border-primary/30 font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">auto_fix_high</span> Spells
        </a>
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined mb-1">person</span> Profile
        </a>
</nav>
</body></html>

<!-- Python Arcane: Master's Sanctum (Dashboard) -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Master's Sanctum - Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&amp;family=JetBrains+Mono:wght@500&amp;family=Inter:wght@400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "on-surface": "#0d1c2e",
                      "on-tertiary": "#ffffff",
                      "outline": "#7e7386",
                      "outline-variant": "#cfc2d7",
                      "on-secondary-fixed-variant": "#004f4f",
                      "surface": "#f8f9ff",
                      "on-tertiary-fixed": "#191c1e",
                      "surface-container-lowest": "#ffffff",
                      "primary-fixed-dim": "#dcb8ff",
                      "on-secondary-fixed": "#002020",
                      "secondary-fixed": "#00fbfb",
                      "on-background": "#0d1c2e",
                      "primary-fixed": "#efdbff",
                      "on-error": "#ffffff",
                      "surface-dim": "#ccdbf3",
                      "secondary": "#006a6a",
                      "tertiary-fixed-dim": "#c4c7c9",
                      "error": "#ba1a1a",
                      "surface-container-high": "#dce9ff",
                      "surface-tint": "#8422dd",
                      "background": "#f8f9ff",
                      "surface-container": "#e6eeff",
                      "surface-container-highest": "#d5e3fc",
                      "on-primary": "#ffffff",
                      "on-tertiary-fixed-variant": "#444749",
                      "on-secondary": "#ffffff",
                      "tertiary-container": "#505355",
                      "tertiary-fixed": "#e0e3e5",
                      "on-primary-fixed": "#2b0052",
                      "on-primary-fixed-variant": "#6700b5",
                      "surface-container-low": "#eff4ff",
                      "on-surface-variant": "#4c4354",
                      "on-tertiary-container": "#c4c7c9",
                      "inverse-surface": "#233144",
                      "primary": "#57009b",
                      "surface-bright": "#f8f9ff",
                      "primary-container": "#7701d0",
                      "inverse-primary": "#dcb8ff",
                      "secondary-fixed-dim": "#00dddd",
                      "on-primary-container": "#dbb8ff",
                      "on-error-container": "#93000a",
                      "on-secondary-container": "#006e6e",
                      "surface-variant": "#d5e3fc",
                      "error-container": "#ffdad6",
                      "tertiary": "#393c3e",
                      "secondary-container": "#00f8f8",
                      "inverse-on-surface": "#eaf1ff"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {
                      "margin": "32px",
                      "md": "16px",
                      "lg": "24px",
                      "xs": "4px",
                      "base": "4px",
                      "gutter": "24px",
                      "xl": "40px",
                      "sm": "8px",
                      "container-max-width": "1440px"
              },
              "fontFamily": {
                      "display-lg": [
                              "Space Grotesk"
                      ],
                      "label-md": [
                              "JetBrains Mono"
                      ],
                      "headline-md": [
                              "Space Grotesk"
                      ],
                      "body-md": [
                              "Inter"
                      ],
                      "headline-lg-mobile": [
                              "Space Grotesk"
                      ],
                      "headline-lg": [
                              "Space Grotesk"
                      ],
                      "label-sm": [
                              "JetBrains Mono"
                      ],
                      "body-lg": [
                              "Inter"
                      ]
              },
              "fontSize": {
                      "display-lg": [
                              "48px",
                              {
                                      "lineHeight": "1.1",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "700"
                              }
                      ],
                      "label-md": [
                              "14px",
                              {
                                      "lineHeight": "1.2",
                                      "letterSpacing": "0.05em",
                                      "fontWeight": "500"
                              }
                      ],
                      "headline-md": [
                              "24px",
                              {
                                      "lineHeight": "1.3",
                                      "fontWeight": "500"
                              }
                      ],
                      "body-md": [
                              "16px",
                              {
                                      "lineHeight": "1.5",
                                      "fontWeight": "400"
                              }
                      ],
                      "headline-lg-mobile": [
                              "24px",
                              {
                                      "lineHeight": "1.2",
                                      "fontWeight": "600"
                              }
                      ],
                      "headline-lg": [
                              "32px",
                              {
                                      "lineHeight": "1.2",
                                      "fontWeight": "600"
                              }
                      ],
                      "label-sm": [
                              "12px",
                              {
                                      "lineHeight": "1.2",
                                      "fontWeight": "500"
                              }
                      ],
                      "body-lg": [
                              "18px",
                              {
                                      "lineHeight": "1.6",
                                      "fontWeight": "400"
                              }
                      ]
              }
      },
          },
        }
    </script>
<style>
        body { background-color: #f8fafc; }
        .arcane-accent { position: relative; }
        .arcane-accent::before { content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 2px; background-color: #00dddd; border-top-left-radius: inherit; border-bottom-left-radius: inherit; }
    </style>
</head>
<body class="bg-background text-on-background font-body-md text-body-md antialiased flex">
<!-- SideNavBar (Desktop) -->
<nav class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant/30 py-lg z-40">
<div class="px-lg mb-lg">
<div class="flex items-center gap-sm mb-md">
<img alt="Professor Avatar" class="w-12 h-12 rounded-full border border-outline-variant/50" data-alt="A small circular avatar portrait of an elderly, wise academic scholar with glasses, wearing deep violet robes. Soft, studio lighting, clean background. Corporate modern minimalist aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiNpMtVKcBrsEsEbOkeU7E6AMBFW4VRp12cVFs5ousX8nQ8x2JKFvUAHmGD8Pe-B247NtFDLEnK3RsIW4_QRSXS_5yAoJvmJGiC4LZzrF5tMsSLCF0zfzrRxKDMoEZadHCUkjHeS8T3UO-QTO-Q6SUbPnS2tEaNsMOFvCs8ItRs6vzvtY7it07ThbMii96o7_rSnN2buLFtGiqWThWmekfDOjxE8UVoT2GzTQnFGbenWFUMxaaJ--7D_f0XarlcoDb6CgX3dtjnSgD"/>
<div>
<h2 class="text-headline-sm font-headline-sm text-secondary-fixed font-bold tracking-tight text-primary">Master's Sanctum</h2>
<p class="font-label-sm text-label-sm text-on-surface-variant">Arch-Instructor Level 99</p>
</div>
</div>
<button class="w-full bg-primary text-on-primary py-sm px-md rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm">
                Cast Global Event
            </button>
</div>
<ul class="flex-1 overflow-y-auto font-body-md text-body-md">
<li class="mb-xs">
<a class="flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-lg p-3 mx-2 shadow-[inset_0_0_10px_rgba(119,1,208,0.3)] font-label-md text-label-md" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span>
                    Dashboard
                </a>
</li>
<li class="mb-xs">
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 hover:bg-surface-container-high transition-all rounded-lg font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">monitoring</span>
                    Class Stats
                </a>
</li>
<li class="mb-xs">
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 hover:bg-surface-container-high transition-all rounded-lg font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">swords</span>
                    Mission Control
                </a>
</li>
<li class="mb-xs">
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 hover:bg-surface-container-high transition-all rounded-lg font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">menu_book</span>
                    Gradebook
                </a>
</li>
<li class="mb-xs mt-lg">
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 hover:bg-surface-container-high transition-all rounded-lg font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">settings</span>
                    Settings
                </a>
</li>
</ul>
<div class="mt-auto px-lg border-t border-outline-variant/30 pt-md">
<a class="flex items-center gap-3 text-on-surface-variant py-sm hover:text-primary transition-colors font-label-sm text-label-sm" href="#">
<span class="material-symbols-outlined text-[18px]">help</span>
                Support
            </a>
<a class="flex items-center gap-3 text-on-surface-variant py-sm hover:text-primary transition-colors font-label-sm text-label-sm" href="#">
<span class="material-symbols-outlined text-[18px]">logout</span>
                Log Out
            </a>
</div>
</nav>
<!-- BottomNavBar (Mobile) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-margin pb-safe bg-surface-container-lowest/80 backdrop-blur-2xl border-t border-primary/10 z-50 h-20 rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.5)] font-label-caps text-label-caps">
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="text-[10px] mt-1">Dashboard</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity" href="#">
<span class="material-symbols-outlined">monitoring</span>
<span class="text-[10px] mt-1">Class Stats</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity" href="#">
<span class="material-symbols-outlined">swords</span>
<span class="text-[10px] mt-1">Missions</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity" href="#">
<span class="material-symbols-outlined">menu_book</span>
<span class="text-[10px] mt-1">Gradebook</span>
</a>
</nav>
<!-- Main Content -->
<main class="flex-1 md:ml-64 p-margin min-h-screen bg-background">
<div class="max-w-container-max-width mx-auto">
<!-- Header -->
<header class="mb-xl">
<h1 class="font-display-lg text-display-lg text-on-surface mb-sm">Bem-vindo, Grão-Mestre</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">Your sanctum awaits. Here is the latest arcane telemetry.</p>
</header>
<!-- Quick Stats Bento -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
<!-- Stat Card 1 -->
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg arcane-accent shadow-sm hover:shadow-[0_8px_15px_rgba(87,0,155,0.05)] transition-shadow">
<div class="flex items-center gap-sm mb-md">
<div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[18px]">group</span>
</div>
<h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Total Students</h3>
</div>
<p class="font-display-lg text-display-lg text-on-surface">142</p>
<div class="mt-md flex items-center gap-xs text-secondary">
<span class="material-symbols-outlined text-[14px]">trending_up</span>
<span class="font-label-sm text-label-sm">+4 this week</span>
</div>
</div>
<!-- Stat Card 2 -->
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg arcane-accent shadow-sm hover:shadow-[0_8px_15px_rgba(87,0,155,0.05)] transition-shadow">
<div class="flex items-center gap-sm mb-md">
<div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[18px]">bolt</span>
</div>
<h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Class Average XP</h3>
</div>
<p class="font-display-lg text-display-lg text-on-surface">8,450</p>
<div class="mt-md w-full bg-surface-container-high rounded-full h-2">
<div class="bg-gradient-to-r from-primary to-secondary-fixed-dim h-2 rounded-full" style="width: 75%"></div>
</div>
</div>
<!-- Stat Card 3 -->
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg arcane-accent shadow-sm hover:shadow-[0_8px_15px_rgba(87,0,155,0.05)] transition-shadow">
<div class="flex items-center gap-sm mb-md">
<div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[18px]">task_alt</span>
</div>
<h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Missions Completed</h3>
</div>
<p class="font-display-lg text-display-lg text-on-surface">1,204</p>
<div class="mt-md flex items-center gap-xs text-on-surface-variant">
<span class="font-label-sm text-label-sm bg-surface-variant px-2 py-1 rounded-md text-primary font-bold">Arcane Tier 3</span>
</div>
</div>
</section>
<!-- Main Content Grid -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-lg pb-xl">
<!-- Bugs in the Wild (2 columns on lg) -->
<section class="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg shadow-sm">
<div class="flex items-center justify-between mb-lg border-b border-outline-variant/30 pb-sm">
<h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
<span class="material-symbols-outlined text-error">bug_report</span>
                            Bugs in the Wild
                        </h2>
<button class="font-label-sm text-label-sm text-primary hover:underline">View All Diagnostics</button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr>
<th class="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant/30 pb-sm font-bold w-1/2">Anomaly Type</th>
<th class="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant/30 pb-sm font-bold">Frequency</th>
<th class="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant/30 pb-sm font-bold">Action</th>
</tr>
</thead>
<tbody class="font-body-md text-body-md">
<tr class="hover:bg-surface/50 transition-colors">
<td class="py-md border-b border-outline-variant/10">
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-on-surface bg-surface-container px-2 py-1 rounded w-fit mb-1 font-mono">SyntaxError</span>
<span class="text-on-surface-variant text-sm">in "Looping Ouroboros"</span>
</div>
</td>
<td class="py-md border-b border-outline-variant/10">
<div class="flex items-center gap-sm">
<span class="text-error font-bold">42 Hits</span>
<div class="w-16 bg-surface-container-high rounded-full h-1">
<div class="bg-error h-1 rounded-full" style="width: 80%"></div>
</div>
</div>
</td>
<td class="py-md border-b border-outline-variant/10">
<button class="border border-secondary text-secondary hover:bg-secondary/5 px-3 py-1 rounded font-label-sm text-label-sm transition-colors">Investigate</button>
</td>
</tr>
<tr class="hover:bg-surface/50 transition-colors">
<td class="py-md border-b border-outline-variant/10">
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-on-surface bg-surface-container px-2 py-1 rounded w-fit mb-1 font-mono">NullReferenceException</span>
<span class="text-on-surface-variant text-sm">in "Summoning Circle"</span>
</div>
</td>
<td class="py-md border-b border-outline-variant/10">
<div class="flex items-center gap-sm">
<span class="text-tertiary-container font-bold">28 Hits</span>
<div class="w-16 bg-surface-container-high rounded-full h-1">
<div class="bg-tertiary-container h-1 rounded-full" style="width: 60%"></div>
</div>
</div>
</td>
<td class="py-md border-b border-outline-variant/10">
<button class="border border-secondary text-secondary hover:bg-secondary/5 px-3 py-1 rounded font-label-sm text-label-sm transition-colors">Investigate</button>
</td>
</tr>
<tr class="hover:bg-surface/50 transition-colors">
<td class="py-md">
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-on-surface bg-surface-container px-2 py-1 rounded w-fit mb-1 font-mono">IndexOutOfBounds</span>
<span class="text-on-surface-variant text-sm">in "Array of Ancients"</span>
</div>
</td>
<td class="py-md">
<div class="flex items-center gap-sm">
<span class="text-tertiary-container font-bold">15 Hits</span>
<div class="w-16 bg-surface-container-high rounded-full h-1">
<div class="bg-tertiary-container h-1 rounded-full" style="width: 30%"></div>
</div>
</div>
</td>
<td class="py-md">
<button class="border border-secondary text-secondary hover:bg-secondary/5 px-3 py-1 rounded font-label-sm text-label-sm transition-colors">Investigate</button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- Activity Feed -->
<section class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg shadow-sm flex flex-col h-full">
<div class="flex items-center justify-between mb-lg border-b border-outline-variant/30 pb-sm">
<h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
<span class="material-symbols-outlined text-primary">history</span>
                            Activity Log
                        </h2>
</div>
<div class="flex-1 overflow-y-auto space-y-md">
<!-- Feed Item 1 -->
<div class="flex gap-sm">
<div class="flex flex-col items-center">
<div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container z-10">
<span class="material-symbols-outlined text-[16px]">stars</span>
</div>
<div class="w-[2px] h-full bg-outline-variant/30 mt-1 flex-1"></div>
</div>
<div class="pb-md">
<p class="font-body-md text-body-md text-on-surface"><span class="font-bold">Aria Novus</span> completed <span class="text-primary font-label-md text-label-md">"The Recursion Trial"</span></p>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1">2 mins ago</p>
</div>
</div>
<!-- Feed Item 2 -->
<div class="flex gap-sm">
<div class="flex flex-col items-center">
<div class="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant z-10">
<span class="material-symbols-outlined text-[16px]">draw</span>
</div>
<div class="w-[2px] h-full bg-outline-variant/30 mt-1 flex-1"></div>
</div>
<div class="pb-md">
<p class="font-body-md text-body-md text-on-surface"><span class="font-bold">Kaelen</span> submitted assignment <span class="font-label-md text-label-md">"Data Structures V"</span></p>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1">15 mins ago</p>
</div>
</div>
<!-- Feed Item 3 -->
<div class="flex gap-sm">
<div class="flex flex-col items-center">
<div class="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary z-10">
<span class="material-symbols-outlined text-[16px]">school</span>
</div>
</div>
<div>
<p class="font-body-md text-body-md text-on-surface"><span class="font-bold">Elara</span> reached level <span class="font-bold text-secondary">42</span></p>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1">1 hour ago</p>
</div>
</div>
</div>
</section>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Oracle of Progress (Gradebook) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Oracle of Progress - Master's Sanctum</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&amp;family=JetBrains+Mono:wght@500&amp;family=Space+Grotesk:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        /* Custom scrollbar for horizontal scrolling tables to match theme */
        ::-webkit-scrollbar {
            height: 6px;
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #eff4ff; 
        }
        ::-webkit-scrollbar-thumb {
            background: #cfc2d7; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #7e7386; 
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-surface": "#0d1c2e",
                        "on-tertiary": "#ffffff",
                        "outline": "#7e7386",
                        "outline-variant": "#cfc2d7",
                        "on-secondary-fixed-variant": "#004f4f",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed": "#191c1e",
                        "surface-container-lowest": "#ffffff",
                        "primary-fixed-dim": "#dcb8ff",
                        "on-secondary-fixed": "#002020",
                        "secondary-fixed": "#00fbfb",
                        "on-background": "#0d1c2e",
                        "primary-fixed": "#efdbff",
                        "on-error": "#ffffff",
                        "surface-dim": "#ccdbf3",
                        "secondary": "#006a6a",
                        "tertiary-fixed-dim": "#c4c7c9",
                        "error": "#ba1a1a",
                        "surface-container-high": "#dce9ff",
                        "surface-tint": "#8422dd",
                        "background": "#f8f9ff",
                        "surface-container": "#e6eeff",
                        "surface-container-highest": "#d5e3fc",
                        "on-primary": "#ffffff",
                        "on-tertiary-fixed-variant": "#444749",
                        "on-secondary": "#ffffff",
                        "tertiary-container": "#505355",
                        "tertiary-fixed": "#e0e3e5",
                        "on-primary-fixed": "#2b0052",
                        "on-primary-fixed-variant": "#6700b5",
                        "surface-container-low": "#eff4ff",
                        "on-surface-variant": "#4c4354",
                        "on-tertiary-container": "#c4c7c9",
                        "inverse-surface": "#233144",
                        "primary": "#57009b",
                        "surface-bright": "#f8f9ff",
                        "primary-container": "#7701d0",
                        "inverse-primary": "#dcb8ff",
                        "secondary-fixed-dim": "#00dddd",
                        "on-primary-container": "#dbb8ff",
                        "on-error-container": "#93000a",
                        "on-secondary-container": "#006e6e",
                        "surface-variant": "#d5e3fc",
                        "error-container": "#ffdad6",
                        "tertiary": "#393c3e",
                        "secondary-container": "#00f8f8",
                        "inverse-on-surface": "#eaf1ff"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "margin": "32px",
                        "md": "16px",
                        "lg": "24px",
                        "xs": "4px",
                        "base": "4px",
                        "gutter": "24px",
                        "xl": "40px",
                        "sm": "8px",
                        "container-max-width": "1440px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "label-md": ["JetBrains Mono"],
                        "headline-md": ["Space Grotesk"],
                        "body-md": ["Inter"],
                        "headline-lg-mobile": ["Space Grotesk"],
                        "headline-lg": ["Space Grotesk"],
                        "label-sm": ["JetBrains Mono"],
                        "body-lg": ["Inter"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "500" }],
                        "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
                        "headline-lg-mobile": ["24px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "headline-lg": ["32px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "500" }],
                        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-background font-body-md text-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
<!-- Desktop Side Navigation -->
<nav class="h-screen w-64 fixed left-0 top-0 bg-surface-container-low backdrop-blur-md border-r border-outline-variant/30 flex flex-col h-full py-8 hidden md:flex z-40">
<!-- Header -->
<div class="px-6 mb-8 flex flex-col items-center text-center">
<div class="w-20 h-20 rounded-full border-2 border-secondary-fixed p-1 mb-4">
<img alt="Professor Avatar" class="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJqxZk6s_a2-7ta3vuKXpzKM8UteIxV9R-QShAXz9afPuABr53ssqCZPNBn7I376HE8lkCyNE9r-vxynyEciym70AbbG3oGzJMkEuexM6S4SegI_CUoH6LanzK2Ik2A9hV7yJODzo-ZrbNrif-II91IP-50_lf_vv97hJhzeA91KdGJ6QNl2Dk6t24vpCpv28CRA82M8zrN5TPAF0gq74lLOnEvrPd_0Jzyw7cZzs5-HwRqiZL4ZxTgShIeoyPAShsIm49liatO8zZ"/>
</div>
<h2 class="text-headline-sm font-headline-sm text-secondary-fixed">Master's Sanctum</h2>
<span class="font-label-sm text-label-sm text-on-surface-variant mt-1">Arch-Instructor Level 99</span>
</div>
<!-- CTA -->
<div class="px-4 mb-6">
<button class="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
<span class="material-symbols-outlined text-lg">bolt</span>
                Cast Global Event
            </button>
</div>
<!-- Navigation Links -->
<div class="flex-1 overflow-y-auto px-2 space-y-1">
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-caps text-label-caps">Dashboard</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">monitoring</span>
<span class="font-label-caps text-label-caps">Class Stats</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">swords</span>
<span class="font-label-caps text-label-caps">Mission Control</span>
</a>
<a class="flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-lg p-3 mx-2 shadow-[inset_0_0_10px_rgba(119,1,208,0.3)] hover:bg-surface-container-high transition-all active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">menu_book</span>
<span class="font-label-caps text-label-caps">Gradebook</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all active:translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-label-caps text-label-caps">Settings</span>
</a>
</div>
<!-- Footer Links -->
<div class="mt-auto px-2 pt-4 border-t border-outline-variant/20">
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-label-caps text-label-caps">Support</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-variant/50 rounded-lg hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-label-caps text-label-caps">Log Out</span>
</a>
</div>
</nav>
<!-- Mobile Bottom Navigation -->
<nav class="fixed bottom-0 w-full z-50 h-20 rounded-t-xl md:hidden bg-surface-container-lowest/80 backdrop-blur-2xl border-t border-primary/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-safe pb-4 pt-2">
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity active:scale-90 transition-all duration-150" href="#">
<span class="material-symbols-outlined mb-1">map</span>
<span class="font-label-caps text-label-caps text-xs">Quests</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity active:scale-90 transition-all duration-150" href="#">
<span class="material-symbols-outlined mb-1">military_tech</span>
<span class="font-label-caps text-label-caps text-xs">Skills</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity active:scale-90 transition-all duration-150" href="#">
<span class="material-symbols-outlined mb-1">auto_fix_high</span>
<span class="font-label-caps text-label-caps text-xs">Spells</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-opacity active:scale-90 transition-all duration-150" href="#">
<span class="material-symbols-outlined mb-1">person</span>
<span class="font-label-caps text-label-caps text-xs">Profile</span>
</a>
</nav>
<!-- Main Content Canvas -->
<main class="flex-1 ml-0 md:ml-64 w-full min-h-screen relative overflow-x-hidden">
<!-- Header & Top Actions -->
<div class="px-6 md:px-12 pt-12 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto">
<div class="max-w-2xl">
<div class="flex items-center gap-3 mb-2">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant">
<span class="material-symbols-outlined text-secondary text-sm">menu_book</span>
</div>
<span class="font-label-md text-label-md text-secondary tracking-widest uppercase">Class Administration</span>
</div>
<h1 class="font-display-lg text-display-lg text-primary tracking-tight">Oracle of Progress</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mt-4">Review student aptitudes, manage experience yields, and inspect detailed academic scrolls across your active sanctums.</p>
</div>
<button class="shrink-0 bg-primary text-on-primary hover:bg-primary-container px-6 py-4 rounded-xl font-label-md text-label-md flex items-center justify-center gap-3 transition-all duration-300 shadow-sm border border-transparent hover:border-primary-fixed group w-full md:w-auto">
<span class="material-symbols-outlined group-hover:-translate-y-0.5 transition-transform">download</span>
                Gerar Relatório de Desempenho
            </button>
</div>
<!-- Filters & Tools Bar -->
<div class="px-6 md:px-12 pb-8 max-w-7xl mx-auto">
<div class="bg-surface-container-lowest border border-outline-variant p-2 rounded-xl flex flex-col md:flex-row gap-2 shadow-sm relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-secondary-fixed"></div>
<!-- Search Input -->
<div class="flex-1 flex items-center px-4 bg-surface rounded-lg border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-secondary-fixed/20 transition-all">
<span class="material-symbols-outlined text-outline">search</span>
<input class="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline py-3 px-3" placeholder="Search acolytes by name or ID..." type="text"/>
</div>
<!-- Filters -->
<div class="flex gap-2 w-full md:w-auto">
<select class="flex-1 md:w-48 bg-surface border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface focus:border-primary focus:ring-2 focus:ring-secondary-fixed/20 py-3 px-4 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%237e7386%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em]">
<option value="">All Sanctums</option>
<option value="alpha">Alpha Cohort</option>
<option value="beta">Beta Cohort</option>
<option value="omega">Omega Vanguard</option>
</select>
<select class="flex-1 md:w-48 bg-surface border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface focus:border-primary focus:ring-2 focus:ring-secondary-fixed/20 py-3 px-4 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%237e7386%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em]">
<option value="">All Levels</option>
<option value="novice">Novice (1-10)</option>
<option value="adept">Adept (11-30)</option>
<option value="magus">Magus (31+)</option>
</select>
<button class="bg-surface-container-high border border-outline-variant hover:bg-surface-variant text-on-surface w-12 rounded-lg flex items-center justify-center transition-colors">
<span class="material-symbols-outlined">filter_list</span>
</button>
</div>
</div>
</div>
<!-- Data Table Section -->
<div class="px-6 md:px-12 pb-32 md:pb-12 max-w-7xl mx-auto">
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm relative">
<!-- Arcane Accent Line -->
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary-container rounded-l-xl z-10"></div>
<div class="overflow-x-auto relative">
<table class="w-full text-left border-collapse min-w-[900px]">
<thead>
<tr class="border-b border-outline-variant bg-surface-bright">
<th class="font-headline-md text-body-md font-semibold text-on-surface py-5 px-6 whitespace-nowrap pl-8">Student Name</th>
<th class="font-headline-md text-body-md font-semibold text-on-surface py-5 px-6 whitespace-nowrap">Level &amp; Rank</th>
<th class="font-headline-md text-body-md font-semibold text-on-surface py-5 px-6 whitespace-nowrap w-64">XP Accumulation</th>
<th class="font-headline-md text-body-md font-semibold text-on-surface py-5 px-6 whitespace-nowrap text-right">Completion</th>
<th class="font-headline-md text-body-md font-semibold text-on-surface py-5 px-6 whitespace-nowrap">Last Active</th>
<th class="font-headline-md text-body-md font-semibold text-on-surface py-5 px-6 whitespace-nowrap text-center">Action</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container">
<!-- Row 1 -->
<tr class="hover:bg-surface-variant/30 transition-colors group cursor-default">
<td class="py-4 px-6 pl-8">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant">
<img alt="Student Elara" class="w-full h-full object-cover" data-alt="A close-up portrait of a young female scholar with bright eyes and short dark hair, wearing an elegant, minimalist academic robe in deep violet. The background is a clean, bright white light-mode setting. The lighting is soft and corporate, conveying a sense of intellectual mastery and modern professionalism." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8Uj9ibDwpMx0-TqhyxjSDfUnK4AUFfYnlsT-31C69txHoT14-Sd3OiBooYMhs-YlVdc7_CpLoKXo6ED2exVoUXDlIQdVP6Ohl0qLuRZepeaTAuVkNjXJbvvF8s3G8X3FrAIDW7G3uKjQdwNtm3JOA7OcMt-uqX_7vF_cFsSHnVSRO2dMKOkS5_oRsDNLJej6HAl81p8UJHbWUUBKfIhN8P4aKI4vqQTCYnKcDh3GlLs75Ql3T6X7oIMriosPoO0e7NtoNl6Mjnvja"/>
</div>
<div>
<p class="font-body-md font-medium text-on-surface">Elara Vance</p>
<p class="font-label-sm text-label-sm text-outline mt-0.5">ID: AC-7731</p>
</div>
</div>
</td>
<td class="py-4 px-6">
<div class="inline-flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-md border border-outline-variant/50">
<span class="font-label-md text-label-md text-primary">Lvl 42</span>
<span class="w-1 h-1 rounded-full bg-outline"></span>
<span class="font-label-md text-label-sm text-on-surface-variant uppercase tracking-wider">Magus</span>
</div>
</td>
<td class="py-4 px-6">
<div class="flex flex-col gap-2">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-on-surface-variant">8,450 / 10,000 XP</span>
<span class="text-secondary font-medium">84.5%</span>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
<div class="h-full bg-secondary-fixed-dim rounded-full" style="width: 84.5%"></div>
</div>
</div>
</td>
<td class="py-4 px-6 text-right">
<span class="font-label-md text-label-md text-on-surface">92%</span>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-2 text-on-surface-variant font-body-md">
<span class="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
                                        Today, 09:14 AM
                                    </div>
</td>
<td class="py-4 px-6 text-center">
<button class="p-2 rounded-lg text-outline hover:text-primary hover:bg-primary-container/10 transition-colors group-hover:border-primary border border-transparent">
<span class="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="bg-surface-bright/50 hover:bg-surface-variant/30 transition-colors group cursor-default">
<td class="py-4 px-6 pl-8">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant">
<img alt="Student Kaelen" class="w-full h-full object-cover" data-alt="A close-up portrait of a male student with a calm expression and neat, light brown hair, wearing a clean, minimalist uniform. The setting is a bright, high-key light-mode environment with crisp white backgrounds and subtle lavender tones. The style is modern corporate mixed with a hint of academic tradition, emphasizing clarity and order." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW6CUDrlSLNXHMx6V1_37dDG8wxQi7EF63-_NgEajC3mghDgI5vqy-4J3KUJKbwTHnGHuNDu06g5NWu_TX8msLYgoTDJGGvWC9xO4WeGrsGBOAFZPyWAiiA29R-OxD_gBIU-6fzR_bfSENfT5_QoFTA5J_UCTpJCWQOrU32EOYGP70gaCdVZMU8RjDsdgkFSPPZfGbMNh88Q1IaAy05gpOjvmKHpyUTM5cVx-FFNHX4_sQWGybQ8U3Yltlg4wFshwLfiYJ8vFwmwK_"/>
</div>
<div>
<p class="font-body-md font-medium text-on-surface">Kaelen Thorne</p>
<p class="font-label-sm text-label-sm text-outline mt-0.5">ID: AC-8820</p>
</div>
</div>
</td>
<td class="py-4 px-6">
<div class="inline-flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-md border border-outline-variant/50">
<span class="font-label-md text-label-md text-primary">Lvl 14</span>
<span class="w-1 h-1 rounded-full bg-outline"></span>
<span class="font-label-md text-label-sm text-on-surface-variant uppercase tracking-wider">Adept</span>
</div>
</td>
<td class="py-4 px-6">
<div class="flex flex-col gap-2">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-on-surface-variant">2,100 / 5,000 XP</span>
<span class="text-primary font-medium">42.0%</span>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
<div class="h-full bg-primary-fixed-dim rounded-full" style="width: 42.0%"></div>
</div>
</div>
</td>
<td class="py-4 px-6 text-right">
<span class="font-label-md text-label-md text-on-surface">65%</span>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-2 text-on-surface-variant font-body-md">
<span class="w-2 h-2 rounded-full bg-outline"></span>
                                        Yesterday
                                    </div>
</td>
<td class="py-4 px-6 text-center">
<button class="p-2 rounded-lg text-outline hover:text-primary hover:bg-primary-container/10 transition-colors group-hover:border-primary border border-transparent">
<span class="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-variant/30 transition-colors group cursor-default">
<td class="py-4 px-6 pl-8">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary font-label-md">
                                            SR
                                        </div>
<div>
<p class="font-body-md font-medium text-on-surface">Sylas Reed</p>
<p class="font-label-sm text-label-sm text-outline mt-0.5">ID: AC-9012</p>
</div>
</div>
</td>
<td class="py-4 px-6">
<div class="inline-flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-md border border-outline-variant/50">
<span class="font-label-md text-label-md text-primary">Lvl 08</span>
<span class="w-1 h-1 rounded-full bg-outline"></span>
<span class="font-label-md text-label-sm text-on-surface-variant uppercase tracking-wider">Novice</span>
</div>
</td>
<td class="py-4 px-6">
<div class="flex flex-col gap-2">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-on-surface-variant">800 / 1,000 XP</span>
<span class="text-secondary font-medium">80.0%</span>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
<div class="h-full bg-secondary-fixed-dim rounded-full" style="width: 80.0%"></div>
</div>
</div>
</td>
<td class="py-4 px-6 text-right">
<span class="font-label-md text-label-md text-on-surface">30%</span>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-2 text-on-surface-variant font-body-md">
<span class="w-2 h-2 rounded-full bg-error"></span>
                                        3 days ago
                                    </div>
</td>
<td class="py-4 px-6 text-center">
<button class="p-2 rounded-lg text-outline hover:text-primary hover:bg-primary-container/10 transition-colors group-hover:border-primary border border-transparent">
<span class="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination Footer -->
<div class="border-t border-outline-variant/50 bg-surface-bright px-6 py-4 flex items-center justify-between rounded-b-xl">
<p class="font-label-sm text-label-sm text-outline">Showing 1-3 of 142 records</p>
<div class="flex gap-2">
<button class="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-high disabled:opacity-50 text-on-surface-variant font-label-md">Prev</button>
<button class="px-3 py-1 bg-primary text-on-primary rounded font-label-md">1</button>
<button class="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-high text-on-surface-variant font-label-md">2</button>
<button class="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-high text-on-surface-variant font-label-md">3</button>
<button class="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-high text-on-surface-variant font-label-md">Next</button>
</div>
</div>
</div>
</div>
</main>
</body></html>

<!-- Python Arcane: Battle Result (Victory) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Arcane Coder - Battle Result</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&amp;family=Hanken+Grotesk:wght@400;500;600&amp;family=Space+Grotesk:wght@600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "on-secondary-container": "#dcb7ff",
                        "error-container": "#93000a",
                        "surface-variant": "#2d3449",
                        "secondary-container": "#7701d0",
                        "inverse-on-surface": "#283044",
                        "tertiary": "#ffffff",
                        "surface-bright": "#31394d",
                        "primary": "#ffffff",
                        "secondary-fixed-dim": "#dcb8ff",
                        "inverse-primary": "#006a6a",
                        "primary-container": "#00fbfb",
                        "on-primary-container": "#007070",
                        "on-error-container": "#ffdad6",
                        "on-primary-fixed-variant": "#004f4f",
                        "on-primary-fixed": "#002020",
                        "on-surface-variant": "#b9cac9",
                        "surface-container-low": "#131b2e",
                        "inverse-surface": "#dae2fd",
                        "on-tertiary-container": "#815f00",
                        "on-tertiary-fixed-variant": "#5c4300",
                        "on-secondary": "#480081",
                        "tertiary-container": "#ffdfa0",
                        "tertiary-fixed": "#ffdfa0",
                        "error": "#ffb4ab",
                        "tertiary-fixed-dim": "#fbbc00",
                        "surface-tint": "#00dddd",
                        "surface-container-high": "#222a3d",
                        "surface-container": "#171f33",
                        "background": "#0b1326",
                        "surface-container-highest": "#2d3449",
                        "on-primary": "#003737",
                        "primary-fixed": "#00fbfb",
                        "on-background": "#dae2fd",
                        "on-error": "#690005",
                        "surface-dim": "#0b1326",
                        "secondary": "#dcb8ff",
                        "outline-variant": "#3a4a49",
                        "surface": "#0b1326",
                        "on-secondary-fixed-variant": "#6700b5",
                        "on-tertiary-fixed": "#261a00",
                        "secondary-fixed": "#efdbff",
                        "surface-container-lowest": "#060e20",
                        "primary-fixed-dim": "#00dddd",
                        "on-secondary-fixed": "#2c0051",
                        "on-surface": "#dae2fd",
                        "on-tertiary": "#402d00",
                        "outline": "#839493"
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    spacing: {
                        "margin-desktop": "48px",
                        "unit": "4px",
                        "gutter": "24px",
                        "margin-mobile": "16px",
                        "hud-padding": "12px"
                    },
                    fontFamily: {
                        "label-caps": ["JetBrains Mono"],
                        "body-md": ["Hanken Grotesk"],
                        "body-lg": ["Hanken Grotesk"],
                        "code-md": ["JetBrains Mono"],
                        "headline-sm": ["Space Grotesk"],
                        "headline-md": ["Space Grotesk"],
                        "display-lg": ["Space Grotesk"]
                    },
                    fontSize: {
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "code-md": ["14px", { "lineHeight": "20px", "fontWeight": "500" }],
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .material-symbols-outlined.fill {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen relative overflow-hidden flex items-center justify-center">
<!-- Ambient Background Glows -->
<div class="absolute inset-0 z-0 pointer-events-none">
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-fixed-dim/10 rounded-full blur-[100px]"></div>
<div class="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary-fixed-dim/5 rounded-full blur-[80px]"></div>
</div>
<!-- HUD Elements (Top Row) -->
<div class="fixed top-0 left-0 w-full px-margin-desktop py-hud-padding flex justify-between items-start z-10 pointer-events-none hidden md:flex">
<!-- HP/Mana -->
<div class="flex flex-col gap-unit">
<div class="flex items-center gap-2">
<span class="font-label-caps text-label-caps text-error">HP</span>
<div class="w-48 h-2 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/30">
<div class="w-full h-full bg-gradient-to-r from-error to-[#ff5449]"></div>
</div>
</div>
<div class="flex items-center gap-2">
<span class="font-label-caps text-label-caps text-primary-fixed-dim">MP</span>
<div class="w-40 h-2 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/30">
<div class="w-3/4 h-full bg-gradient-to-r from-inverse-primary to-primary-container"></div>
</div>
</div>
</div>
<!-- XP Line -->
<div class="absolute top-0 left-0 w-full h-[2px] bg-surface-container-high">
<div class="h-full bg-tertiary-fixed-dim w-2/3 shadow-[0_0_10px_#fbbc00]"></div>
</div>
<!-- Level/Gold -->
<div class="flex flex-col items-end gap-unit">
<div class="font-label-caps text-label-caps text-tertiary-fixed-dim flex items-center gap-1">
<span class="material-symbols-outlined fill text-[16px]">stars</span>
                LVL 42
            </div>
<div class="font-label-caps text-label-caps text-tertiary-fixed-dim flex items-center gap-1">
<span class="material-symbols-outlined fill text-[16px]">toll</span>
                1,450
            </div>
</div>
</div>
<!-- Main Victory Modal Canvas -->
<main class="relative z-20 w-full max-w-[800px] px-margin-mobile md:px-0">
<!-- Glassmorphism Container Level 3 (Modal) -->
<div class="bg-surface-container/80 backdrop-blur-xl border border-primary-fixed-dim/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,221,221,0.15)] flex flex-col relative">
<!-- Header Area -->
<div class="relative pt-12 pb-8 px-8 text-center border-b border-outline-variant/20 bg-gradient-to-b from-primary-fixed-dim/10 to-transparent">
<!-- Glowing Emblem -->
<div class="mx-auto w-24 h-24 rounded-full bg-surface-container border border-primary-fixed-dim/50 shadow-[inset_0_0_20px_rgba(0,221,221,0.3),0_0_30px_rgba(0,221,221,0.4)] flex items-center justify-center mb-6 relative">
<span class="material-symbols-outlined text-[48px] text-primary-fixed">emoji_events</span>
<!-- Sparkles -->
<span class="material-symbols-outlined absolute -top-2 -right-2 text-tertiary-fixed-dim text-[20px] fill">auto_awesome</span>
<span class="material-symbols-outlined absolute bottom-0 -left-4 text-primary-fixed-dim text-[16px] fill">auto_awesome</span>
</div>
<h1 class="font-display-lg text-display-lg text-primary-fixed tracking-tighter mb-2 shadow-primary-fixed-dim drop-shadow-[0_0_8px_rgba(0,221,221,0.5)]">VICTORY ACHIEVED</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">The syntax goblin has been banished.</p>
</div>
<!-- Content Area -->
<div class="p-8 flex flex-col md:flex-row gap-gutter">
<!-- Left Col: Rewards -->
<div class="flex-1 flex flex-col gap-6">
<!-- XP Earned -->
<div class="bg-surface-container-high/50 border border-outline-variant/30 rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:border-tertiary-fixed-dim/50 transition-colors">
<div class="absolute inset-0 bg-gradient-to-t from-tertiary-fixed-dim/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="font-label-caps text-label-caps text-on-surface-variant mb-2">EXPERIENCE GAINED</span>
<div class="flex items-center gap-2">
<span class="font-headline-md text-headline-md text-tertiary-fixed-dim">+120 XP</span>
<span class="material-symbols-outlined text-tertiary-fixed-dim fill">keyboard_double_arrow_up</span>
</div>
</div>
<!-- Loot -->
<div class="bg-surface-container-high/50 border border-outline-variant/30 rounded-lg p-6 flex flex-col">
<span class="font-label-caps text-label-caps text-on-surface-variant mb-4 text-center">LOOT DROPPED</span>
<div class="flex justify-center gap-4">
<!-- Loot Item 1 -->
<div class="flex flex-col items-center gap-2 group">
<div class="w-16 h-16 rounded border border-secondary-fixed-dim/30 bg-surface-container flex items-center justify-center shadow-[inset_0_0_10px_rgba(220,184,255,0.1)] group-hover:border-secondary-fixed-dim transition-colors">
<span class="material-symbols-outlined text-[32px] text-secondary-fixed-dim">diamond</span>
</div>
<span class="font-label-caps text-[10px] text-on-surface-variant text-center">Mana Crystal<br/>x3</span>
</div>
<!-- Loot Item 2 -->
<div class="flex flex-col items-center gap-2 group">
<div class="w-16 h-16 rounded border border-primary-fixed-dim/30 bg-surface-container flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,221,221,0.1)] group-hover:border-primary-fixed-dim transition-colors">
<span class="material-symbols-outlined text-[32px] text-primary-fixed-dim">data_object</span>
</div>
<span class="font-label-caps text-[10px] text-on-surface-variant text-center">fstring-pro<br/>Blueprint</span>
</div>
</div>
</div>
</div>
<!-- Right Col: Test Cases & Oracle -->
<div class="flex-[1.5] flex flex-col gap-6">
<!-- Oracle Console -->
<div class="bg-surface-dim border border-outline-variant/40 rounded-lg p-4 font-code-md text-code-md relative shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]">
<div class="absolute top-2 right-2 flex gap-1">
<div class="w-2 h-2 rounded-full bg-outline-variant/50"></div>
<div class="w-2 h-2 rounded-full bg-outline-variant/50"></div>
<div class="w-2 h-2 rounded-full bg-outline-variant/50"></div>
</div>
<span class="text-primary-fixed-dim">Oracle&gt; </span><span class="text-on-surface">Sua lógica foi impecável, Mago. O código fluiu sem obstruções na malha do tempo.</span><span class="animate-pulse text-primary-fixed-dim">_</span>
</div>
<!-- Test Cases -->
<div class="flex flex-col gap-2">
<span class="font-label-caps text-label-caps text-on-surface-variant mb-2 px-2">TEST CASES</span>
<div class="flex items-center justify-between bg-surface-container-high border border-outline-variant/20 rounded p-3">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary-fixed-dim fill text-[20px]">check_circle</span>
<span class="font-code-md text-code-md text-on-surface">Base_Case_01</span>
</div>
<span class="font-code-md text-code-md text-on-surface-variant text-xs">12ms</span>
</div>
<div class="flex items-center justify-between bg-surface-container-high border border-outline-variant/20 rounded p-3">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary-fixed-dim fill text-[20px]">check_circle</span>
<span class="font-code-md text-code-md text-on-surface">Edge_Case_Null</span>
</div>
<span class="font-code-md text-code-md text-on-surface-variant text-xs">18ms</span>
</div>
<div class="flex items-center justify-between bg-surface-container-high border border-outline-variant/20 rounded p-3">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary-fixed-dim fill text-[20px]">check_circle</span>
<span class="font-code-md text-code-md text-on-surface">Stress_Test_Max_Int</span>
</div>
<span class="font-code-md text-code-md text-on-surface-variant text-xs">45ms</span>
</div>
</div>
</div>
</div>
<!-- Footer Actions -->
<div class="p-6 border-t border-outline-variant/20 bg-surface-container-low flex justify-end gap-4">
<button class="px-6 py-3 rounded border border-outline-variant/50 text-on-surface hover:bg-surface-variant/50 font-label-caps text-label-caps transition-colors">
                    Review Code
                </button>
<button class="px-8 py-3 rounded bg-primary-fixed-dim text-on-primary-fixed font-label-caps text-label-caps hover:bg-primary-container shadow-[0_0_15px_rgba(0,221,221,0.3)] hover:shadow-[0_0_25px_rgba(0,221,221,0.6)] transition-all flex items-center gap-2">
                    Próxima Missão
                    <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
</main>
</body></html>