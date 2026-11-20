# data

This folder holds source documents about universities. These documents are split into chunks and loaded into the vector database.

## What goes here

Any document that contains university information. For example:

- Regulations and guidelines
- Academic calendars
- Course catalogs and curricula
- Enrollment, scholarship and tuition information
- Dormitories, dining halls and campus services
- FAQs and announcements

## Supported formats

| Format | Extension |
| ------ | --------- |
| PDF    | `.pdf`    |
| Word   | `.docx`   |
| Text   | `.txt`    |

## Folder structure

Create a separate subfolder for each university:

```
data/
├── README.md
├── itu/
│   ├── academic-calendar-2026.pdf
│   └── undergraduate-regulations.docx
└── odtu/
    └── faq.txt
```

## Rules

- Use lowercase letters and hyphens in file names. Do not use spaces or non-ASCII characters (`course-catalog.pdf`).
- Scanned (image-only) PDFs contain no extractable text. Use PDFs whose text can be selected.
- Do not add documents that contain personal data (student IDs, national ID numbers, phone numbers).
- When a new version of a document arrives, delete the old one. Two versions of the same information lead to conflicting answers.
