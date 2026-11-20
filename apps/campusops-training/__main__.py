from load_env import require_env
import os
from pathlib import Path
from chunker import generate_chunks, DATA_DIR

SUPABASE_URL = require_env("SUPABASE_URL")
SUPABASE_SECRET_KEY = require_env("SUPABASE_SECRET_KEY")


university_names = ["dokuz-eylul"]
university_name_file_path: dict[str, list[str]] = {}

for university_name in university_names:
    for (dirpath, dirnames, filenames) in os.walk(f"{DATA_DIR}{os.path.sep}{university_name}"):
        for filename in filenames:
            abs_path = os.path.abspath(os.path.join(dirpath, filename))
            if university_name not in university_name_file_path:
                university_name_file_path[university_name] = [abs_path]
            else:
                university_name_file_path[university_name].append(abs_path)

chunks_list: list = []
iteration = 0
for university_name, document_paths in university_name_file_path.items():
    chunks_list.extend(generate_chunks(university_name, document_paths))
    iteration += 1
    print(f"Processed {iteration}/{len(university_names)}, Chunk generated for university: {university_name}")
            


