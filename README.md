# nextjs-astro-vim

![preview](./preview.gif)

[Astro Vim Theme](https://github.com/albertoperdomo2/astro-vim) for [Next.js](https://nextjs.org/)<sub>(14+ App Router)</sub>

## Tested Environment

- debian - bookworm
- nodejs - v20.17.0
- npm - 10.8.3

## npm commands

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | `rm -rf .next && next build`                       |
| `npm run start`        | `next start`                                       |
| `npm run lint`         | `next lint`                                        |

## Roadmap

- [x] Change Line Number Render Process ( Default Tilde -> Command `:set number` )
- [x] Improve Help Page
- [x] Find in page
- [x] StatusBar Title & Line Numbers
- [x] Mail Command
  - mailgo support keyboard shortcut internally. but conflicts with this site. maybe change library later.
- [ ] Site Configuration
- [ ] Search Post
- SEO each Post
  - [x] title, description
  - [ ] open graph
- [ ] IBM DOS And Green Themes [cool-retro-term](https://github.com/Swordfish90/cool-retro-term)