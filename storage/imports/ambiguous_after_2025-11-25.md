# Assumptions

No rows are currently excluded.

- `Fabi` = `Fabian`; `Hori`, `Holi` = `Horacio`; `Gabi` = `Gabriel`; `Lucho` = `Luciano`; `Tincho`, `Marín` = `Martin`; `H` = `Hache`.
- `Gato` = `Juan`.
- Team row `Guasti 3-2 martin hache` on 2026-01-27 was treated as `Guasti/Gabriel 3-2 Martin/Hache` from surrounding Libertadores context.
- `EFOOTBALL v6` starts on 2026-08-11 inclusive. The current CSV rows end on 2026-08-04, so they remain `EFOOTBALL v5`.
- Individual tournament labels were exported as `Torneo`, because `SingleGamesSeeder` stores individual competitions under `torneo`/`copa`, not `libertadores`.
- Unlabeled team games are left with an empty tournament column, so the seeder imports them as `amistoso`.
