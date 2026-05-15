Build a new production-minded working prototype for Meridian.

Use the two linked previous Meridian attempts only as reference material. Do not patch them blindly. Study what was useful, then rebuild the workflow cleanly from the true beginning. The previous attempts failed because several buttons were decorative, review decisions did not change state, accountant answers did not apply back into the workflow, sample data looked like real data, and the export gate was disconnected from the actual work. Fix these problems at the product-flow level.

Product:
Meridian is an operational accounting workflow application for Canadian accounting firms. It helps a firm receive client source documents, process them, resolve only uncertain items, ask the accountant when professional judgment is needed, and produce a clean Excel-ready accounting package.

Start from the true beginning:
Accounting Firm -> Client -> Review Period -> Case / Work Package -> Documents -> Processing -> Review -> Accountant Q&A -> Vendor Rules -> Final Output.

The app must not start inside a case. It must support creating or selecting:
1. Accounting firm
2. Client under that firm
3. Review period under that client
4. Case under that review period

Important demo rule:
Provide two modes:
- Empty workspace: no firms, no clients, no cases, with clear create flows.
- Seeded demo workspace: realistic Canadian sample data for testing.
Do not hard-code sample company names as if they are the only real data.

Primary roles:
- Scanner / Intake user: adds source documents and fixes readability problems such as rotated, upside-down, unreadable, or unsupported files.
- Operator: handles practical review work, matching, grouping, attaching, categorizing, excluding, and sending unresolved items to accountant.
- Accountant: answers grouped professional judgment questions.
- System: reads documents, extracts fields, suggests matches, flags uncertainty, and records audit evidence.

Required workflow screens:

1. Workspace Setup
Firm list, client list, review periods, and cases. Use working create flows or local-state modals, not fake buttons. Keep the current context visible at all times.

2. Documents
Show source intake for the selected case. Include document count, readable count, needs-fix count, open source folder, add documents, refresh, open document, rotate, and reprocess. The user does not need a huge raw file dump, but must be able to inspect and fix problem documents.

3. Processing
Show clear progress from zero to one hundred. Show what was read, what was extracted, what matched, what failed, and what needs human attention. Processing should lead to review items only when the system cannot confidently resolve the issue.

4. Review
This is the main operator work screen. Use a compact master-detail layout. The first item should open by default. Clicking any queue item must show its details. Actions must change state:
- Open source document
- Rotate and reprocess
- Split / group documents
- Attach to transaction
- Change category
- Mark support-only
- Mark personal / exclude
- Ask accountant
- Confirm decision

5. Accountant Q&A
Questions must be grouped into a packet with context, suggested answers, source evidence, and why the system could not decide. The accountant answer must update the related review item. Once applied, the item should return to review as an accountant decision or become finalized if complete. Avoid a second question round unless truly necessary.

6. Vendor Directory
Show learned vendor rules and chart-of-accounts mapping. Use accounting-standard vocabulary similar to QuickBooks concepts where appropriate: vendor, customer, chart of accounts, expense account, tax code, payment source, transaction, bill, receipt, invoice.

7. Final Output
Export must be gated. It must stay blocked until:
- unreadable documents are fixed or intentionally excluded
- operator decisions are resolved
- accountant questions are answered and applied
- evidence links are intact

Final output must show:
- included transactions
- excluded / support-only items
- reasons
- decision source: System, Operator, Accountant
- audit trail
- Excel package preview
- export action
- package options such as full package, daily batch, monthly batch, source index, accountant Q&A log, and audit trail

Critical behavior:
- No decorative buttons.
- Every visible action must either change local state, open a modal/detail panel, navigate, or show a clear disabled reason.
- Nothing may silently disappear.
- Every transaction needs evidence and a decision reason.
- Every excluded item needs a reason.
- Use color to show decision source instead of repetitive badges everywhere.
- UI text must be English.
- Product name is Meridian. Do not show internal labels such as “Clean Work”.
- Do not claim QuickBooks integration is complete. The current deliverable is an Excel-ready accounting package.

Canadian accounting context:
Use realistic examples involving HST, GST, meals and entertainment, shareholder-paid expenses, due to/from shareholder, personal or excluded items, support-only documents, bank matching, vendor learning, and chart of accounts.

Design direction:
Make it professional, calm, modern, and comfortable. Prefer a polished dark professional version if readability stays excellent. Use full desktop width. Avoid generic dashboards, marketing pages, decorative hero sections, long empty pages, and overwhelming raw lists. Operational screens should be compact but not cramped. Use internal scrolling in tables and queues.

Implementation expectations:
Build a functioning React and TypeScript prototype with clean reusable components and local state transitions. The exported code must build without missing files, broken imports, missing exports, or encoding garbage.

Include:
- data models for firms, clients, review periods, cases, documents, transactions, review items, accountant questions, vendor rules, chart of accounts, decisions, and audit events
- realistic sample data
- empty-state data path
- screen map
- implementation notes
- backend/API handoff notes
- clear statement of what is functional in the prototype and what remains backend integration

Final quality requirements:
- Include a built-in end-to-end demo path that proves the workflow can go from empty workspace to final output readiness using local state.
- Decisions must be reversible or editable before final export, with the audit trail keeping the change history.
- Do not imply real document storage, real bank connection, real QuickBooks connection, or real export delivery unless it is actually implemented in the prototype. Use clear prototype-safe wording.
- Keep original source documents conceptually in the configured client source folder. Do not design the app around copying original client documents into the app runtime.
- Before finishing, verify that the prototype can complete at least one full case path: create/select firm, client, period, case, add documents, process, resolve review items, answer accountant questions, unblock output, and preview export.

Important:
If you see a simpler and safer workflow, improve the workflow inside this product frame. Do not make a pretty mockup. Make a working operational prototype.
