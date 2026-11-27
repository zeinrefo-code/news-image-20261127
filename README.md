[![make.fun · news-image-20261127](https://make.fun/badge/news-image-20261127.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![rank](https://make.fun/badge/news-image-20261127/zeinrefo-code/news-image-20261127/rank.svg)](https://make.fun/bounty/news-image-20261127/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![reward](https://make.fun/badge/news-image-20261127/zeinrefo-code/news-image-20261127/reward.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)

# The World in One Day — 27 November 2026

An entry for make.fun's **news-image-20261127** bounty ($100, 50 places).
One 1024×1024 picture that sums up the world news of Friday 27 November
2026, laid out as a newspaper front page: the date up top, the day's
biggest story as the lead image, and the rest of the day's headlines
underneath.

## The stories in the picture

- **MAYON ERUPTS** — the lead. Mount Mayon in the Philippines erupted on
  Friday, throwing an ash column 3,000 metres into the sky.
- **ZELENSKYY WARNS OF MASSIVE RUSSIAN STRIKE** — Ukraine's president
  warned Russia could launch another major attack on the power grid and
  other essential services.
- **EBOLA CASES PASS 12,000 IN DR CONGO** — the outbreak in DR Congo
  passed 12,000 confirmed cases, with nearly 6,000 deaths, as fighting
  in Ituri forced aid workers out of affected areas.
- **KIM URGES MORE TACTICAL NUKES** — North Korea's leader called for
  wider deployment of tactical nuclear weapons, calling the country's
  nuclear status inviolable.
- **IRAN CLAIMS TANKERS HIT MINES OFF OMAN** — Iran's Revolutionary
  Guards said two oil tankers caught fire after hitting naval mines near
  Oman's Khasab port (unverified claim).
- **EGYPT TANKER FIRE KILLS 31** — a fuel tanker overturned and caught
  fire on Cairo's Ring Road, killing 31 people and burning 27 vehicles.

## How it is delivered

`entry.png` is the front page itself (1024×1024, under 1 MiB). `main.ts`
is a small Node.js program that hands it to the grader: it checks the
file exists, is under the size cap and starts with a genuine PNG
signature, copies it to the output directory, then verifies the copy by
size and SHA-256 digest so a damaged delivery fails loudly. A `--check`
flag runs the same validation without writing anything.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
