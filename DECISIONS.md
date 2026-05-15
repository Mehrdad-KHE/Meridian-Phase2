# DECISIONS

Updated: 2026-05-15

## Locked Decisions

1. Preserve the current application logic, architecture, and naming.
2. Use root-level control files as the authoritative workflow layer.
3. Keep `docs/` and other mirrors secondary unless explicitly promoted.
4. Keep the prototype local-state based unless a separate task introduces backend work.
5. Treat the controlled-project workflow as maintenance around the product, not a rewrite of the product.
6. Use `tools/reference-benchmark.ps1` for the `شروع مرجع` trigger path.
7. Update state and handoff files after meaningful work.
8. Use `CLAUDE.md` as the canonical Claude-facing continuation and model-switch prompt.
9. Keep Phase 1 and Phase 2 fully isolated unless the owner explicitly announces convergence.

## Decision Notes

- The project should remain traceable from files, not chat memory.
- Workflow changes should be recorded in the control files immediately.
- Source changes and workflow-document changes should be kept separate whenever possible.
