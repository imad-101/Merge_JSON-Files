---
title: "How to Merge JSON Files: Python, Command Line & Online Tools"
date: "2025-04-03"
description: "Merge JSON files programmatically with Python, using jq in the terminal, or online tools. Step-by-step guide to combine JSON arrays/objects, handle duplicates, and validate merged data."
authorName: "Imad Uddin"
authorImage: "/images/authors/imad.jpg"
readTime: "5 min read"
thumbnail: "/images/blog/merge-json-files.png"
tags:
  [
    "how to merge json files",
    "merge two json files",
    "merge json in python",
    "merge multiple json files into one",
    "merge json arrays",
    "jq merge json",
    "online json merger",
    "combine json files",
    "json merge tool",
    "merge nested json",
  ]
---

JSON (JavaScript Object Notation) is a versatile format for organizing structured data, but combining multiple JSON files into a single dataset can be tricky. Whether you’re aggregating API responses, merging logs, or consolidating configuration files, knowing how to merge JSON files efficiently is a valuable skill. This guide covers practical methods to merge JSON files, including how to merge 2 JSON files, using Python, command-line tools, and online solutions.

## Why Merge JSON Files?

Common use cases include:

- **Data aggregation**: Combine datasets from multiple sources.
- **Simplification**: Reduce clutter by merging related files.
- **Analysis**: Create unified datasets for reporting or machine learning.
- **Configuration management**: Merge settings from different environments.

---

## Method 1: Manual Merging (For Small Files)

If you’re working with small JSON files (under 50MB), manual merging is feasible:

1. Open both files in a text editor (e.g., VS Code, Notepad++).
2. Copy the contents of one file into the other.
   - **For arrays**: Combine items within `[]` and separate with commas.
   - **For objects**: Merge keys into a single `{}` (watch for duplicates!).
3. Validate the merged file using a tool like [JSONLint](https://jsonlint.com).

⚠️ **Limitation**: Manual merging is error-prone for large files or nested structures.

---

## Method 2: How to Merge JSON Files in Python

Python’s **json** library provides precise control over merging logic.

### Example 1: Merging Two JSON Files

```python
import json

# Load files
with open('file1.json', 'r') as f1:
     data1 = json.load(f1)

with open('file2.json', 'r') as f2:
     data2 = json.load(f2)

# Merge (assuming both are lists)
merged_data = data1 + data2

# Save
with open('merged.json', 'w') as out:
     json.dump(merged_data, out)
```

### Example 2: Merging Objects (Dictionaries)

```python
merged_dict = {**data1, **data2}  # Python 3.5+ syntax
```

> **Note**: Duplicate keys in dictionaries will be overwritten by **data2**.

### Handling Multiple Files

```python
import glob

all_data = []
for file in glob.glob('*.json'):
     with open(file, 'r') as f:
          all_data.extend(json.load(f))

with open('combined.json', 'w') as out:
     json.dump(all_data, out)
```

This answers how to merge multiple JSON files into one programmatically.

---

## Method 3: Merging JSON Files Using Command-Line Tools

### Using **jq**

To merge two JSON arrays:

```bash
jq -s 'add' file1.json file2.json > merged.json
```

To merge objects:

```bash
jq -n 'input + input' file1.json file2.json > merged.json
```

### Using **cat** (For Line-Delimited JSON)

```bash
cat *.json > combined.json
```

> **Caution**: This only works if each file contains valid JSON lines.

---

## Method 4: Online Tools for Quick Merging

For users who prefer a no-code approach, several online tools simplify JSON merging:

- **[JSONLint Validator/Formatter](https://jsonlint.com)**: Fix syntax errors before merging.
- **JSON Merger Tools**: Tools like [Merge JSON Files](https://merge-json-files.com) allow batch uploads and handle duplicate keys or nested structures and helps seamlessly merge your JSON files.

### When to Use Online Tools:

- Merging files larger than 100MB without installing software.
- Limited coding experience.

---

## Common Issues and Solutions

### 1. Duplicate Keys

**Python Fix**: Use a custom merge function to append values instead of overwriting.

```python
merged = {**data1, **data2}  # data2 overwrites data1
```

### 2. Mismatched Structures

Ensure files have compatible formats (e.g., all arrays or all objects).

### 3. Nested JSON

Use recursive merging logic:

```python
def deep_merge(a, b):
     for key in b:
          if key in a:
                if isinstance(a[key], dict) and isinstance(b[key], dict):
                     deep_merge(a[key], b[key])
                else:
                     a[key] = b[key]
          else:
                a[key] = b[key]
     return a
```

### 4. Invalid JSON Syntax

Validate files before merging.

---

## Best Practices for Merging JSON Files

- **Standardize Formats**: Ensure all files use the same structure (arrays/objects).
- **Handle Duplicates**: Decide whether to overwrite, append, or flag conflicts.
- **Test with Sample Data**: Validate logic on small files first.
- **Automate Repetitive Tasks**: Use scripts or tools for frequent merging.

---

## Final Thoughts

Learning how to merge two JSON files (or hundreds!) is essential for efficient data management. Manual methods work for small tasks, Python offers scalability for developers, and command-line tools like **jq** provide quick fixes. For ad-hoc needs, online tools streamline the process without coding.

> **Pro Tip**: Always back up your files and validate merged JSON to avoid surprises.

Share if you find it helpfull ❤️👏
