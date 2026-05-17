from __future__ import annotations

import json
from pathlib import Path

ROOT = Path("/Users/gedsonfaria/JetBrains/WebstormProjects/alg1-2026/data/cursos/python")
MODULE_DIRS = [ROOT / "modulo1", ROOT / "modulo2", ROOT / "modulo3"]

REMOVE_KEYS = {"acesso", "recompensasRpg", "regrasPedagogicas"}

BASE_ORDER = [
    "id",
    "curso",
    "modulo",
    "aula",
    "numero",
    "tipo",
    "subtipo",
    "titulo",
    "subtitulo",
    "objetivo",
    "duracao",
    "tags",
    "secoes",
]

TAIL_ORDER = ["premio", "avaliacao"]


def normalize_json(data: dict) -> dict:
    cleaned = {k: v for k, v in data.items() if k not in REMOVE_KEYS}
    ordered: dict = {}

    for key in BASE_ORDER:
        if key in cleaned:
            ordered[key] = cleaned.pop(key)

    # Preserve non-canonical keys without data loss before trailing evaluation/reward keys.
    for key in list(cleaned.keys()):
        if key not in TAIL_ORDER:
            ordered[key] = cleaned.pop(key)

    for key in TAIL_ORDER:
        if key in cleaned:
            ordered[key] = cleaned.pop(key)

    return ordered


def main() -> None:
    processed = 0
    for module_dir in MODULE_DIRS:
        for json_path in sorted(module_dir.glob("*.json")):
            data = json.loads(json_path.read_text(encoding="utf-8"))
            normalized = normalize_json(data)
            json_path.write_text(
                json.dumps(normalized, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            processed += 1
    print(f"Normalizados {processed} arquivos JSON.")


if __name__ == "__main__":
    main()

