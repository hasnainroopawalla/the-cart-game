<p align="center">
  <img src="public/icon.svg" alt="Braintide" width="96" />
</p>

# Braintide

**Think fast. Type fast. Hold the line.**

A typing trivia defence game. Questions march toward your base — the only weapon you have is the right answer.

**[▶ Play now](https://hasnainroopawalla.github.io/braintide)**

## How to play

- Each level picks a category (Capital Cities, Currencies, ...) — the banner tells you what's being asked.
- Prompts advance across the screen. Type the answer and hit `Enter` to fire at the closest match.
- Let one breach your base — or fire a wrong answer — and you lose health. Lose it all and the run ends.
- Chain correct answers to build a streak multiplier and stack up your score.

## Progression

Every question is tagged with a difficulty tier, and the deeper you get the harder the mix:

| Levels | Question mix             |
| ------ | ------------------------ |
| 1–3    | all easy                 |
| 4–6    | mostly easy, some medium |
| 7–9    | mostly medium            |
| 10–12  | medium and hard          |
| 13+    | mostly hard              |

Enemies are coloured by tier — rose (easy), amber (medium), violet (hard) — so you can decide what to shoot first. Harder questions are worth more, multiplied by your current streak.

### Sampling

Categories and questions are drawn from shuffle bags rather than picked at random, so a run never repeats itself early:

- **Categories** — every category is played once before any repeats, and the bag never hands you the same one twice in a row when it reshuffles.
- **Questions** — each category keeps a separate bag per difficulty tier. A tier is chosen using the weights above, then a question is drawn from that tier's bag, so you won't see the same question again until its tier has been exhausted.
- Tiers a category has no questions for are skipped and the remaining weights are rebalanced.

## Development

```bash
yarn install
yarn dev        # start the dev server
yarn test       # run the test suite
yarn lint       # lint
yarn build      # production build to build/
```

Built with React, TypeScript, p5.js, Tailwind CSS and Vite.

## License

[MIT](LICENSE)
