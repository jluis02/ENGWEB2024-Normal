import json

def normalize_preco_contratual(data):
    for record in data:
        preco = record.get('precoContratual')
        if isinstance(preco, str):
            record['precoContratual'] = float(preco.replace(',', ''))
        elif isinstance(preco, (int, float)):
            record['precoContratual'] = float(preco)
    return data

json_input_file_path = 'dataset1.json'  
json_output_file_path = 'dataset.json'

try:
    with open(json_input_file_path, mode='r', encoding='utf-8') as json_file:
        data = json.load(json_file)
except FileNotFoundError:
    print(f"File not found: {json_input_file_path}")
    exit(1)
except json.JSONDecodeError:
    print(f"Error decoding JSON from file: {json_input_file_path}")
    exit(1)

normalized_data = normalize_preco_contratual(data)

json_output = json.dumps(normalized_data, indent=4, ensure_ascii=False)

try:
    with open(json_output_file_path, mode='w', encoding='utf-8') as json_file:
        json_file.write(json_output)
    print(f"JSON data has been normalized and saved to {json_output_file_path}")
except Exception as e:
    print(f"Error writing JSON to file: {json_output_file_path}\n{e}")
