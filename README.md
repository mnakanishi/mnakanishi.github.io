# Nakanytics — Website

Personal website and portfolio for Masaki Nakanishi, Ph.D.
Built with Jekyll, hosted on GitHub Pages.

---

## Setup (first time only)

1. **Install Ruby and Jekyll**
   ```bash
   gem install bundler jekyll
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Preview locally**
   ```bash
   bundle exec jekyll serve
   # Open http://localhost:4000
   ```

---

## Content management

### Add a blog post

Create a new file in `_posts/` named `YYYY-MM-DD-your-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-04-15
tags: [data-science, machine-learning]
thumb_color: "#E6F1FB"
excerpt: "A one-sentence summary shown in the blog list."
---

Your post content in Markdown here...
```

### Add a testimonial

Edit `_data/testimonials.yml` and add:

```yaml
- name: Client Name
  role: Job Title, Company
  initials: CN
  text: "Their testimonial text here."
```

### Add a project

Edit `_data/projects.yml` and add:

```yaml
- title: Project Title
  description: Brief description of the project.
  tags: [Python, ML, tag3]
  color: "#E6F1FB"
  link: "https://optional-link.com"
```

### Add a publication

Edit `_data/publications.yml` and add:

```yaml
- year: 2026
  title: "Full paper title"
  journal: "Journal Name"
  doi: "10.xxxx/xxxxx"
  highlight: true   # true = shown on homepage, false = publications page only
```

### Update social links

Edit `_data/social.yml`.

### Set up contact form

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID
3. Paste it into `_data/social.yml` under `formspree_id`

---

## Deployment

Push to GitHub — the site builds and deploys automatically via GitHub Pages.

```bash
git add .
git commit -m "Add new blog post"
git push
```

The site updates within ~1 minute.

---

## File structure

```
nakanytics/
├── _layouts/
│   ├── default.html      ← base page template
│   └── post.html         ← blog post template
├── _posts/               ← blog posts (YYYY-MM-DD-title.md)
├── _data/
│   ├── testimonials.yml  ← client testimonials
│   ├── projects.yml      ← portfolio projects
│   ├── publications.yml  ← academic papers
│   └── social.yml        ← social links + form ID
├── assets/
│   ├── css/main.css      ← all styles
│   └── js/main.js        ← sliders + contact form
├── index.html            ← homepage
├── blog.html             ← blog index
├── publications.html     ← full publications list
├── _config.yml           ← site settings
└── Gemfile               ← Ruby dependencies
```
